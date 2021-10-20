<?php
/*Template Name: How It Work*/
get_header();
$banner_title 		= 'How Nascate AWARETM Works';
$banner_content 	= 'Through proprietary metrics and advanced modeling, Nascate AWARETM assembles disparate data sets, connects the dots on a person’s healthcare journey over time, and produces a fuller picture of the needs and risks associated with people and populations.';
$banner_image 		= get_template_directory_uri().'/assets/images/work-section.jpg';

$heading_sec_1  	= 'Understanding the Whole Person';
$content_sec_1 		= 'To understand the specific factors that impact a person’s healthcare journey, we first need to create a Nascate Persona to understand the WHOLE person, including the non-clinical factors that have a large impact on health outcomes and costs, and then analyze their behavior and provider relationships over time.';
$image_sec_1 		= get_template_directory_uri().'/assets/images/360DegreeView-01.svg';
$image_content 		= 'Understand and Measure Relationships Improve Patient Experience, Increase Quality';

$heading_sec_2  	= 'Factoring in the Provider Relationship';
$content_sec_2 		= 'The strength of an individual’s relationship with their provider has a huge impact on their healthcare journey. By analyzing this data to understand and quantify that relationship, Payors and Providers gain the insights needed to identify and anticipate risk—and find solutions.';
$image_sec_2 		= get_template_directory_uri().'/assets/images/PersonCentric-01.svg';
$image_content_2 	= 'Anticipate Needs, Leverage Relationships and Deliver Care that Leads to Better Outcomes';

$heading_sec_3  	= 'The Person Profile: Painting a Complete Picture of Each Individual';
$content_sec_3 		= 'The strength of an individual’s relationship with their provider has a huge impact on their healthcare journey. By analyzing this data to understand and quantify that relationship, Payors and Providers gain the insights needed to identify and anticipate risk—and find solutions.';
$image_sec_3 		= get_template_directory_uri().'/assets/images/Dashboard-01.svg';

$heading_sec_4 		= 'Nascate AWARETM Delivers the Critical Insights Providers and Payers Need, Including:';



if(  class_exists('ACF') ) {
	$banner_title 		= get_field('banner_title');
	$banner_content 	= get_field('banner_content');
	$banner_image 		= get_field('banner_image');

	$heading_sec_1  		= get_field('heading_sec_1');
	$before_img_content		= get_field('before_image_content');
	$content_sec_1 			= get_field('content_sec_1');
	$image_sec_1 			= get_field('image_sec_1');
	$image_content 			= get_field('image_content');
	$image_content_2_sec_1 	= get_field('image_content_2_sec_1');

	$heading_sec_2  	= get_field('heading_sec_2');
	$content_sec_2 		= get_field('content_sec_2');
	$image_sec_2 		= get_field('image_sec_2');
	$image_content_2 	= get_field('image_content_2');

	$heading_sec_3  	= get_field('heading_sec_3');
	$content_sec_3 		= get_field('content_sec_3');
	$image_sec_3 		= get_field('image_sec_3');

	$heading_sec_4 		= get_field('heading_sec_4');
}
?>
<!----------  Banner ----------->

<section class="banner mb-5">
	<div class="container">
		<div class="row">
			<div class="col-md-6 mt-5">
				<h1 class="heading-one bold .sans-family text-uppercase main-color"><?php echo $banner_title; ?></h1>
				<div class="primary-paragraph main-color semi-bold mt-7 bannerParagraph">
					<?php echo $banner_content; ?>
				</div>
				<div class="row d-none d-md-block bannerArrow">
					<img class="moveSection" src="<?php echo get_template_directory_uri() . '/assets/images/scroller.png' ?>">	
				</div>
			</div>
			<div class="col-md-6 top-space">
				<img src="<?php echo $banner_image; ?>" class="w-100 m-top">
			</div>
		</div>
		<div class="row d-block d-md-none mt-5">
					<img class="moveSection" src="<?php echo get_template_directory_uri() . '/assets/images/scroller.png' ?>">	
		</div>
	</div>
</section>

<!----------  Section 1 ----------->

