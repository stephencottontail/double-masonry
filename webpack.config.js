const postcssPresetEnv = require( 'postcss-preset-env' );
const defaultConfig = require( './node_modules/@wordpress/scripts/config/webpack.config.js' );

const config = {
    ...defaultConfig,
    module: {
        ...defaultConfig.module,
        rules: [
            ...defaultConfig.module.rules,
            {
                test: /\.(sc|sa|c)ss$/,
                use: [
                    {
                        loader: require.resolve( 'file-loader' ),
                        options: {
                            name: '[name].css'
                        }
                    },
                    {
                        loader: require.resolve( 'extract-loader' )
                    },
                    {
                        loader: require.resolve( 'css-loader' )
                    },
                    {
                        loader: require.resolve( 'postcss-loader' ),
                        options: {
                            ident: 'postcss',
                            plugins: () => [
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
                    },
                    {
                        loader: require.resolve( 'sass-loader' )
                    },
                ]
            }
        ]
    },
};

module.exports = config;
