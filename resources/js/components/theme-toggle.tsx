import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { useTranslation } from '@/lib/i18n';

export function ThemeToggle() {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const { t } = useTranslation();
    const isDark = resolvedAppearance === 'dark';

    return (
        <Button
            variant="outline"
            size="icon"
            className="size-8"
            aria-label={t('theme.toggle')}
            onClick={() => updateAppearance(isDark ? 'light' : 'dark')}
        >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
    );
}
