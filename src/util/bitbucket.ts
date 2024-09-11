import type { Branch, BranchResponse, PullRequest, PullRequestsResponse } from "../types/bitbucket";
import { loadConfig } from "./config";
import fetch, { Headers, Response } from 'node-fetch';
import { isPullRequestInTimeRange } from "./pullrequest";
import { isBranchUpdateInTimeRange } from "./branch";

const config = loadConfig();

const getPullRequestsUrl = (repo: string) => {
  return `${config.base_url}/projects/${config.project}/repos/${repo}/pull-requests?state=ALL&limit=1000`;
}

const getBranchRequestUrl = (repo: string) => {
  return `${config.base_url}/projects/${config.project}/repos/${repo}/branches?limit=1000&details=true`;
}

export const getAllBranchesFromUserInTimeRange = async (start: Date, end: Date, repo: string): Promise<Branch[]> => {
  const allBranchesFromUser = getAllBranchesFromUser(config.username, repo);
  return (await allBranchesFromUser).filter(branch => isBranchUpdateInTimeRange(start, end, branch));
}

export const getAllBranchesFromUser = async (username: string, repo: string): Promise<Branch[]> => {
  const allBranches = await getAllBranches(repo);
  return allBranches.filter(branch => {
    if (!branch.metadata["com.atlassian.bitbucket.server.bitbucket-branch:latest-commit-metadata"]?.author?.name) {
      return false;
    }
    return branch.metadata["com.atlassian.bitbucket.server.bitbucket-branch:latest-commit-metadata"].author.name === username;
  });
}

export const getAllBranches = async (repo: string): Promise<Branch[]> => {
  const branches = (await fetchBranches(repo)).values;
  return branches;
}

export const fetchBranches = async (repo: string): Promise<BranchResponse> => {
  const url = getBranchRequestUrl(repo);  const response: Response = await fetch(url, {
    method: 'get',
    headers: new Headers({
      Authorization: `Bearer ${config.bitbucket_token}`
    })
  });
  const data: BranchResponse = (await response.json()) as BranchResponse;
  return data;
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