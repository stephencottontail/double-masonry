import './style.css';
import './masonry-frontend.js';

import { registerBlockType, getBlockDefaultClassName } from '@wordpress/blocks';
import { createElement as el } from '@wordpress/element';
import Masonry from 'react-masonry-component';
import classnames from 'classnames';
import createMasonryBrick from './utils';
import edit from './edit';

registerBlockType( 'sc/double-masonry', {
    title: 'Masonry Gallery',
    icon: 'format-gallery',
    category: 'common',
    attributes: {
        gallery: {
            type: 'array',
            default: []
        },
        width: {
            type: 'number',
            default: ''
        }
    },

    edit,
    save( { attributes } ) {
        const className = getBlockDefaultClassName( 'sc/double-masonry' );
        const hasImages = !! attributes.gallery.length;
        const masonry = el( Masonry,
                            {
                                ref: function( c ) { this.masonry = this.masonry || c.masonry; }.bind( this ),
                                className: classnames( className, 'my-8' )
                            },
                            el( 'div', { className: `${className}__sizer` } ),
                            attributes.gallery.map( img => {
                                return createMasonryBrick( img, className, attributes );
                            } )
                          );

        return ( hasImages && masonry );
    }
} );
