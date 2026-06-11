import { INodeProperties } from 'n8n-workflow';

export const pipelineOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['pipeline'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new pipeline',
				action: 'Create a pipeline',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a pipeline',
				action: 'Delete a pipeline',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of a pipeline',
				action: 'Get a pipeline',
			},
			{
				name: 'Get Many',
				value: 'list',
				description: 'List pipelines',
				action: 'Get many pipelines',
			},
	// Removed listStages
			{
				name: 'Update',
				value: 'update',
				description: 'Update a pipeline (clears omitted fields)',
				action: 'Update a pipeline',
			},
			{
				name: 'Update Partial',
				value: 'patch',
				description: 'Update a pipeline partially (incremental edit)',
				action: 'Update partial pipeline',
			},
		],
		default: 'list',
	},
];

export const pipelineFields: INodeProperties[] = [
	// ----------------------------------
	//         pipeline: get / delete / update / patch / listStages
	// ----------------------------------
	{
		displayName: 'Pipeline ID',
		name: 'pipelineId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['pipeline'],
				operation: ['get', 'delete', 'update', 'patch'],
			},
		},
		description: 'The ID of the pipeline',
	},

	// ----------------------------------
	//         pipeline: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['pipeline'],
				operation: ['create'],
			},
		},
		description: 'Name of the pipeline / funnel',
	},

	// ----------------------------------
	//         pipeline: update
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'nameUpdate',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['pipeline'],
				operation: ['update'],
			},
		},
		description: 'Name of the pipeline / funnel',
	},

	// ----------------------------------
	//         pipeline: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['pipeline'],
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
				resource: ['pipeline'],
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
				resource: ['pipeline'],
				operation: ['list'],
			},
		},
		description: 'Text search in pipeline name',
	},
	{
		displayName: 'Order By',
		name: 'orderBy',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['pipeline'],
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
				resource: ['pipeline'],
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
				resource: ['pipeline'],
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
	//         pipeline: create / update / patch options
	// ----------------------------------
	{
		displayName: 'Fields to Set',
		name: 'fieldsToSet',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['pipeline'],
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
				displayName: 'Is Default',
				name: 'is_default',
				type: 'boolean',
				default: false,
				description: 'Whether this is the default pipeline',
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
				description: 'Name of the pipeline',
			},
			{
				displayName: 'Position',
				name: 'position',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 1,
				description: 'Display position/order of the pipeline',
			},
			{
				displayName: 'Stages (JSON)',
				name: 'stagesJson',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						'/operation': ['create'],
					},
				},
				description: 'Stages as a JSON array of objects to create in batch with the pipeline',
			},
			{
				displayName: 'Stages (UI)',
				name: 'stagesUi',
				placeholder: 'Add Stage',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				displayOptions: {
					show: {
						'/operation': ['create'],
					},
				},
				description: 'List of stages to create in batch with the pipeline',
				options: [
					{
						name: 'stagesValues',
						displayName: 'Stage',
						values: [
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
								name: 'name',
								type: 'string',
								required: true,
								default: '',
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
				],
			},
		],
	},
];
