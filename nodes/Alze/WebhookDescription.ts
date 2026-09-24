import { INodeProperties } from 'n8n-workflow';

export const webhookOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new webhook',
				action: 'Create a webhook',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a webhook',
				action: 'Delete a webhook',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of a webhook',
				action: 'Get a webhook',
			},
			{
				name: 'Get Many',
				value: 'list',
				description: 'List webhooks',
				action: 'Get many webhooks',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a webhook (clears omitted fields)',
				action: 'Update a webhook',
			},
		],
		default: 'list',
	},
];

export const webhookFields: INodeProperties[] = [
	// ----------------------------------
	//         webhook: get / delete / update
	// ----------------------------------
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['get', 'delete', 'update'],
			},
		},
		description: 'The ID of the webhook',
	},

	// ----------------------------------
	//         webhook: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create'],
			},
		},
		description: 'Name/title of the webhook',
	},

	// ----------------------------------
	//         webhook: update
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'nameUpdate',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['update'],
			},
		},
		description: 'Name/title of the webhook',
	},

	{
		displayName: 'Target URL',
		name: 'targetUrl',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create', 'update'],
			},
		},
		description: 'The HTTPS URL that will receive the webhook payloads',
	},
	{
		displayName: 'Events',
		name: 'events',
		type: 'multiOptions',
		required: true,
		options: [
			{ name: 'Activity Completed', value: 'activity.completed' },
			{ name: 'Deal Created', value: 'deal.created' },
			{ name: 'Deal Lost', value: 'deal.lost' },
			{ name: 'Deal Won', value: 'deal.won' },
		],
		default: [],
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create', 'update'],
			},
		},
		description: 'The list of events to trigger this webhook',
	},

	// ----------------------------------
	//         webhook: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: ['list'],
				resource: ['webhook'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				operation: ['list'],
				resource: ['webhook'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 500,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Search Query',
		name: 'q',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['list'],
				resource: ['webhook'],
			},
		},
		default: '',
		description: 'Search string',
	},
	{
		displayName: 'Sort',
		name: 'sort',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['list'],
				resource: ['webhook'],
			},
		},
		default: '',
		description: 'Sort logic (e.g. name:asc)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['list'],
			},
		},
		options: [],
	},

	// ----------------------------------
	//         webhook: create / update options
	// ----------------------------------
	{
		displayName: 'Fields to Set',
		name: 'fieldsToSet',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'A brief description of this webhook',
			},
			{
				displayName: 'Is Active',
				name: 'is_active',
				type: 'boolean',
				default: true,
				description: 'Whether the webhook is active',
			},
			{
				displayName: 'Secret',
				name: 'secret',
				type: 'string',
				default: '',
				typeOptions: {
					password: true,
				},
				description: 'HMAC signature secret for payload verification',
			},
		],
	},
];
