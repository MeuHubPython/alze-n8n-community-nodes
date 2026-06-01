import { INodeProperties } from 'n8n-workflow';

export const customFieldOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['customField'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new custom field',
				action: 'Create a custom field',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a custom field',
				action: 'Delete a custom field',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of a custom field',
				action: 'Get a custom field',
			},
			{
				name: 'Get Many',
				value: 'list',
				description: 'List custom fields',
				action: 'Get many custom fields',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a custom field (clears omitted fields)',
				action: 'Update a custom field',
			},
			{
				name: 'Update Partial',
				value: 'patch',
				description: 'Update a custom field partially (incremental edit)',
				action: 'Update partial custom field',
			},
		],
		default: 'list',
	},
];

export const customFieldFields: INodeProperties[] = [
	// ----------------------------------
	//         customField: get / delete / update / patch
	// ----------------------------------
	{
		displayName: 'Custom Field ID',
		name: 'customFieldId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['get', 'delete', 'update', 'patch'],
			},
		},
		description: 'The ID of the custom field',
	},

	// ----------------------------------
	//         customField: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['create'],
			},
		},
		description: 'Name/title of the custom field',
	},

	// ----------------------------------
	//         customField: update
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'nameUpdate',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['update'],
			},
		},
		description: 'Name/title of the custom field',
	},
	{
		displayName: 'Entity',
		name: 'entity',
		type: 'options',
		required: true,
		options: [
			{ name: 'Deals', value: 'deals' },
			{ name: 'Organizations', value: 'organizations' },
			{ name: 'Persons', value: 'persons' },
		],
		default: 'persons',
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['create', 'update'],
			},
		},
		description: 'The target entity for this custom field',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		required: true,
		options: [
			{ name: 'Boolean', value: 'boolean' },
			{ name: 'Date', value: 'date' },
			{ name: 'Multiselect', value: 'multiselect' },
			{ name: 'Number', value: 'number' },
			{ name: 'Select', value: 'select' },
			{ name: 'Text', value: 'text' },
		],
		default: 'text',
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['create', 'update'],
			},
		},
		description: 'The data type of the custom field',
	},

	// ----------------------------------
	//         customField: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: ['list'],
				resource: ['customField'],
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
				resource: ['customField'],
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
				resource: ['customField'],
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
				resource: ['customField'],
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
				resource: ['customField'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Entity',
				name: 'entity',
				type: 'options',
				options: [
					{ name: 'Contacts', value: 'contacts' },
					{ name: 'Organizations', value: 'organizations' },
					{ name: 'Deals', value: 'deals' },
				],
				default: 'contacts',
				description: 'Filter by entity target',
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
					{ name: 'Boolean', value: 'boolean' },
					{ name: 'Date', value: 'date' },
					{ name: 'Number', value: 'number' },
					{ name: 'Select', value: 'select' },
					{ name: 'Text', value: 'text' },
				],
				default: 'text',
				description: 'Filter by field type',
			},
		],
	},

	// ----------------------------------
	//         customField: create / update / patch options
	// ----------------------------------
	{
		displayName: 'Fields to Set',
		name: 'fieldsToSet',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['create', 'update', 'patch'],
			},
		},
		options: [
			{
				displayName: 'Entity',
				name: 'entityPatch',
				type: 'options',
				options: [
					{ name: 'Deals', value: 'deals' },
					{ name: 'Organizations', value: 'organizations' },
					{ name: 'Persons', value: 'persons' },
				],
				default: 'persons',
				displayOptions: {
					show: {
						'/operation': ['patch'],
					},
				},
				description: 'The target entity for this custom field',
			},
			{
				displayName: 'External Sync Code',
				name: 'external_sync_code',
				type: 'string',
				default: '',
				description: 'External synchronization code for integration',
			},
			{
				displayName: 'Is Required',
				name: 'is_required',
				type: 'boolean',
				default: false,
				description: 'Whether this field is mandatory',
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
				description: 'Name of the custom field',
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'string',
				default: '',
				description: 'Comma-separated options (required for select/multiselect)',
			},
			{
				displayName: 'Pipeline IDs',
				name: 'pipeline_ids',
				type: 'string',
				default: '',
				description: 'Comma-separated pipeline UUIDs (deals only)',
			},
			{
				displayName: 'Position',
				name: 'position',
				type: 'number',
				default: 1,
				description: 'Display order position',
			},
			{
				displayName: 'Show on Create',
				name: 'show_on_create',
				type: 'boolean',
				default: true,
				description: 'Whether to show the field on creation form',
			},
			{
				displayName: 'Type',
				name: 'typePatch',
				type: 'options',
				options: [
					{ name: 'Boolean', value: 'boolean' },
					{ name: 'Date', value: 'date' },
					{ name: 'Multiselect', value: 'multiselect' },
					{ name: 'Number', value: 'number' },
					{ name: 'Select', value: 'select' },
					{ name: 'Text', value: 'text' },
				],
				default: 'text',
				displayOptions: {
					show: {
						'/operation': ['patch'],
					},
				},
				description: 'The data type of the custom field',
			},
		],
	},
];
