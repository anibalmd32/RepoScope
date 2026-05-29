import type { SVGAttributes } from 'react';
import { ScopeMark } from '@/components/scope-mark';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return <ScopeMark {...props} />;
}
