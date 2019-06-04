( function( $ ) {
    var container = $( '.wp-block-sc-double-masonry' );
    var masonryClass = '.wp-block-sc-double-masonry__item';
    var masonryBricks = container.find( masonryClass );
    var masonryArgs = {
        itemSelector: masonryClass,
        columnWidth: '.wp-block-sc-double-masonry__sizer',
        transitionDuration: 0.2,
        percentPosition: true
    };

    function debounce( func, wait, immediate ) {
	    var timeout;
	    return function() {
		    var context = this, args = arguments;
		    var later = function() {
			    timeout = null;
			    if ( !immediate ) func.apply( context, args );
		    };
		    var callNow = immediate && !timeout;
		    clearTimeout( timeout );
		    timeout = setTimeout( later, wait );
		    if ( callNow ) func.apply( context, args );
	    };
    };

    function checkSize( brick ) {
        var widths = $.map( masonryBricks, function( brick, idx ) {
            return brick.firstChild.naturalWidth;
        } );
        var smallest = widths.reduce( ( smallest, current ) => {
            return ( smallest < current ? smallest : current )
        } );
        var referenceWidth = Math.round( container.width() / 2 );

        if ( smallest > referenceWidth ) {
            return 'w-1/3';
        }

        var currentWidth = brick.firstChild.naturalWidth;

        if ( currentWidth < referenceWidth ) {
            return 'w-1/3';
        } else {
            return 'w-2/3';
        }
    }

    var createBricks = debounce( function() {
        $.each( masonryBricks, function() {
            var classesToAdd = checkSize( this );

            $( this ).removeClass( 'w-1/3' );
            $( this ).removeClass( 'w-2/3' );
            $( this ).addClass( classesToAdd );
        } );

        container.masonry( masonryArgs );
    }, 250 );

    $( document ).ready( function() {
        $( window ).on( 'resize', createBricks );

        container.imagesLoaded( function() {
            createBricks();

            container.masonry( masonryArgs );
        } );
    } );
} )( jQuery );
