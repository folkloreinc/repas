const path = require('path');

module.exports = (api) => {
    return {
        presets: [
            api.env('development') && require.resolve('babel-preset-react-app/dev'),
            api.env('production') && [
                require('@babel/preset-env'),
                {
                    modules: false,
                    useBuiltIns: false,
                    targets: {
                        node: '12',
                    },
                },
            ],
        ].filter(Boolean),
        plugins: [
            require.resolve('@babel/plugin-proposal-export-namespace-from'),
            [
                require.resolve('babel-plugin-static-fs'),
                {
                    target: 'browser', // defaults to node
                },
            ],
            [
                require.resolve('@babel/plugin-transform-runtime'),
                {
                    version: require('@babel/helpers/package.json').version,
                    helpers: true,
                },
            ],
        ].filter(Boolean),
    };
};
