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
        const mediaUpload = <MediaUpload
                                addToGallery={ hasImages }
                                value={ hasImages ? ( attributes.gallery.map( img => img.id ) ) : undefined }
                                gallery
                                multiple
                                onSelect={ img => { setAttributes( { gallery: img } ) } }
                                allowedTypes={ [ 'image' ] }
                                render={ ( { open } ) => (
                                    <button
                                        className={ classnames( `${className}__button ${className}__button--primary` ) }
                                        onClick={ open }
                                    >
                                        { `${( hasImages ? 'Edit' : 'Create' )} Gallery` }
                                    </button>
                                ) }
                            />

        const masonry = <Masonry
                            ref={ function(c) { this.masonry = this.masonry || c.masonry; }.bind( this ) }
                            className={ classnames( className, 'my-8' ) }
                            masonryOptions={ {
                                itemSelector: `.${className}__item`,
                                columnWidth: `.${className}__sizer`,
                                transitionDuration: 0.2,
                                percentPosition: true
                            } }
                        >
                            <div className={ `${className}__sizer` } />
                            { attributes.gallery.map( img => {
                                return createMasonryBrick( img, className, attributes );
                            } ) }
                        </Masonry>

        const measure = <Measure
                            bounds
                            onResize={ contentRect => setAttributes( { width: contentRect.bounds.width } ) }
                        >
                            { ( { measureRef, contentRect } ) => (
                                <div ref={ measureRef }>{ masonry }</div>
                            ) }
                        </Measure>
        return [
            mediaUpload,
            measure
        ]
    }
}

export default DoubleMasonry;
