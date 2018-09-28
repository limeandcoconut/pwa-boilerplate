const presets = [
    [
        '@babel/preset-env',
        {
            targets: {
                browsers: ['last 2 versions'],
            },
            useBuiltIns: 'usage',
            // modules: false,
        },
    ],
]

const plugins = [
    '@babel/plugin-syntax-dynamic-import',
]

module.exports = {presets, plugins}
