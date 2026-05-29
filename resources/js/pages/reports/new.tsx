import { Head, Link, router } from '@inertiajs/react';
import { ChevronDown, Filter, GitBranch, Github, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { AnalyzingPanel } from '@/components/reposcope/analyzing-panel';
import { PageContainer } from '@/components/reposcope/page-container';
import { PageHeader } from '@/components/reposcope/page-header';
import { ToneBadge } from '@/components/reposcope/tone-badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useTeamSlug } from '@/hooks/use-team';
import { translate, useTranslation } from '@/lib/i18n';
import { SAMPLE_BRANCHES, SAMPLE_COMMITS } from '@/lib/reposcope/data';
import { dashboard } from '@/routes';
import reports from '@/routes/reports';

export default function NewReport() {
    const { t } = useTranslation();
    const slug = useTeamSlug();

    const [activeBranch, setActiveBranch] = useState('refactor/auth');
    const [selected, setSelected] = useState<Set<string>>(
        new Set(['8a3f29c', 'b71c004', 'd22ee18', 'e514aa1', 'f01bb27']),
    );
    const [generating, setGenerating] = useState(false);

    const toggle = (sha: string) => {
        setSelected((current) => {
            const next = new Set(current);

            if (next.has(sha)) {
                next.delete(sha);
            } else {
                next.add(sha);
            }

            return next;
        });
    };

    const allSelected = selected.size === SAMPLE_COMMITS.length;
    const toggleAll = () =>
        setSelected(
            allSelected
                ? new Set()
                : new Set(SAMPLE_COMMITS.map((commit) => commit.sha)),
        );

    const generateLabel =
        selected.size === 1
            ? t('newReport.generateFromOne')
            : t('newReport.generateFrom', { count: selected.size });

    if (generating) {
        return (
            <>
                <Head title={t('analyzing.title', { count: selected.size })} />
                <PageContainer>
                    <AnalyzingPanel
                        count={selected.size}
                        onDone={() =>
                            router.visit(
                                reports.show({
                                    current_team: slug,
                                    report: 'r1',
                                }).url,
                            )
                        }
                    />
                </PageContainer>
            </>
        );
    }

    return (
        <>
            <Head title={t('newReport.title')} />

            <PageContainer>
                <PageHeader
                    title={t('newReport.title')}
                    subtitle={t('newReport.subtitle')}
                    actions={
                        <>
                            <Button variant="outline" asChild>
                                <Link href={dashboard(slug)}>
                                    {t('common.cancel')}
                                </Link>
                            </Button>
                            <Button
                                disabled={selected.size === 0}
                                onClick={() => setGenerating(true)}
                            >
                                <Sparkles className="size-4" />
                                {generateLabel}
                            </Button>
                        </>
                    }
                />

                <Card className="mb-4 flex-row items-center gap-4 px-4 py-3.5">
                    <div className="flex size-8 items-center justify-center rounded-md bg-secondary text-muted-foreground">
                        <Github className="size-[18px]" />
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-medium">
                            acme/api-gateway
                        </div>
                        <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                            {t('newReport.repoSynced', { time: '2 min ago' })}
                        </div>
                    </div>
                    <Button variant="outline" size="sm">
                        {t('newReport.changeRepo')}
                        <ChevronDown className="size-4" />
                    </Button>
                </Card>

                <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
                    {/* Branches */}
                    <Card className="gap-1 p-3">
                        <div className="px-2.5 pb-2 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                            {t('newReport.branches')}
                        </div>
                        {SAMPLE_BRANCHES.map((branch) => (
                            <button
                                key={branch.name}
                                type="button"
                                onClick={() => setActiveBranch(branch.name)}
                                className={`flex items-center justify-between rounded-md px-2.5 py-2 text-left transition-colors hover:bg-secondary ${
                                    activeBranch === branch.name
                                        ? 'bg-secondary'
                                        : ''
                                }`}
                            >
                                <span className="flex items-center gap-2 font-mono text-[13px]">
                                    <GitBranch className="size-3.5 text-muted-foreground" />
                                    {branch.name}
                                </span>
                                <span className="font-mono text-[11px] text-muted-foreground">
                                    +{branch.ahead}
                                </span>
                            </button>
                        ))}
                    </Card>

                    {/* Commits */}
                    <Card className="overflow-hidden py-0">
                        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                            <Checkbox
                                checked={allSelected}
                                onCheckedChange={toggleAll}
                                aria-label={t('common.selectAll')}
                            />
                            <span className="text-[13px] font-medium text-muted-foreground">
                                {t('newReport.commitsSelected', {
                                    count: selected.size,
                                    total: SAMPLE_COMMITS.length,
                                })}
                            </span>
                            <div className="flex-1" />
                            <div className="hidden w-56 sm:block">
                                <Input
                                    placeholder={t(
                                        'newReport.commitFilterPlaceholder',
                                    )}
                                    className="h-8 text-[13px]"
                                />
                            </div>
                            <Button variant="outline" size="sm">
                                <Filter className="size-4" />
                                {t('newReport.author')}
                            </Button>
                        </div>

                        {SAMPLE_COMMITS.map((commit) => {
                            const isChecked = selected.has(commit.sha);

                            return (
                                <div
                                    key={commit.sha}
                                    onClick={() => toggle(commit.sha)}
                                    className="flex cursor-pointer items-center gap-3 border-b border-border px-4 py-3 transition-colors last:border-b-0 hover:bg-secondary/60"
                                >
                                    <Checkbox
                                        checked={isChecked}
                                        className="pointer-events-none"
                                        tabIndex={-1}
                                    />
                                    <ToneBadge tone="info" mono>
                                        {commit.sha}
                                    </ToneBadge>
                                    <span className="min-w-0 flex-1 truncate text-[13px]">
                                        {commit.message}
                                    </span>
                                    <span className="hidden text-xs text-muted-foreground sm:block">
                                        @{commit.author}
                                    </span>
                                    <span className="hidden w-20 text-right font-mono text-[11px] text-muted-foreground md:block">
                                        {commit.when}
                                    </span>
                                </div>
                            );
                        })}
                    </Card>
                </div>
            </PageContainer>
        </>
    );
}

NewReport.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: translate('nav.reports'),
            href: props.currentTeam
                ? reports.index(props.currentTeam.slug)
                : '/',
        },
        {
            title: translate('newReport.title'),
            href: props.currentTeam
                ? reports.new(props.currentTeam.slug)
                : '/',
        },
    ],
});
