import { Head } from '@inertiajs/react';
import { Mail, UserPlus } from 'lucide-react';
import { PageContainer } from '@/components/reposcope/page-container';
import { PageHeader } from '@/components/reposcope/page-header';
import { ToneBadge  } from '@/components/reposcope/tone-badge';
import type {BadgeTone} from '@/components/reposcope/tone-badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { translate, useTranslation } from '@/lib/i18n';
import { SAMPLE_INVITATIONS, SAMPLE_MEMBERS } from '@/lib/reposcope/data';
import type { MemberRole } from '@/lib/reposcope/types';
import team from '@/routes/team';

const roleTone: Record<MemberRole, BadgeTone> = {
    owner: 'signal',
    admin: 'info',
    member: 'neutral',
};

export default function TeamIndex() {
    const { t } = useTranslation();

    const roleLabel = (role: MemberRole): string =>
        t(
            role === 'owner'
                ? 'team.roleOwner'
                : role === 'admin'
                  ? 'team.roleAdmin'
                  : 'team.roleMember',
        );

    return (
        <>
            <Head title={t('team.title')} />

            <PageContainer>
                <PageHeader
                    title={t('team.title')}
                    subtitle={t('team.subtitle')}
                />

                {/* Invite */}
                <Card className="mb-6 flex-col gap-3 p-5 sm:flex-row sm:items-center">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-muted-foreground">
                        <UserPlus className="size-[18px]" />
                    </div>
                    <Input
                        type="email"
                        placeholder={t('team.invitePlaceholder')}
                        className="flex-1"
                    />
                    <Button>
                        <Mail className="size-4" />
                        {t('team.sendInvite')}
                    </Button>
                </Card>

                {/* Members */}
                <div className="mb-3 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                    {t('team.members')}
                </div>
                <Card className="mb-6 overflow-hidden py-0">
                    {SAMPLE_MEMBERS.map((member) => (
                        <div
                            key={member.id}
                            className="flex items-center gap-3 border-b border-border px-4 py-3.5 last:border-b-0"
                        >
                            <Avatar className="size-9">
                                <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                                    {member.initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    {member.name}
                                    {member.isYou && (
                                        <span className="text-xs font-normal text-muted-foreground">
                                            ({t('team.you')})
                                        </span>
                                    )}
                                </div>
                                <div className="truncate font-mono text-[11px] text-muted-foreground">
                                    {member.email}
                                </div>
                            </div>
                            <ToneBadge tone={roleTone[member.role]}>
                                {roleLabel(member.role)}
                            </ToneBadge>
                        </div>
                    ))}
                </Card>

                {/* Pending invitations */}
                <div className="mb-3 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                    {t('team.pending')}
                </div>
                <Card className="overflow-hidden py-0">
                    {SAMPLE_INVITATIONS.map((invitation) => (
                        <div
                            key={invitation.email}
                            className="flex items-center gap-3 border-b border-border px-4 py-3.5 last:border-b-0"
                        >
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-muted-foreground">
                                <Mail className="size-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="truncate text-sm font-medium">
                                    {invitation.email}
                                </div>
                                <div className="text-[11px] text-muted-foreground">
                                    {t('team.invitedAs', {
                                        role: roleLabel(invitation.role),
                                    })}
                                </div>
                            </div>
                            <span className="font-mono text-[11px] text-muted-foreground">
                                {invitation.when}
                            </span>
                        </div>
                    ))}
                </Card>
            </PageContainer>
        </>
    );
}

TeamIndex.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: translate('nav.team'),
            href: props.currentTeam ? team.index(props.currentTeam.slug) : '/',
        },
    ],
});
