import type { TicketResponse } from '../types/jira';
import { loadConfig } from './config';
import fetch from 'node-fetch';

const config = loadConfig();

export const getIssueDescription = async (ticket: string): Promise<string> => {
  const response = await fetch(`${config.jira_base_url}/rest/api/2/issue/${ticket}`, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${config.username}@check24.de:${config.jira}`).toString('base64')}`,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) return "";

  const data: TicketResponse = (await response.json()) as TicketResponse;
  return data.fields.description;
}

export const getTicketHeading = async (ticket: string): Promise<string> => {
  const response = await fetch(`${config.jira_base_url}/rest/api/2/issue/${ticket}`, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${config.username}@check24.de:${config.jira}`).toString('base64')}`,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) return "";

  const data: TicketResponse = (await response.json()) as TicketResponse;

  return data.fields.summary;
}