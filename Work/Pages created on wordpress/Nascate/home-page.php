<?php
/*Template Name: Homepage*/
$heading_sec_1			= 'Driving Sustainable, Value-Based Care Success';
$content_sec_1			= 'Nascate’s data and analytic solutions enable Payers and Providers to improve outcomes, increase revenue, and decrease costs by better understanding their members and managing risk through the development of 360-degree “whole person” insights.';
$image_sec_1			= get_template_directory_uri().'/assets/images/hero-section.jpg';
$button_text_sec_1 		= 'About Nascate';
$health_care_prop_1		= 'Socioeconomic Factors';
$health_care_prop_2		= 'Physical Environment';
$health_care_prop_3		= 'Health Behaviour';
$health_care_prop_4		= 'Utilization Behaviors';
$health_care_prop_5		= 'Health Care';
$image_sec_2			= get_template_directory_uri().'/assets/images/Group-42.png';
$heading_sec_2			= 'Health care is just part of the equation';
$content_sec_2			= 'When it comes to managing an individual’s health care journey, only 20% of it is the health care itself.  Socio-economic factors, along with their physical environment, health behaviors and utilization behaviors—including the strength of their relationship with their primary provider—all have a major impact on health outcomes and costs.';
$heading_1_sec_3 		= 'Improving the lives of your members and reducing costs';
$content_1_sec_3		= 'In today’s health care environment, managing these patient journeys through value-based care is critical to successful growth for both Payers and Providers to increase efficiency and improve outcomes.';
$heading_2_sec_3		= 'Nascate AWARETM was developed specifically to meet this need';
$second_content_sec_3	= 'This can’t be done without advanced tools that provide a 360-degree view of individual consumers to understand all factors that influence their healthcare journey—including the non-clinical factors that have a large impact on health outcomes and costs.';
$content_2_sec_3		= 'Nascate AWARETM technology meets this critical need in a unique, high-value, proprietary suite of analytics developed specifically to help Payers and Providers easily identify, understand, and manage member journeys through 360-degree whole person insights, enabling them to effectively and efficiently manage risk and reduce costs.';
$image_sec_3 			= get_template_directory_uri().'/assets/images/section2-img.jpeg';
$heading_sec_4			= 'Just How Important Is a 360-Degree View to Improving Care and Reducing Costs?';
$content_sec_4			= 'The healthcare journey and associated costs vary immensely based on the individual. Take Sam, Bob and Ted—three healthcare consumers with the same clinical profile. Social factors, combined with how they use the healthcare system, lead to very different outcomes.';
$card_heading_1			= '1 Healthcare Day';
$main_image_card_1 		= get_template_directory_uri().'/assets/images/icon-1.png';
$p_name_1				= 'Bob';
$gender_1				= 'Male';
$age_1 					= '35';
$card_title_1			= 'Complex chronic';
$diseases_card_1 		= 'Diabetes <br> Hypertension';
$image_card_1			= get_template_directory_uri().'/assets/images/connected.png';
$content_card_1 		= 'Not Connected <br> Cares for Sick Family';
$summary_title_1 		= 'Summary';
$summary_1 				= "Sam's PMPM is low<br>because he's under-utilizing.<br> He's not connected to<br>a PCP and his conditions<br>aren't being managed.";

$card_heading_2			= '18 Healthcare Days';
$main_image_card_2 		= get_template_directory_uri().'/assets/images/icon-2.png';
$p_name_2				= 'Sam';
$gender_2				= 'Male';
$age_2 					= '58';
$card_title_2			= 'Complex chronic';
$diseases_card_2 		= 'Diabetes <br> Hypertension';
$image_card_2			= get_template_directory_uri().'/assets/images/Shopping-01.png';
$content_card_2 		= 'Shopper <br> Lives alone, no support';
$summary_title_2 		= 'Summary';
$summary_2 				= "Bob is constantly worried<br>about his health and has <br>no support at home. He is seeing<br>three different PCPs <br>and multiple specialists.";

