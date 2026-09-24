import {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IHttpRequestOptions,
	IHttpRequestMethods,
	IDataObject,
	INode,
	NodeOperationError,
} from 'n8n-workflow';

/**
 * Make an API request to the Alze CRM.
 */
export async function alzeApiRequest(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	resource: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	uri?: string,
	headers: IDataObject = {},
): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
	const credentials = await this.getCredentials('alzeApi');
	const apiKey = credentials.apiKey as string;

	// Empty strings are dropped from the body: the API ignores them anyway.
	const cleanedBody: IDataObject = {};
	for (const key of Object.keys(body)) {
		if (body[key] !== '') {
			cleanedBody[key] = body[key];
		}
	}

	// Empty strings are KEPT in the query string. A filter only reaches `qs`
	// when the user added it, and an empty value there usually comes from an
	// expression that resolved to nothing. Dropping it turned the filter into
	// "no filter" and returned the whole workspace; the API decides what an
	// empty filter means (`phone_match=` matches nobody). Only unset values
	// are dropped.
	const cleanedQs: IDataObject = {};
	for (const key of Object.keys(qs)) {
		if (qs[key] !== undefined && qs[key] !== null) {
			cleanedQs[key] = qs[key];
		}
	}

	const fullUrl = uri || `https://hjjqtkdmxpqzjjlsebfv.supabase.co/functions/v1/public-api/api/v1${resource}`;

	const requestHeaders: IDataObject = {
		'Authorization': `Bearer ${apiKey}`,
		...headers,
	};

	// Only add Content-Type for requests that carry a body payload
	if (method !== 'GET' && method !== 'DELETE') {
		requestHeaders['Content-Type'] = 'application/json';
	}

	const options: IHttpRequestOptions = {
		headers: requestHeaders,
		method,
		body: cleanedBody,
		qs: cleanedQs,
		url: fullUrl,
		json: true,
	};

	if (Object.keys(cleanedBody).length === 0) {
		delete options.body;
	}

	try {
		// eslint-disable-next-line @n8n/community-nodes/no-http-request-with-manual-auth
		return await this.helpers.httpRequest(options);
	} catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
		// Extract meaningful error message from the API response body
		const statusCode: number = error.response?.status ?? error.statusCode ?? 0;
		const responseBody = error.response?.data ?? error.response?.body ?? error.cause?.response?.data;

		let apiMessage: string | undefined;
		if (responseBody) {
			if (typeof responseBody === 'string') {
				apiMessage = responseBody;
			} else if (typeof responseBody === 'object') {
				// Most routes answer `{ error: string, message, code }`, but some
				// (unknown route, invalid phones) answer `{ error: { code, message } }`.
				const nestedError = responseBody.error && typeof responseBody.error === 'object'
					? responseBody.error.message
					: undefined;
				apiMessage =
					responseBody.message ??
					nestedError ??
					(typeof responseBody.error === 'string' ? responseBody.error : undefined) ??
					responseBody.detail ??
					JSON.stringify(responseBody);
			}
		}

		const label = statusCode ? `[${statusCode}]` : '';
		const context = `${method} ${fullUrl}`;
		const message = apiMessage
			? `${label} ${apiMessage} — ${context}`
			: `${label} Request failed — ${context}`;

		throw new NodeOperationError(
			('getNode' in this ? this.getNode() : {} as INode),
			message,
			{ description: apiMessage ?? error.message },
		);
	}
}


// The API caps `page_size` at 100 on every list route.
const MAX_PAGE_SIZE = 100;

/**
 * List request with page pagination.
 *
 * "Return All" follows `meta.next` until the last page. Otherwise pages are
 * fetched until "Limit" items are collected, since the API never returns
 * more than 100 per page. Operations without these parameters return all
 * items.
 */
