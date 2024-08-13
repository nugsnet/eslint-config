import config from './eslint.config.mjs'

export default [
    ...config,
    {
        ignores: [
            'node_modules',
            'dist',
            'build',
            'bin',
            'bundle',
            'src/assets'
        ]
    }
]