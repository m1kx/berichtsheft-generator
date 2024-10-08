export interface PullRequestsResponse {
  size: number
  limit: number
  isLastPage: boolean
  values: PullRequest[]
  start: number
}

export interface PullRequestActivity {
  aiDescription: string
  title: string
}

export interface PullRequest {
  id: number
  version: number
  title: string
  description: string
  state: 'OPEN' | 'DECLINED' | 'MERGED'
  open: boolean
  closed: boolean
  createdDate: number
  updatedDate: number
  closedDate?: number
  fromRef: FromRef
  toRef: ToRef
  locked: boolean
  author: Author
  reviewers: Reviewer[]
  participants: Participant[]
  properties: Properties
  links: Links12
}

export interface FromRef {
  id: string
  displayId: string
  latestCommit: string
  type: string
  repository: Repository
}

export interface Repository {
  slug: string
  id: number
  name: string
  hierarchyId: string
  scmId: string
  state: string
  statusMessage: string
  forkable: boolean
  origin: Origin
  project: Project2
  public: boolean
  links: Links4
}

export interface Origin {
  slug: string
  id: number
  name: string
  hierarchyId: string
  scmId: string
  state: string
  statusMessage: string
  forkable: boolean
  project: Project
  public: boolean
  links: Links2
}

export interface Project {
  key: string
  id: number
  name: string
  description: string
  public: boolean
  type: string
  links: Links
}

export interface Links {
  self: Self[]
}

export interface Self {
  href: string
}

export interface Links2 {
  clone: Clone[]
  self: Self2[]
}

export interface Clone {
  href: string
  name: string
}

export interface Self2 {
  href: string
}

export interface Project2 {
  key: string
  id: number
  name: string
  public: boolean
  type: string
  links: Links3
}

export interface Links3 {
  self: Self3[]
}

export interface Self3 {
  href: string
}

export interface Links4 {
  clone: Clone2[]
  self: Self4[]
}

export interface Clone2 {
  href: string
  name: string
}

export interface Self4 {
  href: string
}

export interface ToRef {
  id: string
  displayId: string
  latestCommit: string
  type: string
  repository: Repository2
}

export interface Repository2 {
  slug: string
  id: number
  name: string
  hierarchyId: string
  scmId: string
  state: string
  statusMessage: string
  forkable: boolean
  origin: Origin2
  project: Project4
  public: boolean
  links: Links8
}

export interface Origin2 {
  slug: string
  id: number
  name: string
  hierarchyId: string
  scmId: string
  state: string
  statusMessage: string
  forkable: boolean
  project: Project3
  public: boolean
  links: Links6
}

export interface Project3 {
  key: string
  id: number
  name: string
  description: string
  public: boolean
  type: string
  links: Links5
}

export interface Links5 {
  self: Self5[]
}

export interface Self5 {
  href: string
}

export interface Links6 {
  clone: Clone3[]
  self: Self6[]
}

export interface Clone3 {
  href: string
  name: string
}

export interface Self6 {
  href: string
}

export interface Project4 {
  key: string
  id: number
  name: string
  public: boolean
  type: string
  links: Links7
}

export interface Links7 {
  self: Self7[]
}

export interface Self7 {
  href: string
}

export interface Links8 {
  clone: Clone4[]
  self: Self8[]
}

export interface Clone4 {
  href: string
  name: string
}

export interface Self8 {
  href: string
}

export interface Author {
  user: User
  role: string
  approved: boolean
  status: string
}

export interface User {
  name: string
  emailAddress: string
  id: number
  displayName: string
  active: boolean
  slug: string
  type: string
  links: Links9
}

export interface Links9 {
  self: Self9[]
}

export interface Self9 {
  href: string
}

export interface Reviewer {
  user: User2
  lastReviewedCommit?: string
  role: string
  approved: boolean
  status: string
}

export interface User2 {
  name: string
  emailAddress: string
  id: number
  displayName: string
  active: boolean
  slug: string
  type: string
  links: Links10
}

export interface Links10 {
  self: Self10[]
}

export interface Self10 {
  href: string
}

export interface Participant {
  user: User3
  lastReviewedCommit?: string
  role: string
  approved: boolean
  status: string
}

export interface User3 {
  name: string
  emailAddress?: string
  id: number
  displayName: string
  active: boolean
  slug: string
  type: string
  links: Links11
}

export interface Links11 {
  self: Self11[]
}

export interface Self11 {
  href: string
}

export interface Properties {
  mergeResult: MergeResult
  qgStatus: string
  resolvedTaskCount: number
  commentCount?: number
  openTaskCount: number
}

export interface MergeResult {
  outcome: string
  current: boolean
}

export interface Links12 {
  self: Self12[]
}

export interface Self12 {
  href: string
}

export interface BranchResponse {
  size: number
  limit: number
  isLastPage: boolean
  values: Branch[]
  start: number
  nextPageStart: number
}

