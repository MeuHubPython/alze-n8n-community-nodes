import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	NodeConnectionTypes,
} from 'n8n-workflow';

import {
	alzeApiRequest,
	alzeApiRequestAllItems,
	handleCustomFields,
} from './GenericFunctions';

import {
	contactOperations,
	contactFields,
} from './ContactDescription';

import {
	organizationOperations,
	organizationFields,
} from './OrganizationDescription';

import {
	dealOperations,
	dealFields,
} from './DealDescription';

import {
	activityOperations,
	activityFields,
} from './ActivityDescription';

import {
	productOperations,
	productFields,
} from './ProductDescription';

import {
	pipelineOperations,
	pipelineFields,
} from './PipelineDescription';

import {
	stageOperations,
	stageFields,
} from './StageDescription';

import {
	lostReasonOperations,
	lostReasonFields,
} from './LostReasonDescription';

import {
	wonReasonOperations,
	wonReasonFields,
} from './WonReasonDescription';

import {
	userOperations,
	userFields,
} from './UserDescription';

export class Alze implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Alze CRM',
		name: 'alze',
		icon: 'file:alze.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Consume Alze CRM API resources and perform actions',
		defaults: {
			name: 'Alze CRM',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'alzeApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Activity', value: 'activity' },
					{ name: 'Contact', value: 'contact' },
					{ name: 'Deal', value: 'deal' },
					{ name: 'Lost Reason', value: 'lostReason' },
					{ name: 'Organization', value: 'organization' },
					{ name: 'Pipeline', value: 'pipeline' },
					{ name: 'Product', value: 'product' },
					{ name: 'Stage', value: 'stage' },
					{ name: 'User', value: 'user' },
					{ name: 'Won Reason', value: 'wonReason' },
				],
				default: 'contact',
			},
			...contactOperations,
			...contactFields,
			...organizationOperations,
			...organizationFields,
			...dealOperations,
			...dealFields,
			...activityOperations,
			...activityFields,
			...productOperations,
			...productFields,
			...pipelineOperations,
			...pipelineFields,
			...stageOperations,
			...stageFields,
			...lostReasonOperations,
			...lostReasonFields,
			...wonReasonOperations,
			...wonReasonFields,
			...userOperations,
			...userFields,
		],
		usableAsTool: true,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		let responseData;

		for (let i = 0; i < items.length; i++) {
			try {
				// ==========================================
				//                 CONTACT
				// ==========================================
				if (resource === 'contact') {
					if (operation === 'get') {
						const contactId = this.getNodeParameter('contactId', i) as string;
						responseData = await alzeApiRequest.call(this, 'GET', `/contacts/${contactId}`);
						responseData = responseData.data;
					} else if (operation === 'delete') {
						const contactId = this.getNodeParameter('contactId', i) as string;
						responseData = await alzeApiRequest.call(this, 'DELETE', `/contacts/${contactId}`);
						responseData = responseData.data;
					} else if (operation === 'merge') {
						const contactId = this.getNodeParameter('contactId', i) as string;
						const sourceId = this.getNodeParameter('sourceId', i) as string;
						responseData = await alzeApiRequest.call(this, 'POST', `/contacts/${contactId}/merge`, { source_id: sourceId });
						responseData = responseData.data;
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						handleCustomFields(this.getNode(), body, fields);
						responseData = await alzeApiRequest.call(this, 'POST', '/contacts', body);
						responseData = responseData.data;
					} else if (operation === 'update') {
						const contactId = this.getNodeParameter('contactId', i) as string;
						const name = this.getNodeParameter('nameUpdate', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						handleCustomFields(this.getNode(), body, fields);
						responseData = await alzeApiRequest.call(this, 'PUT', `/contacts/${contactId}`, body);
						responseData = responseData.data;
					} else if (operation === 'patch') {
						const contactId = this.getNodeParameter('contactId', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { ...fields };
						if (fields.namePatch) {
							body.name = fields.namePatch;
							delete body.namePatch;
						}
						handleCustomFields(this.getNode(), body, fields);
						responseData = await alzeApiRequest.call(this, 'PATCH', `/contacts/${contactId}`, body);
						responseData = responseData.data;
					} else if (operation === 'list') {
						const q = this.getNodeParameter('q', i) as string;
						const sort = this.getNodeParameter('sort', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = { ...additionalFields };
						if (q) qs.q = q;
						if (sort) qs.sort = sort;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', '/contacts', {}, qs);
					}
				}

				// ==========================================
				//              ORGANIZATION
				// ==========================================
				else if (resource === 'organization') {
					if (operation === 'get') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						responseData = await alzeApiRequest.call(this, 'GET', `/organizations/${organizationId}`);
						responseData = responseData.data;
					} else if (operation === 'delete') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						responseData = await alzeApiRequest.call(this, 'DELETE', `/organizations/${organizationId}`);
						responseData = responseData.data;
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						handleCustomFields(this.getNode(), body, fields);
						responseData = await alzeApiRequest.call(this, 'POST', '/organizations', body);
						responseData = responseData.data;
					} else if (operation === 'update') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						const name = this.getNodeParameter('nameUpdate', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						handleCustomFields(this.getNode(), body, fields);
						responseData = await alzeApiRequest.call(this, 'PUT', `/organizations/${organizationId}`, body);
						responseData = responseData.data;
					} else if (operation === 'patch') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { ...fields };
						if (fields.namePatch) {
							body.name = fields.namePatch;
							delete body.namePatch;
						}
						handleCustomFields(this.getNode(), body, fields);
						responseData = await alzeApiRequest.call(this, 'PATCH', `/organizations/${organizationId}`, body);
						responseData = responseData.data;
					} else if (operation === 'list') {
						const q = this.getNodeParameter('q', i) as string;
						const sort = this.getNodeParameter('sort', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = { ...additionalFields };
						if (q) qs.q = q;
						if (sort) qs.sort = sort;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', '/organizations', {}, qs);
					}
				}

				// ==========================================
				//                  DEAL
				// ==========================================
				else if (resource === 'deal') {
					if (operation === 'get') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						responseData = await alzeApiRequest.call(this, 'GET', `/deals/${dealId}`);
						responseData = responseData.data;
					} else if (operation === 'delete') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						responseData = await alzeApiRequest.call(this, 'DELETE', `/deals/${dealId}`);
						responseData = responseData.data;
					} else if (operation === 'win') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						const wonAt = this.getNodeParameter('wonAt', i) as string;
						const wonReasonId = this.getNodeParameter('wonReasonId', i) as string;
						const feedback = this.getNodeParameter('feedbackWin', i) as string;
						const body: IDataObject = {};
						if (wonAt) body.won_at = wonAt;
						if (wonReasonId) body.won_reason_id = Number(wonReasonId);
						if (feedback) body.feedback = feedback;
						responseData = await alzeApiRequest.call(this, 'POST', `/deals/${dealId}/win`, body);
						responseData = responseData.data;
					} else if (operation === 'lose') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						const lostAt = this.getNodeParameter('lostAt', i) as string;
						const lostReasonId = this.getNodeParameter('lostReasonId', i) as string;
						const feedback = this.getNodeParameter('feedbackLose', i) as string;
						const body: IDataObject = {};
						if (lostAt) body.lost_at = lostAt;
						if (lostReasonId) body.lost_reason_id = Number(lostReasonId);
						if (feedback) body.feedback = feedback;
						responseData = await alzeApiRequest.call(this, 'POST', `/deals/${dealId}/lose`, body);
						responseData = responseData.data;
					} else if (operation === 'move') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						const stageId = this.getNodeParameter('stageIdMove', i) as string;
						const movedAt = this.getNodeParameter('movedAt', i) as string;
						const body: IDataObject = { stage_id: stageId };
						if (movedAt) body.moved_at = movedAt;
						responseData = await alzeApiRequest.call(this, 'POST', `/deals/${dealId}/move`, body);
						responseData = responseData.data;
					} else if (operation === 'create') {
						const title = this.getNodeParameter('title', i) as string;
						const pipelineId = this.getNodeParameter('pipelineId', i) as string;
						const stageId = this.getNodeParameter('stageId', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { title, pipeline_id: pipelineId, stage_id: stageId, ...fields };
						handleCustomFields(this.getNode(), body, fields);
						responseData = await alzeApiRequest.call(this, 'POST', '/deals', body);
						responseData = responseData.data;
					} else if (operation === 'update') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						const title = this.getNodeParameter('titleUpdate', i) as string;
						const pipelineId = this.getNodeParameter('pipelineIdUpdate', i) as string;
						const stageId = this.getNodeParameter('stageIdUpdate', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { title, pipeline_id: pipelineId, stage_id: stageId, ...fields };
						handleCustomFields(this.getNode(), body, fields);
						responseData = await alzeApiRequest.call(this, 'PUT', `/deals/${dealId}`, body);
						responseData = responseData.data;
					} else if (operation === 'patch') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { ...fields };
						if (fields.titlePatch) {
							body.title = fields.titlePatch;
							delete body.titlePatch;
						}
						if (fields.pipelineIdPatch) {
							body.pipeline_id = fields.pipelineIdPatch;
							delete body.pipelineIdPatch;
						}
						if (fields.stageIdPatch) {
							body.stage_id = fields.stageIdPatch;
							delete body.stageIdPatch;
						}
						handleCustomFields(this.getNode(), body, fields);
						responseData = await alzeApiRequest.call(this, 'PATCH', `/deals/${dealId}`, body);
						responseData = responseData.data;
					} else if (operation === 'list') {
						const q = this.getNodeParameter('q', i) as string;
						const sort = this.getNodeParameter('sort', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = { ...additionalFields };
						if (q) qs.q = q;
						if (sort) qs.sort = sort;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', '/deals', {}, qs);
					}
				}

				// ==========================================
				//                ACTIVITY
				// ==========================================
				else if (resource === 'activity') {
					if (operation === 'get') {
						const activityId = this.getNodeParameter('activityId', i) as string;
						responseData = await alzeApiRequest.call(this, 'GET', `/activities/${activityId}`);
						responseData = responseData.data;
					} else if (operation === 'delete') {
						const activityId = this.getNodeParameter('activityId', i) as string;
						responseData = await alzeApiRequest.call(this, 'DELETE', `/activities/${activityId}`);
						responseData = responseData.data;
					} else if (operation === 'complete') {
						const activityId = this.getNodeParameter('activityId', i) as string;
						const completedAt = this.getNodeParameter('completedAt', i) as string;
						const notes = this.getNodeParameter('notesComplete', i) as string;
						const body: IDataObject = { completed_at: completedAt };
						if (notes) body.notes = notes;
						responseData = await alzeApiRequest.call(this, 'POST', `/activities/${activityId}/complete`, body);
						responseData = responseData.data;
					} else if (operation === 'create') {
						const title = this.getNodeParameter('title', i) as string;
						const type = this.getNodeParameter('type', i) as string;
						const dueDate = this.getNodeParameter('dueDate', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { title, type, due_date: dueDate, ...fields };
						responseData = await alzeApiRequest.call(this, 'POST', '/activities', body);
						responseData = responseData.data;
					} else if (operation === 'update') {
						const activityId = this.getNodeParameter('activityId', i) as string;
						const title = this.getNodeParameter('titleUpdate', i) as string;
						const type = this.getNodeParameter('typeUpdate', i) as string;
						const dueDate = this.getNodeParameter('dueDateUpdate', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { title, type, due_date: dueDate, ...fields };
						responseData = await alzeApiRequest.call(this, 'PUT', `/activities/${activityId}`, body);
						responseData = responseData.data;
					} else if (operation === 'patch') {
						const activityId = this.getNodeParameter('activityId', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { ...fields };
						if (fields.titlePatch) {
							body.title = fields.titlePatch;
							delete body.titlePatch;
						}
						if (fields.typePatch) {
							body.type = fields.typePatch;
							delete body.typePatch;
						}
						if (fields.dueDatePatch) {
							body.due_date = fields.dueDatePatch;
							delete body.dueDatePatch;
						}
						responseData = await alzeApiRequest.call(this, 'PATCH', `/activities/${activityId}`, body);
						responseData = responseData.data;
					} else if (operation === 'list') {
						const q = this.getNodeParameter('q', i) as string;
						const sort = this.getNodeParameter('sort', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = { ...additionalFields };
						if (q) qs.q = q;
						if (sort) qs.sort = sort;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', '/activities', {}, qs);
					}
				}

				// ==========================================
				//                 PRODUCT
				// ==========================================
				else if (resource === 'product') {
					if (operation === 'get') {
						const productId = this.getNodeParameter('productId', i) as string;
						responseData = await alzeApiRequest.call(this, 'GET', `/items/${productId}`);
						responseData = responseData.data;
					} else if (operation === 'delete') {
						const productId = this.getNodeParameter('productId', i) as string;
						responseData = await alzeApiRequest.call(this, 'DELETE', `/items/${productId}`);
						responseData = responseData.data;
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const price = this.getNodeParameter('price', i) as number;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, price, ...fields };
						responseData = await alzeApiRequest.call(this, 'POST', '/items', body);
						responseData = responseData.data;
					} else if (operation === 'update') {
						const productId = this.getNodeParameter('productId', i) as string;
						const name = this.getNodeParameter('nameUpdate', i) as string;
						const price = this.getNodeParameter('priceUpdate', i) as number;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, price, ...fields };
						responseData = await alzeApiRequest.call(this, 'PUT', `/items/${productId}`, body);
						responseData = responseData.data;
					} else if (operation === 'patch') {
						const productId = this.getNodeParameter('productId', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { ...fields };
						if (fields.namePatch) {
							body.name = fields.namePatch;
							delete body.namePatch;
						}
						if (fields.pricePatch) {
							body.price = fields.pricePatch;
							delete body.pricePatch;
						}
						responseData = await alzeApiRequest.call(this, 'PATCH', `/items/${productId}`, body);
						responseData = responseData.data;
					} else if (operation === 'list') {
						const q = this.getNodeParameter('q', i) as string;
						const sort = this.getNodeParameter('sort', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = { ...additionalFields };
						if (q) qs.q = q;
						if (sort) qs.sort = sort;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', '/items', {}, qs);
					}
				}

				// ==========================================
				//                PIPELINE
				// ==========================================
				else if (resource === 'pipeline') {
					if (operation === 'get') {
						const pipelineId = this.getNodeParameter('pipelineId', i) as string;
						responseData = await alzeApiRequest.call(this, 'GET', `/pipelines/${pipelineId}`);
						responseData = responseData.data;
					} else if (operation === 'delete') {
						const pipelineId = this.getNodeParameter('pipelineId', i) as string;
						responseData = await alzeApiRequest.call(this, 'DELETE', `/pipelines/${pipelineId}`);
						responseData = responseData.data;
					} else if (operation === 'listStages') {
						const pipelineId = this.getNodeParameter('pipelineId', i) as string;
						responseData = await alzeApiRequest.call(this, 'GET', `/pipelines/${pipelineId}/stages`);
						responseData = responseData.data;
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						responseData = await alzeApiRequest.call(this, 'POST', '/pipelines', body);
						responseData = responseData.data;
					} else if (operation === 'update') {
						const pipelineId = this.getNodeParameter('pipelineId', i) as string;
						const name = this.getNodeParameter('nameUpdate', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						responseData = await alzeApiRequest.call(this, 'PUT', `/pipelines/${pipelineId}`, body);
						responseData = responseData.data;
					} else if (operation === 'patch') {
						const pipelineId = this.getNodeParameter('pipelineId', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { ...fields };
						if (fields.namePatch) {
							body.name = fields.namePatch;
							delete body.namePatch;
						}
						responseData = await alzeApiRequest.call(this, 'PATCH', `/pipelines/${pipelineId}`, body);
						responseData = responseData.data;
					} else if (operation === 'list') {
						const q = this.getNodeParameter('q', i) as string;
						const sort = this.getNodeParameter('sort', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = { ...additionalFields };
						if (q) qs.q = q;
						if (sort) qs.sort = sort;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', '/pipelines', {}, qs);
					}
				}

				// ==========================================
				//                  STAGE
				// ==========================================
				else if (resource === 'stage') {
					if (operation === 'get') {
						const stageId = this.getNodeParameter('stageId', i) as string;
						responseData = await alzeApiRequest.call(this, 'GET', `/stages/${stageId}`);
						responseData = responseData.data;
					} else if (operation === 'delete') {
						const stageId = this.getNodeParameter('stageId', i) as string;
						responseData = await alzeApiRequest.call(this, 'DELETE', `/stages/${stageId}`);
						responseData = responseData.data;
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const pipelineId = this.getNodeParameter('pipelineId', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, pipeline_id: pipelineId, ...fields };
						responseData = await alzeApiRequest.call(this, 'POST', '/stages', body);
						responseData = responseData.data;
					} else if (operation === 'update') {
						const stageId = this.getNodeParameter('stageId', i) as string;
						const name = this.getNodeParameter('nameUpdate', i) as string;
						const pipelineId = this.getNodeParameter('pipelineIdUpdate', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, pipeline_id: pipelineId, ...fields };
						responseData = await alzeApiRequest.call(this, 'PUT', `/stages/${stageId}`, body);
						responseData = responseData.data;
					} else if (operation === 'patch') {
						const stageId = this.getNodeParameter('stageId', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { ...fields };
						if (fields.namePatch) {
							body.name = fields.namePatch;
							delete body.namePatch;
						}
						if (fields.pipelineIdPatch) {
							body.pipeline_id = fields.pipelineIdPatch;
							delete body.pipelineIdPatch;
						}
						responseData = await alzeApiRequest.call(this, 'PATCH', `/stages/${stageId}`, body);
						responseData = responseData.data;
					} else if (operation === 'list') {
						const q = this.getNodeParameter('q', i) as string;
						const sort = this.getNodeParameter('sort', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = { ...additionalFields };
						if (q) qs.q = q;
						if (sort) qs.sort = sort;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', '/stages', {}, qs);
					}
				}

				// ==========================================
				//                LOST REASON
				// ==========================================
				else if (resource === 'lostReason') {
					if (operation === 'get') {
						const lostReasonId = this.getNodeParameter('lostReasonId', i) as string;
						responseData = await alzeApiRequest.call(this, 'GET', `/loss-reasons/${lostReasonId}`);
						responseData = responseData.data;
					} else if (operation === 'delete') {
						const lostReasonId = this.getNodeParameter('lostReasonId', i) as string;
						responseData = await alzeApiRequest.call(this, 'DELETE', `/loss-reasons/${lostReasonId}`);
						responseData = responseData.data;
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						responseData = await alzeApiRequest.call(this, 'POST', '/loss-reasons', body);
						responseData = responseData.data;
					} else if (operation === 'update') {
						const lostReasonId = this.getNodeParameter('lostReasonId', i) as string;
						const name = this.getNodeParameter('nameUpdate', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						responseData = await alzeApiRequest.call(this, 'PUT', `/loss-reasons/${lostReasonId}`, body);
						responseData = responseData.data;
					} else if (operation === 'patch') {
						const lostReasonId = this.getNodeParameter('lostReasonId', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { ...fields };
						if (fields.namePatch) {
							body.name = fields.namePatch;
							delete body.namePatch;
						}
						responseData = await alzeApiRequest.call(this, 'PATCH', `/loss-reasons/${lostReasonId}`, body);
						responseData = responseData.data;
					} else if (operation === 'list') {
						const q = this.getNodeParameter('q', i) as string;
						const sort = this.getNodeParameter('sort', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = { ...additionalFields };
						if (q) qs.q = q;
						if (sort) qs.sort = sort;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', '/loss-reasons', {}, qs);
					}
				}

				// ==========================================
				//                WON REASON
				// ==========================================
				else if (resource === 'wonReason') {
					if (operation === 'get') {
						const wonReasonId = this.getNodeParameter('wonReasonId', i) as string;
						responseData = await alzeApiRequest.call(this, 'GET', `/win-reasons/${wonReasonId}`);
						responseData = responseData.data;
					} else if (operation === 'delete') {
						const wonReasonId = this.getNodeParameter('wonReasonId', i) as string;
						responseData = await alzeApiRequest.call(this, 'DELETE', `/win-reasons/${wonReasonId}`);
						responseData = responseData.data;
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						responseData = await alzeApiRequest.call(this, 'POST', '/win-reasons', body);
						responseData = responseData.data;
					} else if (operation === 'update') {
						const wonReasonId = this.getNodeParameter('wonReasonId', i) as string;
						const name = this.getNodeParameter('nameUpdate', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						responseData = await alzeApiRequest.call(this, 'PUT', `/win-reasons/${wonReasonId}`, body);
						responseData = responseData.data;
					} else if (operation === 'patch') {
						const wonReasonId = this.getNodeParameter('wonReasonId', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { ...fields };
						if (fields.namePatch) {
							body.name = fields.namePatch;
							delete body.namePatch;
						}
						responseData = await alzeApiRequest.call(this, 'PATCH', `/win-reasons/${wonReasonId}`, body);
						responseData = responseData.data;
					} else if (operation === 'list') {
						const q = this.getNodeParameter('q', i) as string;
						const sort = this.getNodeParameter('sort', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = { ...additionalFields };
						if (q) qs.q = q;
						if (sort) qs.sort = sort;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', '/win-reasons', {}, qs);
					}
				}

				// ==========================================
				//                  USER
				// ==========================================
				else if (resource === 'user') {
					if (operation === 'get') {
						const userId = this.getNodeParameter('userId', i) as string;
						responseData = await alzeApiRequest.call(this, 'GET', `/users/${userId}`);
						responseData = responseData.data;
					} else if (operation === 'getMe') {
						responseData = await alzeApiRequest.call(this, 'GET', '/users/me');
						responseData = responseData.data;
					} else if (operation === 'list') {
						const q = this.getNodeParameter('q', i) as string;
						const sort = this.getNodeParameter('sort', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = { ...additionalFields };
						if (q) qs.q = q;
						if (sort) qs.sort = sort;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', '/users', {}, qs);
					}
				}

				const executionData = this.helpers.returnJsonArray(responseData);
				returnData.push(...executionData);

			} catch (error) {
				if (this.continueOnFail()) {
					const executionData = this.helpers.returnJsonArray({ error: error.message });
					returnData.push(...executionData);
				} else {
					// eslint-disable-next-line @n8n/community-nodes/require-node-api-error
					throw error;
				}
			}
		}

		return [returnData];
	}
}
