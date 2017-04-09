<?php
/**
 * Custom functions that act independently of the theme templates
 *
 * Eventually, some of the functionality here could be replaced by core features
 *
 * @package simple-wp-gulp
 */

// Remove WordPress Version from header (security issues)
function simple_remove_version_info() {
	return '';
}
add_filter( 'the_generator', 'simple_remove_version_info' );

// Allow editor role manage options (if you use simple_settings_page.php)
$role_object = get_role( 'editor' );
$role_object->add_cap( 'manage_options' );

// Add custom post types count action to WP Dashboard
add_action('dashboard_glance_items', 'custom_posttype_glance_items');

// Showing all custom posts count
function custom_posttype_glance_items() {
	$glances = array();

	$args = array(
		'public'   => true,  // Showing public post types only
		'_builtin' => false  // Except the build-in wp post types (page, post, attachments)
	);

	// Getting your custom post types
	$post_types = get_post_types( $args, 'object', 'and' );

	foreach ( $post_types as $post_type ) {
		// Counting each post
		$num_posts = wp_count_posts( $post_type->name );

		// Number format
		$num   = number_format_i18n( $num_posts->publish );
		// Text format
		$text  = _n( $post_type->labels->singular_name, $post_type->labels->name, intval( $num_posts->publish ) );

		// If use capable to edit the post type
		if ( current_user_can( 'edit_posts' ) ) {
				// Show with link
				$glance = '<a class="'.$post_type->name.'-count" href="'.admin_url( 'edit.php?post_type='.$post_type->name ).'">'.$num.' '.$text.'</a>';
		} else {
			// Show without link
			$glance = '<span class="'.$post_type->name.'-count">'.$num.' '.$text.'</span>';
		}

		// Save in array
		$glances[] = $glance;
	}

	// return them
	return $glances;
}

function simple_feed_request( $qv ) {
	// If a request for the RSS feed is made, but the request
	// isn't specifically for a Custom Post Type feed
	if ( isset( $qv['feed'] ) && !isset( $qv['post_type'] ) ) {
		// Return a feed with posts of post type 'post' and 'thoughts'
		$qv['post_type'] = array( 'your_custom_post_type' );
	}

	return $qv;
}
add_filter( 'request', 'simple_feed_request' );
