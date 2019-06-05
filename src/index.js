import './style.css';
import './masonry-frontend.js';

import { registerBlockType, getBlockDefaultClassName } from '@wordpress/blocks';
import { createElement as el } from '@wordpress/element';
import Masonry from 'react-masonry-component';
import classnames from 'classnames';
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
                                className: classnames( className, 'my-8' )
                            },
                            el( 'div', { className: `${className}__sizer` } ),
                            [
                                attributes.gallery.map( img => {
                                    return el( 'div',
                                                {
                                                    key: img.id.toString(),
                                                    className: classnames( `${className}__item`, 'p-4' )
                                                },
                                            el( 'img',
                                                {
                                                    alt: ( img.alt || undefined ),
                                                    src: img.sizes.full.url
                                                }
                                                ),
                                            ( img.caption && el( 'div',
                                                                    {
                                                                        className: classnames( `{$className}))caption`, 'font-light', 'text-center' )

                                                                    },
                                                                    img.caption )
                                            )
                                            );
                                } )
                            ]
                          );

        return ( hasImages && masonry );
    }
} );
