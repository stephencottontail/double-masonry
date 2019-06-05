const defaultConfig = require( './node_modules/@wordpress/scripts/config/webpack.config.js' );
const MiniCssExtract = require( 'mini-css-extract-plugin' );

module.exports = {
    ...defaultConfig,
    module: {
        ...defaultConfig.module,
        rules: [
            {
                test: /\masonry-frontend.js$/,
                use: [
                    {
                        loader: require.resolve( 'file-loader' ),
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
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
                        }
                    }
                ]
            },
            ...defaultConfig.module.rules,
        ]
    },
    plugins: [
        ...defaultConfig.plugins,
        new MiniCssExtract()
    ]
}
