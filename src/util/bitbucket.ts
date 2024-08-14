import type { PullRequest, PullRequestsResponse } from "../types/bitbucket";
import { loadConfig } from "./config";
import fetch, { Headers, Response } from 'node-fetch';
import { isPullRequestInTimeRange } from "./pullrequest";

const config = loadConfig();

const getPullRequestsUrl = () => {
  return `${config.base_url}/projects/${config.project}/repos/${config.repo}/pull-requests?state=ALL&limit=500`;
}

export const getAllPullRequestsFromUserInTimeRange = async (start: Date, end: Date, username: string): Promise<PullRequest[]> => {
  const allPullRequestsFromUser = getAllPullRequestsFromUser(username);
  return (await allPullRequestsFromUser).filter(pr => isPullRequestInTimeRange(start, end, pr));
}

export const getAllPullRequestsFromUser = async (username: string): Promise<PullRequest[]> => {
  const allPullRequests = await getAllPullRequests();
  return allPullRequests.filter(pr => pr.author.user.name === username);
}

export const getAllPullRequests = async (): Promise<PullRequest[]> => {
  const pullRequests = (await fetchPullRequests()).values;
  return pullRequests;
}

export const fetchPullRequests = async (): Promise<PullRequestsResponse> => {
  const url = getPullRequestsUrl();
  const response: Response = await fetch(url, {
    method: 'get',
    headers: new Headers({
      Authorization: `Bearer ${config.bitbucket_token}`
    })
  });
  const data: PullRequestsResponse = (await response.json()) as PullRequestsResponse;
  return data;
}