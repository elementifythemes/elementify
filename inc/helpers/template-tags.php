<?php
/**
 * Custom template tags for the theme.
 *
 * @package Elementify
 */

if ( ! function_exists( 'elementify_get_the_post_thumbnail' ) ) {

	/**
	 * Gets the thumbnail with Lazy Load.
	 * Should be called in the WordPress Loop.
	 *
	 * @param int|null $post_id               Post ID.
	 * @param string   $size                  The registered image size.
	 * @param array    $additional_attributes Additional attributes.
	 *
	 * @return string
	 */
	function elementify_get_the_post_thumbnail( $post_id, $size = 'medium', $additional_attributes = [] ) {
		$custom_thumbnail = '';

		if ( null === $post_id ) {
			$post_id = get_the_ID();
		}

		if ( has_post_thumbnail( $post_id ) ) {
			$default_attributes = [
				'loading' => 'lazy'
			];

			$attributes = array_merge( $additional_attributes, $default_attributes );

			$custom_thumbnail = wp_get_attachment_image(
				get_post_thumbnail_id( $post_id ),
				$size,
				false,
				$attributes
			);
		}

		return $custom_thumbnail;
	}
}

if ( ! function_exists( 'elementify_the_post_thumbail' ) ) {

	/**
	 * Renders Custom Thumbnail with Lazy Load.
	 *
	 * @param int    $post_id               Post ID.
	 * @param string $size                  The registered image size.
	 * @param array  $additional_attributes Additional attributes.
	 */
	function elementify_the_post_thumbail( $post_id, $size = 'medium', $additional_attributes = [] ) {

		echo elementify_get_the_post_thumbnail( $post_id, $size, $additional_attributes ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
}

if ( ! function_exists( 'elementify_the_excerpt' ) ) {

	/**
	 * Get the trimmed version of post excerpt.
	 *
	 * This is for modifing manually entered excerpts,
	 * NOT automatic ones WordPress will grab from the content.
	 *
	 * It will display the first given characters ( e.g. 100 ) characters of a manually entered excerpt,
	 * but instead of ending on the nth( e.g. 100th ) character,
	 * it will truncate after the closest word.
	 *
	 * @param int $trim_character_count Charter count to be trimmed
	 * @param string $tail excerpt ending
	 * @param bool $link excerpt ending enable/disale link
	 *
	 * @return bool|string
	 */
	function elementify_the_excerpt( $trim_character_count = 0, $tail = '...', $link = false ) {

		global $post;
		$post_ID = $post->ID;

		if ( empty( $post_ID ) ) {
			return null;
		}

		if ( has_excerpt() || 0 === $trim_character_count ) {

			the_excerpt();

			return;
		}

		if ( $link ) {
			$tail = sprintf(
				' <a class="ele-link" href="%1$s">%2$s</a>',
				esc_url( get_the_permalink() ),
				esc_html( $tail )
			);
		}

		$post_content = $post->post_content;
		$post_content = apply_filters( 'the_content', $post_content );
		$post_content = preg_replace( '@\[caption[^\]]*?\].*?\[\/caption]@si', '', $post_content );
		$post_content = preg_replace( '@<script[^>]*?>.*?</script>@si', '', $post_content );
		$post_content = preg_replace( '@<style[^>]*?>.*?</style>@si', '', $post_content );
		$post_content = preg_replace( ' (\[.*?\])', '', $post_content );
		$post_content = strip_shortcodes( $post_content );
		$post_content = strip_tags( $post_content );
		
		$post_content = substr( $post_content, 0, $trim_character_count );
		$post_content = substr( $post_content, 0, strrpos( $post_content, ' ' ) );
		$post_content = trim( preg_replace( '/\s+/', ' ', $post_content ) );
		$post_content = $post_content . $tail;


		//$excerpt = wp_html_excerpt( get_the_excerpt( $post_ID ), $trim_character_count, $tail );

		echo wpautop( $post_content ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
}

if ( ! function_exists( 'elementify_excerpt_more' ) ) {

	/**
	 * Filter the "read more" excerpt string link to the post.
	 *
	 * @param string $more "Read more" excerpt string.
	 *
	 * @return string (Maybe) modified "read more" excerpt string.
	 */
	function elementify_excerpt_more( $more = '' ) {

		$more = sprintf( '<div class="ele-read-more-wrap"><a class="ele-read-more" href="%1$s">%2$s</a></div><!-- .ele-read-more-wrap -->',
			get_permalink( get_the_ID() ),
			__( 'Read more', 'elementify' )
		);

		return apply_filters( 'elementify/excerpt_more', $more );
	}
}

if ( ! function_exists( 'elementify_is_uploaded_via_wp_admin' ) ) {

	/**
	 * Checks to see if the specified user id has a uploaded the image via wp_admin.
	 *
	 * @return bool  Whether or not the user has a gravatar
	 */
	function elementify_is_uploaded_via_wp_admin( $gravatar_url ) {

		$parsed_url = wp_parse_url( $gravatar_url );

		$query_args = ! empty( $parsed_url['query'] ) ? $parsed_url['query'] : '';

		// If query args is empty means, user has uploaded gravatar.
		return empty( $query_args );

	}
}

if ( ! function_exists( 'elementify_has_gravatar' ) ) {

	/**
	 * If the gravatar is uploaded returns true.
	 *
	 * There are two things we need to check, If user has uploaded the gravatar:
	 * 1. from WP Dashboard, or
	 * 2. or gravatar site.
	 *
	 * If any of the above condition is true, user has valid gravatar,
	 * and the function will return true.
	 *
	 * 1. For Scenario 1: Upload from WP Dashboard:
	 * We check if the query args is present or not.
	 *
	 * 2. For Scenario 2: Upload on Gravatar site:
	 * When constructing the URL, use the parameter d=404.
	 * This will cause Gravatar to return a 404 error rather than an image if the user hasn't set a picture.
	 *
	 * @param $user_email
	 *
	 * @return bool
	 */
	function elementify_has_gravatar( $user_email ) {

		$gravatar_url = get_avatar_url( $user_email );

		if ( elementify_is_uploaded_via_wp_admin( $gravatar_url ) ) {
			return true;
		}

		$gravatar_url = sprintf( '%s&d=404', $gravatar_url );

		// Make a request to $gravatar_url and get the header
		$headers = @get_headers( $gravatar_url );

		// If request status is 200, which means user has uploaded the avatar on gravatar site
		return preg_match( "|200|", $headers[0] );
	}
}







if ( ! function_exists( 'elementify_posted_on' ) ) :
	/**
	 * Prints HTML with meta information for the current post-date/time.
	 */
	function elementify_posted_on() {
		$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
		if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
			$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
		}

		$time_string = sprintf(
			$time_string,
			esc_attr( get_the_date( DATE_W3C ) ),
			esc_html( get_the_date() ),
			esc_attr( get_the_modified_date( DATE_W3C ) ),
			esc_html( get_the_modified_date() )
		);

		$posted_on = sprintf(
			/* translators: %s: post date. */
			esc_html_x( 'Posted on %s', 'post date', 'elementify' ),
			'<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . $time_string . '</a>'
		);

		echo '<span class="posted-on">' . $posted_on . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

	}
endif;

if ( ! function_exists( 'elementify_posted_by' ) ) :
	/**
	 * Prints HTML with meta information for the current author.
	 */
	function elementify_posted_by() {
		$byline = sprintf(
			/* translators: %s: post author. */
			esc_html_x( 'by %s', 'post author', 'elementify' ),
			'<span class="author vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>'
		);

		echo '<span class="byline"> ' . $byline . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

	}
endif;

if ( ! function_exists( 'elementify_entry_footer' ) ) :
	/**
	 * Prints HTML with meta information for the categories, tags and comments.
	 */
	function elementify_entry_footer() {

		if ( ! is_single() ) {
			return;
		}

		// Hide category and tag text for pages.
		if ( 'post' === get_post_type() ) {
			/* translators: used between list items, there is a space after the comma */
			$categories_list = get_the_category_list( esc_html__( ', ', 'elementify' ) );
			if ( $categories_list ) {
				/* translators: 1: list of categories. */
				printf( '<span class="cat-links">' . esc_html__( 'Posted in %1$s', 'elementify' ) . '</span>', $categories_list ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}

			/* translators: used between list items, there is a space after the comma */
			$tags_list = get_the_tag_list( '', esc_html_x( ', ', 'list item separator', 'elementify' ) );
			if ( $tags_list ) {
				/* translators: 1: list of tags. */
				printf( '<span class="tags-links">' . esc_html__( 'Tagged %1$s', 'elementify' ) . '</span>', $tags_list ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
		}

		// if ( ! is_single() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
		// 	echo '<span class="comments-link">';
		// 	comments_popup_link(
		// 		sprintf(
		// 			wp_kses(
		// 				/* translators: %s: post title */
		// 				__( 'Leave a Comment<span class="screen-reader-text"> on %s</span>', 'elementify' ),
		// 				array(
		// 					'span' => array(
		// 						'class' => array(),
		// 					),
		// 				)
		// 			),
		// 			wp_kses_post( get_the_title() )
		// 		)
		// 	);
		// 	echo '</span>';
		// }

		edit_post_link(
			sprintf(
				wp_kses(
					/* translators: %s: Name of current post. Only visible to screen readers */
					__( 'Edit <span class="screen-reader-text">%s</span>', 'elementify' ),
					array(
						'span' => array(
							'class' => array(),
						),
					)
				),
				wp_kses_post( get_the_title() )
			),
			'<span class="edit-link">',
			'</span>'
		);
	}
endif;

if ( ! function_exists( 'elementify_post_thumbnail' ) ) :
	/**
	 * Displays an optional post thumbnail.
	 *
	 * Wraps the post thumbnail in an anchor element on index views, or a div
	 * element when on single views.
	 */
	function elementify_post_thumbnail() {
		if ( post_password_required() || is_attachment() || ! has_post_thumbnail() ) {
			return;
		}

		if ( is_singular() ) :
			?>

		<div class="post-thumbnail">
			<?php the_post_thumbnail(); ?>
		</div><!-- .post-thumbnail -->

		<?php else : ?>

		<a class="post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
			<?php
							the_post_thumbnail(
								'post-thumbnail',
								array(
									'alt' => the_title_attribute(
										array(
											'echo' => false,
										)
									),
								)
							);
						?>
		</a>

		<?php
		endif; // End is_singular().
	}
endif;

if ( ! function_exists( 'wp_body_open' ) ) :
	/**
	 * Shim for sites older than 5.2.
	 *
	 * @link https://core.trac.wordpress.org/ticket/12563
	 */
	function wp_body_open() {
		do_action( 'wp_body_open' );
	}
endif;