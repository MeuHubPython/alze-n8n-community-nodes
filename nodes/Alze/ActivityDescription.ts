import { INodeProperties } from 'n8n-workflow';

export const activityOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['activity'],
			},
		},
		options: [
			{
				name: 'Complete',
				value: 'complete',
				description: 'Mark an activity as completed',
				action: 'Complete an activity',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new activity',
				action: 'Create an activity',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an activity',
				action: 'Delete an activity',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of an activity',
				action: 'Get an activity',
			},
			{
				name: 'Get Many',
				value: 'list',
				description: 'List activities',
				action: 'Get many activities',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an activity (clears omitted fields)',
				action: 'Update an activity',
			},
			{
				name: 'Update Partial',
				value: 'patch',
				description: 'Update an activity partially (incremental edit)',
				action: 'Update partial activity',
			},
		],
		default: 'list',
	},
];

export const activityFields: INodeProperties[] = [
	// ----------------------------------
	//         activity: get / delete / update / patch / complete
	// ----------------------------------
	{
		displayName: 'Activity ID',
		name: 'activityId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['activity'],
				operation: ['get', 'delete', 'update', 'patch', 'complete'],
			},
		},
		description: 'The ID of the activity',
	},

	// ----------------------------------
	//         activity: complete
	// ----------------------------------
	{
		displayName: 'Completed At',
		name: 'completedAt',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['activity'],
				operation: ['complete'],
			},
		},
		description: 'Date and time when the activity was completed',
	},
	{
		displayName: 'Notes / Comments',
		name: 'notesComplete',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['activity'],
				operation: ['complete'],
			},
		},
		description: 'Additional notes or summary recorded upon completion',
	},

	// ----------------------------------
	//         activity: create
	// ----------------------------------
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['activity'],
				operation: ['create'],
			},
		},
		description: 'Title of the activity',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		required: true,
		options: [
			{ name: 'Call', value: 'call' },
			{ name: 'Email', value: 'email' },
			{ name: 'Meeting', value: 'meeting' },
			{ name: 'Other', value: 'other' },
			{ name: 'Task', value: 'task' },
			{ name: 'Whatsapp', value: 'whatsapp' },
		],
		default: 'task',
		displayOptions: {
			show: {
				resource: ['activity'],
				operation: ['create'],
			},
		},
		description: 'Type of activity',
	},
	{
		displayName: 'Due Date',
		name: 'dueDate',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['activity'],
				operation: ['create'],
			},
		},
		description: 'Deadline or scheduled date for the activity',
	},

	// ----------------------------------
	//         activity: update
	// ----------------------------------
	{
		displayName: 'Title',
		name: 'titleUpdate',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['activity'],
				operation: ['update'],
			},
		},
		description: 'Title of the activity',
	},
	{
		displayName: 'Type',
		name: 'typeUpdate',
		type: 'options',
		required: true,
		options: [
			{ name: 'Call', value: 'call' },
			{ name: 'Email', value: 'email' },
			{ name: 'Meeting', value: 'meeting' },
			{ name: 'Other', value: 'other' },
			{ name: 'Task', value: 'task' },
			{ name: 'Whatsapp', value: 'whatsapp' },
		],
		default: 'task',
		displayOptions: {
			show: {
				resource: ['activity'],
				operation: ['update'],
			},
		},
		description: 'Type of activity',
	},
	{
		displayName: 'Due Date',
		name: 'dueDateUpdate',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['activity'],
				operation: ['update'],
			},
		},
		description: 'Deadline or scheduled date for the activity',
	},

	// ----------------------------------
	//         activity: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['activity'],
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
				resource: ['activity'],
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
				resource: ['activity'],
				operation: ['list'],
			},
		},
		description: 'Text search in titles',
	},
	{
		displayName: 'Sort',
		name: 'sort',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['activity'],
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
				resource: ['activity'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Contact (Person) ID',
				name: 'contact_id',
				type: 'string',
				default: '',
				description: 'Filter by associated contact ID',
			},
			{
				displayName: 'Created After',
				name: 'created_after',
				type: 'dateTime',
				default: '',
				description: 'Filter activities created after this date',
			},
			{
				displayName: 'Created Before',
				name: 'created_before',
				type: 'dateTime',
				default: '',
				description: 'Filter activities created before this date',
			},
			{
				displayName: 'Deal ID',
				name: 'deal_id',
				type: 'string',
				default: '',
				description: 'Filter by associated deal ID',
			},
			{
				displayName: 'Due After',
				name: 'due_after',
				type: 'dateTime',
				default: '',
				description: 'Filter activities with due date >= value',
			},
			{
				displayName: 'Due Before',
				name: 'due_before',
				type: 'dateTime',
				default: '',
				description: 'Filter activities with due date <= value',
			},
			{
				displayName: 'Organization ID',
				name: 'organization_id',
				type: 'string',
				default: '',
				description: 'Filter by associated organization ID',
			},
			{
				displayName: 'Owner ID',
				name: 'owner_id',
				type: 'string',
				default: '',
				description: 'Filter by owner ID',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Pending', value: 'pending' },
					{ name: 'Completed', value: 'completed' },
				],
				default: 'pending',
				description: 'Filter by activity status',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Call', value: 'call' },
					{ name: 'Email', value: 'email' },
					{ name: 'Meeting', value: 'meeting' },
					{ name: 'Other', value: 'other' },
					{ name: 'Task', value: 'task' },
					{ name: 'Whatsapp', value: 'whatsapp' },
				],
				default: 'task',
				description: 'Filter by activity type',
			},
		],
	},

	// ----------------------------------
	//         activity: create / update / patch options
	// ----------------------------------
	{
		displayName: 'Fields to Set',
		name: 'fieldsToSet',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['activity'],
				operation: ['create', 'update', 'patch'],
			},
		},
		options: [
			{
				displayName: 'Contact ID',
				name: 'contact_id',
				type: 'string',
				default: '',
				description: 'ID of the associated contact',
			},
			{
				displayName: 'Deal ID',
				name: 'deal_id',
				type: 'string',
				default: '',
				description: 'ID of the associated deal',
			},
			{
				displayName: 'Due Date',
				name: 'dueDatePatch',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						'/operation': ['patch'],
					},
				},
				description: 'Deadline or scheduled date for the activity',
			},
			{
				displayName: 'Duration (Minutes)',
				name: 'duration',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 15,
				description: 'Duration of the activity in minutes',
			},
			{
				displayName: 'Notes / Comments',
				name: 'notes',
				type: 'string',
				default: '',
				description: 'Notes or description of the activity',
			},
			{
				displayName: 'Organization ID',
				name: 'organization_id',
				type: 'string',
				default: '',
				description: 'ID of the associated organization',
			},
			{
				displayName: 'Owner ID',
				name: 'owner_id',
				type: 'string',
				default: '',
				description: 'ID of the owner of this activity',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Pending', value: 'pending' },
					{ name: 'Completed', value: 'completed' },
				],
				default: 'pending',
				description: 'Status of the activity',
			},
			{
				displayName: 'Title',
				name: 'titlePatch',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						'/operation': ['patch'],
					},
				},
				description: 'Title of the activity',
			},
			{
				displayName: 'Type',
				name: 'typePatch',
				type: 'options',
				options: [
					{ name: 'Call', value: 'call' },
					{ name: 'Email', value: 'email' },
					{ name: 'Meeting', value: 'meeting' },
					{ name: 'Other', value: 'other' },
					{ name: 'Task', value: 'task' },
					{ name: 'Whatsapp', value: 'whatsapp' },
				],
				default: 'task',
				displayOptions: {
					show: {
						'/operation': ['patch'],
					},
				},
				description: 'Type of activity',
			},
		],
	},
];
