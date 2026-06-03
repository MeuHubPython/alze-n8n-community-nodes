import { INodeProperties } from 'n8n-workflow';

export const originGroupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['originGroup'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new origin group',
				action: 'Create a origin group',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a origin group',
				action: 'Delete a origin group',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of a origin group',
				action: 'Get a origin group',
			},
			{
				name: 'Get Many',
				value: 'list',
				description: 'List origin groups',
				action: 'Get many origin groups',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a origin group (clears omitted fields)',
				action: 'Update a origin group',
			},
			{
				name: 'Update Partial',
				value: 'patch',
				description: 'Update a origin group partially (incremental edit)',
				action: 'Update partial origin group',
			},
		],
		default: 'list',
	},
];

export const originGroupFields: INodeProperties[] = [
	// ----------------------------------
	//         originGroup: get / delete / update / patch
	// ----------------------------------
	{
		displayName: 'Origin Group ID',
		name: 'originGroupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['originGroup'],
				operation: ['get', 'delete', 'update', 'patch'],
			},
		},
		description: 'The ID of the origin group',
	},

	// ----------------------------------
	//         originGroup: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['originGroup'],
				operation: ['create'],
			},
		},
		description: 'Name/title of the origin group',
	},

	// ----------------------------------
	//         originGroup: update
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'nameUpdate',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['originGroup'],
				operation: ['update'],
			},
		},
		description: 'Name/title of the origin group',
	},

	// ----------------------------------
	//         originGroup: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: ['list'],
				resource: ['originGroup'],
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
				resource: ['originGroup'],
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
				resource: ['originGroup'],
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
				resource: ['originGroup'],
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
				resource: ['originGroup'],
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
	//         originGroup: create / update / patch options
	// ----------------------------------
	{
		displayName: 'Fields to Set',
		name: 'fieldsToSet',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['originGroup'],
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
				description: 'Name of the origin group',
			},
		],
	},
];
