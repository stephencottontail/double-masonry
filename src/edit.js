import { Component, createElement as el } from '@wordpress/element';
import { MediaPlaceholder } from '@wordpress/block-editor';
import Masonry from 'react-masonry-component';
import classnames from 'classnames';

class DoubleMasonry extends Component {
    constructor() {
        super( ...arguments );
    }

    render() {
        const { attributes, setAttributes, className } = this.props;
        const hasImages = !! attributes.gallery.length;
        if ( hasImages ) {
            let widths = attributes.gallery.reduce( ( smallest, img ) => {
                return ( smallest < img.sizes.full.width ? smallest : img.sizes.full.width );
            } );
        }

        return [
            ( hasImages && el( Masonry, {
                className: classnames( className, { 'my-8': true } ),
            }, attributes.gallery.map( img => {
                return el( 'div', { className: classnames( 'w-1/3', 'border', 'p-4' ) }, ( img.caption || img.url ) )
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
