import { INodeProperties } from 'n8n-workflow';

export const sourceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['source'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new source',
				action: 'Create a source',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a source',
				action: 'Delete a source',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of a source',
				action: 'Get a source',
			},
			{
				name: 'Get Many',
				value: 'list',
				description: 'List sources',
				action: 'Get many sources',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a source (clears omitted fields)',
				action: 'Update a source',
			},
			{
				name: 'Update Partial',
				value: 'patch',
				description: 'Update a source partially (incremental edit)',
				action: 'Update partial source',
			},
		],
		default: 'list',
	},
];

export const sourceFields: INodeProperties[] = [
	// ----------------------------------
	//         source: get / delete / update / patch
	// ----------------------------------
	{
		displayName: 'Source ID',
		name: 'sourceId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['source'],
				operation: ['get', 'delete', 'update', 'patch'],
			},
		},
		description: 'The ID of the source',
	},

	// ----------------------------------
	//         source: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['source'],
				operation: ['create'],
			},
		},
		description: 'Name/title of the source',
	},

	// ----------------------------------
	//         source: update
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'nameUpdate',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['source'],
				operation: ['update'],
			},
		},
		description: 'Name/title of the source',
	},

	// ----------------------------------
	//         source: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: ['list'],
				resource: ['source'],
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
				resource: ['source'],
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
				resource: ['source'],
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
				resource: ['source'],
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
				resource: ['source'],
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
	//         source: create / update / patch options
	// ----------------------------------
	{
		displayName: 'Fields to Set',
		name: 'fieldsToSet',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['source'],
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
				displayName: 'Name',
				name: 'namePatch',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						'/operation': ['patch'],
					},
				},
				description: 'Name of the source',
			},
		],
	},
];
