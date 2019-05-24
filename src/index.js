import './scss/editor.scss';
import './scss/style.scss';

import { registerBlockType } from '@wordpress/blocks';
import { createElement as el } from '@wordpress/element';
import edit from './edit';

registerBlockType( 'sc/double-masonry', {
    title: 'Masonry Gallery',
    icon: 'format-gallery',
    category: 'common',

    edit,
    save( attributes ) {
        return el( 'p', {}, 'Hello not-editor!' );
    }
} );
