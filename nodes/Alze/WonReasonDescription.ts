import { INodeProperties } from 'n8n-workflow';

export const wonReasonOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['wonReason'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new won reason',
				action: 'Create a won reason',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a won reason',
				action: 'Delete a won reason',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of a won reason',
				action: 'Get a won reason',
			},
			{
				name: 'Get Many',
				value: 'list',
				description: 'List won reasons',
				action: 'Get many won reasons',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a won reason (clears omitted fields)',
				action: 'Update a won reason',
			},
			{
				name: 'Update Partial',
				value: 'patch',
				description: 'Update a won reason partially (incremental edit)',
				action: 'Update partial won reason',
			},
		],
		default: 'list',
	},
];

export const wonReasonFields: INodeProperties[] = [
	// ----------------------------------
	//         wonReason: get / delete / update / patch
	// ----------------------------------
	{
		displayName: 'Won Reason ID',
		name: 'wonReasonId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['wonReason'],
				operation: ['get', 'delete', 'update', 'patch'],
			},
		},
		description: 'The ID of the won reason',
	},

	// ----------------------------------
	//         wonReason: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['wonReason'],
				operation: ['create'],
			},
		},
		description: 'Name/description of the won reason',
	},

	// ----------------------------------
	//         wonReason: update
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'nameUpdate',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['wonReason'],
				operation: ['update'],
			},
		},
		description: 'Name/description of the won reason',
	},

	// ----------------------------------
	//         wonReason: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['wonReason'],
				operation: ['list'],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
		displayOptions: {
			show: {
				resource: ['wonReason'],
				operation: ['list'],
				returnAll: [false],
			},
		},
	},
	{
		displayName: 'Search Query',
		name: 'q',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['wonReason'],
				operation: ['list'],
			},
		},
		description: 'Text search in won reason names',
	},
	{
		displayName: 'Order By',
		name: 'orderBy',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['wonReason'],
				operation: ['list'],
			},
		},
		description: 'Field to sort by. E.g. created_at',
	},
	{
		displayName: 'Order Direction',
		name: 'orderDirection',
		type: 'options',
		options: [
			{ name: 'Ascending', value: 'asc' },
			{ name: 'Descending', value: 'desc' },
		],
		default: 'desc',
		displayOptions: {
			show: {
				resource: ['wonReason'],
				operation: ['list'],
			},
		},
		description: 'Sort direction (asc or desc)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['wonReason'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'External Sync Code',
				name: 'external_sync_code',
				type: 'string',
				default: '',
				description: 'Filter by external synchronization code',
			},
		],
	},

	// ----------------------------------
	//         wonReason: create / update / patch options
	// ----------------------------------
	{
		displayName: 'Fields to Set',
		name: 'fieldsToSet',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['wonReason'],
				operation: ['create', 'update', 'patch'],
			},
		},
		options: [
			{
				displayName: 'External Sync Code',
				name: 'external_sync_code',
				type: 'string',
				default: '',
				description: 'External synchronization code for integration',
			},
			{
				displayName: 'Is Default',
				name: 'is_default',
				type: 'boolean',
				default: false,
				description: 'Whether this reason is the default reason',
			},
			{
				displayName: 'Name',
				name: 'namePatch',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						'/operation': ['patch'],
					},
				},
				description: 'Name/description of the won reason',
			},
	// Removed position field
		],
	},
];
