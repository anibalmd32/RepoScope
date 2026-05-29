import { Link, usePage } from '@inertiajs/react';
import {
    FileText,
    FolderGit2,
    LayoutGrid,
    MessageSquare,
    Send,
    Settings,
    Users,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useTranslation } from '@/lib/i18n';
import { dashboard } from '@/routes';
import reports from '@/routes/reports';
import repositories from '@/routes/repositories';
import team from '@/routes/team';
import type { NavItem } from '@/types';

export function AppSidebar() {
    const page = usePage();
    const { t } = useTranslation();
    const slug = page.props.currentTeam?.slug;

    const mainNavItems: NavItem[] = slug
        ? [
              { title: t('nav.dashboard'), href: dashboard(slug), icon: LayoutGrid },
              { title: t('nav.reports'), href: reports.index(slug), icon: FileText },
              {
                  title: t('nav.repositories'),
                  href: repositories.index(slug),
                  icon: FolderGit2,
              },
              { title: t('nav.team'), href: team.index(slug), icon: Users },
          ]
        : [{ title: t('nav.dashboard'), href: '/', icon: LayoutGrid }];

    const accountNavItems: NavItem[] = [
        { title: t('nav.settings'), href: '/settings', icon: Settings },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={slug ? dashboard(slug) : '/'} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <TeamSwitcher />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} label={t('nav.platform')} />

                <SidebarGroup className="px-2 py-0">
                    <SidebarGroupLabel>
                        {t('nav.integrations')}
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                className="cursor-default"
                                tooltip={{ children: t('nav.slack') }}
                            >
                                <MessageSquare />
                                <span>{t('nav.slack')}</span>
                                <span
                                    className="ml-auto size-2 rounded-full bg-signal"
                                    title={t('common.connected')}
                                />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                className="cursor-default text-muted-foreground"
                                tooltip={{ children: t('nav.telegram') }}
                            >
                                <Send />
                                <span>{t('nav.telegram')}</span>
                                <span className="ml-auto text-[10px] tracking-wide text-muted-foreground/70 uppercase group-data-[collapsible=icon]:hidden">
                                    {t('common.comingSoon')}
                                </span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                <NavMain items={accountNavItems} label={t('nav.account')} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
