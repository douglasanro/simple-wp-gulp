<?php
/**
 * Custom functions that act independently of the theme templates
 *
 * Eventually, some of the functionality here could be replaced by core features
 *
 * @package simple-wp-gulp
 */

/* ----------------------------------------------------------------------------
 * Remove WordPress version from header
 * ------------------------------------------------------------------------- */
function simple_remove_version_info() {
	return '';
}
add_filter( 'the_generator', 'simple_remove_version_info' );

/* ----------------------------------------------------------------------------
 * Add CPT count action to WordPress dashboard
 * ------------------------------------------------------------------------- */
add_action( 'dashboard_glance_items', 'simple_glance_items' );

// Showing all custom posts count
function simple_glance_items() {
	$glances = array();

	$args = array(
		'public'   => true, // Showing public post types only
		'_builtin' => false // Except the build-in wp post types (page, post, attachments)
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

/* ----------------------------------------------------------------------------
 * Add CPT to your main WordPress RSS feed
 * ------------------------------------------------------------------------- */
function simple_feed_request( $rss ) {
	if ( isset( $rss[ 'feed' ] ) && !isset( $rss['post_type'] ) ) {
		// Return posts of post types of your choice like 'post' and 'news'
		$rss['post_type'] = array( 'any' );
	}
	return $rss;
}
