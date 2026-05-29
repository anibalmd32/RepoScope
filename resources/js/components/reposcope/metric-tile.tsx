import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type MetricTone = 'default' | 'signal' | 'coral' | 'muted';

const valueTone: Record<MetricTone, string> = {
    default: 'text-foreground',
    signal: 'text-signal',
    coral: 'text-destructive',
    muted: 'text-muted-foreground',
};

export function MetricTile({
    label,
    value,
    tone = 'default',
    delta,
    deltaTone = 'signal',
    hint,
}: {
    label: string;
    value: string;
    tone?: MetricTone;
    delta?: string;
    deltaTone?: MetricTone;
    hint?: string;
}) {
    return (
        <Card className="gap-2 p-5">
            <div className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                {label}
            </div>
            <div className="flex items-baseline gap-2">
                <span
                    className={cn(
                        'text-3xl font-medium tracking-tight tabular-nums',
                        valueTone[tone],
                    )}
                >
                    {value}
                </span>
                {delta && (
                    <span
                        className={cn(
                            'text-sm font-medium',
                            valueTone[deltaTone],
                        )}
                    >
                        {delta}
                    </span>
                )}
                {hint && (
                    <span className="text-sm font-medium text-muted-foreground">
                        {hint}
                    </span>
                )}
            </div>
        </Card>
    );
}