$card_heading_3			= '8 Healthcare Days';
$main_image_card_3 		= get_template_directory_uri().'/assets/images/icon-3.png';
$p_name_3				= 'Ted';
$gender_3				= 'Male';
$age_3 					= '49';
$card_title_3			= 'Complex chronic';
$diseases_card_3 		= 'Diabetes <br> Hypertension';
$image_card_3			= get_template_directory_uri().'/assets/images/Married.png';
$content_card_3 		= 'Married <br> Spouse is healthy';
$summary_title_3 		= 'Summary';
$summary_3 				= "Ted has been connected to a <br>single PCP for years and<br>the PCP has been managing his <br>diseases. Ted also has support at <br>home from his wife.";
$heading_5 				= 'Nascate AWARETM provides a comprehensive 360-degree person view with relevant and focused insights to improve patient experience, healthcare quality, outcomes, revenue and cost';
$link 					= '';
$link_url 				= '';
$link_title 			= '';
$link_target 			= '';		
$content_sec_5			= '';



if(  class_exists('ACF') ) {
	$heading_sec_1			= get_field('heading_sec_1');
	$content_sec_1			= get_field('content_sec_1');
	$image_sec_1			= get_field('image_sec_1');
	$button_text_sec_1 		= get_field('button_text_sec_1');
	$health_care_prop_1		= get_field('health_care_prop_1');
	$health_care_prop_2		= get_field('health_care_prop_2');
	$health_care_prop_3		= get_field('health_care_prop_3');
	$health_care_prop_4		= get_field('health_care_prop_4');
	$health_care_prop_5		= get_field('health_care_prop_5');
	$image_sec_2			= get_field('image_sec_2');
	$heading_sec_2			= get_field('heading_sec_2');
	$content_sec_2			= get_field('content_sec_2');
	$heading_1_sec_3		= get_field('heading_1_sec_3');
	$content_1_sec_3		= get_field('content_1_sec_3');
	$second_content_sec_3 	= get_field('second_content_sec_3');
	$heading_2_sec_3		= get_field('heading_2_sec_3');
	$content_2_sec_3		= get_field('content_2_sec_3');
	$image_sec_3 			= get_field('image_sec_3');

	$heading_sec_4 			= get_field('heading_sec_4');
	$content_sec_4 			= get_field('content_sec_4');
	$content_sec_5			= get_field('content_sec_5');

	$card_heading_1			= get_field('card_heading_1');
	$main_image_card_1 		= get_field('main_image_card_1');
	$p_name_1				= get_field('p_name_1');
	$gender_1				= get_field('gender_1');
	$age_1 					= get_field('age_1');
	$card_title_1			= get_field('card_title_1');
	$diseases_card_1 		= get_field('diseases_card_1');
	$image_card_1			= get_field('image_card_1');
	$content_card_1 		= get_field('content_card_1');
	$summary_title_1 		= get_field('summary_title_1');
	$summary_1 				= get_field('summary_1');
	$health_text_footer 	= get_field('healthcard1_text_footer');
	$health_digits_footer 	= get_field('healthcard1_digits_footer');

	$card_heading_2			= get_field('card_heading_2');
	$main_image_card_2 		= get_field('main_image_card_2');
	$p_name_2				= get_field('p_name_2');
	$gender_2				= get_field('gender_2');
	$age_2 					= get_field('age_2');
	$card_title_2			= get_field('card_title_2');
	$diseases_card_2 		= get_field('diseases_card_2');
	$image_card_2			= get_field('image_card_2');
	$content_card_2 		= get_field('content_card_2');
	$summary_title_2 		= get_field('summary_title_2');
	$summary_2 				= get_field('summary_2');
	$health2_text_footer 	= get_field('healthcard2_text_footer');
	$health2_digits_footer 	= get_field('healthcard2_digits_footer');

	$card_heading_3			= get_field('card_heading_3');
	$main_image_card_3 		= get_field('main_image_card_3');
	$p_name_3				= get_field('p_name_3');
	$gender_3				= get_field('gender_3');
	$age_3 					= get_field('age_3');
	$card_title_3			= get_field('card_title_3');
	$diseases_card_3 		= get_field('diseases_card_3');
	$image_card_3			= get_field('image_card_3');
	$content_card_3 		= get_field('content_card_3');
	$summary_title_3 		= get_field('summary_title_3');
	$summary_3 				= get_field('summary_3');
	$health3_text_footer 	= get_field('healthcard3_text_footer');
	$health3_digits_footer 	= get_field('healthcard3_digits_footer');

	$heading_5 				= get_field('heading_5');
	$link 					= get_field('how_we_work_button');
	if($link){
		$link_url 			= $link['url'];
		$link_title 		= $link['title'];
		$link_target 		= $link['target'] ? $link['target'] : '_self';
	}
	

}

