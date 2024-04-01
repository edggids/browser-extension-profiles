import { svelte } from '@sveltejs/vite-plugin-svelte'
import {configDefaults} from "vitest/config";

export default {
//    include: ['_test-setup.ts'],
//    globals: true,

    plugins: [
        svelte({ hot: !process.env.VITEST }),
    ],

    resolve: {
        conditions: process.env.NODE_ENV === 'test' ? ['browser'] : [],
    },
    test: {
        environment: 'jsdom',
        setupFiles: ['./vitest-setup.js'],

        coverage: {
            exclude: [...configDefaults.coverage.exclude, '**/*.config*.*', 'seeders/**']
        }
    },
};