export async function alzeApiRequestAllItems(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	itemIndex = 0,
): Promise<any[]> { // eslint-disable-line @typescript-eslint/no-explicit-any
	const returnData: any[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any

	const returnAll = this.getNodeParameter('returnAll', itemIndex, true) as boolean;
	const limit = returnAll
		? Infinity
		: Math.max(1, Number(this.getNodeParameter('limit', itemIndex, 50)) || 50);

	// The page size must stay the same across pages, or offsets shift.
	qs.page = 1;
	qs.page_size = Math.min(MAX_PAGE_SIZE, limit);

	while (returnData.length < limit) {
		const responseData = await alzeApiRequest.call(this, method, endpoint, body, qs);
		const items = responseData?.data;
		if (!Array.isArray(items) || items.length === 0) break;
		returnData.push(...items);
		if (!responseData.meta?.next) break;
		qs.page = (qs.page as number) + 1;
	}

	return returnAll ? returnData : returnData.slice(0, limit);
}

/**
 * The API validates date fields as `YYYY-MM-DD`, while n8n dateTime fields
 * produce ISO strings with time. Keep only the date part of the given keys.
 */
export function toDateOnly(body: IDataObject, keys: string[]) {
	for (const key of keys) {
		const value = body[key];
		if (typeof value === 'string' && value.length > 10) {
			body[key] = value.slice(0, 10);
		}
	}
}

/**
 * Parse a JSON-object parameter (n8n `json` fields arrive as strings) in place.
 */
export function parseJsonObjectField(node: INode, body: IDataObject, key: string, label: string) {
	const value = body[key];
	if (value === undefined || value === '') {
		delete body[key];
		return;
	}
	let parsed: unknown = value;
	if (typeof value === 'string') {
		try {
			parsed = JSON.parse(value);
		} catch {
			throw new NodeOperationError(node, `${label} is invalid. Please provide a valid JSON object.`);
		}
	}
	if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
		throw new NodeOperationError(node, `${label} must be a JSON object.`);
	}
	body[key] = parsed as IDataObject;
}

/**
 * Helper to process custom fields input into Alze body format
 */
export function handleCustomFields(node: INode, body: IDataObject, properties: IDataObject) {
	if (properties.customFieldsUi) {
		const customFields = (properties.customFieldsUi as any).customFieldsValues || []; // eslint-disable-line @typescript-eslint/no-explicit-any
		const customFieldsObj: IDataObject = {};
		for (const field of customFields) {
			customFieldsObj[field.key] = field.value;
		}
		body.custom_fields = customFieldsObj;
	} else if (properties.customFieldsJson) {
		try {
			if (typeof properties.customFieldsJson === 'string') {
				body.custom_fields = JSON.parse(properties.customFieldsJson);
			} else {
				body.custom_fields = properties.customFieldsJson;
			}
		} catch {
			throw new NodeOperationError(node, 'Custom Fields JSON is invalid. Please provide a valid JSON object.');
		}
	}
	delete body.customFieldsUi;
	delete body.customFieldsJson;
}

// Phone types the node offered before the API settled on
// mobile|fixed|whatsapp|work|other. Workflows saved with them keep working.
const LEGACY_PHONE_TYPES: Record<string, string> = {
	home: 'fixed',
	phone: 'fixed',
};

function normalizePhoneType(phone: unknown): unknown {
	if (!phone || typeof phone !== 'object' || Array.isArray(phone)) return phone;
	const p = phone as IDataObject;
	if (typeof p.type === 'string' && LEGACY_PHONE_TYPES[p.type]) {
		return { ...p, type: LEGACY_PHONE_TYPES[p.type] };
	}
	return phone;
}

/**
 * Helper to process phones input into Alze body format
 */
export function handleContactPhones(node: INode, body: IDataObject, properties: IDataObject) {
	if (properties.phonesUi) {
		const phones = (properties.phonesUi as IDataObject).phonesValues as IDataObject[] || [];
		body.phones = phones.map((phone) => normalizePhoneType({
			value: phone.value,
			type: phone.type,
		})) as IDataObject[];
	} else if (properties.phonesJson) {
		let phones: unknown;
		try {
			if (typeof properties.phonesJson === 'string') {
				phones = JSON.parse(properties.phonesJson);
			} else {
				phones = properties.phonesJson;
			}
		} catch {
			throw new NodeOperationError(node, 'Phones JSON is invalid. Please provide a valid JSON array.');
		}
		body.phones = (Array.isArray(phones) ? phones.map(normalizePhoneType) : phones) as IDataObject[];
	}
	delete body.phonesUi;
	delete body.phonesJson;
}

/**
 * Helper to process batch stages input for pipeline creation
 */
export function handlePipelineStages(node: INode, body: IDataObject, properties: IDataObject) {
	if (properties.stagesUi) {
		const stages = ((properties.stagesUi as IDataObject).stagesValues as IDataObject[] || [])
			.map((stage) => ({ ...stage }));
		// The UI always carries `position` (default 0). When no stage was given a
		// position, omit it so the API uses the order of the list; otherwise every
		// stage would be created at position 0.
		if (stages.every((stage) => !stage.position)) {
			for (const stage of stages) delete stage.position;
		}
		body.stages = stages;
	} else if (properties.stagesJson) {
		try {
			if (typeof properties.stagesJson === 'string') {
				body.stages = JSON.parse(properties.stagesJson);
			} else {
				body.stages = properties.stagesJson;
			}
		} catch {
			throw new NodeOperationError(node, 'Stages JSON is invalid. Please provide a valid JSON array of objects.');
		}
	}
}
