import { Head } from '@inertiajs/react';
import {
    ArrowUpRight,
    Copy,
    Download,
    Plus,
    Share2,
    Sparkles,
    TriangleAlert,
} from 'lucide-react';
import { Fragment,  useState } from 'react';
import type {ReactNode} from 'react';
import { MetricTile } from '@/components/reposcope/metric-tile';
import { PageContainer } from '@/components/reposcope/page-container';
import { ShareDialog } from '@/components/reposcope/share-dialog';
import { ToneBadge  } from '@/components/reposcope/tone-badge';
import type {BadgeTone} from '@/components/reposcope/tone-badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { translate, useTranslation } from '@/lib/i18n';
import { SAMPLE_REPORT_DETAIL } from '@/lib/reposcope/data';
import type { ReportItem } from '@/lib/reposcope/types';
import { cn } from '@/lib/utils';
import reports from '@/routes/reports';

function renderInline(text: string): ReactNode[] {
    return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
        }

        if (part.startsWith('`') && part.endsWith('`')) {
            return (
                <code
                    key={index}
                    className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.85em]"
                >
                    {part.slice(1, -1)}
                </code>
            );
        }

        return <Fragment key={index}>{part}</Fragment>;
    });
}

const toneGlyph: Record<string, string> = {
    signal: 'bg-signal/15 text-signal',
    info: 'bg-info/15 text-info',
    warn: 'bg-warn/15 text-warn',
};

const toneDot: Record<string, string> = {
    signal: 'bg-signal',
    info: 'bg-info',
    warn: 'bg-warn',
};

