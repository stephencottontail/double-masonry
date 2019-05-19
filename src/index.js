import { registerBlockType } from '@wordpress/blocks';
import { createElement as el } from '@wordpress/element';
import edit from './edit.js';

registerBlockType( 'sc/double-masonry', {
    title: 'Masonry Gallery',
    icon: 'dashicons-format-gallery',
    category: 'common',

    edit,
    save( attributes ) {
        return el( 'p', {}, 'Hello not-editor!' );
    }
} );
