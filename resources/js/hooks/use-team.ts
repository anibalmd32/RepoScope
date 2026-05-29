import { usePage } from '@inertiajs/react';

/**
 * The current team slug, used to build team-prefixed route URLs.
 * Returns an empty string when no team is resolved (should not happen inside
 * the authenticated, team-scoped area).
 */
export function useTeamSlug(): string {
    return usePage().props.currentTeam?.slug ?? '';
}