<section class="mt-8">
	<div class="container sec-bg mb-4 section1Container">
		<div class="mb-5 sectionPragraphs sec1Para">
			<h3 class="heading-three text-uppercase main-color bold"><?php echo $heading_sec_1; ?></h3>
			<p class="my-4 secondary-paragraph main-color regular"><?php echo $content_sec_1; ?></p>
		</div>
		<div class="row px-4 pt-4">
			<div class="col-12 bg-white pt-5 px-4 sec1Img">
				<h6 class="bold dataGather"><?php echo $before_img_content; ?></h6>
				<img src="<?php echo $image_sec_1; ?>" class="w-100 bg-white">
				<h6 class="howWordSection1Understand main-color text-uppercase bold heading-five mt-3 py-5 px-5 text-center"><?php echo $image_content; ?></h6>
				<h6 class="howWordSection1Improve main-color bold bg-white heading-five py-5 px-5 text-center"><?php echo $image_content_2_sec_1; ?></h6>
			</div>
		</div>
		<div class="row section1Arrow">
			<img class="moveSection mt-sm-0 mt-3 col-sm-2" src="<?php echo get_template_directory_uri() . '/assets/images/scroller.png' ?>">	
		</div>
	</div>
</section>

<!----------  Section 2 ----------->

<!-- <section class="mt-7">
	<div class="container sec-bg pb-4 mb-4">
		<div class="pt-5 px-4">
			<h3 class="heading-three main-color bold"><?php //echo $heading_sec_2; ?></h3>
			<p class="my-4 secondary-paragraph main-color regular"><?php //echo $content_sec_2; ?></p>
		</div>
		<div class="row">
			<div class="col-12">
				<img src="<?php //echo $image_sec_2; ?>" class="w-100 bg-white">
				<h6 class="main-color bold heading-five bg-white py-5 px-5 text-center"><?php// echo $image_content_2; ?></h6>
			</div>
		</div>
	</div>
</section> -->

<!----------  Section 3 ----------->

<section class="mt-7">
	<div class="container sec-bg mb-4 section3Container">
		<div class="sectionPragraphs sec3Para">
			<h3 class="heading-one text-uppercase main-color bold"><?php echo $heading_sec_3; ?></h3>
			<p class="secondary-paragraph main-color regular"><?php echo $content_sec_3; ?></p>
		</div>
		<div class="row section3Row">
			<div class="col-12 bg-white p-4">
				<img src="<?php echo $image_sec_3; ?>" class="w-100 bg-white">
			</div>
		</div>
		<div class="row section3Arrow">
			<img class="moveSection mt-sm-0 mt-3 col-sm-2" src="<?php echo get_template_directory_uri() . '/assets/images/scroller.png' ?>">	
		</div>
	</div>
</section>

<!----------  Section 4 ----------->

<section class="mt-8">
	<div class="container">
		<h2 class="heading-two main-color bold my-5"><?php echo $heading_sec_4; ?></h2>
		<div class="row mb-8">
			<div class="accordion" id="accordionExample">
				<?php
				$count = 1;
				while( have_rows('accordion_how_it_works') ) {
		        the_row();
		        $title = get_sub_field('head_how_it_works');
		        $description = get_sub_field('body_how_it_works');				
	        	?>
			  <div class="accordion-item">
				    <div class="accordion-header" id="<?php  echo "heading$count" ?> "> <!-- card header which is div -->
				      <div type="button" class="accordianOuter row" data-bs-toggle="collapse" data-bs-target="<?php  echo "#collapse$count" ?>" aria-expanded="true" aria-controls="<?php  echo "collapse$count" ?>">
				        <h6 class="col-sm-11 activeHeader bold">
					        <?php echo $title;  ?>				      
				    	</h6>		
				    	  <div class="rounded-circle plusPngIcon plus">
				    	  	<img class="plusPng" src="<?php echo get_template_directory_uri() . '/assets/images/plus.png' ?>">
				    	  	<img class="minusPng" src="<?php echo get_template_directory_uri() . '/assets/images/minus.png' ?>">
				    	  </div>	        
				      </div>  
				    </div>
				    <div id="<?php  echo "collapse$count" ?>" class="accordion-collapse collapse" aria-labelledby="<?php  echo "heading$count" ?>" data-bs-parent="#accordionExample">
				      <div class="accordion-body">
				         <?php echo $description;  ?>	
				      </div>
				    </div>
			  </div>
				<?php 
			$count++;
			} 
		?>
			</div>
		</div>
	</div>
</section>


<?php
get_footer();