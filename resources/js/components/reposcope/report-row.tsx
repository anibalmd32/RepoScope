import { Link } from '@inertiajs/react';
import { ChevronRight, FileText } from 'lucide-react';
import { ReportStatusBadge } from '@/components/reposcope/report-status-badge';
import { ToneBadge } from '@/components/reposcope/tone-badge';
import { useTranslation } from '@/lib/i18n';
import type { ReportSummary } from '@/lib/reposcope/types';
import reports from '@/routes/reports';

export function ReportRow({
    report,
    slug,
}: {
    report: ReportSummary;
    slug: string;
}) {
    const { t } = useTranslation();

    return (
        <Link
            href={reports.show({ current_team: slug, report: report.id })}
            className="flex items-center gap-4 border-b border-border px-4 py-3.5 transition-colors last:border-b-0 hover:bg-secondary/60"
        >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-muted-foreground">
                <FileText className="size-[18px]" />
            </div>

            <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-foreground">
                    {report.title}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] text-muted-foreground">
                        {report.repo}
                    </span>
                    <span className="text-muted-foreground/50">·</span>
                    <ToneBadge tone="info" mono>
                        {report.branch}
                    </ToneBadge>
                    <span className="font-mono text-[11px] text-muted-foreground">
                        {report.commits} {t('common.commits')}
                    </span>
                </div>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
                <ToneBadge tone="signal" mono>
                    {report.added}
                </ToneBadge>
                <ToneBadge tone="coral" mono>
                    {report.removed}
                </ToneBadge>
            </div>

            <div className="hidden w-24 justify-end md:flex">
                <ReportStatusBadge status={report.status} />
            </div>

            <div className="hidden w-20 text-right font-mono text-[11px] text-muted-foreground lg:block">
                {report.when}
            </div>

            <ChevronRight className="size-4 shrink-0 text-muted-foreground/50" />
        </Link>
    );
}
