import { INodeProperties } from 'n8n-workflow';

export const metaOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['meta'],
			},
		},
		options: [
			{
				name: 'Get Me',
				value: 'me',
				description: 'Get information about the current user',
				action: 'Get current user information',
			},
			{
				name: 'Ping',
				value: 'ping',
				description: 'Ping the API to check if it is running',
				action: 'Ping the API',
			},
		],
		default: 'ping',
	},
];

export const metaFields: INodeProperties[] = [
	// No fields required for /ping and /me
];
