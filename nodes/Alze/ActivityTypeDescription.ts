import { INodeProperties } from 'n8n-workflow';

export const activityTypeOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['activityType'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new activity type',
				action: 'Create a activity type',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a activity type',
				action: 'Delete a activity type',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of a activity type',
				action: 'Get a activity type',
			},
			{
				name: 'Get Many',
				value: 'list',
				description: 'List activity types',
				action: 'Get many activity types',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a activity type (clears omitted fields)',
				action: 'Update a activity type',
			},
			{
				name: 'Update Partial',
				value: 'patch',
				description: 'Update a activity type partially (incremental edit)',
				action: 'Update partial activity type',
			},
		],
		default: 'list',
	},
];

export const activityTypeFields: INodeProperties[] = [
	// ----------------------------------
	//         activityType: get / delete / update / patch
	// ----------------------------------
	{
		displayName: 'Activity Type ID',
		name: 'activityTypeId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['activityType'],
				operation: ['get', 'delete', 'update', 'patch'],
			},
		},
		description: 'The ID of the activity type',
	},

	// ----------------------------------
	//         activityType: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['activityType'],
				operation: ['create'],
			},
		},
		description: 'Name/title of the activity type',
	},

	// ----------------------------------
	//         activityType: update
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'nameUpdate',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['activityType'],
				operation: ['update'],
			},
		},
		description: 'Name/title of the activity type',
	},

	// ----------------------------------
	//         activityType: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: ['list'],
				resource: ['activityType'],
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
				resource: ['activityType'],
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
				resource: ['activityType'],
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
				resource: ['activityType'],
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
				resource: ['activityType'],
				operation: ['list'],
			},
		},
		options: [],
	},

	// ----------------------------------
	//         activityType: create / update / patch options
	// ----------------------------------
	{
		displayName: 'Fields to Set',
		name: 'fieldsToSet',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['activityType'],
				operation: ['create', 'update', 'patch'],
			},
		},
		options: [
			{
				displayName: 'Is Default',
				name: 'is_default',
				type: 'boolean',
				default: false,
				description: 'Whether this is the default option',
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
				description: 'Name of the activity type',
			},
		],
	},
];
