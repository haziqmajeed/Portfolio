<?php
/**
 * The template for displaying the footer
 *
 * Contains the opening of the #site-footer div and all content after.
 *
 *
 * @package Nascate
 * @subpackage nascate
 */
$site_phone_number  = '(888) 552-8225';
$site_email         = 'info@nascate.com';
if(  class_exists('ACF') ) {
    $site_email         = get_field('site_email', 'option');
    $site_phone_number  = get_field('site_phone_number', 'option');
    $all_right_reserved  = get_field('all_right_reserved', 'option');
}

?>
        <footer>
            <div class="container">
                <hr class="line-color">
                <div class="row mt-4 mb-5">
                    <div class="col-sm-3 footerCustomPhone">
                        <a class="link-one footer-link bold heading-five" href="tel:<?php echo $site_phone_number; ?>"><?php echo $site_phone_number; ?></a>
                    </div>
                    <div class="col-sm-3 footerCustomEmail">
                        <a class="footer-link link-color heading-five bold" href="mailto:<?php echo $site_email; ?>"> <?php echo $site_email; ?></a>
                    </div>
                    <div class="col-sm-6">
                        <div class="text-sm-end secondary-paragraph regular pt-md-1">
                            <?php echo $all_right_reserved;?>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

        <?php wp_footer(); ?>

    </body>
</html>
