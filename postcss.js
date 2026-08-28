/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Some plugins (postcss-scrollbar, for example) build brand new rules and
 * declarations without copying `source` from the node they came from.
 * Bundlers use `source.input.file` to resolve relative `url()` in a declaration,
 * so Vite reports every such node with
 * "A PostCSS plugin did not pass the `from` option to `postcss.parse`".
 *
 * Runs last and re-attaches the nearest known source to the generated nodes.
 */
const restoreNodeSource = () => ({
    postcssPlugin: 'restore-node-source',
    OnceExit(root) {
        // `walk` is depth-first, so a parent is always fixed before its children
        root.walk(node => {
            if (!node.source) {
                node.source = (node.parent && node.parent.source) || root.source
            }
        })
    }
})
restoreNodeSource.postcss = true

module.exports = {
    parser: require('postcss-scss'),
    plugins: [
        require('postcss-preset-env')({
            autoprefixer: {
                flexbox: false,
                grid: false
            }
        }),
        require('postcss-flexbugs-fixes'),
        require('postcss-input-range'),
        require('postcss-scrollbar'),
        require('postcss-pxtorem')({
            'replace': true,
            'propList': ['font', 'font-size', 'line-height'],
        }),
        restoreNodeSource(),
    ]
}
