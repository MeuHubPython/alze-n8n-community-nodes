import { INodeProperties } from 'n8n-workflow';

export const channelOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['channel'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new channel',
				action: 'Create a channel',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a channel',
				action: 'Delete a channel',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of a channel',
				action: 'Get a channel',
			},
			{
				name: 'Get Many',
				value: 'list',
				description: 'List channels',
				action: 'Get many channels',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a channel (clears omitted fields)',
				action: 'Update a channel',
			},
			{
				name: 'Update Partial',
				value: 'patch',
				description: 'Update a channel partially (incremental edit)',
				action: 'Update partial channel',
			},
		],
		default: 'list',
	},
];

export const channelFields: INodeProperties[] = [
	// ----------------------------------
	//         channel: get / delete / update / patch
	// ----------------------------------
	{
		displayName: 'Channel ID',
		name: 'channelId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['channel'],
				operation: ['get', 'delete', 'update', 'patch'],
			},
		},
		description: 'The ID of the channel',
	},

	// ----------------------------------
	//         channel: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['channel'],
				operation: ['create'],
			},
		},
		description: 'Name/title of the channel',
	},

	// ----------------------------------
	//         channel: update
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'nameUpdate',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['channel'],
				operation: ['update'],
			},
		},
		description: 'Name/title of the channel',
	},

	// ----------------------------------
	//         channel: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: ['list'],
				resource: ['channel'],
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
				resource: ['channel'],
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
				resource: ['channel'],
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
				resource: ['channel'],
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
				resource: ['channel'],
				operation: ['list'],
			},
		},
		options: [],
	},

	// ----------------------------------
	//         channel: create / update / patch options
	// ----------------------------------
	{
		displayName: 'Fields to Set',
		name: 'fieldsToSet',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['channel'],
				operation: ['create', 'update', 'patch'],
			},
		},
		options: [
			{
				displayName: 'Is Default',
				name: 'is_default',
				type: 'boolean',
				default: false,
				description: 'Whether this is the default option',
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
				description: 'Name of the channel',
			},
		],
	},
];
