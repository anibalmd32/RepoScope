import { Check, Mail, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useTranslation } from '@/lib/i18n';
import { SAMPLE_CHANNELS } from '@/lib/reposcope/data';
import type { ChannelKind } from '@/lib/reposcope/types';
import { cn } from '@/lib/utils';

const channelIcon: Record<ChannelKind, typeof MessageSquare> = {
    slack: MessageSquare,
    telegram: Send,
    email: Mail,
};

export function ShareDialog({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const { t } = useTranslation();
    const [picked, setPicked] = useState('slack-eng');

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-serif text-2xl font-normal">
                        {t('share.title')}
                    </DialogTitle>
                    <DialogDescription>{t('share.subtitle')}</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-2">
                    {SAMPLE_CHANNELS.map((channel) => {
                        const Icon = channelIcon[channel.kind];
                        const isPicked = picked === channel.id;

                        return (
                            <button
                                key={channel.id}
                                type="button"
                                onClick={() => setPicked(channel.id)}
                                className={cn(
                                    'flex items-center gap-3 rounded-md border px-3.5 py-3 text-left transition-colors',
                                    isPicked
                                        ? 'border-ring ring-[3px] ring-ring/50'
                                        : 'border-border hover:border-input',
                                )}
                            >
                                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary text-muted-foreground">
                                    <Icon className="size-[18px]" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-medium">
                                        {channel.name}
                                    </div>
                                    <div className="font-mono text-[11px] text-muted-foreground">
                                        {channel.handle}
                                    </div>
                                </div>
                                {isPicked && (
                                    <Check className="size-[18px] text-signal" />
                                )}
                            </button>
                        );
                    })}
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        {t('common.cancel')}
                    </Button>
                    <Button onClick={() => onOpenChange(false)}>
                        <Send className="size-4" />
                        {t('share.send')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
