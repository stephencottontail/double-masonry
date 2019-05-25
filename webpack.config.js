const defaultConfig = require( './node_modules/@wordpress/scripts/config/webpack.config.js' );
const MiniCssExtract = require( 'mini-css-extract-plugin' );
const postcssPresetEnv = require( 'postcss-preset-env' );
const tailwindCss = require( 'tailwindcss' );

module.exports = {
    ...defaultConfig,
    module: {
        ...defaultConfig.module,
        rules: [
            ...defaultConfig.module.rules,
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtract.loader
                    },
                    {
                        loader: require.resolve( 'css-loader' )
                    },
                    {
                        loader: require.resolve( 'postcss-loader' ),
                        options: {
                            ident: 'postcss',
                            plugins: () => [
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
                    }
                ]
            }
        ]
    },
    plugins: [
        ...defaultConfig.plugins,
        new MiniCssExtract()
    ]
}
