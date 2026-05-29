import { Head, Link } from '@inertiajs/react';
import { FileSearch, Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { EmptyState } from '@/components/reposcope/empty-state';
import { PageContainer } from '@/components/reposcope/page-container';
import { PageHeader } from '@/components/reposcope/page-header';
import { ReportRow } from '@/components/reposcope/report-row';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useTeamSlug } from '@/hooks/use-team';
import { translate, useTranslation } from '@/lib/i18n';
import { SAMPLE_REPORTS } from '@/lib/reposcope/data';
import type { ReportStatus } from '@/lib/reposcope/types';
import reports from '@/routes/reports';

type StatusFilter = 'all' | ReportStatus;

const STATUS_FILTERS: StatusFilter[] = [
    'all',
    'ready',
    'generating',
    'failed',
];

export default function ReportsIndex() {
    const { t } = useTranslation();
    const slug = useTeamSlug();
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState<StatusFilter>('all');

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();

        return SAMPLE_REPORTS.filter((report) => {
            const matchesStatus =
                status === 'all' || report.status === status;
            const matchesQuery =
                q === '' ||
                [report.title, report.repo, report.branch]
                    .join(' ')
                    .toLowerCase()
                    .includes(q);

            return matchesStatus && matchesQuery;
        });
    }, [query, status]);

    const statusLabel = (value: StatusFilter): string => {
        switch (value) {
            case 'ready':
                return t('reports.statusReady');
            case 'generating':
                return t('reports.statusGenerating');
            case 'failed':
                return t('reports.statusFailed');
            default:
                return t('reports.allStatuses');
        }
    };

    return (
        <>
            <Head title={t('reports.title')} />

            <PageContainer>
                <PageHeader
                    title={t('reports.title')}
                    subtitle={t('reports.subtitle')}
                    actions={
                        <Button asChild>
                            <Link href={reports.new(slug)}>
                                <Plus className="size-4" />
                                {t('reports.newReport')}
                            </Link>
                        </Button>
                    }
                />

                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder={t('reports.searchPlaceholder')}
                            className="pl-9"
                        />
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {STATUS_FILTERS.map((value) => (
                            <Button
                                key={value}
                                size="sm"
                                variant={
                                    status === value ? 'default' : 'outline'
                                }
                                onClick={() => setStatus(value)}
                            >
                                {statusLabel(value)}
                            </Button>
                        ))}
                    </div>
                </div>

                <Card className="overflow-hidden py-0">
                    {filtered.length > 0 ? (
                        filtered.map((report) => (
                            <ReportRow
                                key={report.id}
                                report={report}
                                slug={slug}
                            />
                        ))
                    ) : (
                        <EmptyState
                            icon={FileSearch}
                            title={t('reports.empty')}
                            hint={t('reports.emptyHint')}
                            action={
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setQuery('');
                                        setStatus('all');
                                    }}
                                >
                                    {t('common.filter')}
                                </Button>
                            }
                        />
                    )}
                </Card>
            </PageContainer>
        </>
    );
}

ReportsIndex.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: translate('nav.reports'),
            href: props.currentTeam
                ? reports.index(props.currentTeam.slug)
                : '/',
        },
    ],
});
