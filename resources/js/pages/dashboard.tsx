import { Head, Link } from '@inertiajs/react';
import { FileText, Filter, Plus, Search } from 'lucide-react';
import { EmptyState } from '@/components/reposcope/empty-state';
import { MetricTile } from '@/components/reposcope/metric-tile';
import { PageContainer } from '@/components/reposcope/page-container';
import { PageHeader } from '@/components/reposcope/page-header';
import { ReportRow } from '@/components/reposcope/report-row';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTeamSlug } from '@/hooks/use-team';
import { translate, useTranslation } from '@/lib/i18n';
import { SAMPLE_REPORTS } from '@/lib/reposcope/data';
import { dashboard } from '@/routes';
import reports from '@/routes/reports';

export default function Dashboard() {
    const { t } = useTranslation();
    const slug = useTeamSlug();
    const recent = SAMPLE_REPORTS.slice(0, 4);

    return (
        <>
            <Head title={t('dashboard.title')} />

            <PageContainer>
                <PageHeader
                    title={t('dashboard.title')}
                    subtitle={t('dashboard.subtitle')}
                    actions={
                        <Button asChild>
                            <Link href={reports.new(slug)}>
                                <Plus className="size-4" />
                                {t('dashboard.newReport')}
                            </Link>
                        </Button>
                    }
                />

                <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <MetricTile
                        label={t('dashboard.metricReportsThisMonth')}
                        value="12"
                        delta="↑ +4"
                    />
                    <MetricTile
                        label={t('dashboard.metricReposConnected')}
                        value="3"
                    />
                    <MetricTile
                        label={t('dashboard.metricTeamMembers')}
                        value="5"
                    />
                    <MetricTile
                        label={t('dashboard.metricSharedThisWeek')}
                        value="7"
                        hint={t('dashboard.viaSlack')}
                    />
                </div>

                <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-lg font-semibold tracking-tight">
                        {t('dashboard.recentReports')}
                    </h2>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Filter className="size-4" />
                            {t('common.filter')}
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                            <Link href={reports.index(slug)}>
                                <Search className="size-4" />
                                {t('common.search')}
                            </Link>
                        </Button>
                    </div>
                </div>

                <Card className="overflow-hidden py-0">
                    {recent.length > 0 ? (
                        recent.map((report) => (
                            <ReportRow
                                key={report.id}
                                report={report}
                                slug={slug}
                            />
                        ))
                    ) : (
                        <EmptyState
                            icon={FileText}
                            title={t('dashboard.empty')}
                            hint={t('dashboard.emptyHint')}
                            action={
                                <Button asChild>
                                    <Link href={reports.new(slug)}>
                                        <Plus className="size-4" />
                                        {t('dashboard.newReport')}
                                    </Link>
                                </Button>
                            }
                        />
                    )}
                </Card>
            </PageContainer>
        </>
    );
}

Dashboard.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: translate('nav.dashboard'),
            href: props.currentTeam ? dashboard(props.currentTeam.slug) : '/',
        },
    ],
});
