import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export function EmptyState({
    icon: Icon,
    title,
    hint,
    action,
}: {
    icon: LucideIcon;
    title: string;
    hint?: string;
    action?: ReactNode;
}) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                <Icon className="size-5" />
            </div>
            <div className="space-y-1">
                <p className="font-medium text-foreground">{title}</p>
                {hint && (
                    <p className="max-w-sm text-sm text-muted-foreground">
                        {hint}
                    </p>
                )}
            </div>
            {action && <div className="mt-2">{action}</div>}
        </div>
    );
}
