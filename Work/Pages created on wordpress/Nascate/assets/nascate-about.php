<?php
/*Template Name: About Us*/
get_header();


$page_title 			= 'About Us';
$banner_content 		= 'Nascate is a data services and technology company that delivers analytic insights and support to help payers and providers achieve sustainable value-based care. We look beyond traditional cost and clinical information and focus on the relationships and behaviors that drive a person’s engagement with the delivery system.';
$banner_image 			= get_template_directory_uri().'/assets/images/about-section.jpg';



$link_about 			= '';
$alink_url 				= '';
$alink_title 			= '';
$alink_target 			= '';

$heading_1 				= 'Lorem Ipsum Dolar Sit Amet';
$content_1 				= 'Founded in 2016, our dedicated team of healthcare experts, data scientists, and applied AI specialists are laser focused on understanding the interconnections among consumers, providers and health plans. Our proprietary metrics and advanced models utilize existing data in a unique way that drives longitudinal analysis of consumer and provider behavior. This comprehensive insight helps surface and quantify risk-factors for people and populations. Nascate’s timely intelligence enables our clients to segment populations, predict risk, identify value-based opportunities, and prioritize/target actions.';
$content_2				= 'Nascate’s solutions effectively work to inform and advance value-based principles, with an emphasis on operationalizing social determinants, improving post-acute care, supporting growth in the Medicare Advantage market, and optimizing value-based programs.';
if(  class_exists('ACF') ) {

	$page_title 			= get_field('page_title');
	$banner_content 		= get_field('banner_content');
	$banner_image 			= get_field('banner_image');
	$link_about 			= get_field('about_us_button');

	$heading_1 				= get_field('heading_1');
	$content_1 				= get_field('content_1');
	$content_2				= get_field('content_2');

	if($link_about){
		$alink_url 			= $link_about['url'];
		$alink_title 		= $link_about['title'];
		$alink_target 		= $link_about['target'] ? $link_about['target'] : '_self';
	}
	
}
?>
<!----------  Banner ----------->

<section class="banner mb-5">
	<div class="container">
		<div class="row">
			<div class="col-md-6 mt-5">
				<h1 class="heading-one bold .sans-family text-uppercase main-color"><?php echo $page_title; ?></h1>
				<p class="primary-paragraph main-color semi-bold mt-7">
					<?php echo $banner_content; ?>
				</p>
				<img class="moveSection" src="<?php echo get_template_directory_uri() . '/assets/images/scroller.png' ?>">
				<!-- <a href="<?php //echo $alink_url; ?>"><button type="button" class="btn btn-outline-success px-4 mt-md-5"><?php //echo $alink_title; ?></button></a> -->
			</div>
			<div class="col-md-6 top-space">
				<img src="<?php echo $banner_image; ?>" class="w-100 m-top">
			</div>
		</div>
	</div>
</section>

<!----------  Section 1 ----------->

<section class="section1 mb-8">
	<div class="container">
		<div class="row backgroundColor">
			<h2 class="heading-two main-color bold"><?php echo $heading_1; ?></h2>
			<div class="col-sm-2">
				<img src="<?php echo get_template_directory_uri() . '/assets/images/img-about.png' ?>">
			</div>
			<p class="secondary-paragraph regular main-color col-sm-10">

				<?php echo $content_1; ?>
			</p>
		</div>
		<p class="secondary-paragraph regular main-color boldText">
			<?php echo $content_2; ?>
		</p>
		<div class="row align-center">
			<a href="<?php echo $alink_url; ?>"><button type="button" class="btn btn-outline-success px-5 mt-md-4"><?php echo $alink_title; ?></button></a>
		</div>
	</div>
</section>


<?php
get_footer();