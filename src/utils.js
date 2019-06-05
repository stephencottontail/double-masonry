import { createElement as el } from '@wordpress/element';
import classnames from 'classnames';

function checkBrickSize( element, attributes ) {
    let referenceWidth = Math.round( attributes.width / 2 );
    let smallest = attributes.gallery.reduce( ( smallest, img ) => {
        return ( smallest < img.sizes.full.width ? smallest : img.sizes.full.width );
    }, 0 );

    if ( smallest > referenceWidth ) {
        return [ 'w-1/3' ];
    }

    if ( element.sizes.full.width < referenceWidth ) {
        return [ 'w-1/3' ];
    } else {
        return [ 'w-2/3' ];
    }
}

function createMasonryBrick( element, className, attributes ) {
    let classes = [ `${className}__item`, 'p-4' ];
    let size = checkBrickSize( element, attributes );

    return (
        <div
            key={ element.id.toString() }
            className={ classnames( classes, size ) }
        >
            <img
                alt={ ( element.alt || undefined ) }
                src={ element.sizes.full.url }
            />
            { element.caption && <div className={ classnames( `${className}__caption`, 'text-center', 'font-light' ) }>{ element.caption }</div> }
        </div>
    );
}

export default createMasonryBrick;
