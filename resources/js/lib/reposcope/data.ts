import type {
    Branch,
    Channel,
    Commit,
    Invitation,
    Member,
    ReportDetail,
    ReportSummary,
    Repository,
} from './types';

export const SAMPLE_REPORTS: ReportSummary[] = [
    {
        id: 'r1',
        title: 'Authentication refactor — week of May 6',
        repo: 'acme/api-gateway',
        branch: 'refactor/auth',
        commits: 47,
        when: '2 hours ago',
        status: 'ready',
        added: '+1,284',
        removed: '−412',
    },
    {
        id: 'r2',
        title: 'Onboarding polish & empty states',
        repo: 'acme/web',
        branch: 'feat/onboarding',
        commits: 23,
        when: 'Yesterday',
        status: 'ready',
        added: '+612',
        removed: '−108',
    },
    {
        id: 'r3',
        title: 'Payments — Stripe webhook hardening',
        repo: 'acme/api-gateway',
        branch: 'fix/stripe-webhooks',
        commits: 12,
        when: '2 days ago',
        status: 'ready',
        added: '+284',
        removed: '−54',
    },
    {
        id: 'r4',
        title: 'Realtime presence spike',
        repo: 'acme/web',
        branch: 'spike/presence',
        commits: 8,
        when: '3 days ago',
        status: 'generating',
        added: '+196',
        removed: '−12',
    },
    {
        id: 'r5',
        title: 'Q1 retrospective — all merged work',
        repo: 'acme/api-gateway',
        branch: 'main',
        commits: 184,
        when: 'Mar 31',
        status: 'ready',
        added: '+9,420',
        removed: '−3,108',
    },
];

export const SAMPLE_BRANCHES: Branch[] = [
    { name: 'main', ahead: 0 },
    { name: 'refactor/auth', ahead: 47 },
    { name: 'feat/onboarding', ahead: 23 },
    { name: 'fix/stripe-webhooks', ahead: 12 },
    { name: 'chore/deps', ahead: 4 },
    { name: 'docs/architecture', ahead: 9 },
];

export const SAMPLE_COMMITS: Commit[] = [
    {
        sha: '8a3f29c',
        message: 'feat(auth): rotate refresh tokens on every grant',
        author: 'ana',
        when: '2h ago',
    },
    {
        sha: 'b71c004',
        message: 'fix(api): handle missing Accept header on /reports',
        author: 'tom',
        when: '5h ago',
    },
    {
        sha: 'd22ee18',
        message: 'refactor: extract ReportGenerator from controller',
        author: 'ana',
        when: 'yesterday',
    },
    {
        sha: 'e514aa1',
        message: 'test: cover token-rotation edge cases (expired, revoked)',
        author: 'paul',
        when: 'yesterday',
    },
    {
        sha: 'f01bb27',
        message: 'feat(integrations): wire Slack webhook for share-to-channel',
        author: 'yui',
        when: '2 days ago',
    },
    {
        sha: '2cb44d0',
        message: 'chore: bump laravel/sanctum to 4.0.3',
        author: 'tom',
        when: '2 days ago',
    },
    {
        sha: '901ee48',
        message: 'docs(adr): record decision to use Inertia + React',
        author: 'ana',
        when: '3 days ago',
    },
];

export const SAMPLE_REPOSITORIES: Repository[] = [
    {
        id: 'api-gateway',
        name: 'acme/api-gateway',
        visibility: 'private',
        defaultBranch: 'main',
        branches: 14,
        lastReport: '2 hours ago',
        synced: '2 min ago',
    },
    {
        id: 'web',
        name: 'acme/web',
        visibility: 'private',
        defaultBranch: 'main',
        branches: 9,
        lastReport: 'Yesterday',
        synced: '8 min ago',
    },
    {
        id: 'design-system',
        name: 'acme/design-system',
        visibility: 'public',
        defaultBranch: 'trunk',
        branches: 3,
        lastReport: 'Last week',
        synced: '1 hour ago',
    },
];

