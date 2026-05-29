import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
    
} from 'react';
import type {ReactNode} from 'react';
import { en } from './locales/en';
import { es } from './locales/es';

export type Locale = 'en' | 'es';

export type Dictionary = { [key: string]: string | Dictionary };

const dictionaries: Record<Locale, Dictionary> = { en, es };

export const LOCALES: { value: Locale; label: string; flag: string }[] = [
    { value: 'en', label: 'English', flag: '🇬🇧' },
    { value: 'es', label: 'Español', flag: '🇪🇸' },
];

const STORAGE_KEY = 'reposcope.locale';

function resolve(dict: Dictionary, path: string): string | undefined {
    const value = path
        .split('.')
        .reduce<string | Dictionary | undefined>(
            (acc, key) =>
                acc && typeof acc === 'object' ? acc[key] : undefined,
            dict,
        );

    return typeof value === 'string' ? value : undefined;
}

function interpolate(template: string, vars?: Record<string, string | number>): string {
    if (!vars) {
        return template;
    }

    return template.replace(/\{(\w+)\}/g, (match, key: string) =>
        key in vars ? String(vars[key]) : match,
    );
}

export type Translator = (
    key: string,
    vars?: Record<string, string | number>,
) => string;

type I18nContextValue = {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: Translator;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function getStoredLocale(): Locale {
    if (typeof window === 'undefined') {
        return 'en';
    }

    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;

    if (stored && stored in dictionaries) {
        return stored;
    }

    const browser = window.navigator.language.slice(0, 2);

    return browser === 'es' ? 'es' : 'en';
}

/**
 * Translate outside of React (e.g. in a page's static `layout` definition,
 * where hooks are unavailable). Resolves against the persisted locale.
 */
export function translate(
    key: string,
    vars?: Record<string, string | number>,
): string {
    const locale = getStoredLocale();
    const value =
        resolve(dictionaries[locale], key) ??
        resolve(dictionaries.en, key) ??
        key;

    return interpolate(value, vars);
}

export function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>(getStoredLocale);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.lang = locale;
        }
    }, [locale]);

    const setLocale = useCallback((next: Locale) => {
        setLocaleState(next);

        if (typeof window !== 'undefined') {
            window.localStorage.setItem(STORAGE_KEY, next);
        }
    }, []);

    const t = useCallback<Translator>(
        (key, vars) => {
            const value =
                resolve(dictionaries[locale], key) ??
                resolve(dictionaries.en, key) ??
                key;

            return interpolate(value, vars);
        },
        [locale],
    );

    const value = useMemo(
        () => ({ locale, setLocale, t }),
        [locale, setLocale, t],
    );

    return <I18nContext value={value}>{children}</I18nContext>;
}

export function useTranslation(): I18nContextValue {
    const context = useContext(I18nContext);

    if (!context) {
        throw new Error('useTranslation must be used within an I18nProvider');
    }

    return context;
}