get_header();
?>
<!----------  Banner ----------->

<section class="banner mb-5">
	<div class="container">
		<div class="row">
			<div class="col-md-6 mt-5">
				<h1 class="heading-one bold .sans-family main-color"><?php echo $heading_sec_1; ?></h1>
				<p class="primary-paragraph main-color semi-bold mt-7">
					<?php echo $content_sec_1; ?>
				</p>
				<div class="row mt-md-5">
					<a class="col-sm-8" href="<?php echo home_url(); ?>/about-us">
						<button type="button" class="btn btn-outline-success px-4"><?php echo$button_text_sec_1; ?></button>
					</a>
					<img class="moveSection mt-sm-0 mt-3 col-sm-2" src="<?php echo get_template_directory_uri() . '/assets/images/scroller.png' ?>"> 
					<!-- <div class="rounded-circle scroller">
						<img class="" src="<?php //echo get_template_directory_uri() . '/assets/images/downarrow.png' ?>">
					</div> -->
				</div>
			</div>
			<div class="col-md-6 top-space">
				<img src="<?php echo $image_sec_1; ?>" class="w-100 m-top">
			</div>
		</div>
	</div>
</section>

<!----------  Section 1 ----------->

<section class="section-1 mt-8">
	<div class="container sec-bg">
		<div class="row section1Row1">
			<div class="col-md-4 socioEconomicFactor">
				<div class="bg-green text-white mx-auto text-center economicFactor">
					<p class="py-2 bold"><?php echo $health_care_prop_1; ?></p>
				</div>
				<div class="bg-yellow text-white mx-auto text-center">
					<p class="py-2 bold"><?php echo $health_care_prop_2; ?></p>
				</div>
				<div class="bg-sky text-white mx-auto text-center">
					<p class="py-2 bold"><?php echo $health_care_prop_3; ?></p>
				</div>
				<div class="bg-blue text-white mx-auto text-center">
					<p class="py-2 bold"><?php echo $health_care_prop_4; ?></p>
				</div>
				<br>
				<div class="bg-gray text-white mx-auto text-center healthcare">
					<p class="py-2 bold"><?php echo $health_care_prop_5; ?></p>
				</div>
			</div>
			<div class="col-md-2 sec1-bg">
				<img src="<?php echo $image_sec_2; ?>" class="w-100">
			</div>
			<div class="col-md-6 rightSection">
				<div class="pe-7">
					<h2 class="heading-two bold main-color"><?php echo $heading_sec_2; ?></h2>
					<p class="secondary-paragraph main-color regular mt-md-5"><?php echo $content_sec_2; ?></p>
				</div>
			</div>
			 <div class="row section1Arrow">
				<img class="moveSection" src="<?php  echo get_template_directory_uri() . '/assets/images/scroller.png' ?>">	
			</div>
			<!-- <div class="rounded-circle scroller">
				<img class="" src="<?php echo get_template_directory_uri() . '/assets/images/downarrow.png' ?>">
			</div> -->
		</div>
		
		</div>
</section>

<!----------  Section 2 ----------->





<section class="mt-8 section-2">
	<div class="container">
		<div class="row pt-md-5">
			<div class="col-md-6 homePageSection2">
				<div class="mt-8">
					<h2 class="mb-5 heading-two bold main-color"><?php echo $heading_1_sec_3; ?></h2>
					<p class="mb-5 secondary-paragraph section2paragragh1  main-color"><?php echo $content_1_sec_3; ?></p>
					
				</div>
				<div id="homePageSection2div2">
					<p class="secondary-paragraph main-color regular"><?php echo $second_content_sec_3; ?></p>
					<div class="secondary-paragraph main-color regular semi-bold">
						<?php echo $content_2_sec_3; ?>
					</div>
					<div class="row section2Arrow mt-5 d-none d-md-block">
						<img class="moveSection" src="<?php echo get_template_directory_uri() . '/assets/images/scroller.png' ?>">	
					</div>
				</div>
			</div>
			<div class="col-md-6 text-end">
				<img src="<?php echo $image_sec_3;?>" class="cover-img">
			</div>
		</div>
		<div class="row d-block d-md-none mt-5">
					<img class="moveSection" src="<?php echo get_template_directory_uri() . '/assets/images/scroller.png' ?>">	
		</div>
	</div>
