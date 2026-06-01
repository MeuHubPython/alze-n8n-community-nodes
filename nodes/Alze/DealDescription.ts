import { INodeProperties } from 'n8n-workflow';

export const dealOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['deal'],
			},
		},
		options: [
			{
				name: 'Add Contact',
				value: 'addContact',
				description: 'Add a contact to a deal',
				action: 'Add a contact to a deal',
			},
			{
				name: 'Add Item',
				value: 'addItem',
				description: 'Add an item to a deal',
				action: 'Add an item to a deal',
			},
			{
				name: 'Add Note',
				value: 'addNote',
				description: 'Add a note to a deal',
				action: 'Add a note to a deal',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new deal',
				action: 'Create a deal',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a deal',
				action: 'Delete a deal',
			},
			{
				name: 'Delete Note',
				value: 'deleteNote',
				description: 'Delete a note of a deal',
				action: 'Delete a deal note',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of a deal',
				action: 'Get a deal',
			},
			{
				name: 'Get Many',
				value: 'list',
				description: 'List deals',
				action: 'Get many deals',
			},
			{
				name: 'List Contacts',
				value: 'listContacts',
				description: 'List contacts of a deal',
				action: 'List deal contacts',
			},
			{
				name: 'List Items',
				value: 'listItems',
				description: 'List items (products/services) of a deal',
				action: 'List deal items',
			},
			{
				name: 'List Notes',
				value: 'listNotes',
				description: 'List notes of a deal',
				action: 'List deal notes',
			},
			{
				name: 'Lose',
				value: 'lose',
				description: 'Mark a deal as lost',
				action: 'Mark a deal as lost',
			},
			{
				name: 'Move Stage',
				value: 'stage',
				description: 'Move a deal to another stage',
				action: 'Move a deal stage',
			},
			{
				name: 'Remove Contact',
				value: 'removeContact',
				description: 'Remove a contact from a deal',
				action: 'Remove a contact from a deal',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a deal (clears omitted fields)',
				action: 'Update a deal',
			},
			{
				name: 'Update Note',
				value: 'updateNote',
				description: 'Update a note of a deal',
				action: 'Update a deal note',
			},
			{
				name: 'Update Partial',
				value: 'patch',
				description: 'Update a deal partially (incremental edit)',
				action: 'Update partial deal',
			},
			{
				name: 'Win',
				value: 'win',
				description: 'Mark a deal as won',
				action: 'Mark a deal as won',
			},
		],
		default: 'list',
	},
];

