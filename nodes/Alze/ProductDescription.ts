import { INodeProperties } from 'n8n-workflow';

export const productOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['product'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new product',
				action: 'Create a product',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a product',
				action: 'Delete a product',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of a product',
				action: 'Get a product',
			},
			{
				name: 'Get Many',
				value: 'list',
				description: 'List products',
				action: 'Get many products',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a product (clears omitted fields)',
				action: 'Update a product',
			},
			{
				name: 'Update Partial',
				value: 'patch',
				description: 'Update a product partially (incremental edit)',
				action: 'Update partial product',
			},
		],
		default: 'list',
	},
];

export const productFields: INodeProperties[] = [
	// ----------------------------------
	//         product: get / delete / update / patch
	// ----------------------------------
	{
		displayName: 'Product ID',
		name: 'productId',
		type: 'number',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['get', 'delete', 'update', 'patch'],
			},
		},
		description: 'The ID of the product / item',
	},

	// ----------------------------------
	//         product: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['create'],
			},
		},
		description: 'Name of the product',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		options: [
			{ name: 'Product', value: 'product' },
			{ name: 'Service', value: 'service' },
		],
		required: true,
		default: 'product',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['create'],
			},
		},
		description: 'Type of the item (product or service)',
	},


	// ----------------------------------
	//         product: update
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'nameUpdate',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['update'],
			},
		},
		description: 'Name of the product',
	},
	{
		displayName: 'Type',
		name: 'typeUpdate',
		type: 'options',
		options: [
			{ name: 'Product', value: 'product' },
			{ name: 'Service', value: 'service' },
		],
		required: true,
		default: 'product',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['update'],
			},
		},
		description: 'Type of the item (product or service)',
	},


	// ----------------------------------
	//         product: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['product'],
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
				resource: ['product'],
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
				resource: ['product'],
				operation: ['list'],
			},
		},
		description: 'Text search in name or description',
	},
	{
		displayName: 'Order By',
		name: 'orderBy',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['product'],
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
				resource: ['product'],
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
				resource: ['product'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Category ID',
				name: 'category_id',
				type: 'number',
				default: 0,
				description: 'Filter by category ID',
			},
			{
				displayName: 'External Sync Code',
				name: 'external_sync_code',
				type: 'string',
				default: '',
				description: 'Filter by external synchronization code',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Product', value: 'product' },
					{ name: 'Service', value: 'service' },
				],
				default: 'product',
				description: 'Filter by item type (product or service)',
			},
		],
	},

	// ----------------------------------
	//         product: create / update / patch options
	// ----------------------------------
	{
		displayName: 'Fields to Set',
		name: 'fieldsToSet',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['create', 'update', 'patch'],
			},
		},
		options: [
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: 'BRL',
				description: 'Currency code in ISO 4217, default: BRL',
			},
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
				description: 'Name of the product',
			},
			{
				displayName: 'Price',
				name: 'price',
				type: 'number',
				typeOptions: {
					numberPrecision: 2,
				},
				default: 0,
				description: 'Unit price of the product',
			},
			{
				displayName: 'Type',
				name: 'typePatch',
				type: 'options',
				options: [
					{ name: 'Product', value: 'product' },
					{ name: 'Service', value: 'service' },
				],
				default: 'product',
				displayOptions: {
					show: {
						'/operation': ['patch'],
					},
				},
				description: 'Type of the item',
			},
		],
	},
];
