<?php
/**
 * Simple WP Gulp functions and definitions
 * 
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package simple-wp-gulp
 * @since 1.0.0
 * @version 1.0.0
 */

/**
 * Paths
 *
 * @since  1.0.0
 */
if ( !defined( 'SIMPLE_THEME_DIR' ) ) {
	define( 'SIMPLE_THEME_DIR', ABSPATH . 'wp-content/themes/' . get_template() );
}

/**
 * Set the content width based on the theme's design and stylesheet.
 */
if ( !isset( $content_width ) ) {
	$content_width = 800; /* pixels */
}

if ( !function_exists( 'simple_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function simple_setup() {

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/**
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/**
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'primary' => esc_html__( 'Primary Menu', 'simple' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form', 'comment-form', 'comment-list', 'gallery', 'caption',
		) );

		// setup different image sizes
		if ( function_exists( 'add_image_size' ) ) {
			//add_image_size( 'default-img', 900, 900, true );
		}

		// Set default values for the upload media box
		update_option( 'image_default_align', 'center' );
		update_option( 'image_default_link_type', 'none' );
		update_option( 'image_default_size', 'full' );
	}
endif; // simple_setup
add_action( 'after_setup_theme', 'simple_setup' );

/**
 * Custom Settings Page
 *
 * @since 1.0.0
 */
if( is_admin() ) {
	require_once( 'inc/simple_settings_page.php' );
	new CustomSettingsPage();
}

/**
 * Styles and scripts
 *
 * @since 1.0.0
 */
if ( file_exists( dirname( __FILE__ ) . '/inc/simple_scripts_styles.php' ) ) {
	require_once( dirname( __FILE__ ) . '/inc/simple_scripts_styles.php' );
}

/**
 * Extras: Custom functions that act independently of the theme templates.
 *
 * @since 1.0.0
 */
if ( file_exists( dirname( __FILE__ ) . '/inc/simple_extras.php' ) ) {
	require_once( dirname( __FILE__ ) . '/inc/simple_extras.php' );
}

/**
 * Template Functions for this theme.
 *
 * @since 1.0.0
 */
if ( file_exists( dirname( __FILE__ ) . '/inc/simple_template_functions.php' ) ) {
	require_once( dirname( __FILE__ ) . '/inc/simple_template_functions.php' );
}

/**
 * Custom post types for this theme.
 *
 * @since 1.0.0
 */
if ( file_exists( dirname( __FILE__ ) . '/inc/simple_custom_posts.php' ) ) {
	require_once( dirname( __FILE__ ) . '/inc/simple_custom_posts.php' );
}
