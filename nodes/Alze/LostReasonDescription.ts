import { INodeProperties } from 'n8n-workflow';

export const lostReasonOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['lostReason'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new lost reason',
				action: 'Create a lost reason',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a lost reason',
				action: 'Delete a lost reason',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of a lost reason',
				action: 'Get a lost reason',
			},
			{
				name: 'Get Many',
				value: 'list',
				description: 'List lost reasons',
				action: 'Get many lost reasons',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a lost reason (clears omitted fields)',
				action: 'Update a lost reason',
			},
			{
				name: 'Update Partial',
				value: 'patch',
				description: 'Update a lost reason partially (incremental edit)',
				action: 'Update partial lost reason',
			},
		],
		default: 'list',
	},
];

export const lostReasonFields: INodeProperties[] = [
	// ----------------------------------
	//         lostReason: get / delete / update / patch
	// ----------------------------------
	{
		displayName: 'Lost Reason ID',
		name: 'lostReasonId',
		type: 'number',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['lostReason'],
				operation: ['get', 'delete', 'update', 'patch'],
			},
		},
		description: 'The ID of the lost reason',
	},

	// ----------------------------------
	//         lostReason: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['lostReason'],
				operation: ['create'],
			},
		},
		description: 'Name/description of the lost reason',
	},

	// ----------------------------------
	//         lostReason: update
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'nameUpdate',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['lostReason'],
				operation: ['update'],
			},
		},
		description: 'Name/description of the lost reason',
	},

	// ----------------------------------
	//         lostReason: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['lostReason'],
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
				resource: ['lostReason'],
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
				resource: ['lostReason'],
				operation: ['list'],
			},
		},
		description: 'Text search in lost reason names',
	},
	{
		displayName: 'Sort',
		name: 'sort',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['lostReason'],
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
				resource: ['lostReason'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Created After',
				name: 'created_after',
				type: 'dateTime',
				default: '',
				description: 'Filter reasons created after this date',
			},
			{
				displayName: 'Created Before',
				name: 'created_before',
				type: 'dateTime',
				default: '',
				description: 'Filter reasons created before this date',
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
	//         lostReason: create / update / patch options
	// ----------------------------------
	{
		displayName: 'Fields to Set',
		name: 'fieldsToSet',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['lostReason'],
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
				description: 'Whether this reason is the default reason',
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
				description: 'Name/description of the lost reason',
			},
	// Removed position field
		],
	},
];
