import {
	ICredentialType,
	INodeProperties,
	IHttpRequestMethods,
	Icon,
} from 'n8n-workflow';

export class AlzeApi implements ICredentialType {
	name = 'alzeApi';
	displayName = 'Alze API';
	documentationUrl = 'https://github.com/synapsolab/alze-n8n-community-nodes';
	icon: Icon = 'file:alze.svg';
	test = {
		request: {
			method: 'GET' as IHttpRequestMethods,
			url: 'https://hjjqtkdmxpqzjjlsebfv.supabase.co/functions/v1/public-api/users/me',
			headers: {
				'Authorization': '={{ "Bearer " + $credentials.apiKey }}',
			},
		},
	};
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'The API Key issued for your Alze CRM workspace',
		},
	];
}
