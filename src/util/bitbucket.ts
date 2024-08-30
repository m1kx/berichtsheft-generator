import type { PullRequest, PullRequestsResponse } from "../types/bitbucket";
import { loadConfig } from "./config";
import fetch, { Headers, Response } from 'node-fetch';
import { isPullRequestInTimeRange } from "./pullrequest";

const config = loadConfig();

const getPullRequestsUrl = (repo: string) => {
  return `${config.base_url}/projects/${config.project}/repos/${repo}/pull-requests?state=ALL&limit=1000`;
}

export const getAllPullRequestsFromUserInTimeRange = async (start: Date, end: Date, repo: string): Promise<PullRequest[]> => {
  const allPullRequestsFromUser = getAllPullRequestsFromUser(config.username, repo);
  return (await allPullRequestsFromUser).filter(pr => isPullRequestInTimeRange(start, end, pr));
}

export const getAllPullRequestsFromUser = async (username: string, repo: string): Promise<PullRequest[]> => {
  const allPullRequests = await getAllPullRequests(repo);
  return allPullRequests.filter(pr => pr.author.user.name === username);
}

export const getAllPullRequests = async (repo: string): Promise<PullRequest[]> => {
  const pullRequests = (await fetchPullRequests(repo)).values;
  return pullRequests;
}

export const fetchPullRequests = async (repo: string): Promise<PullRequestsResponse> => {
  const url = getPullRequestsUrl(repo);
  const response: Response = await fetch(url, {
    method: 'get',
    headers: new Headers({
      Authorization: `Bearer ${config.bitbucket_token}`
    })
  });
  const data: PullRequestsResponse = (await response.json()) as PullRequestsResponse;
  return data;
}