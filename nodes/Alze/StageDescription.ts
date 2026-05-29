import { INodeProperties } from 'n8n-workflow';

export const stageOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['stage'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new stage in an existing pipeline',
				action: 'Create a stage',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a stage by ID',
				action: 'Delete a stage',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a stage by ID',
				action: 'Get a stage',
			},
			{
				name: 'Get Many',
				value: 'list',
				description: 'Retrieve all stages for a pipeline',
				action: 'List a stage',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update all fields of a stage',
				action: 'Update a stage',
			},
			{
				name: 'Update Partial',
				value: 'patch',
				description: 'Update only specified fields of a stage',
				action: 'Patch a stage',
			},
		],
		default: 'list',
	},
];

export const stageFields: INodeProperties[] = [
	// ----------------------------------
	//         stage: get / delete / update / patch
	// ----------------------------------
	{
		displayName: 'Stage ID',
		name: 'stageId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['stage'],
				operation: ['get', 'delete', 'update', 'patch'],
			},
		},
		description: 'The ID of the stage',
	},

	// ----------------------------------
	//         stage: create / list
	// ----------------------------------
	{
		displayName: 'Pipeline ID',
		name: 'pipelineId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['stage'],
				operation: ['create', 'list'],
			},
		},
		description: 'ID of the pipeline the stage belongs to',
	},

	// ----------------------------------
	//         stage: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['stage'],
				operation: ['create'],
			},
		},
		description: 'Name of the stage',
	},

	// ----------------------------------
	//         stage: update
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'nameUpdate',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['stage'],
				operation: ['update'],
			},
		},
		description: 'Name of the stage',
	},

	// ----------------------------------
	//         stage: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['stage'],
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
				resource: ['stage'],
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
				resource: ['stage'],
				operation: ['list'],
			},
		},
		description: 'Text search in stage name',
	},
	{
		displayName: 'Sort',
		name: 'sort',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['stage'],
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
				resource: ['stage'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Created After',
				name: 'created_after',
				type: 'dateTime',
				default: '',
				description: 'Filter stages created after this date',
			},
			{
				displayName: 'Created Before',
				name: 'created_before',
				type: 'dateTime',
				default: '',
				description: 'Filter stages created before this date',
			},
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
	//         stage: fieldsToSet
	// ----------------------------------
	{
		displayName: 'Fields to Set',
		name: 'fieldsToSet',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['stage'],
				operation: ['create', 'update', 'patch'],
			},
		},
		options: [
			{
				displayName: 'Color',
				name: 'color',
				type: 'color',
				default: '',
				description: 'Hex color visual in kanban (e.g. #2563eb)',
			},
			{
				displayName: 'External Sync Code',
				name: 'external_sync_code',
				type: 'string',
				default: '',
				description: 'External synchronization code unique to this stage',
			},
			{
				displayName: 'Is Lost',
				name: 'is_lost',
				type: 'boolean',
				default: false,
				description: 'Whether this stage represents a terminal Lost stage (max one per pipeline)',
			},
			{
				displayName: 'Is Won',
				name: 'is_won',
				type: 'boolean',
				default: false,
				description: 'Whether this stage represents a terminal Won stage (max one per pipeline)',
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
				description: 'Name of the stage',
			},
			{
				displayName: 'Position',
				name: 'position',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Display position/order of this stage (0 = first)',
			},
			{
				displayName: 'SLA Days',
				name: 'sla_days',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 1,
				description: 'Expected number of days for deal stay inside this stage',
			},
		],
	},
];
