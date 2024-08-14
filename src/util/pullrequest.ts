import type { PullRequest } from "../types/bitbucket";
import { dayNames } from "./date";

export const stateTranslations = {
  OPEN: 'Offen',
  DECLINED: 'Abgelehnt',
  MERGED: 'Angenommen',
}

export const formatPullRequest = (pr: PullRequest): string => {
  const createdAt = new Date(pr.createdDate);
  return `[${dayNames[createdAt.getDay()]}][status=${stateTranslations[pr.state]}]: ${pr.title.split('FEWOFE-')[1]?.replace(/(\r\n|\n|\r)/gm, "")}`;
}

export const isPullRequestInTimeRange = (start: Date, end: Date, pr: PullRequest) => {
  const createdAt = new Date(pr.createdDate);
  return createdAt > start && createdAt < end;
}