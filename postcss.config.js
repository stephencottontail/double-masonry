const postcssPresetEnv = require( 'postcss-preset-env' );
const tailwindCss = require( 'tailwindcss' );

module.exports = {
    plugins: [
        tailwindCss,
        postcssPresetEnv( {
            stage: 3,
            features: {
                'custom-media-queries': {
                    preserve: false
                },
                'custom-properties': {
                    preserve: true
                },
                'nesting-rules': true
            }
        } )
    ]
}
