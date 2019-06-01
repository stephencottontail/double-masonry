const baseSpacing = 1;

module.exports = {
    theme: {
        spacing: {
            '1/4': baseSpacing * (1/4) + 'rem',
            '1/3': baseSpacing * (1/3) + 'rem',
            '1/2': baseSpacing * (1/2) + 'rem',
            '2/3': baseSpacing * (2/3) + 'rem',
            '3/4': baseSpacing * (3/4) + 'rem',
            '1': baseSpacing + 'rem',
            '2': baseSpacing * 2 + 'rem',
        },
        colors: {
            blue: {
                '500': 'hsl( 195, 75%, 15% )',
                '400': 'hsl( 195, 75%, 20% )',
                '300': 'hsl( 195, 20%, 50% )',
                '200': 'hsl( 195, 45%, 90% )',
                '100': 'hsl( 195, 25%, 95% )'
            }
        }
    }
}
