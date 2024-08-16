/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TicketResponse {
  expand: string
  id: string
  self: string
  key: string
  fields: Fields
}

export interface Fields {
  statuscategorychangedate: string
  issuetype: Issuetype
  timespent: any
  customfield_10030: any
  customfield_10031: any
  project: Project
  fixVersions: any[]
  aggregatetimespent: any
  resolution: any
  customfield_10035: any
  customfield_10027: any
  customfield_10028: any
  customfield_10029: any
  resolutiondate: any
  workratio: number
  issuerestriction: Issuerestriction
  lastViewed: string
  watches: Watches
  created: string
  customfield_10020: any
  customfield_10021: any
  customfield_10022: any
  customfield_10023: any
  priority: Priority
  labels: string[]
  customfield_10016: any
  customfield_10017: any
  customfield_10018: Customfield10018
  customfield_10019: string
  timeestimate: number
  aggregatetimeoriginalestimate: number
  versions: any[]
  issuelinks: any[]
  assignee: Assignee
  updated: string
  status: Status
  components: any[]
  customfield_11061: any
  customfield_11062: any
  timeoriginalestimate: number
  customfield_11063: any
  description: string
  customfield_11065: any
  customfield_11066: any
  customfield_10010: any
  customfield_10054: Customfield10054[]
  customfield_11067: any
  customfield_10057: string
  customfield_10058: any
  customfield_10014: any
  customfield_10059: any
  customfield_10015: any
  timetracking: Timetracking
  aggregatetimeestimate: number
  attachment: Attachment[]
  summary: string
  creator: Creator
  subtasks: any[]
  customfield_10040: Customfield10040
  customfield_10041: any
  customfield_10042: any
  reporter: Reporter
  customfield_10043: any
  customfield_10044: any
  customfield_10000: string
  aggregateprogress: Aggregateprogress
  customfield_10001: any
  customfield_10002: any[]
  customfield_10046: any
  customfield_10047: any
  customfield_10004: any
  environment: any
  duedate: any
  progress: Progress
  votes: Votes
  comment: Comment
  worklog: Worklog
}

export interface Issuetype {
  self: string
  id: string
  description: string
  iconUrl: string
  name: string
  subtask: boolean
  avatarId: number
  hierarchyLevel: number
}

export interface Project {
  self: string
  id: string
  key: string
  name: string
  projectTypeKey: string
  simplified: boolean
  avatarUrls: AvatarUrls
}

export interface AvatarUrls {
  "48x48": string
  "24x24": string
  "16x16": string
  "32x32": string
}

export interface Issuerestriction {
  issuerestrictions: Issuerestrictions
  shouldDisplay: boolean
}

export interface Issuerestrictions {}

export interface Watches {
  self: string
  watchCount: number
  isWatching: boolean
}

export interface Priority {
  self: string
  iconUrl: string
  name: string
  id: string
}

export interface Customfield10018 {
  hasEpicLinkFieldDependency: boolean
  showField: boolean
  nonEditableReason: NonEditableReason
}

export interface NonEditableReason {
  reason: string
  message: string
}

export interface Assignee {
  self: string
  accountId: string
  emailAddress: string
  avatarUrls: AvatarUrls2
  displayName: string
  active: boolean
  timeZone: string
  accountType: string
}

export interface AvatarUrls2 {
  "48x48": string
  "24x24": string
  "16x16": string
  "32x32": string
}

export interface Status {
  self: string
  description: string
  iconUrl: string
  name: string
  id: string
  statusCategory: StatusCategory
}

export interface StatusCategory {
  self: string
  id: number
  key: string
  colorName: string
  name: string
}

export interface Customfield10054 {
  self: string
  value: string
  id: string
}

export interface Timetracking {
  originalEstimate: string
  remainingEstimate: string
  originalEstimateSeconds: number
  remainingEstimateSeconds: number
}

export interface Attachment {
  self: string
  id: string
  filename: string
  author: Author
  created: string
  size: number
  mimeType: string
  content: string
  thumbnail?: string
}

export interface Author {
  self: string
  accountId: string
  emailAddress: string
  avatarUrls: AvatarUrls3
  displayName: string
  active: boolean
  timeZone: string
  accountType: string
}

export interface AvatarUrls3 {
  "48x48": string
  "24x24": string
  "16x16": string
  "32x32": string
}

export interface Creator {
  self: string
  accountId: string
  emailAddress: string
  avatarUrls: AvatarUrls4
  displayName: string
  active: boolean
  timeZone: string
  accountType: string
}

export interface AvatarUrls4 {
  "48x48": string
  "24x24": string
  "16x16": string
  "32x32": string
}

export interface Customfield10040 {
  self: string
  accountId: string
  emailAddress: string
  avatarUrls: AvatarUrls5
  displayName: string
  active: boolean
  timeZone: string
  accountType: string
}

export interface AvatarUrls5 {
  "48x48": string
  "24x24": string
  "16x16": string
  "32x32": string
}

export interface Reporter {
  self: string
  accountId: string
  emailAddress: string
  avatarUrls: AvatarUrls6
  displayName: string
  active: boolean
  timeZone: string
  accountType: string
}

export interface AvatarUrls6 {
  "48x48": string
  "24x24": string
  "16x16": string
  "32x32": string
}

export interface Aggregateprogress {
  progress: number
  total: number
  percent: number
}

export interface Progress {
  progress: number
  total: number
  percent: number
}

export interface Votes {
  self: string
  votes: number
  hasVoted: boolean
}

export interface Comment {
  comments: Comment2[]
  self: string
  maxResults: number
  total: number
  startAt: number
}

export interface Comment2 {
  self: string
  id: string
  author: Author2
  body: string
  updateAuthor: UpdateAuthor
  created: string
  updated: string
  jsdPublic: boolean
}

export interface Author2 {
  self: string
  accountId: string
  emailAddress: string
  avatarUrls: AvatarUrls7
  displayName: string
  active: boolean
  timeZone: string
  accountType: string
}

export interface AvatarUrls7 {
  "48x48": string
  "24x24": string
  "16x16": string
  "32x32": string
}

export interface UpdateAuthor {
  self: string
  accountId: string
  emailAddress: string
  avatarUrls: AvatarUrls8
  displayName: string
  active: boolean
  timeZone: string
  accountType: string
}

export interface AvatarUrls8 {
  "48x48": string
  "24x24": string
  "16x16": string
  "32x32": string
}

export interface Worklog {
  startAt: number
  maxResults: number
  total: number
  worklogs: any[]
}
