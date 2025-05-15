/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
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
        require('postcss-place'),
        require('@csstools/postcss-logical-viewport-units'),
        require('postcss-gap-properties'),
    ]
}