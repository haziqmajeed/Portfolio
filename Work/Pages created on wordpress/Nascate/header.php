<?php
/**
 * Header file for the nascate theme.
 *
 * 
 *
 * @package Nascate
 * @subpackage nascate
 */

$logo_image			= '';
$site_phone_number	= '(888) 552-8225';
$navbar_item_class = "";
$page_id = get_queried_object_id();
$page_slug_nav = "";
// $current_page = sanitize_post( $GLOBALS['wp_the_query']->get_queried_object() );
// $slug = $current_page->post_name;
// echo $slug;

if ($page_id == 13){
	$page_slug_nav = "How Nascate Aware™ Works";
}
elseif ($page_id == 11) {
	$page_slug_nav = "About Nascate";
}
elseif ($page_id == 197) {
	$page_slug_nav = "Contact Us";
}

if(  class_exists('ACF') ) {
	$logo_image			= get_field('logo', 'option');
	$site_phone_number	= get_field('site_phone_number', 'option');
	
}

?><!DOCTYPE html>
<html>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1.0" >


		<?php wp_head(); ?>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title></title>
		<link rel="stylesheet" type="text/css" href="style.css">
		<link rel="stylesheet" type="text/css" href="style2.css">
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">

	</head>
	<body <?php body_class(); ?>>

		<?php
			wp_body_open();
		?>
	

		<header>
			<div class="container">
				<nav class="navbar navbar-expand-lg navbar-light bg-light">
					<a class="navbar-brand" href="<?php echo home_url(); ?>">
						<img src="<?php echo $logo_image; ?>" class="res-logo">
					</a>
					<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse align-top" id="navbarSupportedContent">
						<ul class="navbar-nav ms-auto">
							<?php
							
							while( have_rows('navbar','option') ) {
		        			the_row();
		    				$navbar_item = get_sub_field('navbar_item');
		    				if($navbar_item){
							$navbar_item_url 		= $navbar_item['url'];
							$navbar_item_title 		= $navbar_item['title'];
							}
							if ($page_slug_nav == $navbar_item_title){
								$navbar_item_class = "active";
							}
		        			?>

							<li class="nav-item" id="<?php echo "$navbar_item_class" ?>">
								<a class="nav-link" href="<?php echo $navbar_item_url; ?>"><?php echo $navbar_item_title; ?></a>
							</li>
							<?php
							$navbar_item_class = "";
						}

						?>
							
						</ul>
					</div>
				</nav>
			</div>
		</header>