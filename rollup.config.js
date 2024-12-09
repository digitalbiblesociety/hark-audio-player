import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

// Common Terser configuration
const terserConfig = terser({
    mangle: {
        properties: false,
    },
    compress: false,
});

export default [
    {
        input: 'src/AudioPlayer.js',
        output: {
            file: 'dist/AudioPlayer.min.js',
            format: 'es',
            name: 'AudioPlayer',
            sourcemap: true
        },
        plugins: [
            terser(),
        ],
    },
    {
        input: 'src/AudioPlayer.js',
        output: {
            file: 'dist/AudioPlayer.NoDefaults.min.js',
            format: 'es',
            name: 'AudioPlayer',
            sourcemap: true,
            exports: 'default',
        },
        plugins: [
            replace({
                preventAssignment: true,
                values: {
                    defaultClasses: JSON.stringify({}),
                    defaultIcons: JSON.stringify({}),
                    defaultArt: JSON.stringify({}),
                },
            }),
            terserConfig,
        ],
    },
];