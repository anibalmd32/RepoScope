import { Check, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ScopeMark } from '@/components/scope-mark';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/lib/i18n';
import { ANALYZING_STEPS } from '@/lib/reposcope/data';

type Step = (typeof ANALYZING_STEPS)[number];

export function AnalyzingPanel({
    count,
    onDone,
}: {
    count: number;
    onDone: () => void;
}) {
    const { t } = useTranslation();
    const [logs, setLogs] = useState<Step[]>([]);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const timers = ANALYZING_STEPS.map((step) =>
            window.setTimeout(
                () => setLogs((current) => [...current, step]),
                step.delay,
            ),
        );
        const lastDelay = ANALYZING_STEPS[ANALYZING_STEPS.length - 1].delay;
        const finish = window.setTimeout(() => setDone(true), lastDelay + 600);

        return () => {
            timers.forEach((timer) => window.clearTimeout(timer));
            window.clearTimeout(finish);
        };
    }, []);

    useEffect(() => {
        if (!done) {
            return;
        }

        const redirect = window.setTimeout(onDone, 1200);

        return () => window.clearTimeout(redirect);
    }, [done, onDone]);

    return (
        <Card className="flex min-h-[460px] items-center justify-center gap-6 px-8 py-16 text-center">
            <div className="relative flex size-24 items-center justify-center">
                <span className="absolute inline-flex size-full animate-ping rounded-full border border-signal opacity-50" />
                <span className="absolute inline-flex size-full animate-ping rounded-full border border-signal opacity-40 [animation-delay:1s]" />
                <ScopeMark className="relative size-11 text-foreground" />
            </div>

            <div className="space-y-2">
                <h2 className="font-serif text-3xl leading-tight">
                    {t('analyzing.title', { count })}
                </h2>
                <p className="mx-auto max-w-md text-sm text-muted-foreground">
                    {t('analyzing.subtitle')}
                </p>
            </div>

            <div className="flex min-h-[150px] w-full max-w-md flex-col items-start gap-1.5 text-left">
                {logs.map((log, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 font-mono text-xs text-muted-foreground"
                    >
                        {log.ok ? (
                            <Check className="size-3.5 text-signal" />
                        ) : (
                            <ChevronRight className="size-3.5 text-muted-foreground/60" />
                        )}
                        <span>{log.line}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
}
