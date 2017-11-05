<?php
/**
 * Scripts and Styles
 *
 * @package simple-wp-gulp
 * @since 1.0.0
 * @version 1.0.0
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) { die; }

/**
 * Scripts: Frontend with no conditions, Add Custom Scripts to wp_head
 *
 * @since  1.0.0
 */
add_action( 'wp_enqueue_scripts', 'simple_scripts' );
function simple_scripts() {

	if ( $GLOBALS['pagenow'] != 'wp-login.php' && !is_admin() ) {
		wp_dequeue_script( 'jquery' );
		wp_dequeue_script( 'jquery-core' );
		wp_dequeue_script( 'jquery-migrate' );
		wp_enqueue_script( 'jquery', false, array(), false, true ); // Enqueue it!
		wp_enqueue_script( 'jquery-core', false, array(), false, true ); // Enqueue it!
		wp_enqueue_script( 'jquery-migrate', false, array(), false, true ); // Enqueue it!

		/**
		 * Minified and concatenated scripts
		 * Order is important!
		 */
			wp_register_script( 'simple_mainJS', get_template_directory_uri() . '/assets/js/dist/main.min.js', array(), '1.0.0', true );
			wp_enqueue_script( 'simple_mainJS'); // Enqueue it!

		/**
		 * Enqueue modernizr.min.js IE less than 9
		 */
		wp_register_style( 'ie_modernizr', get_template_directory_uri() . '/assets/js/dist/modernizr.min.js', array(), '3.5.0' );
		wp_enqueue_style( 'ie_modernizr' );
		wp_style_add_data( 'ie_modernizr', 'conditional', 'lt IE 9' );

	}

}

/**
* Styles: Frontend with no conditions, Add Custom styles to wp_head
*
* @since  1.0.0
*/
add_action( 'wp_enqueue_scripts', 'simple_styles' ); // Add Theme Stylesheet
function simple_styles() {

	/**
	 * Minified and Concatenated styles
	 */
	wp_register_style( 'simple_style', get_template_directory_uri() . '/assets/css/main.min.css', array(), '1.0.0', false );
	wp_enqueue_style( 'simple_style' ); // Enqueue it!

	/**
	 * Google fonts
	 * Must be included this way to avoid Firefox issues
	 */
	wp_register_style( 'simple_google_fonts', 'https://fonts.googleapis.com/css?family=Open+Sans:400', array(), '1.0.0', false );
	wp_enqueue_style( 'simple_google_fonts' ); // Enqueue it!

}
