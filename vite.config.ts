import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
            fonts: [
                bunny('Instrument Sans', {
                    weights: [400, 500, 600],
                }),
            ],
        }),
        inertia(),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                // Split rarely-changing vendor code out of the main bundle so it
                // caches independently of app code and stays under the chunk-size
                // warning threshold.
                manualChunks(id) {
                    const path = id.replace(/\\/g, '/');

                    if (!path.includes('/node_modules/')) {
                        return;
                    }

                    if (
                        /\/node_modules\/(react|react-dom|scheduler|react-is)\//.test(
                            path,
                        )
                    ) {
                        return 'react';
                    }

                    if (path.includes('/node_modules/@radix-ui/')) {
                        return 'radix';
                    }

                    if (path.includes('/node_modules/@inertiajs/')) {
                        return 'inertia';
                    }
                },
            },
        },
    },
});
