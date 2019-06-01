import { Component, createElement as el } from '@wordpress/element';
import { MediaUpload } from '@wordpress/block-editor';
import Masonry from 'react-masonry-component';
import Measure from 'react-measure';
import classnames from 'classnames';

class DoubleMasonry extends Component {
    constructor() {
        super( ...arguments );
    }

    render() {
        const { attributes, setAttributes, className } = this.props;
        const hasImages = !! attributes.gallery.length;
        const mediaUpload = el( MediaUpload, {
            addToGallery: hasImages,
            gallery: true,
            multiple: true,
            onSelect: ( img ) => {
                setAttributes( { gallery: img } )
            },
            allowedTypes: [ 'image' ],
            render: ( { open } ) => {
                return el( 'button', {
                    className: classnames( `${className}__button ${className}__button--primary` ),
                    onClick: open
                }, `${( hasImages ? 'Edit' : 'Create' )} Gallery` )
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
            ( hasImages && (
                <Measure
                bounds
                onResize={ ( contentRect ) => console.log( contentRect ) }
                >
                    { ( { measureRef } ) => {
                        return [
                        /**
                         * the docs don't mention this, but you need `innerRef` instead of just ref for
                         * 'special' components (i.e., anything that's not a base HTML tag)
                         *
                         * what's the difference between `ref` and `innerRef`? no one knows
                         */
                        <Masonry innerRef={ measureRef } className={ classnames( className, { 'my-8': true } ) }>
                            { attributes.gallery.map( img => {
                                return (
                                    <div key={ img.id } className={ classnames( 'w-1/3', 'border', 'p-4' ) }>
                                        { ( img.caption || img.url ) }
                                    </div>
                                );
                            } ) }
                        </Masonry>
                    ] } }
                </Measure>
            ) ),
            /*
            ( hasImages && el( Measure, {
                onResize: ( contentRect ) => { console.log( contentRect ) }
            }, ( { measureRef } ) => {
                return el( Masonry, {
                    ref: { measureRef },
                    className: classnames( className, { 'my-8': true } )
                }, attributes.gallery.map( img => {
                    return el( 'div', { key: img.id, className: classnames( 'w-1/3', 'border', 'p-4' ) }, ( img.caption || img.url ) )
                } ) );
            } ) )
            */
        ];
    }
}

export default DoubleMasonry;
