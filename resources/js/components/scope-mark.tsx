import type { SVGAttributes } from 'react';

type ScopeMarkProps = SVGAttributes<SVGElement> & {
    /** Render the central dot in brand green. Defaults to true. */
    signal?: boolean;
};

/**
 * RepoScope brand mark — a camera/scope lens with crosshair ticks and a
 * "signal" dot at the center. Strokes use currentColor so it adapts to its
 * container; the center dot stays brand-green unless `signal` is disabled.
 */
export function ScopeMark({ signal = true, ...props }: ScopeMarkProps) {
    return (
        <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle
                cx="16"
                cy="16"
                r="13"
                stroke="currentColor"
                strokeWidth="2"
            />
            <circle
                cx="16"
                cy="16"
                r="6"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M16 1 V5 M16 27 V31 M1 16 H5 M27 16 H31"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <circle
                cx="16"
                cy="16"
                r="2"
                fill={signal ? 'var(--signal)' : 'currentColor'}
            />
        </svg>
    );
}

export default ScopeMark;
