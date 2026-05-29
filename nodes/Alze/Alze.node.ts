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

import { metaOperations, metaFields } from './MetaDescription';
import { customFieldOperations, customFieldFields } from './CustomFieldDescription';
import { leadOriginOperations, leadOriginFields } from './LeadOriginDescription';
import { originGroupOperations, originGroupFields } from './OriginGroupDescription';
import { channelOperations, channelFields } from './ChannelDescription';
import { itemCategoryOperations, itemCategoryFields } from './ItemCategoryDescription';
import { activityTypeOperations, activityTypeFields } from './ActivityTypeDescription';
import { tagOperations, tagFields } from './TagDescription';
import { distributionRuleOperations, distributionRuleFields } from './DistributionRuleDescription';
import { webhookOperations, webhookFields } from './WebhookDescription';

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
					{ name: 'Activity Type', value: 'activityType' },
					{ name: 'Channel', value: 'channel' },
					{ name: 'Contact', value: 'contact' },
					{ name: 'Custom Field', value: 'customField' },
					{ name: 'Deal', value: 'deal' },
					{ name: 'Distribution Rule', value: 'distributionRule' },
					{ name: 'Item Category', value: 'itemCategory' },
					{ name: 'Lead Origin', value: 'leadOrigin' },
					{ name: 'Lost Reason', value: 'lostReason' },
					{ name: 'Meta', value: 'meta' },
					{ name: 'Organization', value: 'organization' },
					{ name: 'Origin Group', value: 'originGroup' },
					{ name: 'Pipeline', value: 'pipeline' },
					{ name: 'Product', value: 'product' },
					{ name: 'Stage', value: 'stage' },
					{ name: 'Tag', value: 'tag' },
					{ name: 'User', value: 'user' },
					{ name: 'Webhook', value: 'webhook' },
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
			...metaOperations,
			...metaFields,
			...customFieldOperations,
			...customFieldFields,
			...leadOriginOperations,
			...leadOriginFields,
			...originGroupOperations,
			...originGroupFields,
			...channelOperations,
			...channelFields,
			...itemCategoryOperations,
			...itemCategoryFields,
			...activityTypeOperations,
			...activityTypeFields,
			...tagOperations,
			...tagFields,
			...distributionRuleOperations,
			...distributionRuleFields,
			...webhookOperations,
			...webhookFields,
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
					} else if (operation === 'listDeals') {
						const contactId = this.getNodeParameter('contactId', i) as string;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', `/contacts/${contactId}/deals`);
					} else if (operation === 'listActivities') {
						const contactId = this.getNodeParameter('contactId', i) as string;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', `/contacts/${contactId}/activities`);
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
					} else if (operation === 'listContacts') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', `/organizations/${organizationId}/contacts`);
					} else if (operation === 'listDeals') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', `/organizations/${organizationId}/deals`);
					} else if (operation === 'listActivities') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', `/organizations/${organizationId}/activities`);
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
						const value = this.getNodeParameter('value', i) as number;
						const body: IDataObject = {};
						if (wonAt) body.won_at = wonAt;
						if (wonReasonId) body.won_reason_id = Number(wonReasonId);
						if (value !== undefined) body.value = value;
						responseData = await alzeApiRequest.call(this, 'PATCH', `/deals/${dealId}/win`, body);
						responseData = responseData.data;
					} else if (operation === 'lose') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						const lostAt = this.getNodeParameter('lostAt', i) as string;
						const lostReasonId = this.getNodeParameter('lostReasonId', i) as string;
						const body: IDataObject = {};
						if (lostAt) body.lost_at = lostAt;
						if (lostReasonId) body.lost_reason_id = Number(lostReasonId);
						responseData = await alzeApiRequest.call(this, 'PATCH', `/deals/${dealId}/lose`, body);
						responseData = responseData.data;
					} else if (operation === 'stage') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						const stageId = this.getNodeParameter('stageIdMove', i) as string;
						const movedAt = this.getNodeParameter('movedAt', i) as string;
						const body: IDataObject = { stage_id: stageId };
						if (movedAt) body.moved_at = movedAt;
						responseData = await alzeApiRequest.call(this, 'PATCH', `/deals/${dealId}/stage`, body);
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
					} else if (operation === 'listContacts') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', `/deals/${dealId}/contacts`);
					} else if (operation === 'addContact') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						const personId = this.getNodeParameter('personIdAdd', i) as string;
						responseData = await alzeApiRequest.call(this, 'POST', `/deals/${dealId}/contacts`, { person_id: personId });
						responseData = responseData.data;
					} else if (operation === 'removeContact') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						const personId = this.getNodeParameter('personIdRemove', i) as string;
						responseData = await alzeApiRequest.call(this, 'DELETE', `/deals/${dealId}/contacts/${personId}`);
						responseData = responseData.data;
					} else if (operation === 'listItems') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', `/deals/${dealId}/items`);
					} else if (operation === 'addItem') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						const itemId = this.getNodeParameter('itemIdAdd', i) as number;
						const quantity = this.getNodeParameter('quantity', i) as number;
						const price = this.getNodeParameter('price', i) as number;
						responseData = await alzeApiRequest.call(this, 'POST', `/deals/${dealId}/items`, { item_id: itemId, quantity, price });
						responseData = responseData.data;
					} else if (operation === 'listNotes') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', `/deals/${dealId}/notes`);
					} else if (operation === 'addNote') {
						const dealId = this.getNodeParameter('dealId', i) as string;
						const content = this.getNodeParameter('content', i) as string;
						const pinned = this.getNodeParameter('pinned', i) as boolean;
						responseData = await alzeApiRequest.call(this, 'POST', `/deals/${dealId}/notes`, { content, pinned });
						responseData = responseData.data;
					} else if (operation === 'updateNote') {
						const noteId = this.getNodeParameter('noteId', i) as string;
						const content = this.getNodeParameter('content', i) as string;
						const pinned = this.getNodeParameter('pinned', i) as boolean;
						responseData = await alzeApiRequest.call(this, 'PATCH', `/deal-notes/${noteId}`, { content, pinned });
						responseData = responseData.data;
					} else if (operation === 'deleteNote') {
						const noteId = this.getNodeParameter('noteId', i) as string;
						responseData = await alzeApiRequest.call(this, 'DELETE', `/deal-notes/${noteId}`);
						responseData = responseData.data;
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
						responseData = await alzeApiRequest.call(this, 'PATCH', `/activities/${activityId}/complete`, {});
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
						const type = this.getNodeParameter('type', i) as string;
						const price = this.getNodeParameter('price', i) as number;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, type, price, ...fields };
						responseData = await alzeApiRequest.call(this, 'POST', '/items', body);
						responseData = responseData.data;
					} else if (operation === 'update') {
						const productId = this.getNodeParameter('productId', i) as string;
						const name = this.getNodeParameter('nameUpdate', i) as string;
						const type = this.getNodeParameter('typeUpdate', i) as string;
						const price = this.getNodeParameter('priceUpdate', i) as number;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, type, price, ...fields };
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
						if (fields.typePatch) {
							body.type = fields.typePatch;
							delete body.typePatch;
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

				
				// ==========================================
				//                   META
				// ==========================================
				else if (resource === 'meta') {
					if (operation === 'me') {
						responseData = await alzeApiRequest.call(this, 'GET', '/me');
						responseData = responseData.data;
					} else if (operation === 'ping') {
						responseData = await alzeApiRequest.call(this, 'GET', '/ping');
						responseData = responseData.data;
					}
				}

				// ==========================================
				//                CUSTOM FIELD
				// ==========================================
				else if (resource === 'customField') {
					if (operation === 'get') {
						const id = this.getNodeParameter('customFieldId', i) as string;
						responseData = await alzeApiRequest.call(this, 'GET', `/custom-fields/${id}`);
						responseData = responseData.data;
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('customFieldId', i) as string;
						responseData = await alzeApiRequest.call(this, 'DELETE', `/custom-fields/${id}`);
						responseData = responseData.data;
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						responseData = await alzeApiRequest.call(this, 'POST', '/custom-fields', body);
						responseData = responseData.data;
					} else if (operation === 'update') {
						const id = this.getNodeParameter('customFieldId', i) as string;
						const name = this.getNodeParameter('nameUpdate', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						responseData = await alzeApiRequest.call(this, 'PUT', `/custom-fields/${id}`, body);
						responseData = responseData.data;
					} else if (operation === 'patch') {
						const id = this.getNodeParameter('customFieldId', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { ...fields };
						if (fields.namePatch) {
							body.name = fields.namePatch;
							delete body.namePatch;
						}
						responseData = await alzeApiRequest.call(this, 'PATCH', `/custom-fields/${id}`, body);
						responseData = responseData.data;
					} else if (operation === 'list') {
						const q = this.getNodeParameter('q', i) as string;
						const sort = this.getNodeParameter('sort', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = { ...additionalFields };
						if (q) qs.q = q;
						if (sort) qs.sort = sort;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', '/custom-fields', {}, qs);
					}
				}

				// ==========================================
				//                LEAD ORIGIN
				// ==========================================
				else if (resource === 'leadOrigin') {
					if (operation === 'get') {
						const id = this.getNodeParameter('leadOriginId', i) as string;
						responseData = await alzeApiRequest.call(this, 'GET', `/lead-origins/${id}`);
						responseData = responseData.data;
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('leadOriginId', i) as string;
						responseData = await alzeApiRequest.call(this, 'DELETE', `/lead-origins/${id}`);
						responseData = responseData.data;
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						responseData = await alzeApiRequest.call(this, 'POST', '/lead-origins', body);
						responseData = responseData.data;
					} else if (operation === 'update') {
						const id = this.getNodeParameter('leadOriginId', i) as string;
						const name = this.getNodeParameter('nameUpdate', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						responseData = await alzeApiRequest.call(this, 'PUT', `/lead-origins/${id}`, body);
						responseData = responseData.data;
					} else if (operation === 'patch') {
						const id = this.getNodeParameter('leadOriginId', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { ...fields };
						if (fields.namePatch) {
							body.name = fields.namePatch;
							delete body.namePatch;
						}
						responseData = await alzeApiRequest.call(this, 'PATCH', `/lead-origins/${id}`, body);
						responseData = responseData.data;
					} else if (operation === 'list') {
						const q = this.getNodeParameter('q', i) as string;
						const sort = this.getNodeParameter('sort', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = { ...additionalFields };
						if (q) qs.q = q;
						if (sort) qs.sort = sort;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', '/lead-origins', {}, qs);
					}
				}

				// ==========================================
				//                ORIGIN GROUP
				// ==========================================
				else if (resource === 'originGroup') {
					if (operation === 'get') {
						const id = this.getNodeParameter('originGroupId', i) as string;
						responseData = await alzeApiRequest.call(this, 'GET', `/origin-groups/${id}`);
						responseData = responseData.data;
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('originGroupId', i) as string;
						responseData = await alzeApiRequest.call(this, 'DELETE', `/origin-groups/${id}`);
						responseData = responseData.data;
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						responseData = await alzeApiRequest.call(this, 'POST', '/origin-groups', body);
						responseData = responseData.data;
					} else if (operation === 'update') {
						const id = this.getNodeParameter('originGroupId', i) as string;
						const name = this.getNodeParameter('nameUpdate', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						responseData = await alzeApiRequest.call(this, 'PUT', `/origin-groups/${id}`, body);
						responseData = responseData.data;
					} else if (operation === 'patch') {
						const id = this.getNodeParameter('originGroupId', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { ...fields };
						if (fields.namePatch) {
							body.name = fields.namePatch;
							delete body.namePatch;
						}
						responseData = await alzeApiRequest.call(this, 'PATCH', `/origin-groups/${id}`, body);
						responseData = responseData.data;
					} else if (operation === 'list') {
						const q = this.getNodeParameter('q', i) as string;
						const sort = this.getNodeParameter('sort', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = { ...additionalFields };
						if (q) qs.q = q;
						if (sort) qs.sort = sort;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', '/origin-groups', {}, qs);
					}
				}

				// ==========================================
				//                CHANNEL
				// ==========================================
				else if (resource === 'channel') {
					if (operation === 'get') {
						const id = this.getNodeParameter('channelId', i) as string;
						responseData = await alzeApiRequest.call(this, 'GET', `/channels/${id}`);
						responseData = responseData.data;
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('channelId', i) as string;
						responseData = await alzeApiRequest.call(this, 'DELETE', `/channels/${id}`);
						responseData = responseData.data;
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						responseData = await alzeApiRequest.call(this, 'POST', '/channels', body);
						responseData = responseData.data;
					} else if (operation === 'update') {
						const id = this.getNodeParameter('channelId', i) as string;
						const name = this.getNodeParameter('nameUpdate', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						responseData = await alzeApiRequest.call(this, 'PUT', `/channels/${id}`, body);
						responseData = responseData.data;
					} else if (operation === 'patch') {
						const id = this.getNodeParameter('channelId', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { ...fields };
						if (fields.namePatch) {
							body.name = fields.namePatch;
							delete body.namePatch;
						}
						responseData = await alzeApiRequest.call(this, 'PATCH', `/channels/${id}`, body);
						responseData = responseData.data;
					} else if (operation === 'list') {
						const q = this.getNodeParameter('q', i) as string;
						const sort = this.getNodeParameter('sort', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = { ...additionalFields };
						if (q) qs.q = q;
						if (sort) qs.sort = sort;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', '/channels', {}, qs);
					}
				}

				// ==========================================
				//                ITEM CATEGORY
				// ==========================================
				else if (resource === 'itemCategory') {
					if (operation === 'get') {
						const id = this.getNodeParameter('itemCategoryId', i) as string;
						responseData = await alzeApiRequest.call(this, 'GET', `/item-categories/${id}`);
						responseData = responseData.data;
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('itemCategoryId', i) as string;
						responseData = await alzeApiRequest.call(this, 'DELETE', `/item-categories/${id}`);
						responseData = responseData.data;
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						responseData = await alzeApiRequest.call(this, 'POST', '/item-categories', body);
						responseData = responseData.data;
					} else if (operation === 'update') {
						const id = this.getNodeParameter('itemCategoryId', i) as string;
						const name = this.getNodeParameter('nameUpdate', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						responseData = await alzeApiRequest.call(this, 'PUT', `/item-categories/${id}`, body);
						responseData = responseData.data;
					} else if (operation === 'patch') {
						const id = this.getNodeParameter('itemCategoryId', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { ...fields };
						if (fields.namePatch) {
							body.name = fields.namePatch;
							delete body.namePatch;
						}
						responseData = await alzeApiRequest.call(this, 'PATCH', `/item-categories/${id}`, body);
						responseData = responseData.data;
					} else if (operation === 'list') {
						const q = this.getNodeParameter('q', i) as string;
						const sort = this.getNodeParameter('sort', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = { ...additionalFields };
						if (q) qs.q = q;
						if (sort) qs.sort = sort;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', '/item-categories', {}, qs);
					}
				}

				// ==========================================
				//                ACTIVITY TYPE
				// ==========================================
				else if (resource === 'activityType') {
					if (operation === 'get') {
						const id = this.getNodeParameter('activityTypeId', i) as string;
						responseData = await alzeApiRequest.call(this, 'GET', `/activity-types/${id}`);
						responseData = responseData.data;
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('activityTypeId', i) as string;
						responseData = await alzeApiRequest.call(this, 'DELETE', `/activity-types/${id}`);
						responseData = responseData.data;
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						responseData = await alzeApiRequest.call(this, 'POST', '/activity-types', body);
						responseData = responseData.data;
					} else if (operation === 'update') {
						const id = this.getNodeParameter('activityTypeId', i) as string;
						const name = this.getNodeParameter('nameUpdate', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						responseData = await alzeApiRequest.call(this, 'PUT', `/activity-types/${id}`, body);
						responseData = responseData.data;
					} else if (operation === 'patch') {
						const id = this.getNodeParameter('activityTypeId', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { ...fields };
						if (fields.namePatch) {
							body.name = fields.namePatch;
							delete body.namePatch;
						}
						responseData = await alzeApiRequest.call(this, 'PATCH', `/activity-types/${id}`, body);
						responseData = responseData.data;
					} else if (operation === 'list') {
						const q = this.getNodeParameter('q', i) as string;
						const sort = this.getNodeParameter('sort', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = { ...additionalFields };
						if (q) qs.q = q;
						if (sort) qs.sort = sort;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', '/activity-types', {}, qs);
					}
				}

				// ==========================================
				//                TAG
				// ==========================================
				else if (resource === 'tag') {
					if (operation === 'get') {
						const id = this.getNodeParameter('tagId', i) as string;
						responseData = await alzeApiRequest.call(this, 'GET', `/tags/${id}`);
						responseData = responseData.data;
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('tagId', i) as string;
						responseData = await alzeApiRequest.call(this, 'DELETE', `/tags/${id}`);
						responseData = responseData.data;
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						responseData = await alzeApiRequest.call(this, 'POST', '/tags', body);
						responseData = responseData.data;
					} else if (operation === 'update') {
						const id = this.getNodeParameter('tagId', i) as string;
						const name = this.getNodeParameter('nameUpdate', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						responseData = await alzeApiRequest.call(this, 'PUT', `/tags/${id}`, body);
						responseData = responseData.data;
					} else if (operation === 'patch') {
						const id = this.getNodeParameter('tagId', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { ...fields };
						if (fields.namePatch) {
							body.name = fields.namePatch;
							delete body.namePatch;
						}
						responseData = await alzeApiRequest.call(this, 'PATCH', `/tags/${id}`, body);
						responseData = responseData.data;
					} else if (operation === 'list') {
						const q = this.getNodeParameter('q', i) as string;
						const sort = this.getNodeParameter('sort', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = { ...additionalFields };
						if (q) qs.q = q;
						if (sort) qs.sort = sort;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', '/tags', {}, qs);
					}
				}

				// ==========================================
				//                DISTRIBUTION RULE
				// ==========================================
				else if (resource === 'distributionRule') {
					if (operation === 'get') {
						const id = this.getNodeParameter('distributionRuleId', i) as string;
						responseData = await alzeApiRequest.call(this, 'GET', `/distribution-rules/${id}`);
						responseData = responseData.data;
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('distributionRuleId', i) as string;
						responseData = await alzeApiRequest.call(this, 'DELETE', `/distribution-rules/${id}`);
						responseData = responseData.data;
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						responseData = await alzeApiRequest.call(this, 'POST', '/distribution-rules', body);
						responseData = responseData.data;
					} else if (operation === 'update') {
						const id = this.getNodeParameter('distributionRuleId', i) as string;
						const name = this.getNodeParameter('nameUpdate', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						responseData = await alzeApiRequest.call(this, 'PUT', `/distribution-rules/${id}`, body);
						responseData = responseData.data;
					} else if (operation === 'patch') {
						const id = this.getNodeParameter('distributionRuleId', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { ...fields };
						if (fields.namePatch) {
							body.name = fields.namePatch;
							delete body.namePatch;
						}
						responseData = await alzeApiRequest.call(this, 'PATCH', `/distribution-rules/${id}`, body);
						responseData = responseData.data;
					} else if (operation === 'list') {
						const q = this.getNodeParameter('q', i) as string;
						const sort = this.getNodeParameter('sort', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = { ...additionalFields };
						if (q) qs.q = q;
						if (sort) qs.sort = sort;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', '/distribution-rules', {}, qs);
					}
				}

				// ==========================================
				//                WEBHOOK
				// ==========================================
				else if (resource === 'webhook') {
					if (operation === 'get') {
						const id = this.getNodeParameter('webhookId', i) as string;
						responseData = await alzeApiRequest.call(this, 'GET', `/webhooks/${id}`);
						responseData = responseData.data;
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('webhookId', i) as string;
						responseData = await alzeApiRequest.call(this, 'DELETE', `/webhooks/${id}`);
						responseData = responseData.data;
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						responseData = await alzeApiRequest.call(this, 'POST', '/webhooks', body);
						responseData = responseData.data;
					} else if (operation === 'update') {
						const id = this.getNodeParameter('webhookId', i) as string;
						const name = this.getNodeParameter('nameUpdate', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { name, ...fields };
						responseData = await alzeApiRequest.call(this, 'PUT', `/webhooks/${id}`, body);
						responseData = responseData.data;
					} else if (operation === 'patch') {
						const id = this.getNodeParameter('webhookId', i) as string;
						const fields = this.getNodeParameter('fieldsToSet', i) as IDataObject;
						const body: IDataObject = { ...fields };
						if (fields.namePatch) {
							body.name = fields.namePatch;
							delete body.namePatch;
						}
						responseData = await alzeApiRequest.call(this, 'PATCH', `/webhooks/${id}`, body);
						responseData = responseData.data;
					} else if (operation === 'list') {
						const q = this.getNodeParameter('q', i) as string;
						const sort = this.getNodeParameter('sort', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = { ...additionalFields };
						if (q) qs.q = q;
						if (sort) qs.sort = sort;
						responseData = await alzeApiRequestAllItems.call(this, 'GET', '/webhooks', {}, qs);
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
