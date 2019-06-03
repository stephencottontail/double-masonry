import { Component, createElement as el } from '@wordpress/element';
import { MediaUpload } from '@wordpress/block-editor';
import Masonry from 'react-masonry-component';
import Measure from 'react-measure';
import classnames from 'classnames';

class DoubleMasonry extends Component {
    constructor() {
        super( ...arguments );

        this.checkBrickSize.bind( this );
        this.createMasonryBrick.bind( this );
    }

    componentDidUpdate() {
        this.masonry.layout();
    }

    checkBrickSize( element ) {
        const { className } = this.props;
        let referenceWidth = Math.round( this.props.attributes.width / 2 );
        let smallest = this.props.attributes.gallery.reduce( ( smallest, img ) => {
            return ( smallest < img.sizes.full.width ? smallest : img.sizes.full.width );
        } );
        let classes = [ `${className}__item`, 'p-4' ];

        if ( smallest > referenceWidth ) {
            classes.push( 'w-1/3' );
            return classes;
        }

        if ( element.sizes.full.width < referenceWidth ) {
            classes.push( 'w-1/3' );
            return classes;
        } else {
            classes.push( 'w-2/3' );
            return classes;
        }
    }

    createMasonryBrick( element ) {
        return el( 'div',
                   { key: element.id.toString(), className: classnames( this.checkBrickSize( element ) ) },
                   el( 'img', {
                       alt: ( element.alt || undefined ),
                       src: element.sizes.full.url
                   } ) );
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
        const masonry = el( Masonry,
                            {
                                ref: function( c ) { this.masonry = this.masonry || c.masonry; }.bind( this ),
                                className: classnames( className, 'my-8' )
                            },
                            el( 'div', { className: `${className}__sizer` } ),
                            attributes.gallery.map( img => {
                                return this.createMasonryBrick( img );
                            } )
                          );

        return [
            mediaUpload,
            ( hasImages && el( Measure, {
                bounds: true,
                onResize: contentRect => setAttributes( { width: contentRect.bounds.width } )
            }, ( { measureRef, contentRect } ) => (
                el( 'div', { ref: measureRef }, masonry )
            ) ) )
        ];
    }
}

export default DoubleMasonry;
