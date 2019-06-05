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
        const masonry = <Masonry
                            className={ classnames( className, 'my-8' ) }
                        >
                            <div
                                className={ `${className}__sizer` }
                            />
                            { attributes.gallery.map( img => [
                                <div
                                    key={ img.id.toString }
                                    className={ classnames( `${className}__item`, 'p-4' ) }
                                >
                                    <img
                                        alt={ ( img.alt || undefined ) }
                                        src={ img.sizes.full.url }
                                    />
                                    { img.caption && <div className={ classnames( 'text-center', 'font-light' ) }>{ img.caption }</div> }
                                </div>
                            ] ) }
                        </Masonry>

        return ( hasImages && masonry );
    }
} );
