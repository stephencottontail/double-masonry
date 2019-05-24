<?php
    /**
     * Plugin Name: Double Masonry
     * Description: A gallery block that uses Masonry for a clean viewing experience
     * Version: 1.0.0
     * License: GPL-2.0
     */

    add_action( 'init', function() {
        wp_register_script( 'sc-double-masonry', plugins_url( 'build/index.js', __FILE__ ), array( 'wp-blocks', 'wp-element' ) );

        wp_register_style( 'sc-double-masonry-editor', plugins_url( 'build/editor.css', __FILE__ ) );
        wp_register_style( 'sc-double-masonry-style', plugins_url( 'build/style.css', __FILE__ ) );

        register_block_type( 'sc/double-masonry', array(
            'editor_script' => 'sc-double-masonry',
            'editor_style'  => 'sc-double-masonry-editor',
            'style'         => 'sc-double-masonry-style'
        ) );
    } );