export interface Branch {
  id: string
  displayId: string
  type: string
  latestCommit: string
  latestChangeset: string
  isDefault: boolean
  metadata: Metadata
}

export interface Metadata {
  "com.atlassian.bitbucket.server.bitbucket-jira:branch-list-jira-issues": Issue[]
  "ch.mibex.stash.sonar4stash:sonar4stash-branch-qg-status-provider": string
  "com.atlassian.bitbucket.server.bitbucket-branch:ahead-behind-metadata-provider": ComAtlassianBitbucketServerBitbucketBranchAheadBehindMetadataProvider
  "com.atlassian.bitbucket.server.bitbucket-branch:latest-commit-metadata": ComAtlassianBitbucketServerBitbucketBranchLatestCommitMetadata
  "com.atlassian.bitbucket.server.bitbucket-build:build-status-metadata": ComAtlassianBitbucketServerBitbucketBuildBuildStatusMetadata
  "com.atlassian.bitbucket.server.bitbucket-ref-metadata:outgoing-pull-request-metadata"?: ComAtlassianBitbucketServerBitbucketRefMetadataOutgoingPullRequestMetadata
}

export interface Issue {
  key: string
  url: string
}

export interface ComAtlassianBitbucketServerBitbucketBranchAheadBehindMetadataProvider {
  ahead: number
  behind: number
}

export interface ComAtlassianBitbucketServerBitbucketBranchLatestCommitMetadata {
  id: string
  displayId: string
  author: Author
  authorTimestamp: number
  committer: Committer
  committerTimestamp: number
  message: string
  parents: Parent[]
  properties: Properties
}

export interface Author {
  name: string
  emailAddress: string
  id: number
  displayName: string
  active: boolean
  slug: string
  type: string
  links: Links
  avatarUrl: string
}

export interface Links {
  self: Self[]
}

export interface Self {
  href: string
}

export interface Committer {
  name: string
  emailAddress: string
  id: number
  displayName: string
  active: boolean
  slug: string
  type: string
  links: Links2
  avatarUrl: string
}

export interface Links2 {
  self: Self2[]
}

export interface Self2 {
  href: string
}

export interface Parent {
  id: string
  displayId: string
}

export interface Properties {
  "jira-key": string[]
}

export interface ComAtlassianBitbucketServerBitbucketBuildBuildStatusMetadata {
  successful: number
  inProgress: number
  failed: number
}

export interface ComAtlassianBitbucketServerBitbucketRefMetadataOutgoingPullRequestMetadata {
  pullRequest: PullRequest2
}

export interface PullRequest2 {
  id: number
  version: number
  title: string
  state: string
  open: boolean
  closed: boolean
  createdDate: number
  updatedDate: number
  fromRef: FromRef
  toRef: ToRef
  locked: boolean
  author: Author2
  reviewers: Reviewer[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  participants: any[]
}

export interface FromRef {
  id: string
  displayId: string
  latestCommit: string
  type: string
  repository: Repository
}

export interface Repository {
  slug: string
  id: number
  name: string
  hierarchyId: string
  scmId: string
  state: string
  statusMessage: string
  forkable: boolean
  origin: Origin
  project: Project2
  public: boolean
}

export interface Origin {
  slug: string
  id: number
  name: string
  hierarchyId: string
  scmId: string
  state: string
  statusMessage: string
  forkable: boolean
  project: Project
  public: boolean
}

export interface Project {
  key: string
  id: number
  name: string
  description: string
  public: boolean
  type: string
}

export interface Project2 {
  key: string
  id: number
  name: string
  public: boolean
  type: string
}

export interface ToRef {
  id: string
  displayId: string
  latestCommit: string
  type: string
  repository: Repository2
}

export interface Repository2 {
  slug: string
  id: number
  name: string
  hierarchyId: string
  scmId: string
  state: string
  statusMessage: string
  forkable: boolean
  origin: Origin2
  project: Project4
  public: boolean
}

export interface Origin2 {
  slug: string
  id: number
  name: string
  hierarchyId: string
  scmId: string
  state: string
  statusMessage: string
  forkable: boolean
  project: Project3
  public: boolean
}

export interface Project3 {
  key: string
  id: number
  name: string
  description: string
  public: boolean
  type: string
}

export interface Project4 {
  key: string
  id: number
  name: string
  public: boolean
  type: string
}

export interface Author2 {
  user: User
  role: string
  approved: boolean
  status: string
}

export interface User {
  name: string
  emailAddress: string
  id: number
  displayName: string
  active: boolean
  slug: string
  type: string
}

export interface Reviewer {
  user: User2
  lastReviewedCommit?: string
  role: string
  approved: boolean
  status: string
}

export interface User2 {
  name: string
  emailAddress: string
  id: number
  displayName: string
  active: boolean
  slug: string
  type: string
}
