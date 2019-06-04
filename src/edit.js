import { Component, createElement as el } from '@wordpress/element';
import { MediaUpload } from '@wordpress/block-editor';
import Masonry from 'react-masonry-component';
import Measure from 'react-measure';
import classnames from 'classnames';
import createMasonryBrick from './utils';

class DoubleMasonry extends Component {
    constructor() {
        super( ...arguments );
    }

    componentDidUpdate() {
        this.masonry.layout();
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
                                className: classnames( className, 'my-8' ),
                                masonryOptions: {
                                    itemSelector: `.${className}__item`,
                                    columnWidth: `.${className}__sizer`,
                                    transitionDuration: 0.2,
                                    percentPosition: true
                                }
                            },
                            el( 'div', { className: `${className}__sizer` } ),
                            attributes.gallery.map( img => {
                                return createMasonryBrick( img, className, attributes );
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
