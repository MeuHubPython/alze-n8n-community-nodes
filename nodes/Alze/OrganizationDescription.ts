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
				operation: ['get', 'delete', 'update', 'patch'],
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
		displayName: 'Sort',
		name: 'sort',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['list'],
			},
		},
		description: 'Field to sort by. Prefix with - for descending. E.g. -created_at',
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
				displayName: 'Created After',
				name: 'created_after',
				type: 'dateTime',
				default: '',
				description: 'Filter organizations created after this date',
			},
			{
				displayName: 'Created Before',
				name: 'created_before',
				type: 'dateTime',
				default: '',
				description: 'Filter organizations created before this date',
			},
			{
				displayName: 'Domain',
				name: 'domain',
				type: 'string',
				default: '',
				description: 'Filter by exact website domain (e.g. acme.com)',
			},
			{
				displayName: 'Owner ID',
				name: 'owner_id',
				type: 'string',
				default: '',
				description: 'Filter by owner / seller',
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
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				description: 'Street address in free text format',
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
				displayName: 'Domain',
				name: 'domain',
				type: 'string',
				default: '',
				description: 'Main domain of the company (without http/https)',
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
				displayName: 'Owner ID',
				name: 'owner_id',
				type: 'string',
				default: '',
				description: 'ID of the owner of this organization',
			},
		],
	},
];