export const dealFields: INodeProperties[] = [
	// ----------------------------------
	//         deal: get / delete / update / patch / win / lose / move
	// ----------------------------------
	{
		displayName: 'Deal ID',
		name: 'dealId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: [
					'get',
					'delete',
					'update',
					'patch',
					'win',
					'lose',
					'stage',
					'listContacts',
					'addContact',
					'removeContact',
					'listItems',
					'addItem',
					'listNotes',
					'addNote',
				],
			},
		},
		description: 'The ID of the deal',
	},

	// ----------------------------------
	//         deal: win
	// ----------------------------------
	{
		displayName: 'Won Reason ID',
		name: 'wonReasonId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['win'],
			},
		},
		description: 'ID of the won reason from the won reasons catalogue',
	},
	{
		displayName: 'Value',
		name: 'value',
		type: 'number',
		typeOptions: {
			numberPrecision: 2,
		},
		default: 0,
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['win'],
			},
		},
		description: 'The final value of the won deal',
	},

	// ----------------------------------
	//         deal: lose
	// ----------------------------------
	{
		displayName: 'Lost Reason ID',
		name: 'lostReasonId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['lose'],
			},
		},
		description: 'ID of the lost reason from the lost reasons catalogue',
	},
	// Empty replacement for lostAt and feedbackLose

	// ----------------------------------
	//         deal: move (stage)
	// ----------------------------------
	{
		displayName: 'Stage ID',
		name: 'stageIdMove',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['stage'],
			},
		},
		description: 'The target stage ID to move the deal to',
	},

	// ----------------------------------
	//         deal: create
	// ----------------------------------
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['create'],
			},
		},
		description: 'Title of the deal / sales opportunity',
	},
	{
		displayName: 'Pipeline ID',
		name: 'pipelineId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['create'],
			},
		},
		description: 'The pipeline where this deal resides',
	},
	{
		displayName: 'Stage ID',
		name: 'stageId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['create'],
			},
		},
		description: 'The starting stage of this deal within the pipeline',
	},

	// ----------------------------------
	//         deal: update
	// ----------------------------------
	{
		displayName: 'Title',
		name: 'titleUpdate',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['update'],
			},
		},
		description: 'Title of the deal / sales opportunity',
	},
	{
		displayName: 'Pipeline ID',
		name: 'pipelineIdUpdate',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['update'],
			},
		},
		description: 'The pipeline where this deal resides',
	},
	{
		displayName: 'Stage ID',
		name: 'stageIdUpdate',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['update'],
			},
		},
		description: 'The stage of this deal within the pipeline',
	},

	// ----------------------------------
	//         deal: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['deal'],
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
				resource: ['deal'],
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
				resource: ['deal'],
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
				resource: ['deal'],
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
				resource: ['deal'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Contact (Person) ID',
				name: 'person_id',
				type: 'string',
				default: '',
				description: 'Filter by contact (person) ID',
			},
			{
				displayName: 'Created After',
				name: 'created_after',
				type: 'dateTime',
				default: '',
				description: 'Filter deals created after this date',
			},
			{
				displayName: 'Created Before',
				name: 'created_before',
				type: 'dateTime',
				default: '',
				description: 'Filter deals created before this date',
			},
			{
				displayName: 'Expected Close After',
				name: 'expected_close_after',
				type: 'dateTime',
				default: '',
				description: 'Filter by expectation close date >= value',
			},
			{
				displayName: 'Expected Close Before',
				name: 'expected_close_before',
				type: 'dateTime',
				default: '',
				description: 'Filter by expectation close date <= value',
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
				description: 'Filter by organization ID',
			},
			{
				displayName: 'Owner ID',
				name: 'owner_id',
				type: 'string',
				default: '',
				description: 'Filter by seller ID',
			},
			{
				displayName: 'Pipeline ID',
				name: 'pipeline_id',
				type: 'string',
				default: '',
				description: 'Filter by pipeline',
			},
			{
				displayName: 'Stage ID',
				name: 'stage_id',
				type: 'string',
				default: '',
				description: 'Filter by pipeline stage',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Open', value: 'open' },
					{ name: 'Won', value: 'won' },
					{ name: 'Lost', value: 'lost' },
				],
				default: 'open',
				description: 'Filter by status',
			},
		],
	},

	// ----------------------------------
	//         deal: create / update / patch options
	// ----------------------------------
	{
		displayName: 'Fields to Set',
		name: 'fieldsToSet',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['create', 'update', 'patch'],
			},
		},
		options: [
			{
				displayName: 'Channel ID',
				name: 'channel_id',
				type: 'string',
				default: '',
				description: 'ID of the channel/campaign associated with the deal',
			},
			{
				displayName: 'Contact (Person) ID',
				name: 'person_id',
				type: 'string',
				default: '',
				description: 'ID of the main contact associated',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: 'BRL',
				description: 'Currency code in ISO 4217, default: BRL',
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
				displayName: 'Expected Close Date',
				name: 'expected_close_date',
				type: 'dateTime',
				default: '',
				description: 'Planned or expected close date of the deal',
			},
			{
				displayName: 'External Sync Code',
				name: 'external_sync_code',
				type: 'string',
				default: '',
				description: 'External synchronization code for integration',
			},
			{
				displayName: 'Lead Origin ID',
				name: 'lead_origin_id',
				type: 'string',
				default: '',
				description: 'ID of the lead origin (source)',
			},
			{
				displayName: 'Organization ID',
				name: 'organization_id',
				type: 'string',
				default: '',
				description: 'ID of the associated organization',
			},
			{
				displayName: 'Origin Group ID',
				name: 'origin_group_id',
				type: 'string',
				default: '',
				description: 'ID of the origin group',
			},
			{
				displayName: 'Owner ID',
				name: 'owner_id',
				type: 'string',
				default: '',
				description: 'ID of the owner / seller of this deal',
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
				description: 'The pipeline where this deal resides',
			},
			{
				displayName: 'Stage ID',
				name: 'stageIdPatch',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						'/operation': ['patch'],
					},
				},
				description: 'The stage of this deal within the pipeline',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Open', value: 'open' },
					{ name: 'Won', value: 'won' },
					{ name: 'Lost', value: 'lost' },
				],
				default: 'open',
				description: 'Status of the deal',
			},
			{
				displayName: 'Temperature',
				name: 'temperature',
				type: 'options',
				options: [
					{ name: 'Cold', value: 'cold' },
					{ name: 'Warm', value: 'warm' },
					{ name: 'Hot', value: 'hot' },
				],
				default: 'warm',
				description: 'Qualitative temperature of the lead',
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
				description: 'Title of the deal / sales opportunity',
			},
			{
				displayName: 'Value',
				name: 'value',
				type: 'number',
				typeOptions: {
					numberPrecision: 2,
				},
				default: 0,
				description: 'Monetary value of the deal',
			},
		],
	},

	// ----------------------------------
	//         deal sub-resources
	// ----------------------------------
	{
		displayName: 'Contact (Person) ID',
		name: 'personIdAdd',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['addContact'],
			},
		},
		description: 'The ID of the contact to add',
	},
	{
		displayName: 'Contact (Person) ID',
		name: 'personIdRemove',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['removeContact'],
			},
		},
		description: 'The ID of the contact to remove',
	},
	{
		displayName: 'Item (Product/Service) ID',
		name: 'itemIdAdd',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['addItem'],
			},
		},
		description: 'The ID of the item to add',
	},
	{
		displayName: 'Quantity',
		name: 'quantity',
		type: 'number',
		default: 1,
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['addItem'],
			},
		},
		description: 'The quantity of the item',
	},
	{
		displayName: 'Price',
		name: 'price',
		type: 'number',
		typeOptions: {
			numberPrecision: 2,
		},
		default: 0,
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['addItem'],
			},
		},
		description: 'The price of the item (leave 0 to use the catalog price)',
	},
	{
		displayName: 'Note ID',
		name: 'noteId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['updateNote', 'deleteNote'],
			},
		},
		description: 'The ID of the note',
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['addNote', 'updateNote'],
			},
		},
		description: 'The text content of the note',
	},
	{
		displayName: 'Pinned',
		name: 'pinned',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['addNote', 'updateNote'],
			},
		},
		description: 'Whether to pin the note to the top',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['deal'],
				operation: ['listNotes'],
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
];
