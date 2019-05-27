import { Component, createElement as el } from '@wordpress/element';
import { MediaPlaceholder } from '@wordpress/block-editor';
import classnames from 'classnames';

class DoubleMasonry extends Component {
    constructor() {
        super( ...arguments );
    }

    render() {
        const { attributes, setAttributes } = this.props;
        const hasImages = !! attributes.gallery.length;
        if ( hasImages ) {
            let widths = attributes.gallery.reduce( ( smallest, img ) => {
                return ( smallest < img.sizes.full.width ? smallest : img.sizes.full.width );
            } );
        }

        return [
            ( hasImages && el( 'ul', {}, attributes.gallery.map( img => {
                return el( 'li', {}, img.url );
            } ) ) ),
            el( MediaPlaceholder, {
                allowedTypes: [ 'image' ],
                addToGallery: true,
                gallery: true,
                isAppender: true,
                labels: {
                    title: 'Gallery'
                },
                multiple: true,
                onSelect: ( img ) => {
                    setAttributes( { gallery: img } );
                },
                value: attributes.gallery.map( ( img ) => img.id )
            } )
        ];
    }
}

export default DoubleMasonry;
