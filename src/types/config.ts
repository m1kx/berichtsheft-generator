export interface Config {
  username: string;
  base_url: string;
  bitbucket_token: string;
  project: string;
  repos: string[];
  jira: string;
  jira_base_url: string;
  ollama_prompt: string;
  ollama_endpoint: string;
}