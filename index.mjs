import config from './eslint.config.mjs'

export default [
    ...config,
    {
        ignores: [
            'node_modules',
            'dist',
            'build',
            'public',
            'bin',
            'bundle',
            'src/assets',
            '.postcssrc.js',
        ]
    }
]