module.exports = {
    parser: require("postcss-scss"),
    plugins: [
        require('@csstools/postcss-sass')({
            "syntax": "postcss-scss"
        }),
        require('postcss-preset-env')({
            autoprefixer: {
                flexbox: false,
                grid: false
            }
        }),
        require("postcss-flexbugs-fixes"),
        require("postcss-input-range"),
        require("postcss-scrollbar"),
        require("postcss-pxtorem")({
            "replace": true,
            "propList": [
                "*",
                "!outline",
                "!border-width",
                "!border",
                "!border-left",
                "!border-right",
                "!border-top",
                "!border-bottom",
                "!border-radius",
                "!letter-spacing"
            ]
        }),
    ]
}