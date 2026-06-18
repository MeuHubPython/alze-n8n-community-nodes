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

	// Clean empty string values from body and query parameters
	const cleanedBody: IDataObject = {};
	for (const key of Object.keys(body)) {
		if (body[key] !== '') {
			cleanedBody[key] = body[key];
		}
	}

	const cleanedQs: IDataObject = {};
	for (const key of Object.keys(qs)) {
		if (qs[key] !== '') {
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
				apiMessage =
					responseBody.message ??
					responseBody.error ??
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


/**
 * Handle Alze CRM API request with automatic page pagination if "Return All" is selected.
 */
export async function alzeApiRequestAllItems(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any[]> { // eslint-disable-line @typescript-eslint/no-explicit-any
	const returnData: any[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any
	let responseData;
	qs.page = qs.page || 1;
	qs.page_size = qs.page_size || 100; // Fetch max page size for efficiency

	const returnAll = this.getNodeParameter('returnAll', 0) as boolean;

	if (returnAll) {
		let hasMore = true;
		do {
			responseData = await alzeApiRequest.call(this, method, endpoint, body, qs);
			const items = responseData.data;
			if (items && Array.isArray(items)) {
				returnData.push(...items);
			}
			if (responseData.meta && responseData.meta.next) {
				qs.page = (qs.page as number) + 1;
			} else {
				hasMore = false;
			}
		} while (hasMore);

		return returnData;
	} else {
		qs.page_size = this.getNodeParameter('limit', 0) as number || 20;
		responseData = await alzeApiRequest.call(this, method, endpoint, body, qs);
		const items = responseData.data;
		if (items && Array.isArray(items)) {
			return items.slice(0, qs.page_size);
		}
		return [];
	}
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

/**
 * Helper to process phones input into Alze body format
 */
export function handleContactPhones(node: INode, body: IDataObject, properties: IDataObject) {
	if (properties.phonesUi) {
		const phones = (properties.phonesUi as IDataObject).phonesValues as IDataObject[] || [];
		body.phones = phones.map((phone) => ({
			value: phone.value,
			type: phone.type,
		}));
	} else if (properties.phonesJson) {
		try {
			if (typeof properties.phonesJson === 'string') {
				body.phones = JSON.parse(properties.phonesJson);
			} else {
				body.phones = properties.phonesJson;
			}
		} catch {
			throw new NodeOperationError(node, 'Phones JSON is invalid. Please provide a valid JSON array.');
		}
	}
	delete body.phonesUi;
	delete body.phonesJson;
}

/**
 * Helper to process batch stages input for pipeline creation
 */
export function handlePipelineStages(node: INode, body: IDataObject, properties: IDataObject) {
	if (properties.stagesUi) {
		const stages = (properties.stagesUi as any).stagesValues || []; // eslint-disable-line @typescript-eslint/no-explicit-any
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