</section>

<!----------  Section 3 ----------->


<section class="mt-8">
	<div class="container sec-bg pt-md-5 pb-4 mb-4">
		<div class="text-center pt-5 px-4">
			<h3 class="heading-three main-color bold text-uppercase w-md-50 mx-auto mt-3 section3Heading3"><?php echo $heading_sec_4; ?></h3>
			<p class="mt-2 mx-auto secondary-paragraph main-color regular section3paragraph"><?php echo $content_sec_4; ?></p>
			<h4 class="section3Heading4 text-uppercase"><?php echo $content_sec_5; ?></h4>
		</div>		
		<div class="row">
			<div class="col-md-4">
				<div class="card text-center card-1">
					<div class="card-header semi-bold head1-bg">
						<?php echo $card_heading_1; ?>
					</div>
					<div class="card-body body-color">
						<img src="<?php echo $main_image_card_1; ?>">
						<h5 class="card-title title-font"><?php echo $p_name_1; ?> <br><?php echo $gender_1; ?> , <?php echo $age_1; ?></h5>
						<hr class="mx-auto w-50">
						<h5 class="card-title title-font"><?php echo $card_title_1; ?></h5>
						<p class="card-text"><?php echo $diseases_card_1; ?></p>
						<hr class="mx-auto w-50 mb-4">
						<img src="<?php echo $image_card_1; ?>">
						<h5 class="card-title title-font"><?php echo $content_card_1; ?></h5>
						<hr class="mx-auto w-50 mt-4">
						<h5 class="card-title title-font"><?php echo $summary_title_1; ?></h5>
						<p class="card-text"><?php echo $summary_1; ?></p>
					</div>
					<div class="card-header head1-bg cardFooter">
						<p class="cardFooterP1"><?php echo $health_text_footer; ?></p>
						<p class="semi-bold cardFooterP2"><?php echo $health_digits_footer; ?></p>
					</div>
				</div>
			</div>
			
			<div class="col-md-4">
				<div class="card text-center card-2">
					<div class="card-header semi-bold head2-bg">
						<?php echo $card_heading_2; ?>
					</div>
					<div class="card-body body-color">
						<img src="<?php echo $main_image_card_2; ?>">
						<h5 class="card-title title-font"><?php echo $p_name_2; ?> <br> <?php echo $gender_2; ?>, <?php echo $age_2; ?></h5>
						<hr class="mx-auto w-50">
						<h5 class="card-title title-font"><?php echo $card_title_2; ?></h5>
						<p class="card-text "><?php echo $diseases_card_2; ?></p>
						<hr class="mx-auto w-50 mb-4">
						<img src="<?php echo $image_card_2; ?>">
						<h5 class="card-title title-font"><?php echo $content_card_2; ?></h5>
						<hr class="mx-auto w-50 mt-4">
						<h5 class="card-title title-font"><?php echo $summary_title_2; ?></h5>
						<p class="card-text"><?php echo $summary_2; ?></p>
					</div>
					<div class="card-header head2-bg cardFooter">
						<p class="cardFooterP1"><?php echo $health2_text_footer; ?></p>
						<p class="semi-bold cardFooterP2"><?php echo $health2_digits_footer; ?></p>
					</div>
				</div>
			</div>

			<div class="col-md-4">
				<div class="card text-center card-3">
					<div class="card-header semi-bold head3-bg">
						<?php echo $card_heading_3; ?>
					</div>
					<div class="card-body body-color">
						<img src="<?php echo $main_image_card_3; ?>">
						<h5 class="card-title title-font"><?php echo $p_name_3; ?> <br><?php echo $gender_3; ?> , <?php echo $age_3; ?></h5>
						<hr class="mx-auto w-50">
						<h5 class="card-title title-font"><?php echo $card_title_3; ?></h5>
						<p class="card-text"><?php echo $diseases_card_3; ?></p>
						<hr class="mx-auto w-50 mb-4">
						<img src="<?php echo $image_card_3; ?>">
						<h5 class="card-title title-font"><?php echo $content_card_3; ?></h5>
						<hr class="mx-auto w-50 mt-4">
						<h5 class="card-title title-font"><?php echo $summary_title_3; ?></h5>
						<p class="card-text"><?php echo $summary_3; ?></p>
					</div>
					<div class="card-header head3-bg cardFooter">
						<p class="cardFooterP1"><?php echo $health3_text_footer; ?></p>
						<p class="cardFooterP2"><?php echo $health3_digits_footer; ?></p>
					</div>
				</div>
			</div>
			<div class="row section3Arrow">
				<img class="moveSection" src="<?php echo get_template_directory_uri() . '/assets/images/scroller.png' ?>">	
			</div>
		</div>
	</div>
