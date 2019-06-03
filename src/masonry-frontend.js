( function( $ ) {
    var container = $( '.wp-block-sc-double-masonry' );

    $( document ).ready( function() {
        container.imagesLoaded( function() {
            container.masonry( {
                itemSelector: '.wp-block-sc-double-masonry__item',
                columnWidth: '.wp-block-sc-double-masonry__sizer',
                transitionDuration: 0.2,
                percentPosition: true
            } );
        } );
    } );
} )( jQuery );
