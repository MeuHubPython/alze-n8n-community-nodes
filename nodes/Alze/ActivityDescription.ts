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
	// (Empty payload for complete operation)

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
		displayName: 'Deal ID',
		name: 'dealId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['activity'],
				operation: ['create'],
			},
		},
		description: 'The ID of the associated deal',
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
				name: 'person_id',
				type: 'string',
				default: '',
				description: 'Filter activities by person ID',
			},
			{
				displayName: 'Deal ID',
				name: 'deal_id',
				type: 'string',
				default: '',
				description: 'Filter by associated deal ID',
			},
			{
				displayName: 'External Sync Code',
				name: 'external_sync_code',
				type: 'string',
				default: '',
				description: 'Filter by external synchronization code',
			},
			{
				displayName: 'Organization ID',
				name: 'organization_id',
				type: 'string',
				default: '',
				description: 'Filter by associated organization ID',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Open', value: 'open' },
					{ name: 'Done', value: 'done' },
					{ name: 'Canceled', value: 'canceled' },
				],
				default: 'open',
				description: 'Filter by activity status',
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
				displayName: 'Activity Type ID',
				name: 'activity_type_id',
				type: 'string',
				default: '',
				description: 'ID of the activity type (UUID)',
			},
			{
				displayName: 'Contact (Person) ID',
				name: 'person_id',
				type: 'string',
				default: '',
				description: 'ID of the associated person/contact',
			},
			{
				displayName: 'Deal ID',
				name: 'deal_id',
				type: 'string',
				default: '',
				description: 'ID of the associated deal',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Details / observations of the activity',
			},
			{
				displayName: 'Due Date',
				name: 'due_date',
				type: 'dateTime',
				default: '',
				description: 'Planned due date',
			},
			{
				displayName: 'Due Time (HH:MM:SS)',
				name: 'due_time',
				type: 'string',
				default: '',
				description: 'Planned due time (e.g. 14:30:00)',
			},
			{
				displayName: 'External Sync Code',
				name: 'external_sync_code',
				type: 'string',
				default: '',
				description: 'External synchronization code for integration',
			},
			{
				displayName: 'Organization ID',
				name: 'organization_id',
				type: 'string',
				default: '',
				description: 'ID of the associated organization',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Open', value: 'open' },
					{ name: 'Done', value: 'done' },
					{ name: 'Canceled', value: 'canceled' },
				],
				default: 'open',
				description: 'Status of the activity',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Title of the activity',
			},
		],
	},
];
