import type { Branch } from "../types/bitbucket";

export const isBranchUpdateInTimeRange = (start: Date, end: Date, branch: Branch) => {
    const updatedAt = new Date(branch.metadata["com.atlassian.bitbucket.server.bitbucket-branch:latest-commit-metadata"].committerTimestamp);
    return updatedAt > start && updatedAt < end;
  }