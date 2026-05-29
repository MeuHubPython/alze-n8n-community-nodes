import { INodeProperties } from 'n8n-workflow';

export const itemCategoryOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['itemCategory'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new item category',
				action: 'Create a item category',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a item category',
				action: 'Delete a item category',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of a item category',
				action: 'Get a item category',
			},
			{
				name: 'Get Many',
				value: 'list',
				description: 'List item categorys',
				action: 'Get many item categorys',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a item category (clears omitted fields)',
				action: 'Update a item category',
			},
			{
				name: 'Update Partial',
				value: 'patch',
				description: 'Update a item category partially (incremental edit)',
				action: 'Update partial item category',
			},
		],
		default: 'list',
	},
];

export const itemCategoryFields: INodeProperties[] = [
	// ----------------------------------
	//         itemCategory: get / delete / update / patch
	// ----------------------------------
	{
		displayName: 'Item Category ID',
		name: 'itemCategoryId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['itemCategory'],
				operation: ['get', 'delete', 'update', 'patch'],
			},
		},
		description: 'The ID of the item category',
	},

	// ----------------------------------
	//         itemCategory: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['itemCategory'],
				operation: ['create'],
			},
		},
		description: 'Name/title of the item category',
	},

	// ----------------------------------
	//         itemCategory: update
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'nameUpdate',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['itemCategory'],
				operation: ['update'],
			},
		},
		description: 'Name/title of the item category',
	},

	// ----------------------------------
	//         itemCategory: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: ['list'],
				resource: ['itemCategory'],
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
				resource: ['itemCategory'],
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
				resource: ['itemCategory'],
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
				resource: ['itemCategory'],
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
				resource: ['itemCategory'],
				operation: ['list'],
			},
		},
		options: [],
	},

	// ----------------------------------
	//         itemCategory: create / update / patch options
	// ----------------------------------
	{
		displayName: 'Fields to Set',
		name: 'fieldsToSet',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['itemCategory'],
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
				description: 'Name of the item category',
			},
		],
	},
];
