export type ReportStatus = 'ready' | 'generating' | 'failed';

export type ReportSummary = {
    id: string;
    title: string;
    repo: string;
    branch: string;
    commits: number;
    when: string;
    status: ReportStatus;
    added: string;
    removed: string;
};

export type Branch = {
    name: string;
    ahead: number;
};

export type Commit = {
    sha: string;
    message: string;
    author: string;
    when: string;
};

export type RepoVisibility = 'private' | 'public';

export type Repository = {
    id: string;
    name: string;
    visibility: RepoVisibility;
    defaultBranch: string;
    branches: number;
    lastReport: string;
    synced: string;
};

export type MemberRole = 'owner' | 'admin' | 'member';

export type Member = {
    id: string;
    name: string;
    email: string;
    role: MemberRole;
    initials: string;
    isYou?: boolean;
};

export type Invitation = {
    email: string;
    role: MemberRole;
    when: string;
};

export type ChannelKind = 'slack' | 'telegram' | 'email';

export type Channel = {
    id: string;
    kind: ChannelKind;
    name: string;
    handle: string;
};

export type ReportItem = {
    text: string;
    meta?: string[];
};

export type ReportDetail = {
    id: string;
    title: string;
    titleAccent: string;
    summary: string;
    repo: string;
    branch: string;
    commitsRange: string;
    authors: string;
    template: string;
    metrics: {
        commits: string;
        commitsDelta?: string;
        added: string;
        removed: string;
        coverage: string;
        coverageDelta?: string;
    };
    shipped: ReportItem[];
    improved: ReportItem[];
    opportunities: ReportItem[];
    notes: string[];
};