export default function ReportShow() {
    const { t } = useTranslation();
    const detail = SAMPLE_REPORT_DETAIL;
    const [shareOpen, setShareOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('shipped');

    const sections: {
        id: string;
        title: string;
        icon: typeof Plus;
        tone: 'signal' | 'info' | 'warn';
        items: ReportItem[];
    }[] = [
        {
            id: 'shipped',
            title: t('report.sectionShipped'),
            icon: Plus,
            tone: 'signal',
            items: detail.shipped,
        },
        {
            id: 'improved',
            title: t('report.sectionImproved'),
            icon: ArrowUpRight,
            tone: 'info',
            items: detail.improved,
        },
        {
            id: 'opportunities',
            title: t('report.sectionOpportunities'),
            icon: TriangleAlert,
            tone: 'warn',
            items: detail.opportunities,
        },
    ];

    const tocItems = [
        ...sections.map((section) => ({
            id: section.id,
            title: section.title,
        })),
        { id: 'notes', title: t('report.sectionNotes') },
    ];

    const meta = [
        { label: t('report.repository'), value: detail.repo },
        { label: t('report.branch'), value: detail.branch },
        { label: t('report.commits'), value: detail.commitsRange },
        { label: t('report.authors'), value: detail.authors },
        { label: t('report.template'), value: detail.template },
    ];

    return (
        <>
            <Head title={detail.title.replace(/—\s*$/, '').trim()} />

            <PageContainer wide>
                <div className="grid items-start gap-8 lg:grid-cols-[1fr_240px]">
                    <div className="flex flex-col gap-4">
                        {/* Cover */}
                        <Card className="gap-3.5 p-8">
                            <div className="flex items-center gap-2 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                                <Sparkles className="size-3" />
                                {t('report.generatedBy', {
                                    time: t('common.justNow'),
                                })}
                            </div>
                            <h1 className="font-serif text-[2.5rem] leading-[1.12] font-normal tracking-tight">
                                {detail.title}
                                <br />
                                <span className="text-muted-foreground italic">
                                    {detail.titleAccent}
                                </span>
                            </h1>
                            <p className="max-w-[56ch] text-base text-muted-foreground">
                                {detail.summary}
                            </p>

                            <dl className="mt-1.5 flex flex-wrap gap-x-8 gap-y-4 border-t border-border pt-5">
                                {meta.map((item) => (
                                    <div key={item.label}>
                                        <dt className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                                            {item.label}
                                        </dt>
                                        <dd className="mt-1 font-mono text-[13px] text-foreground">
                                            {item.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>

                            <div className="mt-2 flex flex-wrap gap-2">
                                <Button
                                    className="bg-signal text-signal-foreground hover:bg-signal/90"
                                    onClick={() => setShareOpen(true)}
                                >
                                    <Share2 className="size-4" />
                                    {t('common.share')}
                                </Button>
                                <Button variant="outline">
                                    <Download className="size-4" />
                                    {t('common.downloadPdf')}
                                </Button>
                                <Button variant="outline">
                                    <Copy className="size-4" />
                                    {t('common.copyLink')}
                                </Button>
                            </div>
                        </Card>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                            <MetricTile
                                label={t('report.metricCommits')}
                                value={detail.metrics.commits}
                                delta={detail.metrics.commitsDelta}
                            />
                            <MetricTile
                                label={t('report.metricLinesAdded')}
                                value={detail.metrics.added}
                                tone="signal"
                            />
                            <MetricTile
                                label={t('report.metricLinesRemoved')}
                                value={detail.metrics.removed}
                                tone="coral"
                            />
                            <MetricTile
                                label={t('report.metricCoverage')}
                                value={detail.metrics.coverage}
                                delta={detail.metrics.coverageDelta}
                            />
                        </div>

                        {/* Sections */}
                        {sections.map((section) => (
                            <Card
                                key={section.id}
                                id={section.id}
                                className="scroll-mt-20 gap-0 p-7"
                            >
                                <h2 className="mb-4 flex items-center gap-3 font-serif text-2xl font-normal">
                                    <span
                                        className={cn(
                                            'flex size-7 items-center justify-center rounded-md',
                                            toneGlyph[section.tone],
                                        )}
                                    >
                                        <section.icon className="size-4" />
                                    </span>
                                    {section.title}
                                </h2>
                                {section.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-3.5 border-t border-border py-3.5 first:border-t-0 first:pt-0"
                                    >
                                        <span
                                            className={cn(
                                                'mt-2 size-2 shrink-0 rounded-full',
                                                toneDot[section.tone],
                                            )}
                                        />
                                        <div className="flex-1">
                                            <p className="text-[15px] leading-relaxed">
                                                {item.text}
                                            </p>
                                            {item.meta && (
                                                <div className="mt-2 flex flex-wrap gap-1.5">
                                                    {item.meta.map((value) => (
                                                        <ToneBadge
                                                            key={value}
                                                            tone={
                                                                'neutral' as BadgeTone
                                                            }
                                                            mono
                                                        >
                                                            {value}
                                                        </ToneBadge>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </Card>
                        ))}

                        {/* Release notes */}
                        <Card id="notes" className="scroll-mt-20 gap-0 p-7">
                            <h2 className="mb-4 flex items-center gap-3 font-serif text-2xl font-normal">
                                <span className="flex size-7 items-center justify-center rounded-md bg-secondary font-mono text-sm text-muted-foreground">
                                    v
                                </span>
                                {t('report.sectionNotes')}
                            </h2>
                            <ul className="flex list-disc flex-col gap-2 pl-5">
                                {detail.notes.map((note, index) => (
                                    <li
                                        key={index}
                                        className="text-[15px] leading-relaxed marker:text-muted-foreground/50"
                                    >
                                        {renderInline(note)}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>

                    {/* Table of contents */}
                    <aside className="sticky top-20 hidden lg:block">
                        <Card className="gap-2 p-5">
                            <h3 className="mb-1 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                                {t('report.onThisPage')}
                            </h3>
                            {tocItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={() => setActiveSection(item.id)}
                                    className={cn(
                                        'border-l-2 py-1.5 pl-3 text-[13px] transition-colors',
                                        activeSection === item.id
                                            ? 'border-signal text-foreground'
                                            : 'border-transparent text-muted-foreground hover:text-foreground',
                                    )}
                                >
                                    {item.title}
                                </a>
                            ))}
                        </Card>
                    </aside>
                </div>
            </PageContainer>

            <ShareDialog open={shareOpen} onOpenChange={setShareOpen} />
        </>
    );
}

ReportShow.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: translate('nav.reports'),
            href: props.currentTeam
                ? reports.index(props.currentTeam.slug)
                : '/',
        },
        {
            title: SAMPLE_REPORT_DETAIL.title.replace(/—\s*$/, '').trim(),
            href: props.currentTeam
                ? reports.show({
                      current_team: props.currentTeam.slug,
                      report: SAMPLE_REPORT_DETAIL.id,
                  })
                : '/',
        },
    ],
});
