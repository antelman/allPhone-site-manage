import { Account, Client } from 'appwrite';
import { environment } from '../environments/environment';

export const client = new Client();

client.setEndpoint(environment.apiEndpoint).setProject(environment.projectId);

export const account = new Account(client);
