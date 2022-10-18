module.exports = {
    parser: "postcss-scss",
    plugins: [
        require('@csstools/postcss-sass')({
            "syntax": "postcss-scss"
        }),
        require("autoprefixer")({
            "grid": "autoplace"
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