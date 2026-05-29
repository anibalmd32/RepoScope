import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type BadgeTone =
    | 'neutral'
    | 'signal'
    | 'coral'
    | 'info'
    | 'warn';

const toneClasses: Record<BadgeTone, string> = {
    neutral: 'border-transparent bg-secondary text-secondary-foreground',
    signal: 'border-transparent bg-signal/15 text-signal',
    coral: 'border-transparent bg-destructive/15 text-destructive',
    info: 'border-transparent bg-info/15 text-info',
    warn: 'border-transparent bg-warn/15 text-warn',
};

export function ToneBadge({
    tone = 'neutral',
    mono = false,
    className,
    children,
}: {
    tone?: BadgeTone;
    mono?: boolean;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <Badge
            className={cn(
                toneClasses[tone],
                mono && 'font-mono text-[11px] tracking-normal',
                className,
            )}
        >
            {children}
        </Badge>
    );
}
