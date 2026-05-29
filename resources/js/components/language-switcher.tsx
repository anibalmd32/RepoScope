import { Check, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LOCALES, useTranslation } from '@/lib/i18n';

export function LanguageSwitcher() {
    const { locale, setLocale, t } = useTranslation();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    aria-label={t('language.label')}
                >
                    <Languages className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-40">
                {LOCALES.map((option) => (
                    <DropdownMenuItem
                        key={option.value}
                        className="cursor-pointer gap-2"
                        onSelect={() => setLocale(option.value)}
                    >
                        <span className="text-base leading-none">
                            {option.flag}
                        </span>
                        <span className="flex-1">{option.label}</span>
                        {locale === option.value && (
                            <Check className="size-4" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
