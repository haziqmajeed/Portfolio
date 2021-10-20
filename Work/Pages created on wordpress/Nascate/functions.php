<?php
/**
 * nascate functions and definitions
 *
 *
 * @package Nascate
 * @subpackage nascate
 */



/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 *
 * @since Twenty Twenty 1.0
 */
function nascate_theme_support() {

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	// Custom background color.
	add_theme_support(
		'custom-background',
		array(
			'default-color' => 'f5efe0',
		)
	);

	// Set content-width.
	global $content_width;
	if ( ! isset( $content_width ) ) {
		$content_width = 580;
	}

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// Set post thumbnail size.
	set_post_thumbnail_size( 1200, 9999 );

	// Add custom image size used in Cover Template.
	add_image_size( 'nascate-fullscreen', 1980, 9999 );

	// Custom logo.
	$logo_width  = 120;
	$logo_height = 90;

	// If the retina setting is active, double the recommended width and height.
	if ( get_theme_mod( 'retina_logo', false ) ) {
		$logo_width  = floor( $logo_width * 2 );
		$logo_height = floor( $logo_height * 2 );
	}

	add_theme_support(
		'custom-logo',
		array(
			'height'      => $logo_height,
			'width'       => $logo_width,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'script',
			'style',
			'navigation-widgets',
		)
	);

	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on Twenty Twenty, use a find and replace
	 * to change 'twentytwenty' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'nascate' );

	// Add support for full and wide align images.
	add_theme_support( 'align-wide' );

	// Add support for responsive embeds.
	add_theme_support( 'responsive-embeds' );


	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

}

add_action( 'after_setup_theme', 'nascate_theme_support' );


/**
 * Register and Enqueue Styles.
 *
 * @since Twenty Twenty 1.0
 */
function nascate_register_styles() {

	$theme_version = wp_get_theme()->get( 'Version' );


	// Add style CSS.
	wp_enqueue_style( 'nascate-style', get_template_directory_uri() . '/style.css' );

}

add_action( 'wp_enqueue_scripts', 'nascate_register_styles' );

/**
 * Register and Enqueue Scripts.
 *
 * @since Twenty Twenty 1.0
 */
function nascate_register_scripts() {

	$theme_version = wp_get_theme()->get( 'Version' );

	if ( ( ! is_admin() ) && is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
	wp_enqueue_script('jquery');
	wp_enqueue_script( 'script', get_template_directory_uri() . '/assets/js/custom.js' );
	wp_script_add_data( 'nascate-js', 'async', true );

}

add_action( 'wp_enqueue_scripts', 'nascate_register_scripts' );


 if( function_exists('acf_add_options_page') ) {
	acf_add_options_page(array(
	'page_title' 	=> 'Theme Options',
	'menu_title'	=> 'Theme Settings',
	'menu_slug' 	=> 'theme-general-settings',
	'capability'	=> 'edit_posts',
	'redirect'		=> false
	));
}




//[trademark] short code
function trademark_function() {
     return '<span class="trademark">NASCATE AWARE&#8482;</span>';
}


function green_text( $atts = [] ) {
  
    // set up default parameters
    $var = $atts[0];
    return "<span class='custom_text'> $var </span>";
}

function wporg_shortcodes_init() {
    add_shortcode( 'greentext', 'green_text' );
    add_shortcode('trademark', 'trademark_function');
}
 
add_action( 'init', 'wporg_shortcodes_init' );


