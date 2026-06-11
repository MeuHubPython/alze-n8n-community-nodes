import { INodeProperties } from 'n8n-workflow';

export const organizationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['organization'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new organization',
				action: 'Create an organization',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an organization',
				action: 'Delete an organization',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of an organization',
				action: 'Get an organization',
			},
			{
				name: 'Get Many',
				value: 'list',
				description: 'List organizations',
				action: 'Get many organizations',
			},
			{
				name: 'List Activities',
				value: 'listActivities',
				description: 'List activities of an organization',
				action: 'List organization activities',
			},
			{
				name: 'List Contacts',
				value: 'listContacts',
				description: 'List contacts of an organization',
				action: 'List organization contacts',
			},
			{
				name: 'List Deals',
				value: 'listDeals',
				description: 'List deals of an organization',
				action: 'List organization deals',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an organization (clears omitted fields)',
				action: 'Update an organization',
			},
			{
				name: 'Update Partial',
				value: 'patch',
				description: 'Update an organization partially (incremental edit)',
				action: 'Update partial organization',
			},
		],
		default: 'list',
	},
];

export const organizationFields: INodeProperties[] = [
	// ----------------------------------
	//         organization: get / delete / update / patch
	// ----------------------------------
	{
		displayName: 'Organization ID',
		name: 'organizationId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['get', 'delete', 'update', 'patch', 'listContacts', 'listDeals', 'listActivities'],
			},
		},
		description: 'The ID of the organization',
	},

	// ----------------------------------
	//         organization: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['create'],
			},
		},
		description: 'Company name or trade name',
	},

	// ----------------------------------
	//         organization: update
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'nameUpdate',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['update'],
			},
		},
		description: 'Company name or trade name',
	},

	// ----------------------------------
	//         organization: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['organization'],
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
				resource: ['organization'],
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
				resource: ['organization'],
				operation: ['list'],
			},
		},
		description: 'Text search in name, domain, etc',
	},
	{
		displayName: 'Order By',
		name: 'orderBy',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['organization'],
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
				resource: ['organization'],
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
				resource: ['organization'],
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
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Active', value: 'active' },
					{ name: 'Inactive', value: 'inactive' },
				],
				default: 'active',
				description: 'Filter by status',
			},
		],
	},

	// ----------------------------------
	//         organization: create / update / patch options
	// ----------------------------------
	{
		displayName: 'Fields to Set',
		name: 'fieldsToSet',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['create', 'update', 'patch'],
			},
		},
		options: [
			{
				displayName: 'CNPJ',
				name: 'cnpj',
				type: 'string',
				default: '',
				description: 'CNPJ of the organization',
			},
			{
				displayName: 'Custom Fields (JSON)',
				name: 'customFieldsJson',
				type: 'json',
				default: '',
				description: 'Custom fields as a JSON object, e.g. {"field_key": "field_value"}',
			},
			{
				displayName: 'Custom Fields (UI)',
				name: 'customFieldsUi',
				placeholder: 'Add Custom Field',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				description: 'Add custom fields in a user-friendly key-value table',
				options: [
					{
						name: 'customFieldsValues',
						displayName: 'Custom Field',
						values: [
							{
								displayName: 'Key',
								name: 'key',
								type: 'string',
								default: '',
								description: 'Name of the custom field',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Value of the custom field',
							},
						],
					},
				],
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Email of the organization',
			},
			{
				displayName: 'External Sync Code',
				name: 'external_sync_code',
				type: 'string',
				default: '',
				description: 'External synchronization code for integration',
			},
			{
				displayName: 'Facebook',
				name: 'facebook',
				type: 'string',
				default: '',
				description: 'Facebook link of the organization',
			},
			{
				displayName: 'Linkedin',
				name: 'linkedin',
				type: 'string',
				default: '',
				description: 'Linkedin link of the organization',
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
				description: 'Company name or trade name',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'Phone of the organization',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Active', value: 'active' },
					{ name: 'Inactive', value: 'inactive' },
				],
				default: 'active',
				description: 'Status of the organization',
			},
			{
				displayName: 'Website',
				name: 'website',
				type: 'string',
				default: '',
				description: 'Website URL of the organization',
			},
		],
	},
];
