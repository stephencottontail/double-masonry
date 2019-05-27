import './style.css';

import { registerBlockType } from '@wordpress/blocks';
import { createElement as el } from '@wordpress/element';
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
        }
    },

    edit,
    save( attributes ) {
        return el( 'p', { className: classnames( 'text-5xl', 'text-purple-600' ) }, 'Hello not-editor!' );
    }
} );