</section>

<!----------  Section 4 ----------->

<section class="section-4 mt-8">
	<div class="container">
		<div class="text-center mx-auto mb-8 px-3 px-md-4">
			<h2 class="heading-two main-color bold px-md-5 "><?php echo $heading_5; ?></h2>
		</div>
		<div class="row">
			<?php
				if( have_rows('info_blog') ){

				 	// loop through the rows of data
				 	$count = 1;
				    while ( have_rows('info_blog') ) : the_row(); ?>
				    	<div class="col-md-4">
				    		<div class="card <?php  echo "section4card$count" ?>">
				    			<img src="<?php echo the_sub_field('blog_img'); ?>" class="card-img-top img-fluid fix-height" alt="...">
				    			<div class="rounded-circle bold"><?php echo $count ?></div>
				    			<div class="card-body card-h text-center">
				    				<h5 class="section4CardHeading text-uppercase"><?php echo the_sub_field('blog_heading'); ?></h5>
				    				<p class="card-text px-4 section4CardParagraph"><?php echo the_sub_field('blog_content'); ?></p>
				    			</div>
				    		</div>
				    	</div>
				        
				       <?php $count++; ?>

				<?php    endwhile;

				}
			?>
			<!-- <div class="col-md-4">
				<div class="card">
					<img src="<?php echo get_template_directory_uri(); ?>/assets/images/img-1.jpg" class="card-img-top img-fluid fix-height" alt="...">
					<div class="card-body card-h text-center">
						<h5 class="heading-three text-uppercase card-title w-75 mx-auto">Understand An Individual’s History</h5>
						<p class="card-text">See how a person has engaged with the healthcare system in the past, their history of risk factors, medical conditions, and provider relationships.</p>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="card">
					<img src="<?php echo get_template_directory_uri(); ?>/assets/images/img-2.jpg" class="card-img-top img-fluid fix-height" alt="...">
					<div class="card-body card-h text-center">
						<h5 class="heading-three text-uppercase card-title w-75 mx-auto">See Where They Are Now</h5>
						<p class="card-text">Nascate's Person Profile gives you a 360° view of a person's current social and clinical risks, their unique needs, geography, family support, connections, behavior, relationship with their provider, and more.</p>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="card">
					<img src="<?php echo get_template_directory_uri(); ?>/assets/images/img-3.jpg" class="card-img-top img-fluid fix-height" alt="...">
					<div class="card-body card-h text-center">
						<h5 class="heading-three text-uppercase card-title w-50 mx-auto">Change Their Future</h5>
						<p class="card-text">Nascate's predictive insights technology will anticipate a person’s needs with confidence so that you can take the actions needed to change their trajectory and improve outcomes across the board.</p>
					</div>
				</div>
			</div> -->
		</div>
		
		<div class="text-center my-5">
			<a href="<?php echo $link_url; ?>"><button type="button" class="btn btn-outline-success px-4"><?php echo $link_title; ?></button> </a>
		</div>
	</div>
</section>


<?php
get_footer();