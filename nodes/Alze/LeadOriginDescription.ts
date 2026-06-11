import { INodeProperties } from 'n8n-workflow';

export const leadOriginOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['leadOrigin'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new lead origin',
				action: 'Create a lead origin',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a lead origin',
				action: 'Delete a lead origin',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of a lead origin',
				action: 'Get a lead origin',
			},
			{
				name: 'Get Many',
				value: 'list',
				description: 'List lead origins',
				action: 'Get many lead origins',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a lead origin (clears omitted fields)',
				action: 'Update a lead origin',
			},
			{
				name: 'Update Partial',
				value: 'patch',
				description: 'Update a lead origin partially (incremental edit)',
				action: 'Update partial lead origin',
			},
		],
		default: 'list',
	},
];

export const leadOriginFields: INodeProperties[] = [
	// ----------------------------------
	//         leadOrigin: get / delete / update / patch
	// ----------------------------------
	{
		displayName: 'Lead Origin ID',
		name: 'leadOriginId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['leadOrigin'],
				operation: ['get', 'delete', 'update', 'patch'],
			},
		},
		description: 'The ID of the lead origin',
	},

	// ----------------------------------
	//         leadOrigin: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['leadOrigin'],
				operation: ['create'],
			},
		},
		description: 'Name/title of the lead origin',
	},

	// ----------------------------------
	//         leadOrigin: update
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'nameUpdate',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['leadOrigin'],
				operation: ['update'],
			},
		},
		description: 'Name/title of the lead origin',
	},

	// ----------------------------------
	//         leadOrigin: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: ['list'],
				resource: ['leadOrigin'],
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
				resource: ['leadOrigin'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
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
				resource: ['leadOrigin'],
			},
		},
		default: '',
		description: 'Search string',
	},
	{
		displayName: 'Order By',
		name: 'orderBy',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['leadOrigin'],
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
				resource: ['leadOrigin'],
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
				resource: ['leadOrigin'],
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
			{
				displayName: 'Group ID',
				name: 'group_id',
				type: 'string',
				default: '',
				description: 'Filter by origin group ID',
			},
		],
	},

	// ----------------------------------
	//         leadOrigin: create / update / patch options
	// ----------------------------------
	{
		displayName: 'Fields to Set',
		name: 'fieldsToSet',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['leadOrigin'],
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
				description: 'Name of the lead origin',
			},
			{
				displayName: 'Origin Group ID',
				name: 'group_id',
				type: 'string',
				default: '',
				description: 'ID of the origin group this lead origin belongs to',
			},
		],
	},
];
