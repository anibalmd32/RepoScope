import { Form, Head } from '@inertiajs/react';
import { Github } from 'lucide-react';
import InputError from '@/components/input-error';
import PasskeyVerify from '@/components/passkey-verify';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useTranslation } from '@/lib/i18n';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('auth.logIn')} />

            <div className="flex flex-col gap-6">
                <div className="text-center">
                    <h1 className="font-serif text-3xl leading-tight font-normal">
                        {t('auth.title')}{' '}
                        <span className="text-muted-foreground italic">
                            {t('auth.titleAccent')}
                        </span>
                    </h1>
                    <p className="mx-auto mt-3 max-w-xs text-sm text-muted-foreground">
                        {t('auth.subtitle')}
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <Button type="button" size="lg" className="w-full">
                        <Github className="size-4" />
                        {t('auth.continueWithGithub')}
                    </Button>

                    <PasskeyVerify
                        label={t('auth.signInPasskey')}
                        separator={t('auth.orContinueWithEmail')}
                    />
                </div>

                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="flex flex-col gap-5"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="email">{t('auth.email')}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder={t('auth.emailPlaceholder')}
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">
                                        {t('auth.password')}
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-sm"
                                            tabIndex={5}
                                        >
                                            {t('auth.forgot')}
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder={t('auth.passwordPlaceholder')}
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember">
                                    {t('auth.remember')}
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                variant="outline"
                                className="w-full"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                {t('auth.logIn')}
                            </Button>
                        </>
                    )}
                </Form>

                <div className="text-center text-sm text-muted-foreground">
                    {t('auth.noAccount')}{' '}
                    <TextLink href={register()} tabIndex={5}>
                        {t('auth.signUp')}
                    </TextLink>
                </div>

                <p className="text-center text-xs text-muted-foreground">
                    {t('auth.legal')}
                </p>
            </div>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-signal">
                    {status}
                </div>
            )}
        </>
    );
}
