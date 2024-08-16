import fetch from "node-fetch";
import { loadConfig } from "./config"
import type { OllamaResponse } from "../types/ollama";
import { getIssueDescription } from "./jira";

const config = loadConfig();

const getPrompt = (description: string): string => {
  return config.ollama_prompt.replace('{DESCRIPTION}', description)
}

export const getTicketActivity = async (ticket: string): Promise<string> => {
  const description = await getIssueDescription(ticket);
  return await ticketDescriptionToActivity(description);
}

export const ticketDescriptionToActivity = async (description: string): Promise<string> => {
  const prompt = getPrompt(description);

  const response = await fetch("http://localhost:11434/api/generate", {
    body: `{"model": "llama3.1","prompt":"${prompt.replace(/(\r\n|\n|\r)/gm, "").replaceAll('"', '')}"}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  });

  const responseParts = (await response.text()).split('\n');
  const responsePartsObj: Array<OllamaResponse> = [];
  for (const response of responseParts) {
    const jObj: OllamaResponse = JSON.parse(response);
    if (jObj.done) break;

    responsePartsObj.push(jObj);
  }

  return responsePartsObj.map((res) => res.response).join('')
}