export const SAMPLE_MEMBERS: Member[] = [
    {
        id: 'ana',
        name: 'Ana Romero',
        email: 'ana@acme.co',
        role: 'owner',
        initials: 'AR',
        isYou: true,
    },
    {
        id: 'tom',
        name: 'Tom Becker',
        email: 'tom@acme.co',
        role: 'admin',
        initials: 'TB',
    },
    {
        id: 'paul',
        name: 'Paul Ndiaye',
        email: 'paul@acme.co',
        role: 'member',
        initials: 'PN',
    },
    {
        id: 'yui',
        name: 'Yui Tanaka',
        email: 'yui@acme.co',
        role: 'member',
        initials: 'YT',
    },
];

export const SAMPLE_INVITATIONS: Invitation[] = [
    { email: 'sam@acme.co', role: 'member', when: '2 days ago' },
    { email: 'lead@acme.co', role: 'admin', when: '5 days ago' },
];

export const SAMPLE_CHANNELS: Channel[] = [
    {
        id: 'slack-eng',
        kind: 'slack',
        name: 'Slack · #engineering',
        handle: 'acme-corp.slack.com',
    },
    {
        id: 'slack-leads',
        kind: 'slack',
        name: 'Slack · #leads',
        handle: 'acme-corp.slack.com',
    },
    {
        id: 'tg-board',
        kind: 'telegram',
        name: 'Telegram · Board chat',
        handle: 't.me/+acme-board',
    },
    {
        id: 'email',
        kind: 'email',
        name: 'Email summary',
        handle: 'leads@acme.co',
    },
];

export const ANALYZING_STEPS: { delay: number; line: string; ok?: boolean }[] = [
    { delay: 0, line: 'Fetching commits from refactor/auth…' },
    { delay: 700, line: 'Read 5 commits across 12 files', ok: true },
    { delay: 1400, line: 'Summarizing diffs with claude-haiku…' },
    { delay: 2300, line: 'Identified 3 improvements, 1 opportunity', ok: true },
    { delay: 3100, line: 'Applying "Weekly progress" template…' },
    { delay: 3700, line: 'Writing release-notes summary', ok: true },
    { delay: 4400, line: 'Done. Opening report…', ok: true },
];

export const SAMPLE_REPORT_DETAIL: ReportDetail = {
    id: 'r1',
    title: 'Authentication refactor —',
    titleAccent: 'what shipped this week.',
    summary:
        'We rotated refresh tokens on every OAuth grant, split the report generator out of the auth controller, and wired Slack share-to-channel end to end. Coverage on auth is now 91%.',
    repo: 'acme/api-gateway',
    branch: 'refactor/auth',
    commitsRange: '5 · 8a3f29c…f01bb27',
    authors: '@ana @tom @paul @yui',
    template: 'Weekly progress · v1',
    metrics: {
        commits: '5',
        commitsDelta: '↑ +2',
        added: '+1,284',
        removed: '−412',
        coverage: '91%',
        coverageDelta: '↑ +18',
    },
    shipped: [
        {
            text: 'Refresh-token rotation is now mandatory on every OAuth grant. Tokens cannot be replayed across sessions.',
            meta: ['+184', '8a3f29c', 'closes #418'],
        },
        {
            text: 'Reports list is paginated server-side; first paint is ~340ms faster on the dashboard.',
            meta: ['+212', 'd22ee18'],
        },
        {
            text: 'Slack share-to-channel is wired end-to-end. Users can drop a report into any channel they belong to.',
            meta: ['+418', 'f01bb27'],
        },
    ],
    improved: [
        {
            text: 'Auth controller is split: ReportGenerator owns prompt assembly, AuthController only handles the OAuth handshake.',
            meta: ['refactor', 'd22ee18'],
        },
        {
            text: 'Test coverage on auth is up to 91% (from 73%) — token-expiry edge cases are now under contract.',
            meta: ['tests', 'e514aa1'],
        },
    ],
    opportunities: [
        {
            text: 'ReportGenerator now has 4 responsibilities (prompt build, model call, template render, persist). Worth splitting before adding more templates.',
        },
        {
            text: 'No retries on the Slack webhook — a transient 5xx will drop the share silently.',
        },
    ],
    notes: [
        '**Auth** — Refresh tokens rotate on every grant. Sessions no longer share a long-lived refresh token.',
        '**Reports** — Server-side pagination on `/reports`. Faster dashboard.',
        '**Integrations** — Share to Slack channels. Telegram is next.',
        '**Fixed** — Missing `Accept` header on `/reports` no longer 500s.',
    ],
};
