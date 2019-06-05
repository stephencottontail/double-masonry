module.exports = {
    theme: {
        colors: {
            blue: {
                '500': 'hsl( 195, 75%, 15% )',
                '400': 'hsl( 195, 75%, 20% )',
                '300': 'hsl( 195, 20%, 50% )',
                '200': 'hsl( 195, 45%, 90% )',
                '100': 'hsl( 195, 25%, 95% )'
            }
        },
        spacing: {
            '4': '1rem',
            '8': '2rem',
            '1/3': '33.33333%',
            '2/3': '66.66667%'
        }
    },
    corePlugins: [
        'backgroundColor',
        'borderColor',
        'borderWidth',
        'borderStyle',
        'display',
        'margin',
        'padding',
        'textColor',
        'width'
    ],
    variants: []
}
