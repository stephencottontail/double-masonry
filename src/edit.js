import { Component, createElement as el } from '@wordpress/element';
import { MediaUpload } from '@wordpress/block-editor';
import Masonry from 'react-masonry-component';
import classnames from 'classnames';

class DoubleMasonry extends Component {
    constructor() {
        super( ...arguments );
    }

    render() {
        const { attributes, setAttributes, className } = this.props;
        const hasImages = !! attributes.gallery.length;
        const mediaUpload = el( MediaUpload,{
            addToGallery: hasImages,
            gallery: true,
            multiple: true,
            onSelect: ( img ) => {
                setAttributes( { gallery: img } )
            },
            allowedTypes: [ 'image' ],
            render: ( { open } ) => {
                return el( 'button', { onClick: open }, 'Open' );
            },
            value: ( hasImages ? ( attributes.gallery.map( img => img.id ) ) : undefined )
        } );
        if ( hasImages ) {
            let widths = attributes.gallery.reduce( ( smallest, img ) => {
                return ( smallest < img.sizes.full.width ? smallest : img.sizes.full.width );
            } );
        }

        return [
            mediaUpload,
            ( hasImages && el( Masonry, {
                className: classnames( className, { 'my-8': true } ),
            }, attributes.gallery.map( img => {
                return el( 'div', { className: classnames( 'w-1/3', 'border', 'p-4' ) }, ( img.caption || img.url ) )
            } ) ) )
        ];
    }
}

export default DoubleMasonry;
