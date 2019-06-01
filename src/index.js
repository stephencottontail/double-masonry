import './style.css';
import './masonry-frontend.js';

import { registerBlockType, getBlockDefaultClassName } from '@wordpress/blocks';
import { createElement as el } from '@wordpress/element';
import Masonry from 'react-masonry-component';
import classnames from 'classnames';
import edit from './edit.js';

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

        const list = el( Masonry, {
            className: classnames( 'my-8' )
        }, attributes.gallery.map( img => {
            return el( 'div', { key: img.id, className: classnames( `${className}__item`, [ 'w-1/3', 'border', 'p-4' ] ) }, ( img.caption || img.url ) )
        } ) );

        return ( hasImages && list );
    }
} );
