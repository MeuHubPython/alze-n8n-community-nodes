import { INodeProperties } from 'n8n-workflow';

export const distributionRuleOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['distributionRule'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new distribution rule',
				action: 'Create a distribution rule',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a distribution rule',
				action: 'Delete a distribution rule',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of a distribution rule',
				action: 'Get a distribution rule',
			},
			{
				name: 'Get Many',
				value: 'list',
				description: 'List distribution rules',
				action: 'Get many distribution rules',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a distribution rule (clears omitted fields)',
				action: 'Update a distribution rule',
			},
			{
				name: 'Update Partial',
				value: 'patch',
				description: 'Update a distribution rule partially (incremental edit)',
				action: 'Update partial distribution rule',
			},
		],
		default: 'list',
	},
];

export const distributionRuleFields: INodeProperties[] = [
	// ----------------------------------
	//         distributionRule: get / delete / update / patch
	// ----------------------------------
	{
		displayName: 'Distribution Rule ID',
		name: 'distributionRuleId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['distributionRule'],
				operation: ['get', 'delete', 'update', 'patch'],
			},
		},
		description: 'The ID of the distribution rule',
	},

	// ----------------------------------
	//         distributionRule: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['distributionRule'],
				operation: ['create'],
			},
		},
		description: 'Name/title of the distribution rule',
	},

	// ----------------------------------
	//         distributionRule: update
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'nameUpdate',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['distributionRule'],
				operation: ['update'],
			},
		},
		description: 'Name/title of the distribution rule',
	},

	{
		displayName: 'Mode',
		name: 'mode',
		type: 'options',
		required: true,
		options: [
			{ name: 'By Origin', value: 'by_origin' },
			{ name: 'Round Robin', value: 'round_robin' },
		],
		default: 'round_robin',
		displayOptions: {
			show: {
				resource: ['distributionRule'],
				operation: ['create', 'update'],
			},
		},
		description: 'The distribution mode',
	},

	// ----------------------------------
	//         distributionRule: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: ['list'],
				resource: ['distributionRule'],
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
				resource: ['distributionRule'],
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
				resource: ['distributionRule'],
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
				resource: ['distributionRule'],
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
				resource: ['distributionRule'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Is Active',
				name: 'is_active',
				type: 'boolean',
				default: true,
				description: 'Whether to filter by active status',
			},
			{
				displayName: 'Mode',
				name: 'mode',
				type: 'options',
				options: [
					{ name: 'By Origin', value: 'by_origin' },
					{ name: 'Round Robin', value: 'round_robin' },
				],
				default: 'round_robin',
				description: 'Filter by distribution mode',
			},
		],
	},

	// ----------------------------------
	//         distributionRule: create / update / patch options
	// ----------------------------------
	{
		displayName: 'Fields to Set',
		name: 'fieldsToSet',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['distributionRule'],
				operation: ['create', 'update', 'patch'],
			},
		},
		options: [
			{
				displayName: 'Apply Only When Unassigned',
				name: 'apply_only_when_unassigned',
				type: 'boolean',
				default: true,
				description: 'Whether to apply rule only when the deal has no owner',
			},
			{
				displayName: 'Is Active',
				name: 'is_active',
				type: 'boolean',
				default: true,
				description: 'Whether the distribution rule is active',
			},
			{
				displayName: 'Mode',
				name: 'modePatch',
				type: 'options',
				options: [
					{ name: 'By Origin', value: 'by_origin' },
					{ name: 'Round Robin', value: 'round_robin' },
				],
				default: 'round_robin',
				displayOptions: {
					show: {
						'/operation': ['patch'],
					},
				},
				description: 'The distribution mode',
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
				description: 'Name of the distribution rule',
			},
			{
				displayName: 'Origin Owner Map (JSON)',
				name: 'originOwnerMapJson',
				type: 'json',
				default: '{}',
				description: 'Map of origin_id -> owner_id, e.g. {"origin-uuid": "owner-uuid"}',
			},
		],
	},
];
