<?php
/*Template Name: Contact Us*/
get_header();
if(  class_exists('ACF') ) {
	if( have_rows('people') ) {
			$counter = count(get_field('people'));
			$count = 1;
        ?>
		
			<?php
			while( have_rows('people') ) {
	        the_row();
	        $person_name = get_sub_field('person_name');
	        $person_description = get_sub_field('person_description');
	        $person_image = get_sub_field('person_image');
	        $person_image_url = $person_image['url'];
	        $person_number = get_sub_field('person_number');
	        $person_email = get_sub_field('person_email');
			$person_content = get_sub_field('person_content');
        	?>
        <section class="banner mb-5">
			<div class="container">
				<div class="row mb-8">
					<div class="col-md-6 peopleContentRow">
						<h1 class="heading-one bold text-uppercase .sans-family main-color"><?php echo $person_name; ?></h1>
						<p class="primary-paragraph main-color semi-bold">
							<?php echo $person_description; ?>
						</p>
						<div class="row contactLinks">
							<div class="col-md-4">
								<a class="footer-link link-color heading-five bold" href="tel:<?php echo $person_number; ?>">
									<h3 class=".sans-family personNumber"><?php echo $person_number; ?></h3>
								</a>
							</div>
							<div class="col-md-3">
								<a class="footer-link link-color heading-five bold" href="mailto:<?php echo $person_email; ?>">
									<h3 class=".sans-family personEmail"><?php echo $person_email; ?></h3>
								</a>
							</div>
						</div>
						
						<div class="row">
							<p class="mt-3 personDetail">
								<?php echo $person_content; ?>
							</p>
							<?php 
							if ($count < $counter)
							{ 
							?>
								<img class="moveSection" src="<?php echo get_template_directory_uri() . '/assets/images/scroller.png' ?>">
							<?php 
							} 
							?>
						</div>
					
					</div>
					<div class="col-md-6 top-space">
						<img src="<?php echo $person_image_url ?>" class="w-100 m-top">
					</div>
				</div>
			</div>
		</section>
			 <?php
			 $count++;
    }
    ?>
		

<?php
       
}
	
}


?>
<?php
get_footer();