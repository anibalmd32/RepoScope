import { Loader2 } from 'lucide-react';
import { ToneBadge  } from '@/components/reposcope/tone-badge';
import type {BadgeTone} from '@/components/reposcope/tone-badge';
import { useTranslation } from '@/lib/i18n';
import type { ReportStatus } from '@/lib/reposcope/types';

const statusConfig: Record<ReportStatus, { tone: BadgeTone; key: string }> = {
    ready: { tone: 'signal', key: 'reports.statusReady' },
    generating: { tone: 'info', key: 'reports.statusGenerating' },
    failed: { tone: 'coral', key: 'reports.statusFailed' },
};

export function ReportStatusBadge({ status }: { status: ReportStatus }) {
    const { t } = useTranslation();
    const config = statusConfig[status];

    return (
        <ToneBadge tone={config.tone}>
            {status === 'generating' && (
                <Loader2 className="size-3 animate-spin" />
            )}
            {t(config.key)}
        </ToneBadge>
    );
}
