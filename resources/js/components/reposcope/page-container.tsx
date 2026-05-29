import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function PageContainer({
    children,
    className,
    wide = false,
}: {
    children: ReactNode;
    className?: string;
    wide?: boolean;
}) {
    return (
        <div
            className={cn(
                'mx-auto w-full px-6 py-8',
                wide ? 'max-w-[1180px]' : 'max-w-[1080px]',
                className,
            )}
        >
            {children}
        </div>
    );
}
