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
				description: 'Create a new stage',
				action: 'Create a stage',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a stage',
				action: 'Delete a stage',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of a stage',
				action: 'Get a stage',
			},
			{
				name: 'Get Many',
				value: 'list',
				description: 'List stages',
				action: 'Get many stages',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a stage (clears omitted fields)',
				action: 'Update a stage',
			},
			{
				name: 'Update Partial',
				value: 'patch',
				description: 'Update a stage partially (incremental edit)',
				action: 'Update partial stage',
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
	{
		displayName: 'Pipeline ID',
		name: 'pipelineId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['stage'],
				operation: ['create'],
			},
		},
		description: 'The funnel/pipeline where this stage resides',
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
	{
		displayName: 'Pipeline ID',
		name: 'pipelineIdUpdate',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['stage'],
				operation: ['update'],
			},
		},
		description: 'The funnel/pipeline where this stage resides',
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
				displayName: 'Pipeline ID',
				name: 'pipeline_id',
				type: 'string',
				default: '',
				description: 'Filter stages by a specific pipeline ID',
			},
		],
	},

	// ----------------------------------
	//         stage: create / update / patch options
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
				displayName: 'Pipeline ID',
				name: 'pipelineIdPatch',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						'/operation': ['patch'],
					},
				},
				description: 'The funnel/pipeline where this stage resides',
			},
			{
				displayName: 'Position',
				name: 'position',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 1,
				description: 'Display position/order of the stage',
			},
			{
				displayName: 'Win Probability (%)',
				name: 'win_probability',
				type: 'number',
				typeOptions: {
					minValue: 0,
					maxValue: 100,
				},
				default: 100,
				description: 'Probability of winning deals in this stage',
			},
		],
	},
];
