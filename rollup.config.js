import path from 'path';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
// import replace from '@rollup/plugin-replace';

export default [
    {
        input: 'src/index.js',
        output: [
            {
                file: 'es/index.js',
            },
            {
                file: 'lib/index.js',
                format: 'cjs',
            },
        ],
        plugins: [
            json(),
            resolve({
                extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
                jail: path.join(process.cwd(), 'src'),
            }),
            commonjs(),
            babel({
                extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
                exclude: 'node_modules/**',
                rootMode: 'upward',
                babelHelpers: 'runtime',
            }),
        ],
    },
];
