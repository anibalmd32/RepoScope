import { Head, Link } from '@inertiajs/react';
import {
    ExternalLink,
    GitBranch,
    Github,
    Globe,
    Lock,
    Plus,
} from 'lucide-react';
import { PageContainer } from '@/components/reposcope/page-container';
import { PageHeader } from '@/components/reposcope/page-header';
import { ToneBadge } from '@/components/reposcope/tone-badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTeamSlug } from '@/hooks/use-team';
import { translate, useTranslation } from '@/lib/i18n';
import { SAMPLE_REPOSITORIES } from '@/lib/reposcope/data';
import reports from '@/routes/reports';
import repositories from '@/routes/repositories';

export default function RepositoriesIndex() {
    const { t } = useTranslation();
    const slug = useTeamSlug();

    return (
        <>
            <Head title={t('repositories.title')} />

            <PageContainer>
                <PageHeader
                    title={t('repositories.title')}
                    subtitle={t('repositories.subtitle')}
                    actions={
                        <Button>
                            <Github className="size-4" />
                            {t('repositories.connect')}
                        </Button>
                    }
                />

                <div className="grid gap-4 md:grid-cols-2">
                    {SAMPLE_REPOSITORIES.map((repo) => (
                        <Card key={repo.id} className="gap-0 p-5">
                            <div className="flex items-start gap-3">
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-muted-foreground">
                                    <Github className="size-[18px]" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="truncate text-sm font-medium">
                                        {repo.name}
                                    </div>
                                    <div className="mt-1 font-mono text-[11px] text-muted-foreground">
                                        {t('repositories.synced', {
                                            time: repo.synced,
                                        })}
                                    </div>
                                </div>
                                <ToneBadge
                                    tone={
                                        repo.visibility === 'public'
                                            ? 'info'
                                            : 'neutral'
                                    }
                                >
                                    {repo.visibility === 'public' ? (
                                        <Globe className="size-3" />
                                    ) : (
                                        <Lock className="size-3" />
                                    )}
                                    {repo.visibility === 'public'
                                        ? t('common.public')
                                        : t('common.private')}
                                </ToneBadge>
                            </div>

                            <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4">
                                <div>
                                    <dt className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                                        {t('repositories.defaultBranch')}
                                    </dt>
                                    <dd className="mt-1 flex items-center gap-1 font-mono text-[12px]">
                                        <GitBranch className="size-3 text-muted-foreground" />
                                        {repo.defaultBranch}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                                        {t('newReport.branches')}
                                    </dt>
                                    <dd className="mt-1 font-mono text-[12px]">
                                        {repo.branches}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                                        {t('nav.reports')}
                                    </dt>
                                    <dd className="mt-1 text-[12px] text-muted-foreground">
                                        {repo.lastReport}
                                    </dd>
                                </div>
                            </dl>

                            <div className="mt-4 flex items-center gap-2">
                                <Button size="sm" asChild>
                                    <Link href={reports.new(slug)}>
                                        <Plus className="size-4" />
                                        {t('repositories.newReport')}
                                    </Link>
                                </Button>
                                <Button size="sm" variant="ghost">
                                    <ExternalLink className="size-4" />
                                    {t('repositories.openOnGithub')}
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </PageContainer>
        </>
    );
}

RepositoriesIndex.layout = (props: {
    currentTeam?: { slug: string } | null;
}) => ({
    breadcrumbs: [
        {
            title: translate('nav.repositories'),
            href: props.currentTeam
                ? repositories.index(props.currentTeam.slug)
                : '/',
        },
    ],
});
