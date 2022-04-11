<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://tastydigital.com
 * @since      1.0.0
 *
 * @package    WS_Subscription_Box
 * @subpackage WS_Subscription_Box/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    WS_Subscription_Box
 * @subpackage WS_Subscription_Box/admin
 * @author     Tasty Digital <developers@tastydigital.com>
 */
class WS_Subscription_Box_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * The metakey used to determine if items were added via a box.
	 *
	 * @since  1.0.0
	 * @access public
	 * @var    string
	 */
	public $item_box_key;

	/**
	 * The metakey used to determine if a line item has been discounted.
 	 *
	 * @since  1.0.0
	 * @access public
	 * @var string
	 */
	public $item_discounted_key;

	/**
	 * The metakey used to tell us if a line item is only there to bring the order total up to £30.
	 *
	 * @since  1.0.0
	 * @access public
	 * @var string
	 */
	public $min_box_fee_key;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string $plugin_name       The name of this plugin.
	 * @param      string $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name     = $plugin_name;
		$this->version         = $version;
		$this->life_stage      = 'life-stage';
		$this->definition_slug = 'life-stage';
		$this->definition_name = 'Life Stage';

		$this->item_box_key        = '_in_box_subscription';
		$this->item_discounted_key = '_has_box_discount';
		$this->min_box_fee_key     = '_min_box_spend_fee';

		include_once plugin_dir_path( __FILE__ ) . 'class-ws-subscription-box-template.php';
		include_once plugin_dir_path( __FILE__ ) . 'class-ws-subscription-box-admin-meta-boxes.php';
		include_once plugin_dir_path( __FILE__ ) . 'class-ws-template-box-data-store-cpt.php';

		add_filter( 'woocommerce_data_stores', [ $this, 'set_ws_subscription_box_data_store' ], 5 );


		include_once plugin_dir_path( __FILE__ ) . 'class-ws-subscription-box-settings.php';

	}
	public function set_ws_subscription_box_data_store( $stores ) {
		$stores['box-template'] = 'WS_Template_Box_Data_Store_CPT';
		return $stores;
	}
	public function class_aliases() {
		class_alias( 'SkyVerge\WooCommerce\Memberships\Profile_Fields', 'Profile_Fields' );
		class_alias( 'SkyVerge\WooCommerce\Memberships\Profile_Fields\Profile_Field', 'Profile_Field' );
		class_alias( 'SkyVerge\WooCommerce\Memberships\Profile_Fields\Profile_Field_Definition', 'Profile_Field_Definition' );
	}
	public function ws_box_release_submit_button_info( $post ) {
		if ( $post->post_type === 'ws-box-release' ) {
			echo '<div class="clear"></div>';
			echo '<p style="text-align: left;">' . __( 'Moving from <strong>pending</strong> or <strong>draft</strong> status to <strong>published</strong> or <strong>scheduled</strong> will update all active subscriptions.', 'ws-subscription-box' );
			echo '<p style="text-align: left;">' . __( '<strong>Scheduled</strong> provisioning requires that this months box is not yet ready, and your scheduled publish date is before the next subscription payment date', 'ws-subscription-box' );
		}
	}
	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in WS_Subscription_Box_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The WS_Subscription_Box_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/ws-subscription-box-admin.css', [], $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		$screen = get_current_screen();
		if ( ( $screen->post_type == 'ws-box-release' && $screen->base == 'post' ) || $screen->id === 'shop_subscription' ) {

			wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/ws-subscription-box-admin.js', [ 'jquery' ], filemtime( plugin_dir_path( __FILE__ ) . 'js/ws-subscription-box-admin.js' ), false );
		}

	}

	public function my_ajax_handler() {

		$terms = self::get_life_stages();
		if ( empty( $terms ) ) {
			return;
		}

		$hash_table = [];
		foreach ( $terms as $term ) {
			$hash_table[ $term->term_id ] = $term->name;
		}

		$data = [
			'lifeStageCounts'         => self::get_life_stage_counts(),
			'promoNamesToIds'         => self::get_promo_product_ids_to_name_array( true ),
			'promoNamesToStockLevels' => self::get_promo_stock_levels_per_life_stage(),
			'promoIdsToPrices'        => self::get_promo_product_ids_to_prices_array(),
			'editLinks'               => self::get_promo_product_ids_to_edit_links(),
			'Ids2Names'               => $hash_table,
		];

		wp_send_json_success( $data );
	}

	// Adds an input field for promotional stock on the product level, in the Inventory tab
	public function product_level_promo_stock() {
		global $woocommerce, $post;
		$promo_product = wc_get_product( $post->ID );
		if ( is_a( $promo_product, 'WC_Product_Variable' ) ||
             is_a( $promo_product, 'WC_Product_Variable_Subscription' ) ||
             is_a( $promo_product, 'WC_Product_Grouped' ) ||
             is_a( $promo_product, 'WC_Product_Subscription' ) ) {
			return;
		}

		echo '<div class="product_custom_field">';
		woocommerce_wp_text_input(
			[
				'id'                => '_product_level_promo_stock',
				'placeholder'       => '',
				'value'             => $this->get_promo_stock_level( $promo_product ),
				'label'             => __( 'Promo Stock Quantity', 'woocommerce' ),
				'type'              => 'number',
				'custom_attributes' => [
					'step' => 'any',
					'min'  => '0',
				],
				'desc_tip'          => 'true',
				'description'       => __( 'Separate promotional stock counter for this product', 'woocommerce' ),
			]
		);
		echo '</div>';

		// Reserved stock Quantity
		woocommerce_wp_text_input(
			[
				'id'                => '_product_level_reserved_stock',
				'placeholder'       => '',
				'value'             => $this->get_reserved_stock_level( $promo_product ),
				'label'             => __( 'Reserved Stock Quantity', 'woocommerce' ),
				'type'              => 'number',
				'custom_attributes' => [
					'step'     => 'any',
					'min'      => '0',
					'disabled' => 'disabled',
				],
				'desc_tip'          => 'true',
				'description'       => __( 'Reserved stock counter for this product', 'woocommerce' ),
			]
		);
	}

	// Adds an input field for promotional stock on the variation level
	public function variation_level_promo_stock( $loop, $variation_data, $variation ) {
		 global $woocommerce, $post;
		echo '<div class="product_custom_field">';
		woocommerce_wp_text_input(
			[
				'id'                => $variation->ID . '_variation_level_promo_stock',
				'placeholder'       => '',
				'value'             => $this->get_promo_stock_level( wc_get_product( $variation->ID ) ),
				'label'             => __( 'Promo Stock Quantity', 'woocommerce' ),
				'type'              => 'number',
				'custom_attributes' => [
					'step' => 'any',
					'min'  => '0',
				],
				'desc_tip'          => 'true',
				'description'       => __( 'Separate promotional stock counter for this product', 'woocommerce' ),
			]
		);

		// Reserved stock Quantity
		woocommerce_wp_text_input(
			[
				'id'                => $variation->ID . '_variation_level_reserved_stock',
				'placeholder'       => '',
				'value'             => $this->get_reserved_stock_level( wc_get_product( $variation->ID ) ),
				'label'             => __( 'Reserved Stock Quantity', 'woocommerce' ),
				'type'              => 'number',
				'custom_attributes' => [
					'step'     => 'any',
					'min'      => '0',
					'disabled' => 'disabled',
				],
				'desc_tip'          => 'true',
				'description'       => __( 'Separate reserved stock counter for this product', 'woocommerce' ),
			]
		);

		echo '</div>';
	}


	/**
	 * Save the custom fields for the product.
	 *
	 * @param int $post_id The post id.
	 * @return void
	 */
	public function ws_product_custom_fields_save( $post_id ) {
		// Save product level promo stock/
		$product_promo_stock_key = '_product_level_promo_stock';
		if ( array_key_exists( $product_promo_stock_key, $_POST ) ) {
			$this->set_promo_stock_level( wc_get_product( $post_id ), (int) $_POST[ $product_promo_stock_key ] );
		}

		// Save variation level promo stock.
		$variation_promo_stock_key = '_variation_level_promo_stock';
		foreach ( $_POST as $key => $value ) {

			if ( str_contains( $key, $variation_promo_stock_key ) ) {
				$variation_id = str_replace( $variation_promo_stock_key, '', $key );
				if ( is_numeric( $variation_id ) ) {
					$this->set_promo_stock_level( wc_get_product( $variation_id ), (int) $value );
				}
			}
		}
	}

	/**
	 * Save the custom fields for the variation when the save button is clicked.
	 *
	 * @param int $variation_id The variation id.
	 * @return void
	 */
	public function ws_variable_product_custom_fields_save( $variation_id ) {
		$meta_key   = '_variation_level_promo_stock';
		$posted_key = $variation_id . $meta_key;

		if ( array_key_exists( $posted_key, $_POST ) ) {
				$this->set_promo_stock_level( wc_get_product( $variation_id ), (int) $_POST[ $posted_key ] );

		}
	}

	public static function currency_symbol( $cur ) {
		if ( ! $cur ) {
			return false;
		}
		$currencies = [
			'USD' => '$', // US Dollar
			'EUR' => '€', // Euro
			'CRC' => '₡', // Costa Rican Colón
			'GBP' => '£', // British Pound Sterling
			'ILS' => '₪', // Israeli New Sheqel
			'INR' => '₹', // Indian Rupee
			'JPY' => '¥', // Japanese Yen
			'KRW' => '₩', // South Korean Won
			'NGN' => '₦', // Nigerian Naira
			'PHP' => '₱', // Philippine Peso
			'PLN' => 'zł', // Polish Zloty
			'PYG' => '₲', // Paraguayan Guarani
			'THB' => '฿', // Thai Baht
			'UAH' => '₴', // Ukrainian Hryvnia
			'VND' => '₫', // Vietnamese Dong)
		];

		if ( array_key_exists( $cur, $currencies ) ) {
			return $currencies[ $cur ];
		} else {
			return $cur;
		}
	}

	public static function get_box_note( $arr ) {
			$order_parent_key    = '_wc_memberships_access_granted';
			$order_parent_index  = array_search( $order_parent_key, array_column( $arr, 'key' ) );
			$order_parent_object = $arr[ $order_parent_index ];
			$order_parent_data   = $order_parent_object->get_data();
		if ( ! empty( $order_parent_data['value'] ) ) {
			foreach ( $order_parent_data['value'] as $key => $value ) {
				$parent_keys       = get_post_meta( $key );
				$subscription_id   = $parent_keys['_subscription_id'][0];
				$subscription_data = get_post_meta( $subscription_id );
				$curated_box_id    = $subscription_data['_curated_box_id'];
				$curated_box_data  = get_post_meta( $curated_box_id[0] );
				return $curated_box_data['curated_box_text'][0];
			}
		} else {
			return '';
		}

	}

	public function ws_custom_pdf_template() {

		// Custom Table and its data
		add_filter( 'wpo_wcpdf_before_order_details', 'wpo_wcpdf_show_product_categories', 10, 2 );
		function wpo_wcpdf_show_product_categories( $document_type, $order ) {
			$document              = wcpdf_get_document( $document_type, $order );
			$details               = $document->order->get_data();
			$billing_information   = $document->order->get_meta_data();
			$order_detail 		   = $details['line_items'];
			$quantity 			   = "";
			$sub_total			   = "";
			$name	   			   = "";
			$currency_name		   = $details['currency'];
			$currency_symbol	   = WS_Subscription_Box_Admin::currency_symbol($currency_name);
			$full_name			   = $details['shipping']['first_name']." ".$details['shipping']['last_name'];
			$selected_template_box = WS_Subscription_Box_Admin::get_box_note($billing_information);
			$shipping_total		   = $details['shipping_total'];
			$total		   		   = $details['total'];
			$products_total 	   = 0;

				// $order_id = $_GET['order_ids'];
				// print_r($order_id);
				// global $wpdb;
				// $table_prefix = $wpdb->prefix . "postmeta";
				// $query = "SELECT * FROM  $table_prefix WHERE post_id=$order_id AND ( meta_key ='_wcpdf_invoice_date_formatted' OR meta_key = '_wcpdf_invoice_number' ) ";
				// $result = $wpdb->get_results($query);
				// $invoice_date_time 			= $result[0]->meta_value;
				// $invoice_date_time_array	= explode(" ",$invoice_date_time);
				// $invoice_number 			= $result[1]->meta_value;
			$header_img = get_home_path()."app/themes/wellbeingsisters/images/table_header_bg-min1.png";

		     if ('packing-slip' == $document_type) {
		     	?>
		     	<div class="main-div">
		     		<div class="inner-div">
		     			<p>Hello <?php echo $full_name; ?>!<br>And Welcome to your May WSCLUB. box.

		     				<?php if(!empty($selected_template_box)){ ?>
		     				<br><?php echo $selected_template_box; ?>
		     				<?php } ?>
		     				<br> With love,Natasha & Jessica xx</p>
		     		</div>
			     	<table class="table-detail" style="position:relative;">
			     		<tr class="head" style="background-image: url('<?php echo $header_img; ?>');background-color: black; background-position: center;background-attachment: fixed; ">
							<th>Product</th>
							<th>Quantity</th>
							<th>RRP</th>
							<th>CLUB<span class="green-dot">.</span>Price</th>
						</tr>
						
				   <?php
					foreach ( $order_detail as $key => $value ) {
						$item_detail    = $value->get_data();
						$quantity       = $item_detail['quantity'];
						$sub_total      = $item_detail['total'];
						$name           = $item_detail['name'];
						$product_id     = $item_detail['product_id'];
						$brand_details  = get_the_terms( $product_id, 'pwb-brand' );
						$brand_name     = $brand_details[0]->name;
						$variation_id   = $item_detail['variation_id'];
						$product_data   = '';
						$products_total = $products_total + $sub_total;
						if ( ! empty( $variation_id ) ) {
							$product_data = get_post_meta( $variation_id, '_regular_price', true );
						} else {
							$product_data = get_post_meta( $product_id, '_regular_price', true );
						}
						$rrp_price = $product_data;

						if ( $rrp_price == $sub_total ) {
							$rrp_price = '-';
						} else {
							$rrp_price = $currency_symbol . $product_data;
						}

						$image_data = get_post_meta( $item_detail['product_id'] , '_thumbnail_id' , true );
						$image      = wp_get_attachment_image_url( $image_data, 'thumbnail' );

						if ( ! empty( $image ) ){
							$home_url	 = get_home_url();
							$absolute_path = get_home_path();
							$image_path	 = str_replace($home_url,$absolute_path,$image);
						}

						?>
						<tr>
							<td class="table-body">
								<table class="inner-table">
									<tr>
										<?php if ( ! empty( $image ) ) { ?>
										<td><img style="width: auto;" src="<?php echo $image_path; ?>" /></td>
										<?php } ?>
										<td class="inner-table-name">
											<p class="brand-name"><?php echo $brand_name; ?></p>
											<?php echo $name; ?>
										</td>
									</tr>
								</table>
							</td>
							<td class="table-body-2"><?php echo $quantity; ?></td>
							<td class="table-body-3"><?php echo $rrp_price; ?></td>
							<td class="table-body-4">
							<?php
							echo $currency_symbol;
							echo $sub_total;
							?>
							</td>
						</tr>
					<?php } ?>
						<tr>
							<td></td>
							<td></td>
							<td class="table-body-5">Subtotal:</td>
							<td class="table-body-5">
							<?php
							echo $currency_symbol;
							echo $products_total;
							?>
							</td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td class="table-body-5">Delivery:</td>
							<td class="table-body-5 delivery-section">
							<?php
							if($shipping_total>0){
								echo $currency_symbol;
								echo $shipping_total;
							}else{
								echo "Free Shipping";
							}

							?>
							</td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td class="table-body-5"><strong>Total:</strong></td>
							<td class="table-body-5"><strong>
							<?php
							echo $currency_symbol;
							echo $total;
							?>
							</strong></td>
						</tr>
					 </table>
				</div>
				<?php
			}
		}

		//Payment Method
		add_action( 'wpo_wcpdf_after_order_data', 'wpo_wcpdf_after_orderdata' , 10 , 2);
		function wpo_wcpdf_after_orderdata ($document_type , $order) {
			$document 				= wcpdf_get_document( $document_type, $order );
			$details 				= $document->order->get_data();
			$payment_method_detail 	= $details['payment_method_title'];
			if ('packing-slip' == $document_type) {
				if(!empty($payment_method_detail)){
				?>

					<table class="payment-method-table">
						<tr>
							<td>Payment Method:</td>
							<td><?php echo $payment_method_detail; ?></td>
						</tr>
					</table>
				<?php
			}
			}
		}

		// Invoice Number and Date
		add_action( 'wpo_wcpdf_before_order_data', 'wpo_wcpdf_before_orderdata', 10, 2 );
		function wpo_wcpdf_before_orderdata( $document_type, $order ) {
			// $document  = wcpdf_get_document( $document_type, $order );
			// $meta_data = $document->order->get_meta_data();
			// $invoice_key        = '_wcpdf_invoice_date_formatted';
			// $invoice_date_index = array_search( $invoice_key, array_column( $meta_data, 'key' ) );
			// $invoice_key          = '_wcpdf_invoice_number';
			// $invoice_number_index = array_search( $invoice_key, array_column( $meta_data, 'key' ) );
			// $invoice_date_array			= $meta_data[$invoice_date_index]->get_data();
			// $invoice_date_time 			= $invoice_date_array['value'];
			// $invoice_date_time_array	= explode(" ",$invoice_date_time);
			// $invoice_number				= $meta_data[$invoice_number_index]->get_data();
			if(isset($_GET['order_ids'])){
				$order_id = $_GET['order_ids'];
				global $wpdb;
				$table_prefix = $wpdb->prefix . "postmeta";
				$query = "SELECT * FROM  $table_prefix WHERE post_id=$order_id AND ( meta_key ='_wcpdf_invoice_date_formatted' OR meta_key = '_wcpdf_invoice_number' ) ";
				$result = $wpdb->get_results($query);
				$invoice_date_time 			= $result[0]->meta_value;
				$invoice_date_time_array	= explode(" ",$invoice_date_time);
				$invoice_number 			= $result[1]->meta_value;
			}
			if ('packing-slip' == $document_type) {
				if(isset($invoice_number) || isset($invoice_date_time_array[0])){
				?>

					<table class="invoice-table">
						<tr><td></td></tr>
						<?php
							if(!empty($invoice_number)){
						?>
						<tr>
							<td>Invoice Number:</td>
							<td><?php echo $invoice_number; ?></td>
						</tr>
						<?php
						}
						?>
						<?php
							if(!empty($invoice_date_time_array[0])){ ?>
						<tr>
							<td>Invoice Date:</td>
							<td><?php echo $invoice_date_time_array[0]; ?></td>
						</tr>
						<?php
						}
						?>
					</table>
				<?php
				}
			}
		}

		// Remove Packing Slip Title
		add_action( 'wpo_wcpdf_packing_slip_title', 'wpo_wcpdf_slip_title' );
		function wpo_wcpdf_slip_title( $title ) {
			if(isset($_GET['action']) && isset($_GET['document_type'])){
				if ( $_GET['action'] == 'generate_wpo_wcpdf' && $_GET['document_type'] == 'packing-slip' ) {
					return '';
				} else {
					return $title;
				}
			}
			else{
				return $title;
			}
		}

		// Box Release Message
		add_action( 'wpo_wcpdf_before_document_label', 'wpo_wcpdf_delivery_date', 10, 2 );
		function wpo_wcpdf_delivery_date( $document_type, $order ) {
			$document            = wcpdf_get_document( $document_type, $order );
			$billing_information = $document->order->get_meta_data();
			$selected_template_box = WS_Subscription_Box_Admin::get_box_note( $billing_information );

			// Box Release Message
			if ( 'packing-slip' == $document_type ) {
				?>
			<table class="box-release-title">
				<tr>
					<td><p>Your Ws<strong>club</strong><span class="green-dot"><b>.</b></span> box<span class="green-dot">.</span> delivered<span class="green-dot">.</span></p></td>
				</tr>
			</table>
				<?php
			}

		}

		// Footer
		add_action( 'wpo_wcpdf_before_footer', 'wpo_wcpdf_footer', 10, 2 );
		function wpo_wcpdf_footer( $document_type, $order ) {
			$document 				= wcpdf_get_document( $document_type, $order );
			$message  				= get_field( 'curated_box_text', '13373' );
			$details 			    = $document->order->get_data();
			$currency_name		    = $details['currency'];
			$currency_symbol	    = WS_Subscription_Box_Admin::currency_symbol($currency_name);
			if ( 'packing-slip' == $document_type ) {
				?>
				<div class="footer">
					<div class="head1">
						<h1>Refer a friend</h1>
						<p>And Both get <?php echo $currency_symbol; ?>5 credit towards your next CLUB<span class="green-dot">.</span> Box! Login to your account for more details.</p>
					</div>
					<div class="head2">
						<img src="<?php echo get_theme_root()."/genesis/images/products.jpg"; ?>" width="140" height="140">
					</div>
					<div class="head3">
						<h1 >Win <?php echo $currency_symbol; ?>50 to spend at ws!</h1>
						<p>For your chance to win* , shout about your CLUB<span class="green-dot">.</span> box on instagram. Tag @wellbeing.sisters and use #myclubbox<br> Reels and vids count as 5 entries! <br> *Monthly competetion. The winner will be picked at random and announced on the last day of each months.</p>
					</div>
				</div>
				<?php
			}
		}

		// Name Address Email MobileNumber
		add_filter( 'wpo_wcpdf_shipping_address', 'wpo_wcpdf_shipping_details', 10, 2 ); // 10 is the priority 2 is the args.
		function wpo_wcpdf_shipping_details( $shipping_address, $order_document ) {
			$billing_information = $order_document->order->get_data();
			$full_name           = $billing_information['shipping']['first_name'] . ' ' . $billing_information['shipping']['last_name'];
			$full_address        = '';
			$email               = '';
			$phone               = '';

			if ( empty( $billing_information['billing']['address_1'] ) ) {
				$full_address = $billing_information['shipping']['address_1'];
			} else {
				$full_address = $billing_information['billing']['address_1'];
			}

			if ( empty( $billing_information['billing']['email'] ) ) {
				$email = $billing_information['shipping']['email'];
			} else {
				$email = $billing_information['billing']['email'];
			}

			if ( empty( $billing_information['billing']['phone'] ) ) {
				$phone = $billing_information['shipping']['phone'];
			} else {
				$phone = $billing_information['billing']['phone'];
			}

			$shipping_address_filter = "
				<table class='shipping_details'>
					<tr>
						<td>Name:</td>
						<td>$full_name</td>
					</tr>
					<tr>
						<td>Address:</td>
						<td>$full_address</td>
					</tr>
					<tr>
						<td>Email:</td>
						<td>$email</td>
					</tr>
					<tr>
						<td>Phone:</td>
						<td>$phone</td>
					</tr>
				</table>
			";
			return $shipping_address_filter;
		}

		//Remove Shipping Under Invoice Number
		// add_action( 'wpo_wcpdf_shipping_method', 'wpo_wcpdf_remove_shipping', 10, 2 );
		// function wpo_wcpdf_remove_shipping ( $shipping_method, $order_document ) {
		// 	$shipping_method = "hi";
		// 	return $shipping_method;
		// }


		// Styling For PDF Packing Slip
		add_action( 'wpo_wcpdf_custom_styles', 'wpo_wcpdf_custom_styles', 10, 2 );
		function wpo_wcpdf_custom_styles ( $document_type, $document ) {
		    if ('packing-slip' == $document_type) {
			    ?>
			    body{
			    	width:110% !important;
			    	margin-left:-5%;
			    }
			    .footer{
			        width:108%;
			        margin-left:-5%;
			        position:fixed;
			        height:fit-content;
			        background:linear-gradient(0deg, rgba(219,218,216,0.6), rgba(219,218,216,0.6)), url(https://www.linkpicture.com/q/Copy-of-WBS_Pattern-Final_single_wh.png);
			        background-position:50% 70%;
			        background-size:600px 500px;;
			        top:-60px;
			        padding-right:10px;
			        padding-top:2px;
			    }
			    table.head h3{
			    	text-align:right;
			    	font-weight:regular;
			    	font-size:16px;
			    }
			    table.head p{
				    text-align:right;

				}
				td.header img {
			        max-height: 1.5cm;
			        width: auto;
			    }
			    .main-div{
			    	border-top: 2px solid black !important;
			    }
			    .main-div .inner-div p{
			    	font-family: 'MyFont';
					font-style: normal;
				    font-weight: normal;
			    	font-size:16px;
			    	line-height:1;
			    }

			    .footer .head1{
			    	width:20%;
			    	margin-left:30px;
			    	float: left;
			    }
			    .footer .head2{
			    	width:25%;
			    	margin-top:3%;
			    	float: left;
			    }
			    .footer .head3{
			    	width:50%;
			    	margin-right:30px;
			    	float: left;
			    }

			    .footer h1{
					font-family: 'MyFont';
					font-style: normal;
				    font-weight: 900;
			    }

			    .footer p{
			    	font-family: 'MyFont';
					font-style: normal;
				    font-weight: normal;
			    	font-size:14px;
			    	line-height:0.9;
			    }
			    .footer .head1 h1{
			    	line-height:0.9;
			    	margin:0;
			    	padding:0;
			    	font-weight:thin;
			    }

			    .footer .head3 h1{
			    	margin-bottom:10px;
			    	font-weight:thin;
			    }
			    .footer .head1 h1, .footer .head3 h1{
			        text-align:center;
			        color:#2ba57c;
			        font-size:24px;
			        text-transform: uppercase;
			    }
			    .footer .footer-row td {
			        text-align: center;
			    	<!-- border :1px solid black; -->
			    }


			    #footer {
			    	border:none;
			    }
			    .box-release-title {
			        width:100%;
			    }
			    .box-release-title p{
			    	font-size:26px;
			    	text-transform:uppercase;
			    }
			    .box-release-title td{
			        text-align:center;
			    }
			    .order-details thead th {
			        display:none;
			    }
			    .order-details{
			        display:none;
			    }

			    .main-div{
			    	border-top:1px solid black;
			    	text-align: center;
			    }
			    .inner-div{
			    	padding: 15px 0px 25px 0px;
			    }
			    .table-detail{
			    	width:100%;
			    }
			    .table-detail .head{
			    	background:rgba(0,0,0,1);
			    	color:white;
			    }
				.table-detail .head th{
					padding: 10px 0px;
					text-align:center;
				}
				.table-detail .head th:first-child{
					padding-left:10px;
					text-align:left;
				}
				.table-detail .head th:first-child{
					width:50%;
				}
				.table-detail .table-body,.table-detail .table-body-2 ,.table-detail .table-body-3,.table-detail .table-body-4 {
					text-align:center;
				}
				.table-detail .table-body-2 ,.table-detail .table-body-3,.table-detail .table-body-4{
					padding:15px
				}
				.table-detail .table-body-5{
					padding-right:37px;
					text-align:right;
				}
				.table-detail .table-body-3{
					text-decoration: line-through;
					text-decoration-thickness: 3px;
				}
				.table-detail .delivery-section{
					width:20%;
				}
				.inner-table{
					width:100%;
				}
				.inner-table tr{
					border:unset;
					width:100%;
				}
				.inner-table tr td:first-child{
					width:30% !important;
				}
				.inner-table tr td:first-child img{
					width:50px !important;
					height:50px !important;
				 }
				.inner-table tr td:nth-child(1){
					width:70% !important;
				}
				.inner-table .inner-table-name{
					width:300%;
				}
				.inner-table .inner-table-name .brand-name{
					font-family: 'MyFont';
					font-style: normal;
					margin-top:-2.5%;
				    font-weight: bold;
				    text-transform:uppercase;
				}

			    .payment-method-table{
			    	width:210% !important;
			    }
			    .invoice-table{
			    	width:170% !important;
			    }
			    .shipping_details{
			    	width:100% !important;
			    }
			    .green-dot{
			    	color:green;
			    }
			    .customer-notes{
			    	display:none;
			    }

			    <?php
			}
		}

	}

	public function ws_register_endpoints() {
		register_rest_route(
			'wbs/v1/products',
			'/has-promo-stock/',
			[
				'methods'             => 'GET',
				'callback'            => [ $this, 'get_available_products' ],
				'permission_callback' => '__return_true',
			]
		);
		register_rest_route(
			'wbs/v1/subscription-box',
			'/remove-product/',
			[
				'methods'             => 'POST',
				'callback'            => [ $this, 'ws_remove_line_item' ],
				'permission_callback' => [ $this, 'can_update_products_in_box' ],
			]
		);
		register_rest_route(
			'wbs/v1/subscription-box',
			'/add-product/',
			[
				'methods'             => 'POST',
				'callback'            => [ $this, 'ws_add_product_to_line_items' ],
				'permission_callback' => [ $this, 'can_update_products_in_box' ],
			]
		);

		register_rest_route(
			'wbs/v1/subscription-box',
			'/subscription/',
			[
				'methods'             => 'POST',
				'callback'            => [ $this, 'get_subscription' ],
				'permission_callback' => [ $this, 'can_view_subscription' ],
			]
		);

		register_rest_route(
			'wbs/v1/subscription-box',
			'/reset/',
			[
				'methods'             => 'POST',
				'callback'            => [ $this, 'reset_subscription_endpoint' ],
				'permission_callback' => [ $this, 'can_reset_box' ],
			]
		);


		register_rest_route(
			'wbs/v1/subscription-box',
			'/skip-box/',
			[
				'methods'             => 'POST',
				'callback'            => [ $this, 'customer_skip_subscription_endpoint' ],
				'permission_callback' => [ $this, 'can_update_products_in_box' ],
			]
		);
	}

	public function add_life_stage_taxonomy() {
		// Add new taxonomy, make it hierarchical (like categories)
		$name   = 'Life Stage';
		$labels = [
			'name'              => _x( $name . 's', 'taxonomy general name', 'textdomain' ),
			'singular_name'     => _x( $name, 'taxonomy singular name', 'textdomain' ),
			'search_items'      => __( 'Search ' . $name, 'textdomain' ),
			'all_items'         => __( 'All ' . $name . 's', 'textdomain' ),
			'parent_item'       => __( 'Parent ' . $name, 'textdomain' ),
			'parent_item_colon' => __( 'Parent ' . $name . ':', 'textdomain' ),
			'edit_item'         => __( 'Edit ' . $name, 'textdomain' ),
			'update_item'       => __( 'Update ' . $name, 'textdomain' ),
			'add_new_item'      => __( 'Add New ' . $name, 'textdomain' ),
			'new_item_name'     => __( 'New ' . $name, 'textdomain' ),
		];

		$args = [
			'hierarchical'      => false,
			'labels'            => $labels,
			'show_ui'           => true,
			'show_admin_column' => true,
			'query_var'         => true,
			'rewrite'           => [ 'slug' => $this->life_stage ],
			'show_in_rest'      => true,
		];
		register_taxonomy( $this->life_stage, [ 'product' ], $args );
	}

	public function ws_get_product_brands( $product_id ) {
		// TODO: add caching but delete the cache when the product is updated.
		// we need to to decode html entities in the brand names, also only one is needed.
		$brands      = wc_get_product_terms( $product_id, 'pwb-brand' );
		$brandoutput = [];
		foreach ( $brands as $brand ) {
			$brand->name        = html_entity_decode( $brand->name );
			$brand->description = html_entity_decode( $brand->description );
			// TODO: this was set to one but it says in the term admin page that if it's zero, the amount is unlimited. I've set it back to a default of zero.
			$brand->box_limit = get_term_meta( $brand->term_id, 'pwb_brand_count_limit', true ) ? get_term_meta( $brand->term_id, 'pwb_brand_count_limit', true ) : 0;
			$attachment_id    = get_term_meta( $brand->term_id, 'pwb_brand_image', 1 );
			$attachment_html  = wp_get_attachment_image_src( $attachment_id, 'ws-box-brand-logo' );
			if ( ! empty( $attachment_html ) ) {
				$attachment_srcset = wp_get_attachment_image_srcset( $attachment_id, 'ws-box-brand-logo' );
				array_push( $attachment_html, $attachment_srcset );
				$brand->logo = $attachment_html;
			}
			$brandoutput[] = $brand;
		}
		return $brandoutput;
	}

	public function ws_get_product_life_stages( $product_id ) {
		return wp_get_post_terms( $product_id, 'life-stage' );
	}
	public function ws_get_product_tags( $product_id ) {
		return wp_get_post_terms( $product_id, 'product_tag' );
	}

	/**
	 * Get the product details by the product id.
	 *
	 * @param int $product_id The product id.
	 * @return array The array of product details.
	 */
	public function ws_get_product_details_by_id( $product_id ) {
		if ( ! function_exists( 'wc_get_product' ) ) {
			return false;
		}
		$product = wc_get_product( $product_id );
		// these are product types we do not want to return...
		if ( is_a( $product, 'WC_Product_Variable' ) ||
             is_a( $product, 'WC_Product_Variable_Subscription' ) ||
             is_a( $product, 'WC_Product_Grouped' ) ||
             is_a( $product, 'WC_Product_Subscription' ) ) {
			return false;
		}

		if ( ! empty( $product ) ) {

			$data['ID']                = $product_id;
			$product_type              = $product->get_type();
			$parent_id                 = $product->get_parent_id();
			$data['parent_id']         = $parent_id;
			$data['type']              = $product_type;
			$data['description']       = $product->get_description();
			$data['short_description'] = $product->get_short_description();

			$prdct_lvl_promo = $this->get_promo_stock_level( $product );
			$prdct_lvl_rsrvd = $this->get_reserved_stock_level( $product );

			if ( 'variation' === $product_type ) {
				$brands      = $this->ws_get_product_brands( $parent_id );
				$life_stages = $this->ws_get_product_life_stages( $parent_id );
				// $product_tags         = $this->ws_get_product_tags( $data['parent_id'] );
				$data['product_id']   = $parent_id;
				$data['variation_id'] = $product_id;

				$parent = wc_get_product( $parent_id );
				if ( ! empty( $data['description'] ) ) {
					// overwrite short_description with variations description if not empty
					$data['short_description'] = $data['description'];
				} else {
					$data['short_description'] = $parent->get_short_description();
				}
				// and use parent products main description
				$data['description'] = $parent->get_description();

			} else {
				$brands      = $this->ws_get_product_brands( $product_id );
				$life_stages = $this->ws_get_product_life_stages( $product_id );
				// $product_tags         = $this->ws_get_product_tags( $product_id );
				$data['product_id']   = $product_id;
				$data['variation_id'] = null;

			}

			// Append Brands if available
			if ( $brands ) {
				$data['brands'] = $brands;
			}

			// Append Life Stages if available
			if ( $life_stages ) {
				$data['life-stages'] = $life_stages;
			}

			if ( $prdct_lvl_promo ) {
				$data['promo_stock'] = $prdct_lvl_promo;
			}

			if ( $prdct_lvl_rsrvd ) {
				$data['reserved_stock'] = $prdct_lvl_rsrvd;
			}

			$data['name']      = $product->get_name();
			$data['slug']      = $product->get_slug();
			$data['status']    = $product->get_status();
			$data['sku']       = $product->get_sku();
			$data['permalink'] = get_permalink( $product_id );

			// Get Product Prices
			$data['price']         = $product->get_price();
			$data['regular_price'] = $product->get_regular_price();
			$data['sale_price']    = $product->get_sale_price();

			// Get Product Images
			$data['image_id'] = $product->get_image_id();
			$data['image']    = wp_get_attachment_image_src( $data['image_id'], 'full' );

			$thumbnail = wp_get_attachment_image_src( $data['image_id'], 'ws-box-product-pic' );
			if ( ! empty( $thumbnail ) ) {
				$thumbnail_srcset = wp_get_attachment_image_srcset( $data['image_id'], 'ws-box-product-pic' );
				array_push( $thumbnail, $thumbnail_srcset );
				$data['thumbnail'] = $thumbnail;
			}

			return $data;
		}
	}

	// get complete data of products by looping through product objects
	public function ws_get_products_data( $content ) {
		$products_array = [];
		foreach ( $content as $key => $product ) {
			$product_id   = $product->ID;
			$product_data = $this->ws_get_product_details_by_id( $product_id );

			if ( $product_data ) {
				$products_array[] = $product_data;
			}
		}

		return $products_array;
	}

	/**
	 * Whether or not a user can view their subscription. It's possible there may be situations where they can view but not update their subscription.
	 * This does not check whether the boxes are globally unlocked.
	 *
	 * @param WP_REST_Request $request
	 * @return boolean Whether or not the user can view their subscription.
	 */
	public function can_view_subscription( WP_REST_Request $request ) {

		if ( ! is_user_logged_in() ) {
			return new WP_Error( 'rest_forbidden', 'You must be logged in to update products.', [ 'status' => 401 ] );
		}

		$params          = $request->get_params();
		$current_user_id = get_current_user_id();

		if ( empty( $current_user_id ) || ( (int) $params['user_id'] !== (int) $current_user_id ) ) {
			return new WP_Error( 'rest_forbidden', 'You may only update products in your basket', [ 'status' => 401 ] );
		}

		if( !wc_memberships_is_user_active_member($current_user_id, 'wellbeing-sisters-membership' ) ){
			return new WP_Error( 'rest_forbidden', 'You do not currently have an active subscription', [ 'status' => 401 ] );
		}

		if ( empty( $params['subscription_id'] ) ) {
			return new WP_Error( 'rest_forbidden', 'You may only update products in your subscription', [ 'status' => 401 ] );
		}

		$subscription = wcs_get_subscription( $params['subscription_id'] );
		// If there's no subscription or it's not associated with the user.
		if ( ! $subscription || $subscription->get_user_id() !== $current_user_id ) {
			return new WP_Error( 'rest_forbidden', 'You may only update products in your own subscription', [ 'status' => 401 ] );
		}

		return true;

	}

	/**
	 * Only logged in users and users who are the same user as in the request may edit products in their box.
	 * This is the permissions callback for the rest endpoints for regular users.
	 *
	 * @param WP_REST_Request $request The WP REST request.
	 * @return boolean Whether or not the user has permission to edit the products in the box.
	 */
	public function can_update_products_in_box( WP_REST_Request $request ) {

		// If they can't view the subscription, they may not update it.
		$can_view_subscription = $this->can_view_subscription( $request );

		if ( ! $can_view_subscription ) {
			return $can_view_subscription;
		}

		// If the boxes aren't unlocked, they may not update it.
		if ( ! $this->boxes_are_unlocked() ) {
			return new WP_Error( 'rest_forbidden', 'Boxes are currently locked and may not be edited.', [ 'status' => 401 ] );
		}

		return true;
	}

	/**
	 * Check if the subscription boxes may be edited by users.
	 *
	 * @return bool True if users may edit the boxes, false if not.
	 */
	public function boxes_are_unlocked() {

		if ( 'yes' === get_option( WS_SUBSCRIPTION_BOX_OPTION_PREFIX . 'unlock_boxes' ) ) {
			return true;
		}
		return false;
	}

	/**
	 * Both admins and the user who owns the subscription may reset a box.
	 *
	 * @param WP_REST_Request $request The request.
	 * @return boolean Whether or not they can reset the box.
	 */
	public function can_reset_box( WP_REST_Request $request ) {

		// This allows shop managers to reset users' boxes.
		if ( current_user_can( 'manage_woocommerce' ) ) {
			return true;
		}

		return $this->can_update_products_in_box( $request );
	}

	/**
	 * Get the subscription details for the user.
	 *
	 * @param WP_REST_Request $request
	 * @return array An array with the data for the subscription.
	 */
	public function get_subscription( WP_REST_Request $request ) {

		$params       = $request->get_params();
		$subscription = wcs_get_subscription( $params['subscription_id'] );

		$line_items = $subscription->get_items();
		// This is in gmt (say the docs) / UTC presumably. We could use get_time to get the timestamp I think.
		// This returns a string in the format 'Y-m-d H:i:s'.
		$next_payment_date = $subscription->get_date( 'next_payment' );

		$line_item_data = [];

		foreach ( $line_items as $line_item_id => $line_item ) {
			if ( $line_item->get_type() !== 'line_item' ) {
				continue;
			}
			$item_response = $this->make_line_item_response( $line_item );
			$line_item_data[] = $item_response;
		}

		$subscription_details = $this->make_subscription_details_response( $subscription );

		$subscription_details = array_merge(
			[
				'line_items'        => $line_item_data,
				'next_payment_date' => $next_payment_date,
			],
			$subscription_details
		);

		return $subscription_details;
	}


	/**
	 * Reset the subscription to the latest box template items which are in stock.
	 *
	 * @param WP_REST_Request $request
	 * @return array|WP_Error An array with the line items, items with insufficient stock and the rest of the products with up to date stock levels.
	 */
	public function reset_subscription_endpoint( WP_REST_Request $request ) {

		$params       = $request->get_params();
		$subscription = wcs_get_subscription( $params['subscription_id'] );

		if ( empty( $subscription ) ) {
			return new \WP_Error( 'rest_invalid', 'You must have a subscription to reset' );
		}

		$insufficient_stock = $this->reset_subscription( $subscription );
		if ( is_wp_error( $insufficient_stock ) ) {
			return $insufficient_stock;
		}

		$new_line_items = $subscription->get_items();

		// Doing this twice as a check that the subscription is what we think it is. This is directly from the saved subscription.
		foreach( $new_line_items as $new_line_item_id => $new_line_item ) {
			$item_response         = $this->make_line_item_response( $new_line_item );
			$line_items_response[] = $item_response;
		}

		// If box is being reset, then also remove skipped box flag.
        // TODO: check next payment date is also reset to this coming interval.
		$plugin_public = new WS_Subscription_Box_Public( $this->plugin_name, $this->version );
		$plugin_public->maybe_remove_skip( $subscription );

		$subscription_details = $this->make_subscription_details_response( $subscription );
		return array_merge(
			[
				'line_items'         => $line_items_response,
				'insufficient_stock' => $insufficient_stock,
				'products'           => $this->get_available_products(),
			],
			$subscription_details
			);

	}

	/**
	 * Pushes back the subscriptions next payment date a payment interval step.
	 *
	 * @param WP_REST_Request $request params must be subscription_id and skip_nonce
	 * @return array|WP_Error An array with subscription details if successful.
	 */
	public function customer_skip_subscription_endpoint( WP_REST_Request $request ) {
		$params       = $request->get_params();
		$subscription = wcs_get_subscription( $params['subscription_id'] );
		if ( empty( $subscription ) ) {
			return new \WP_Error( 'rest_invalid', 'You must have a subscription to skip' );
		}

		$plugin_public = new WS_Subscription_Box_Public( $this->plugin_name, $this->version );
		if($plugin_public->is_box_skip_available()) {
			$user_id      = get_current_user_id();
			if ( $plugin_public->process_skip_next_date( $user_id, $subscription, $params['skip_nonce'] ) ) {

				// Update subscription last modified date
				$plugin_public->update_post_modified_date( $subscription );

				return $this->make_subscription_details_response( $subscription );

			}else{
				return new \WP_Error( 'rest_invalid', 'Not authorised to skip this subscription' );
			}
		}else{
			return new \WP_Error( 'rest_invalid', 'Skipping subscriptions is not currently allowed' );
		}

	}

	/**
	 * This empties the subscription of line items.
     * Used when resetting the box back to template and when skipping a subscription.
	 * @param object $subscription A WooCommerce Subscription object.
	 * @return void|WP_Error.
	 */
	public function empty_subscription( $subscription ) {
		if ( ! wcs_is_subscription( $subscription ) ) {
			return new WP_Error( 'invalid_subscription', 'Cannot empty something that is not a subscription.' );
		}
		// Remove everything.
		// If it becomes necessary to check for the box items' stock levels before resetting, do that before this.
		// For now it just doesn't add the items which are out of promo stock (ie the reserved stock has used up all of the promo stock).
		// This needs to go through the items one by one to update the reserved stock levels.
		$items_to_remove = $subscription->get_items();

		foreach( $items_to_remove as $item_to_remove_id => $item_to_remove ) {

			$item_product  = $item_to_remove->get_product();
			$item_quantity = $item_to_remove->get_quantity();

			// Decrease the reserved stock by the quantity.
			$this->decrease_reserved_stock_level( $item_product, $item_quantity );

			$subscription->remove_item( $item_to_remove_id );

		}
	}
	/**
	 * This resets the subscription to the latest box release and returns an array of products with insufficient stock to add to the subscription.
	 *
	 * @param object $subscription A WooCommerce Subscription object.
	 * @return array An array with the products which were not added due to insufficient stock.
	 */
	public function reset_subscription( $subscription ) {

		if ( ! wcs_is_subscription( $subscription ) ) {
			return new WP_Error( 'invalid_subscription', 'This is not a subscription.' );
		}

		$this->empty_subscription($subscription);

		$box_release_object = $this->get_latest_box_release();
		$template_order     = $this->get_latest_box_release_template_order();

		// Get the latest box release.
		if ( is_wp_error( $template_order ) ) {
			return $template_order;
		}

		$line_items = $template_order->get_items();

		$insufficient_stock  = [];

		foreach ( $line_items as $line_item_id => $line_item ) {
			if ( $line_item->get_type() !== 'line_item' ) {
				continue;
			}

			$product = $line_item->get_product();

			if ( empty( $product ) ) {
				continue;
			}

			$promo_stock    = $this->get_promo_stock_level( $product );
			$reserved_stock = $this->get_reserved_stock_level( $product );

			if ( (int) $promo_stock - (int) $reserved_stock <= 0 ) {
				$insufficient_stock[] = [
					'product_id'   => $product->get_id(),
					'product_name' => $product->get_formatted_name(),
					// Does this need more?
				];
				continue;
			}

			$new_reserved = $this->increase_reserved_stock_level( $product, 1 );
			$this->add_box_product_to_subscription( $product, $subscription );

		}

		// We'll add the date provisioned if it's not there.
		// If the user is an admin, add the date the box was provisioned and the box release id.
		if ( current_user_can( 'manage_woocommerce' ) ) {
			$subscription->update_meta_data( '_date_box_provisioned', date( 'Y-m-d H:i:s' ) );
			$subscription->update_meta_data( '_curated_box_id', (int) $box_release_object->ID );
		}

		$subscription->update_meta_data( '_shop_box_template_id', $template_order->get_id() );
		$subscription->calculate_totals();
		$subscription->save();

		return $insufficient_stock;
	}

	/**
	 * Add the product to a subscription's line items.
	 *
	 * @param WP_REST_Request $request The request.
	 * @return array|WP_Error An associative array with the subscription's current line item and a full product list or WP_Error if something goes wrong.
	 */
	public function ws_add_product_to_line_items( WP_REST_Request $request ) {

		// Getting params.
		$params = $request->get_params();

		// Required parameters to run this API
		$variation_id    = (int) $params['variation_id'];
		$product_id      = (int) $params['product_id'];
		$subscription_id = (int) $params['subscription_id'];

		// Make sure these exist.
		if ( ( empty( $variation_id ) && empty( $product_id ) ) || empty( $subscription_id ) ) {
			return new WP_Error( 'data_required', 'You must have both a product and subscription' );
		}

		$product_type = ( ! empty( $variation_id ) ) ? 'variation' : 'product';
		$product_id   = ( ! empty( $variation_id ) ) ? $variation_id : $product_id;
		$product      = wc_get_product( $product_id );

		if ( empty( $product ) ) {
			return new WP_Error( 'variation_missing', 'The variation id did not match any products' );
		}

		// Checking Stock. These will return 0 if there is nothing entered.
		$promo_stock    = $this->get_promo_stock_level( $product );
		$reserved_stock = $this->get_reserved_stock_level( $product );

		$available_stock = (int) $promo_stock - (int) $reserved_stock;

		// Assuming that they are only adding one at a time otherwise we need to check against the quantity.
		if ( $available_stock < 1 ) {
			return new WP_Error( 'no_stock', 'There is not enough stock to fulfill this request' );
		}

		$product_parent_id = ( $product_type === 'variation' ) ? $product->get_parent_id() : $product_id;
		$product_brands    = $this->ws_get_product_brands( $product_parent_id );

		// Get List Items.
		$subscription = wcs_get_subscription( $subscription_id );

		// Array of Subscription List Items brands.
		$brands_count        = [];
		$line_items          = $subscription->get_items( [ 'line_item' ] );
		$add_product         = true; // Whether we should add or update the product coming in via the request.
		$line_items_response = [];
		//$totalRRP = 0;
		// See what is in the subscription.
		foreach ( $line_items as $line_item ) {

			if ( $line_item->get_type() !== 'line_item' ) {
				continue;
			}

			$line_item_product    = is_callable( [ $line_item, 'get_product' ] ) ? $line_item->get_product() : false;
			$line_item_product_id = $line_item_product->get_id();
			$line_item_id         = $line_item->get_id();

			// first check if this line item is part of the promo box. If it's not, we don't need to check anything.
			// I've reconsidered this! I think if a full price product makes it into a subscription box, the user probably needs to know so they can delete it.
			// I don't want anyone to accidentally get charged for it.
			// Leaving this in as a comment for now though.
			// if ( ! $this->is_item_in_box_subscription( $line_item_id ) ) {
			// continue;
			// }

			$line_item_type      = $line_item_product->is_type( 'variation' ) ? 'variation' : 'product';
			$line_item_parent_id = ( $line_item_type === 'variation' ) ? $line_item_product->get_parent_id() : $line_item_product_id;
			$line_item_quantity  = $line_item->get_quantity();

			$brands_in_line_item      = $this->ws_get_product_brands( $line_item_parent_id );
			$brands_in_line_item_keys = wp_list_pluck( $brands_in_line_item, 'slug' );

			// Only check the brands of the item we're adding.
			foreach ( $product_brands as $brand ) {
				$brand_key = $brand->slug;
				$brand_max = $brand->box_limit;
				// Only check if there's a brand max.
				if ( ! empty( $brand_max ) && in_array( $brand_key, $brands_in_line_item_keys, true ) ) {
					$brands_count[ $brand_key ] = ( ! empty( $brands_count[ $brand_key ] ) ) ? $brands_count[ $brand_key ] + (int) $line_item_quantity : (int) $line_item_quantity;
					// If you're trying to add something over the box limit then bail.
					if ( $brands_count[ $brand_key ] > $brand_max ) {
						return new WP_Error( 'max_brand_in_box', "The max number of {$brand->names} items has already been reached." );
					}
				}
			}

			if ( $line_item_product_id === $product_id ) {

				// Don't add the product.
				$add_product = false;
				// Update the quantity of the line item.
				$line_item->set_quantity( $line_item_quantity + 1 );
				// Get the price of one product.
				$price = $line_item_product->get_price();
				// Multiple by the quantity to get the subtotal.
				$total_price = (int) $line_item->get_quantity() * (int) $price;
				// Then set the subtotal.
				$line_item->set_subtotal( $total_price );
				$line_item->set_total( $total_price );
				// And save the line item.
				$line_item->save();

				$line_item_reserved_stock = $this->increase_reserved_stock_level( $line_item_product, 1 );

			}

			$item_response = $this->make_line_item_response( $line_item );
			$line_items_response[] = $item_response;
			//$totalRRP += floatval($item_response['regular_price']);

		}

		// If we're here, all seems ok so let's add the item to our order and save it.

		if ( $add_product ) {

			$new_line_item = $this->add_box_product_to_subscription( $product, $subscription );
			// We can do one at a time.
			$new_reserved_stock = $this->increase_reserved_stock_level( $product, 1 );

			$item_response = $this->make_line_item_response( $new_line_item );
			$line_items_response[] = $item_response;
			//$totalRRP += floatval($item_response['regular_price']);

		}

		// Calculate the new totals and save the subscription.
		$subscription->calculate_totals();
		$subscription->save();

		$subscription_details   = $this->make_subscription_details_response( $subscription );
		$current_product_values = $this->get_available_products();

		return array_merge(
			[
				'line_items' => $line_items_response,
				'products' => $current_product_values,
			],
			$subscription_details
		);
	}

	/**
	 * Make a standardised subscription details response.
	 *
	 * @param object $subscription The subscription object.
	 * @return array The arry with the details.
	 */
	public function make_subscription_details_response( $subscription ) {
		$rrp_total    = $this->get_rrp_total( $subscription );
		$subtotal     = $subscription->get_subtotal();
		$shipping     = $subscription->get_shipping_total();
		$min_box_fee  = $this->get_minimum_box_fee_total( $subscription );

		//$global_lock  = $this->boxes_are_unlocked() ? 'unlocked' : 'locked';
		$box_status = $this->get_subscription_box_status( $subscription ) ? $this->get_subscription_box_status( $subscription ) : 'unknown'; // This can return false, 'locked', 'ready' or 'skipped'.

        $next_payment_date = $subscription->get_time( 'next_payment', 'site' );

		return [
			'shipping'     => $shipping,
			'total_rrp'    => $rrp_total,
			'club_price'   => $subtotal,
			'total_price'  => $subtotal,
			'min_box_fee'  => $min_box_fee,
			//'global_lock'  => $global_lock,
			'box_status'    => $box_status,
            'next_payment_date' => $next_payment_date
		];
	}

	/**
	 * Make the line item response for the various endpoints.
	 *
	 * @param object $line_item The line item object.
	 * @return array|void The line item data if the object is, in fact, a line item.
	 */
	public function make_line_item_response( $line_item ) {
		if ( $line_item->get_type() !== 'line_item' ) {
			return;
		}

		$product = $line_item->get_product();

		$line_item_data = [
			'id'                     => $line_item->get_id(),
			'name'                   => $product->get_name(),
			'product_id'             => $product->get_id(),
			'variation_id'           => $line_item->get_variation_id(), // Should this be null or zero?
			'qty_in_order'           => $line_item->get_quantity(), // We can only add one at a time.
			'price'                  => $product->get_price(),
			'regular_price'          => $product->get_regular_price(),
			'sale_price'             => $product->get_sale_price(),
			'is_in_box_subscription' => $this->is_item_in_box_subscription( $line_item->get_id() ),
			'has_box_discount'       => $this->has_box_discount( $line_item->get_id() ),
		];

		return $line_item_data;

	}

	/**
	 * Add a given product to a subscription.
	 *
	 * @param object          $product The product object.
	 * @param WC_Subscription $subscription The subscription object.
	 * @return object The line item object.
	 */
	public function add_box_product_to_subscription( $product, $subscription ) {
		$line_item_id = $subscription->add_product( $product, 1 );
		$line_item    = wcs_get_order_item( $line_item_id, $subscription );
		$line_item->add_meta_data( $this->item_box_key, true, true );

		// TODO: We should add the discounts etc here too? The updated price?

		$line_item->save();

		return $line_item;

	}

	/**
	 * Remove a line item from a promo box. NB: this cannot handle removing only one of a line item if there is a quantity > 1, it removes the entire line item.
	 *
	 * @param WP_REST_Request $request
	 * @return array An associative array with the subscription's current line item and a full product list.
	 */
	public function ws_remove_line_item( WP_REST_Request $request ) {

		$params  = $request->get_params();
		$item_id = $params['line_item_id'];

		if ( ! $item_id ) {
			return new WP_Error( 'missing_item', 'An item is required' );
		}

		$subscription_id = wc_get_order_id_by_order_item_id( $item_id );
		$subscription    = wc_get_order( $subscription_id );

		if ( empty( $subscription ) ) {
			return new WP_Error( 'could_not_find_subscription', 'There is not an item associated with this subscription, you may have already deleted it.' );
		}

		if ( ! is_a( $subscription, 'WC_Subscription' ) || $subscription->get_user_id() !== get_current_user_id() ) {
			return new WP_Error( 'authentication_failed', 'You may only remove items from your own subscription' );
		}

		// The item object and the product. We need to get this *before* deleting it, not after.
		$item          = wcs_get_order_item( $item_id, $subscription );
		$item_product  = $item->get_product();
		$item_quantity = $item->get_quantity();

		$subscription->remove_item( $item_id );

		$subscription->calculate_totals();
		$subscription->save();
		// Decrease the reserved stock by one. We don't need to do the promo stock. I keep forgetting.
		$this->decrease_reserved_stock_level( $item_product, $item_quantity );

		$updated_subscription = wc_get_order( $subscription_id );
		$line_items           = $updated_subscription->get_items();
		$line_items_response  = [];
		//$totalRRP = 0;
		foreach ( $line_items as $line_item ) {

			if ( $line_item->get_type() !== 'line_item' ) {
				continue;
			}

			// Don't remove items that are not part of the box subscription.
			if ( ! $this->is_item_in_box_subscription( $line_item->get_id() ) ) {
				continue;
			}
			$item_response = $this->make_line_item_response( $line_item );
			$line_items_response[] = $item_response;
			//$totalRRP += floatval($item_response['regular_price']);

		}


		$available_products  = $this->get_available_products();
		$subscription_details = $this->make_subscription_details_response( $subscription );

		return array_merge(
			[
				'line_items'  => $line_items_response,
				'products'    => $available_products,
			],
			$subscription_details
		);
	}

	/**
	 * Get products which have promo stock levels.
	 *
	 * @return array The array of products.
	 */
	public function get_available_products() {
		$args = [
			'post_type'      => [ 'product', 'product_variation' ],
			'posts_per_page' => -1,
			'meta_query'     => [
				'relation' => 'OR',
				[
					'key'     => '_product_level_promo_stock',
					'value'   => '0',
					'compare' => '>',
				],
				[
					'key'     => '_variation_level_promo_stock',
					'value'   => '0',
					'compare' => '>',
				],
			],
		];

		$life_stage_query = new WP_Query( $args );
		if ( $life_stage_query->have_posts() ) {
			$response       = $life_stage_query->posts;
			$products_array = $this->ws_get_products_data( $response );
			if ( $products_array ) {
				$response = $products_array;
			}

			return $response;
		} else {
			return [];
		}
	}

	/**
	 * Remove the products reserved stock by the quantity in the line item.
	 * DEPRECATED: this was hooked into removing line items, however that is now done separately and explicitly when needed.
	 *
	 * @param int $line_item_id The line item id.
	 * @return void|null
	 */
	public function ws_remove_product_reserved_stock( $line_item_id ) {

		// We'll only change the reserved stock if the item is in a box subscription.
		$in_box_subscription = $this->is_item_in_box_subscription( $line_item_id );

		if ( ! $in_box_subscription ) {
			return;
		}

		$product_id   = wc_get_order_item_meta( $line_item_id, '_product_id', true );
		$variation_id = wc_get_order_item_meta( $line_item_id, '_variation_id', true );
		$qty          = wc_get_order_item_meta( $line_item_id, '_qty', true );

		if ( $variation_id ) {
			$var_rsrvd_stock = $this->get_reserved_stock_level( wc_get_product( $variation_id ) );
			if ( $var_rsrvd_stock ) {
				$reserved_stckcnt = $var_rsrvd_stock - $qty;
				if ( $reserved_stckcnt < 0 ) {
					$reserved_stckcnt = 0;
				}
				$this->set_reserved_stock_level( wc_get_product( $variation_id ), $reserved_stckcnt );
			}
		} else {
			$product_rsrvd_stck = $this->get_reserved_stock_level( wc_get_product( $product_id ) );
			if ( $product_rsrvd_stck ) {
				$product_stckcnt = $product_rsrvd_stck - $qty;
				if ( $product_stckcnt < 0 ) {
					$product_stckcnt = 0;
				}
				$this->set_reserved_stock_level( wc_get_product( $product_id ), $product_stckcnt );
			}
		}
	}

	/**
	 * Count a product in all subscriptions and update that product's reserved stock.
	 *
	 * @return void
	 */
	public function ws_add_product_reserved_stock_value() {


		if ( ! class_exists( 'WC_Subscriptions' ) ) {
			return;
		}

		//User must be Administrator
		$current_user = wp_get_current_user();
		if ( ! wp_doing_ajax() ) {
			if ( isset( $_GET['ws-action'] ) && 'ws-run-reserved-stock-script' == $_GET['ws-action'] && in_array( 'administrator', (array) $current_user->roles ) ) {
				// TODO: this needs a nonce check. Also can anyone run this function?

				//Reset Reserved Stock Before Sync
				$this->reset_product_reserved_stock();


				// Get all of the active subscriptions.
				$subscriptions = wcs_get_subscriptions(
					[
						'status'                 => 'active',
						'subscriptions_per_page' => -1,
					]
				);

				// If subscriptions records are found.
				if ( count( $subscriptions ) > 0 ) {
					$subsc_prods_ids = [];
					foreach ( $subscriptions as $subscription ) {
						if ( $subscription ) {
							$subscr_data = $subscription->get_data();
							$line_items  = $subscription->get_items();

							if ( empty( $line_items ) ) {
								continue;
							}

							$subscr_nextpaydate = ( ! empty( $subscr_data['schedule_next_payment'] ) ) ? $subscr_data['schedule_next_payment']->date( 'Y-m-d h:i:s a' ) : false;

							if ( empty( $subscr_nextpaydate ) ) {
								continue;
							}

							// Checking that there's a next payment date.
							foreach ( $line_items as $line_item ) {

								if ( $line_item->get_type() !== 'line_item' ) {
									continue;
								}

								$product_data = $line_item->get_product();
								$product_qty  = $line_item->get_quantity();

								if ( $product_data ) {
									$product_id   = $product_data->get_id();
									$product_type = $product_data->get_type();

									// handle single products processing

									if ( array_key_exists( $product_id, $subsc_prods_ids ) ) {
										$subsc_prods_array              = $subsc_prods_ids[ $product_id ];
										$subs_prods_counter             = $subsc_prods_array[1];
										$subsc_prods_ids[ $product_id ] = [ $product_type, $subs_prods_counter + $product_qty ];
									} else {
										$subsc_prods_ids[ $product_id ] = [ $product_type, $product_qty ];
									}
								}
							}
						}
					}

					if ( count( $subsc_prods_ids ) > 0 ) {
						foreach ( $subsc_prods_ids as $product_id => $reserved_stock ) {
							// $reserved_stock_type  = $reserved_stock[0];
							$reserved_stock_count = $reserved_stock[1];
							$product              = wc_get_product( $product_id );

							if ( empty( $product ) ) {
								continue;
							}

							$this->set_reserved_stock_level( $product, $reserved_stock_count );
						}
					}
				}
			}
		}
	}




	/**
	 * Reset All Reserved Stock Before Sync.
	 *
	 * @return void
	 */
	public function reset_product_reserved_stock() {
		global $wpdb;
		$post_meta_table = $wpdb->prefix . "postmeta";
		$query = "UPDATE $post_meta_table SET meta_value='0' WHERE meta_key = '_product_level_reserved_stock' OR meta_key = '_variation_level_reserved_stock'";
		$result = $wpdb->query($query);
	}


	// Reserved Stock Resync button definition
	public function ws_add_reserved_stock_setting( $settings ) {
		$reserve_stock_option = [
			'title'    => __( 'Resynchronise Active Subscribers Reserved Promo Stock', 'woocommerce' ),
			'id'       => 'ws-reserved-stock-resync',
			'type'     => 'text',
			'default'  => '',
			'class'    => 'ws-reserved-stock-class',
			'css'      => 'min-width: 300px; display:none;',
			'desc'     => '<a class="button-primary" href="' . admin_url( 'admin.php?page=wc-settings&tab=products&section=inventory&ws-action=ws-run-reserved-stock-script' ) . '">Resync Stock</a>',
			'desc_tip' => __( 'This button is to Resync all of the Active Subscribers Reserved Promo Stock count', 'woocommerce' ),
		];

		$changed_settings = array_slice( $settings, 0, 1, true );
		array_push( $changed_settings, $reserve_stock_option );

		return array_merge( $changed_settings, array_slice( $settings, 1, count( $settings ), true ) );
	}

	/**
	 *   Creates/updates a Profile Field Definition where users may select multiple life stages via checkboxes
	 *   Each checkbox value represents an instance of the Life Stage taxonomy
	 *
	 * @throws \SkyVerge\WooCommerce\PluginFramework\v5_10_6\SV_WC_Plugin_Exception
	 */
	public function populate_profile_fields_with_life_stages() {

		$definition_slug = $this->definition_slug;
		$definition_name = $this->definition_name;

		// specify memberships to apply these profile fields to
		$plan_slugs = [ 'wellbeing-sisters-membership' ];
		$plan_ids   = [];
		foreach ( wc_memberships_get_membership_plans() as $plan ) {
			if ( in_array( $plan->slug, $plan_slugs ) ) {
				$plan_ids[] = $plan->id;
			}
		}

		$terms = self::get_life_stages();
		if ( empty( $terms ) ) {
			return;
		}

		// $options is used for checkbox values provided by the Profile Field Definition
		$options     = [];
		$every_woman = '';
		foreach ( $terms as $term ) {
			$options[ $term->slug ] = html_entity_decode( $term->name );
			if ( $term->name == 'Every Woman' ) {
				$every_woman = $term->name; // default
			}
		}

		// if this defintion doesn't yet exist create it
		if ( empty( Profile_Fields::get_profile_field_definitions()[ $definition_slug ] ) ) {
			$definition = new Profile_Field_Definition(
				[
					'slug'                => $definition_slug,
					'name'                => $definition_name,
					'type'                => Profile_Fields::TYPE_RADIO,
					'label'               => '',
					'description'         => '',
					'editable_by'         => Profile_Field_Definition::EDITABLE_BY_CUSTOMER,
					// 'visibility'          => ['profile-fields-area', 'product-page'],
					'visibility'          => [ 'profile-fields-area' ],
					'required'            => 'yes',
					'default_value'       => $every_woman,
					'options'             => $options,
					'membership_plan_ids' => $plan_ids,
				]
			);
			$definition->set_id();
			$definition->save();
		}
		// otherwise find it and update it with the current set of life stages if needed
		else {
			$definition = Profile_Fields::get_profile_field_definition( $definition_slug );
			if ( is_a( $definition, 'SkyVerge\WooCommerce\Memberships\Profile_Fields\Profile_Field_Definition' ) && count( array_merge( array_diff( $options, $definition->get_options() ), array_diff( $definition->get_options(), $options ) ) ) > 0 ) {
				$definition->set_options( $options );
				$definition->save();
			}
		}
	}

	public function register_curated_box_post_type() {
		$name   = 'Box Release';
		$slug   = 'ws-box-release';
		$labels = [
			'name'              => _x( $name . 's', 'taxonomy general name', 'textdomain' ),
			'singular_name'     => _x( $name, 'taxonomy singular name', 'textdomain' ),
			'search_items'      => __( 'Search ' . $name, 'textdomain' ),
			'all_items'         => __( 'All ' . $name . 's', 'textdomain' ),
			'parent_item'       => __( 'Parent ' . $name, 'textdomain' ),
			'parent_item_colon' => __( 'Parent ' . $name . ':', 'textdomain' ),
			'edit_item'         => __( 'Edit ' . $name, 'textdomain' ),
			'update_item'       => __( 'Update ' . $name, 'textdomain' ),
			'add_new_item'      => __( 'Add New ' . $name, 'textdomain' ),
			'new_item_name'     => __( 'New ' . $name, 'textdomain' ),
		];
		register_post_type(
			$slug,
			[
				'labels'             => $labels,
				'public'             => false,
				'publicly_queryable' => false,
				'has_archive'        => true,
				'show_ui'            => true,
				'rewrite'            => [
					'slug'       => $slug,
					'with_front' => true,
				],
				'show_in_menu'       => true,
				'query_var'          => true,
				'capability_type'    => 'post',
				'menu_icon'          => 'dashicons-products',
				'supports'           => [ 'title', 'genesis-cpt-archives-settings' ],
				'show_in_rest'       => true,
			]
		);
	}

	/**
	 * Meta box display callback.
	 *
	 * @param WP_Post $post Current post object.
	 */
	public function membership_numbers_meta_box_display_callback( $post ) {
		// Display code/markup goes here. Don'thisProductt forget to include nonces!
		?>
		 <h1 id="life-stage-members">Number of Members: </h1>
		<?php
	}

	/**
	 * Adds the meta fields to the box template edit screens.
	 *
	 * @return void
	 */
	public function register_select_curated_box_fields() {

		$screen = get_current_screen();
		if ( $screen->id !== 'ws-box-release' ) {
			return;
		}

		// TODO: Some sort of caching of these options, if this query impacting performance.
		if ( function_exists( 'acf_add_local_field_group' ) ) {
			// hooking this action onto acf/init breaks this wcs_get_subscriptions() function (it returns all trashed subs too!)
			$subs             = wcs_get_subscriptions(
				[
					'subscriptions_per_page' => - 1,
					'subscription_status'    => [ 'active' ],
				]
			);
			$active_sub_count = count( $subs );

			$orders_templates_orders = wc_get_orders(
				[
					'type'   => 'shop_box_template',
					'status' => 'publish',
				]
			);
			$choices                 = [];
			$products                = [];

			foreach ( $orders_templates_orders as $ot ) {

				$products = [];

				$line_items = $ot->get_items();
				foreach ( $line_items as $line_item ) {
					if ( $line_item->get_type() !== 'line_item' ) {
						continue;
					}
					$products[] = $line_item->get_product();
				}

				$lowest_promo_stock = $this->lowest_promo_stock( $products );

				$promo_stock_warning = $active_sub_count > $lowest_promo_stock ? ' (insufficient promo stock)' : '';
				$key_warning         = ! empty( $promo_stock_warning ) ? 'insufficient-' : '';

				$choices[ $key_warning . $ot->get_id() ] = get_the_title( $ot->get_id() ) . $promo_stock_warning; // This may not hold up when custom tables are used, it assumes the post table.

			}

			$fields[] = [
				'key'               => 'field_select_curated_box',
				'label'             => 'Select Template Box <a id="template-box-edit-link" href="' . site_url() . '/wp-admin/edit.php?post_type=shop_box_template' . '">Edit Templates</a>',
				'name'              => 'select_curated_box',
				'type'              => 'select',
				'instructions'      => '',
				'required'          => 0,
				'conditional_logic' => 0,
				'wrapper'           => [
					'width' => '',
					'class' => '',
					'id'    => '',
					// 'title' => $term->name,
				],
				'choices'           => $choices,
				'default_value'     => false,
				'allow_null'        => 0,
				'multiple'          => 0,
				'return_format'     => 'key',
				'ui'                => 0,
			];

			$fields[] = [
				'key'               => 'field_curated_box_text',
				'label'             => 'Message to Members',
				'name'              => 'curated_box_text',
				'type'              => 'textarea',
				'instructions'      => 'This field appears on the order packing slip',
				'required'          => 0,
				'conditional_logic' => 0,
				'wrapper'           => [
					'width' => '',
					'class' => '',
					'id'    => '',
				],
				'default_value'     => false,
				'ui'                => 1,
			];

			$fields[] = [
				'key'               => 'field_box_intro_text',
				'label'             => 'Box introduction to Members',
				'name'              => 'box_intro_text',
				'type'              => 'textarea',
				'instructions'      => 'Paragraph appears before the customisable box',
				'required'          => 0,
				'conditional_logic' => 0,
				'wrapper'           => [
					'width' => '',
					'class' => '',
					'id'    => '',
				],
				'default_value'     => false,
				'ui'                => 1,
			];

			acf_add_local_field_group(
				[
					'key'                   => 'group_select_curated_box',
					'title'                 => 'Select Curated Box (' . $active_sub_count . ' Active Subscribers)',
					'fields'                => $fields,
					'location'              => [
						[
							[
								'param'    => 'post_type',
								'operator' => '==',
								'value'    => 'ws-box-release',
							],
						],
					],
					'menu_order'            => 0,
					'position'              => 'normal',
					'style'                 => 'default',
					'label_placement'       => 'top',
					'instruction_placement' => 'label',
					'hide_on_screen'        => '',
					'show_in_rest'          => 1,
				]
			);
		}
	}

	public function get_life_stages() {
		// get each Life Stage
		$terms = get_terms(
			[
				'taxonomy'   => $this->life_stage,
				'hide_empty' => false,
			]
		);
		// if none, exit early
		if ( empty( $terms ) || is_a( $terms, 'WP_Error' ) ) {
			return [];
		} else {
			return $terms;
		}
	}

	// public function get_order_template_line_item_info( $ot, $return = null ) {
	// global $wpdb;
	//
	// $simple_line_item_query =
	// "SELECT DISTINCT OIM1.meta_value AS product_id, OIM2.meta_value AS qty
	// FROM {$wpdb->prefix}woocommerce_order_items as OI
	// LEFT JOIN {$wpdb->prefix}woocommerce_order_itemmeta as OIM1 ON OIM1.order_item_id = OI.order_item_id
	// LEFT JOIN {$wpdb->prefix}woocommerce_order_itemmeta as OIM2 ON OIM2.order_item_id = OI.order_item_id
	// WHERE OI.order_id = {$ot->ID}
	// AND OIM1.meta_key = '_product_id'
	// AND OIM1.meta_value != '0'
	// AND OIM2.meta_key = '_qty'";
	//
	// $simple_product_ids_and_qtys = $wpdb->get_results( $simple_line_item_query );
	// $simple_product_ids          = wp_list_pluck( $simple_product_ids_and_qtys, 'product_id' );
	// $simple_product_qtys         = [];
	// foreach ( $simple_product_ids_and_qtys as $id_and_qty ) {
	// $simple_product_qtys[ $id_and_qty->product_id ] = $id_and_qty->qty;
	// }
	//
	// $variation_line_item_query =
	// "SELECT DISTINCT OIM1.meta_value AS variation_id, OIM2.meta_value AS qty
	// FROM {$wpdb->prefix}woocommerce_order_items as OI
	// LEFT JOIN {$wpdb->prefix}woocommerce_order_itemmeta as OIM1 ON OIM1.order_item_id = OI.order_item_id
	// LEFT JOIN {$wpdb->prefix}woocommerce_order_itemmeta as OIM2 ON OIM2.order_item_id = OI.order_item_id
	// WHERE OI.order_id = {$ot->ID}
	// AND OIM1.meta_key = '_variation_id'
	// AND OIM1.meta_value != '0'
	// AND OIM2.meta_key = '_qty'";
	//
	// $variation_product_ids_and_qtys = $wpdb->get_results( $variation_line_item_query );
	// $variation_product_ids          = wp_list_pluck( $variation_product_ids_and_qtys, 'variation_id' );
	// $variation_product_qtys         = [];
	// foreach ( $variation_product_ids_and_qtys as $id_and_qty ) {
	// $variation_product_qtys[ $id_and_qty->variation_id ] = $id_and_qty->qty;
	// }
	//
	// if ( $return == 'qtys' ) {
	// return $simple_product_qtys + $variation_product_qtys;
	// } elseif ( $return == null || $return == 'ids' ) {
	// return array_merge( $simple_product_ids, $variation_product_ids );
	// }
	// }

	// public function get_product_posts_from_order_template( $order_template ) {
	//
	// $product_ids = self::get_order_template_line_item_info( $order_template, 'ids' );
	//
	// Get the posts from those IDs to query the meta (promo stock)
	// $product_args = [
	// 'include'   => $product_ids,
	// 'post_type' => [ 'product', 'product_variation' ],
	// ];
	//
	// $product_posts = get_posts( $product_args );
	//
	// exclude any products which are identified as parents of other products (i.e. variable product object that isn't a variation)
	// $parents_to_exclude = wp_list_pluck( $product_posts, 'post_parent' );
	//
	// foreach ( $product_posts as $key => $product_post ) {
	// if ( in_array( $product_post->ID, $parents_to_exclude ) ) {
	// unset( $product_posts[ $key ] );
	// }
	// }
	//
	// return $product_posts;
	// }

	/**
	 * Find the lowest promo stock level in a group of products.
	 *
	 * @param array $products An array of the products to check.
	 * @return int The lowest promo stock level.
	 */
	public function lowest_promo_stock( $products ) {

		// Find lowest promo stock for items in this template
		$product_promo_stocks = [];
		foreach ( $products as $product ) {
			$product_promo_stocks[] = $this->get_promo_stock_level( $product );
		}

		$min_promo_stock_level = min( $product_promo_stocks );
		return $min_promo_stock_level;
	}

	// Modified private function of class Profile Fields
	public function get_profile_fields_for_member( \WC_Memberships_User_Membership $user_membership ) {

		$profile_field_definitions = Profile_Fields::get_profile_field_definitions( [ 'membership_plan_ids' => [ $user_membership->get_plan_id() ] ] );
		$profile_fields            = [];

		foreach ( $profile_field_definitions as $profile_field_definition ) {

			$profile_field_slug = $profile_field_definition->get_slug();

			if ( $found_profile_field = $user_membership->get_profile_field( $profile_field_slug ) ) {

				$profile_fields[ $profile_field_slug ] = $found_profile_field;

			} else {

				try {

					$profile_field = new Profile_Field();

					$profile_field->set_user_id( $user_membership->get_user_id() );
					$profile_field->set_slug( $profile_field_slug );

					$profile_fields[ $profile_field_slug ] = $profile_field;

				} catch ( \Exception $e ) {
					continue; }
			}
		}

		return $profile_fields;
	}

	/**
	 * @return array
	 * key:     Life Stage Profile Field title (derived from Life Stage Taxonomy)
	 * value:   number of members with that chosen Life Stage
	 */
	public function get_life_stage_counts( $count = true ) {
		$life_stage_counts = [];

		foreach ( self::get_life_stages() as $term ) {
			if ( $count ) {
				$life_stage_counts[ esc_attr( $term->name ) ] = 0;
			} else {
				$life_stage_counts[ esc_attr( $term->name ) ] = [];
			}
		}

		$plan        = new WC_Memberships_Membership_Plan( 'wellbeing-sisters-membership' );
		$memberships = $plan->get_memberships();
		foreach ( $memberships as $membership ) {
			$all_members_all_profile_fields = self::get_profile_fields_for_member( $membership );
			foreach ( $all_members_all_profile_fields as $member_fields ) {
				$member_field_data = $member_fields->get_data();
				if ( $member_field_data['id'] == $this->life_stage && ! empty( $member_field_data['value'] ) ) {
					// account for data value change from array to string.
					$field_data_key = is_array( $member_field_data['value'] ) ? esc_attr( $member_field_data['value'][0] ) : esc_attr( $member_field_data['value'] );
					if ( $count ) {
						$life_stage_counts[ $field_data_key ] += 1;
					} else {
						$life_stage_counts[ $field_data_key ][] = $membership->user_id;
					}
				}
			}
		}
		return $life_stage_counts;
	}

	/**
	 * Returns a 2D array:
	 * [(string)life-stage-title][(string)product-title][(int)product-promo-stock]
	 *
	 * Note: a promo product will either be a simple product or a product variation. In the latter case, the variation ID is used.
	 *
	 * @return array
	 */
	public function get_promo_stock_levels_per_life_stage() {
		$stock = [];
		foreach ( self::get_life_stages() as $term ) {

			$promo_products = [];
			$args           = [
				'numberposts' => -1,
				'post_type'   => 'product',
				'post_status' => 'publish',
				'tax_query'   => [
					[
						'taxonomy' => $this->life_stage,
						'field'    => 'slug',
						'terms'    => $term->slug,
					],
				],
			];

			foreach ( get_posts( $args ) as $product_post_obj ) {
				$product = wc_get_product( $product_post_obj->ID );
				if ( ! is_a( $product, 'WC_Product_Variable' ) ) {
					$promo_products[ $product_post_obj->post_title ] = get_post_meta( $product_post_obj->ID, '_product_level_promo_stock', true ) ?: '0';
				} else {
					foreach ( $product->get_available_variations() as $variation ) {
						$name = $product_post_obj->post_title;
						foreach ( $variation['attributes'] as $attr ) {
							if ( gettype( $attr ) != 'string' ) {
								continue;
							}
							$name .= ' ' . $attr;
						}
						$promo_products[ $name ] = get_post_meta( $variation['variation_id'], '_variation_level_promo_stock', true );
					}
				}
			}

			$stock[ $term->name ] = $promo_products;
		}

		return $stock;
	}

	/**
	 * Returns a 2D array:
	 * [(string)life-stage-title][(int)product-id][(string)product-title]
	 *
	 * Or if @param bool $index == true:
	 * [(string)life-stage-title][(string)product-title][(int)product-id]
	 *
	 * Note: a promo product will either be a simple product or a product variation. In the latter case, the variation ID is used.
	 *
	 * See self::register_curated_box_fields for non inverted usage with ACF
	 *
	 * See self::enqueue_scripts for inverted usage as a localized array
	 *
	 * @return array
	 */
	public function get_promo_product_ids_to_name_array( $invert = false ) {
		$choices = [];
		foreach ( self::get_life_stages() as $term ) {

			$promo_products = [];
			$args           = [
				'numberposts' => -1,
				'post_type'   => 'product',
				'post_status' => 'publish',
				'tax_query'   => [
					[
						'taxonomy' => $this->life_stage,
						'field'    => 'slug',
						'terms'    => $term->slug,
					],
				],
			];

			foreach ( get_posts( $args ) as $product_post_obj ) {
				$product = wc_get_product( $product_post_obj->ID );
				if ( ! is_a( $product, 'WC_Product_Variable' ) ) {
					$stock_level = get_post_meta( $product_post_obj->ID, '_product_level_promo_stock', true ) ?: '0';
					if ( ! $invert ) {
						$promo_products[ $product_post_obj->ID ] = $product_post_obj->post_title . ' (Promo Stock: ' . $stock_level . ')';
					} else {
						$promo_products[ $product_post_obj->post_title ] = $product_post_obj->ID;
					}
				} else {
					foreach ( $product->get_available_variations() as $variation ) {
						$name = $product_post_obj->post_title;
						foreach ( $variation['attributes'] as $attr ) {
							if ( gettype( $attr ) != 'string' ) {
								continue;
							}
							$name .= ' ' . $attr;
						}
						$stock_level = get_post_meta( $variation['variation_id'], '_variation_level_promo_stock', true ) ?: '0';
						if ( ! $invert ) {
							$promo_products[ $variation['variation_id'] ] = $name . ' (Promo Stock: ' . $stock_level . ')';
						} else {
							$promo_products[ $name ] = $variation['variation_id'];
						}
					}
				}
			}

			$choices[ $term->name ] = $promo_products;
		}

		return $choices;
	}

	public function get_promo_product_ids_to_prices_array() {
		$choices = [];
		foreach ( self::get_life_stages() as $term ) {

			$promo_products = [];
			$args           = [
				'numberposts' => -1,
				'post_type'   => 'product',
				'post_status' => 'publish',
				'tax_query'   => [
					[
						'taxonomy' => $this->life_stage,
						'field'    => 'slug',
						'terms'    => $term->slug,
					],
				],
			];

			foreach ( get_posts( $args ) as $product_post_obj ) {
				$product = wc_get_product( $product_post_obj->ID );
				if ( ! is_a( $product, 'WC_Product_Variable' ) ) {
					$price                                   = $product->get_data()['regular_price'];
					$promo_products[ $product_post_obj->ID ] = $price;

				} else {
					foreach ( $product->get_available_variations() as $variation ) {
						$price                                        = $variation['display_regular_price'];
						$promo_products[ $variation['variation_id'] ] = $price;
					}
				}
			}

			$choices[ $term->name ] = $promo_products;
		}

		return $choices;
	}

	public function get_promo_product_ids_to_edit_links() {
		$choices = [];
		foreach ( self::get_life_stages() as $term ) {

			$promo_products = [];
			$args           = [
				'numberposts' => -1,
				'post_type'   => 'product',
				'post_status' => 'publish',
				'tax_query'   => [
					[
						'taxonomy' => $this->life_stage,
						'field'    => 'slug',
						'terms'    => $term->slug,
					],
				],
			];

			foreach ( get_posts( $args ) as $product_post_obj ) {
				$product = wc_get_product( $product_post_obj->ID );
				$link    = site_url() . '/wp-admin/post.php?post=' . $product_post_obj->ID . '&action=edit';
				if ( ! is_a( $product, 'WC_Product_Variable' ) ) {
					$promo_products[ $product_post_obj->ID ] = $link;

				} else {
					foreach ( $product->get_available_variations() as $variation ) {
						$promo_products[ $variation['variation_id'] ] = $link;
					}
				}
			}

			$choices[ $term->name ] = $promo_products;
		}

		return $choices;
	}

	/**
	 * Get the order object for the template for the latest box release.
	 * This is what has all the itemst to be added to the subscriptions. :)
	 *
	 * @return WP_Error|object A WP_Error object if something goes wrong, an order object otherwise.
	 */
	public function get_latest_box_release_template_order() {

		// We want the last *modified* box release.
		$latest_box_release = $this->get_latest_box_release();

		if ( is_wp_error( $latest_box_release ) ) {
			return $latest_box_release;
		}

		$latest_box_release_id = $latest_box_release->ID;

		$template_id = get_post_meta( $latest_box_release_id, 'select_curated_box', true );

		// This is an initial check on stock, it needs to also be thoroughly checked.
		if ( preg_match( '/insufficient/', $template_id ) ) {
			return new WP_Error( 'box_template_error', 'Insufficient stock' );
		}

		$order_template = get_post( $template_id );

		if ( $order_template && get_post_type( $order_template ) === 'shop_box_template' ) {
			return wc_get_order( $order_template );
		}

		return new WP_Error( 'missing_template', 'The template for the box could not be found.' );
	}

	/**
	 * Get the latest box release. Please note that this goes by last *modified* date of a published box.
	 *
	 * @return object The box release post object.
	 */
	public function get_latest_box_release() {
		$args = [
			'post_type'   => 'ws-box-release',
			'per_page'    => 1,
			'post_status' => 'publish',
			'orderby'     => 'modified', // This is going by the modified date rather than the date as date the post is created.
			'order'       => 'DESC',
		];

		$box_releases = get_posts( $args );

		if ( empty( $box_releases ) ) {
			return new WP_Error( 'no_box_release', 'We could not find the latest box release' );
		}

		return $box_releases[0];
	}

	/**
	 * Get some active subscriptions.
	 *
	 * @param integer $per_page The number to be returned.
	 * @param integer $offset   The offset for the query.
	 * @return false|array False if there are none left, otherwise the array of subscriptions.
	 */
	public function get_active_subscriptions( $per_page = 10, $offset = 0 ) {
		$subscriptions = wcs_get_subscriptions(
			[
				'subscriptions_per_page' => $per_page,
				'offset'                 => $offset,
				'subscription_status'    => 'active',
			]
		);
		return ! empty( $subscriptions ) ? $subscriptions : false;
	}

	/**
	 * Add to the admin notices.
	 *
	 * @return void
	 */
	public function admin_notices() {
		if ( empty( $_GET ) || empty( $_GET['box-provision'] ) ) {
			return;
		}
		$ermsg = __( 'Apparent insufficient stock on the chosen box template. Aborted box provisioning.', 'ws-subscription-box' );
		echo "<div class='notice notice-error'>$ermsg</div>";
	}

	/**
	 * This is hooked into transition_post_status action and should only run on ws-box-release post type.
	 * now triggered on do_action( 'wp_after_insert_post', $post_id, $post, $update, $post_before );
	 *
	 * @param int     $post_id The post id.
	 * @param WP_Post $post The post object.
	 * @param bool    $update Whether this is an existing ws-box-release post being updated.
	 * @param WP_Post $post_before The post it was before? Like for the previous iteration of this post.
	 * @return int The Action Scheduler action id.
	 */
	public function generate_customer_subscription_orders( $post_id, $post, $update, $post_before ) {

		// If this is a box release at the post_before had a status.
		if ( 'ws-box-release' === $post->post_type && ! empty( $post_before->post_status ) ) {

			$new_status_trigger = [ 'publish', 'future' ];
			$old_status_trigger = [ 'draft', 'pending' ];
			if ( in_array( $post->post_status, $new_status_trigger, true ) && in_array( $post_before->post_status, $old_status_trigger, true ) ) {

				$selected_template_box = get_post_meta( $post_id, 'select_curated_box', true );
				if ( preg_match( '/insufficient/', $selected_template_box ) ) {
					// This isn't working, bah.
					add_filter(
						'redirect_post_location',
						function ( $location ) {
							return add_query_arg( [ 'box-provision' => 'aborted' ], $location );
						}
					);
					// TODO: figure out why this is not working!
					// add_action('admin_notices', [new AdminNotice(), 'displayAdminNotice']);
					// AdminNotice::displayError($ermsg);
					return;
				}

				$order_template = get_post( $selected_template_box );

				if ( $order_template && get_post_type( $order_template ) === 'shop_box_template' ) {

					// TODO: do we need to check these subscriptions are connected to the 'wellbeing-sisters-membership'? [Ignoring this question for now: JJ]

					// Let's do 24 subscriptions at a time. When testing with 10, the time was 8 seconds so this should be ok?
					$per_page = 24;
					$offset   = 0;

					// reset all reserved and promo stock (careful now)!
					$this->reset_product_reserved_stock();

					// We'll schedule the first one then schedule the next when this has run and so on.
					as_schedule_single_action(
						time(),
						'ws_populate_subscriptions',
						[
							'per_page'    => $per_page,
							'offset'      => $offset,
							'template_id' => $selected_template_box,
							'box_id'      => $post_id,
							'user_id'     => get_current_user_id(),
						],
                        'Subscription Box'
					);
				}
			}
		}

		return;

	}

	public function update_single_subscription_to_box( $subscription_id ) {
		// This does not have capability checks, they need to be done before you get here.

		$template_order = $this->get_latest_box_release_template_order();

		// Now "reset" the box.
	}

	/**
	 * The action for updating the subscriptions with the box contents.
	 *
	 * @param int $per_page The number of subscriptions per page.
	 * @param int $offset   The offset for the query.
	 * @param int $template_id The id of the box template.
	 * @param int $box_id   The id of the box post.
	 * @return void
	 */
	public function update_subscriptions_from_template( $per_page, $offset, $template_id, $box_id, $user_id ) {

		$start_time = microtime( true );

		$box             = get_post( $box_id ); // was $post.
		$boxrelease_link = sprintf( '<a href="%s">%s</a>', esc_url( get_edit_post_link( $box ) ), esc_html( get_the_title( $box ) ) );
		$box_timestamp   = get_post_timestamp( $box_id );

		$template      = get_post( $template_id ); // was $order_template.
		$template_link = sprintf( '<a href="%s">%s</a>', esc_url( get_edit_post_link( $template ) ), esc_html( get_the_title( $template ) ) );

		$subscriptions = $this->get_active_subscriptions( $per_page, $offset );

		if ( empty( $subscriptions ) ) {
			return;
		}

		$subscriptions_updated = [];

		foreach ( $subscriptions as $subscription ) {
			$subscription_id = $subscription->get_id();

			// manage schedule posts, only within this release period and box not already published.
			$next_payment_date = $subscription->get_time( 'next_payment', 'site' );

			// If there's no next payment date, an order will never be generated unless manually I suppose.
			if ( empty( $next_payment_date ) ) {
				continue;
			}

			if ( $box->post_status === 'future' && $this->get_subscription_box_status( $subscription ) === 'locked' && $next_payment_date > $box_timestamp ) {
				// option to pre-populate subscription box, but not release yet. Only works if box is still locked and future publish date is before next payment.
				$subscription->update_meta_data( '_date_box_provisioned', date( 'Y-m-d H:i:s', $box_timestamp ) );
			} else {
				// otherwise unlock box immediately.
				$subscription->update_meta_data( '_date_box_provisioned', date( 'Y-m-d H:i:s' ) );
			}

			$subscription->update_meta_data( '_shop_box_template_id', strval( $template_id ) );
			$subscription->update_meta_data( '_curated_box_id', strval( $box_id ) );

			$subscription->remove_order_items( 'line_item' );

			$template_order = wc_get_order( $template );
			$line_items     = $template_order->get_items();
			foreach ( $line_items as $line_item ) {
				if ( $line_item->get_type() !== 'line_item' ) {
					continue;
				}
				$product = $line_item->get_product();
				$this->add_box_product_to_subscription( $product, $subscription );
				$this->increase_reserved_stock_level( $product, 1 );
			}
			// TODO: We should probs add some error handling in here.
			$subscription->calculate_totals();
			$subscription->save();
			$subscriptions_updated[] = sprintf( '<a href="%s">#%s</a>', esc_url( wcs_get_edit_post_link( $subscription_id ) ), esc_html( $subscription->get_order_number() ) );
			$add_note                = _x( sprintf( 'Line items copied automatically from template %s via curated box release post %s.', $template_link, $boxrelease_link ), 'used in box subscription order notes', 'ws_subscription_box' );
			$subscription->add_order_note( $add_note, 0, true );
		}

		if ( count( $subscriptions_updated ) > 0 ) {
			// make a note on template order
			$record_note          = _x( sprintf( 'Line items copied automatically from this template to %s subscriptions (%s) via curated box release post %s. Time taken was %d seconds.', count( $subscriptions_updated ), implode( ', ', $subscriptions_updated ), $boxrelease_link, microtime( true ) - $start_time ), 'used in box subscription order notes', 'ws_subscription_box' );
			$user                 = get_user_by( 'id', $user_id );
			$comment_author       = $user->display_name;
			$comment_author_email = $user->user_email;
			$commentdata          = [
				'comment_post_ID'      => $template_id,
				'comment_author'       => $comment_author,
				'comment_author_email' => $comment_author_email,
				'comment_author_url'   => '',
				'comment_content'      => $record_note,
				'comment_agent'        => 'WooCommerce',
				'comment_type'         => 'order_note',
				'comment_parent'       => 0,
				'comment_approved'     => 1,
			];
			$comment_id           = wp_insert_comment( $commentdata );
		}
		if ( count( $subscriptions ) ===  $per_page ) {
			// Right now these are 10 seconds apart.
			as_schedule_single_action(
				time() + 10,
				'ws_populate_subscriptions',
				[
					'per_page'    => $per_page,
					'offset'      => $offset + $per_page,
					'template_id' => $template_id,
					'box_id'      => $box_id,
					'user_id'     => $user_id,
				],
				'Subscription Box'
			);
		}
	}

	// TODO: figure out why this output_admin_notice is not working!
	public function output_admin_notice() {
		?>
			<div class="notice notice-error ">
				<p><?php _e( 'Insufficient Promotional Stock available within chosen template box, box not published.', 'ws_subscription_box' ); ?></p>
			</div>
		<?php
	}

	/**
	 * Get whether the subscription is ready or locked or doesn't meet the conditions for a box subscription.
	 *
	 * @param object $subscription The subscription.
	 * @return string|false Either 'ready' or 'locked' or if it doesn't meet the conditions, then false.
	 */
	public function get_subscription_box_status( $subscription ) {
		if ( $subscription instanceof \WC_Subscription && wc_memberships_is_user_active_member( $subscription->get_user_id(), 'wellbeing-sisters-membership' ) ) {
			if(get_post_meta( $subscription->get_id(), 'ws_subscription_box_skipped', true )){
			    // box skipped
                return 'skipped';
			}
			if( !$this->boxes_are_unlocked() ){
				return 'locked';
			}
			$date_box_provisioned    = get_post_meta( $subscription->get_id(), '_date_box_provisioned', true );
			$last_order_date_created = $subscription->get_time( 'last_order_date_created', 'site' );
			$next_payment_date       = $subscription->get_time( 'next_payment', 'site' );
			// this sets box as ready when $date_box_provisioned is in the past but since $last_order_date_created. It also checks to ensure $next_payment_date is not empty and is in the future.
			return ( time() > wcs_date_to_time( $date_box_provisioned ) && wcs_date_to_time( $date_box_provisioned ) > $last_order_date_created && ! empty( $next_payment_date ) && time() < $next_payment_date ) ? 'ready' : 'locked';
		}
		return false;
	}

	public function render_subscription_box_order_data( $subscription ) {
		if ( $customer_user = $subscription instanceof \WC_Subscription && wc_memberships_is_user_active_member( $subscription->get_user_id(), 'wellbeing-sisters-membership' ) ? get_user_by( 'id', $subscription->get_user_id() ) : null ) :

			$subscription_id      = $subscription->get_id();
			$date_box_provisioned = get_post_meta( $subscription_id, '_date_box_provisioned', true );
			$date_box_provisioned = wcs_date_to_time( $date_box_provisioned );
			$shop_box_template_id = get_post_meta( $subscription_id, '_shop_box_template_id', true );
			$curated_box_id       = get_post_meta( $subscription_id, '_curated_box_id', true );

			// $last_order_date_created = $subscription->get_time( 'last_order_date_created', 'site' );
			// $last_order_date_paid = $subscription->get_time( 'last_order_date_paid', 'site' );
			// $next_payment_date = $subscription->get_time( 'next_payment', 'site' );
			// $start_date = $subscription->get_time( 'start', 'site' );
			// $trial_end_date = $subscription->get_time( 'trial_end', 'site' );

			// Box is ready if it has been provisioned since the last order was created and there is an upcoming payment. This may need some further checks, like making sure previous payment has been made if failure to pay does not automatically suspend membership/subscription.
			// $subscription_box_status = ( $date_box_provisioned > $last_order_date_created && !empty($next_payment_date) ) ? 'ready' : 'locked'; //
			$subscription_box_status = self::get_subscription_box_status( $subscription );

			$datetime_format = 'd/m/Y H:i';
			$box_details     = '';
			if ( ! empty( $shop_box_template_id ) ) {
				$box_details .= sprintf( '<li>%s <a href="%s">%s</a></li>', __( 'Box Template:', 'ws_subscription_box' ), esc_url( get_edit_post_link( $shop_box_template_id ) ), esc_html( get_the_title( $shop_box_template_id ) ) );
			}
			if ( ! empty( $curated_box_id ) ) {
				$box_details .= sprintf( '<li>%s <a href="%s">%s</a></li>', __( 'Box Release:', 'ws_subscription_box' ), esc_url( get_edit_post_link( $curated_box_id ) ), esc_html( get_the_title( $curated_box_id ) ) );
			}
			if ( ! empty( $date_box_provisioned ) ) {
				$box_details .= sprintf( '<li>%s %s</li>', __( 'Date Time Last Box Provisioned:', 'ws_subscription_box' ), esc_html( date_i18n( $datetime_format, $date_box_provisioned ) ) );
			} else {
				$box_details .= sprintf( '<li>%s</li>', __( 'Box not yet provisioned', 'ws_subscription_box' ) );
			}
			if ( $subscription_box_status === 'ready' ) {
				$boxstyle = 'notice-success';
			} else {
				$boxstyle = 'notice-error';
			}
			?>
					<div class="form-field form-field-wide">
						<div class="wc-customer-subscription-box box-status-<?php echo $subscription_box_status . ' ' . $boxstyle; ?> notice-alt">
						<p style="margin-bottom:6px;"><strong>
						<?php
									esc_html_e( 'Subscription Box Status:', 'ws_subscription_box' );
									echo ' (' . ucfirst( $subscription_box_status ) . ')';
						?>
						</strong>
                        <?php
	                        if( !$this->boxes_are_unlocked() ){
		                        echo ' (<a href="'.get_admin_url().'admin.php?page=wc-settings&tab=subscription_box_settings_tab">global lock applied</a>)';
	                        }
                        ?>
                        </p>
						<ul style="margin-top:6px;">
							<?php echo $box_details; ?>
							<li>
								<button id="ws-subscription-box-reset" class="button button-primary"
									data-sub="<?php echo (int) $subscription_id; ?>"
									data-user="<?php echo (int) $subscription->get_user_id(); ?>"
									disabled
								>Waiting for page to load</button>
								<div id="ws-subscription-box-reset-result" style="display: none;">
									The box is resetting.
								</div>
							</li>
						</ul>
				<?php
				// if(!empty($next_payment_date)){
				// printf( esc_html__( 'Next payment: %s', 'ws_subscription_box' ), esc_html( date_i18n( $datetime_format, $next_payment_date ) ) );
				// }
				// if(!empty($last_order_date_created)){
				// printf( esc_html__( 'Last order date created: %s', 'ws_subscription_box' ), esc_html( date_i18n( $datetime_format, $last_order_date_created ) ) );
				// }
				// if(!empty($last_order_date_paid)){
				// printf( esc_html__( 'Last order date paid: %s', 'ws_subscription_box' ), esc_html( date_i18n( $datetime_format, $last_order_date_paid ) ) );
				// }
				// if(!empty($start_date)){
				// printf( esc_html__( 'Start: %s', 'ws_subscription_box' ), esc_html( date_i18n( $datetime_format, $start_date ) ) );
				// }
				// if(!empty($trial_end_date)){
				// printf( esc_html__( 'Trial End: %s', 'ws_subscription_box' ), esc_html( date_i18n( $datetime_format, $trial_end_date ) ) );
				// }
				?>
						</div></div>
				<?php

		endif;
	}


	/*
	Extending Quadlayers Perfect Woocommerce Brands plugin starts here

	*/
	public function add_brand_custom_limit_field() {
		if ( is_plugin_active( 'perfect-woocommerce-brands/perfect-woocommerce-brands.php' ) ) {
			add_action( 'pwb-brand_add_form_fields', [ $this, 'add_brands_limit_form' ], 15 );
			add_action( 'pwb-brand_edit_form_fields', [ $this, 'add_brands_limit_form_edit' ], 15 );
			add_action( 'edit_pwb-brand', [ $this, 'add_brands_limit_save' ], 15 );
			add_action( 'create_pwb-brand', [ $this, 'add_brands_limit_save' ], 15 );

			add_filter( 'manage_edit-pwb-brand_columns', [ $this, 'brand_taxonomy_columns_head' ] );
			add_filter( 'manage_pwb-brand_custom_column', [ $this, 'brand_taxonomy_columns' ], 10, 3 );
		}
	}

	public function add_brands_limit_form() {
		echo ( '<div class="form-field pwb_brand_cont">
            <label for="pwb_brand_count_limit">' . __( 'Brand box count limit', 'perfect-woocommerce-brands' ) . '</label>
            <input type="number" id="pwb_brand_count_limit" name="pwb_brand_count_limit" min="0" value="0" style="max-width:5rem">
            <p>' . __( 'Maximum amount of promotional stock subscribers can add to their box <br>(Enter 0 if there is no limit)', 'ws-subscription-box' ) . '</p>
        </div>' );

		wp_nonce_field( basename( __FILE__ ), 'pwb_limit_nonce' );
	}

	public function add_brands_limit_form_edit( $term ) {
		$term_value_count_limit = get_term_meta( $term->term_id, 'pwb_brand_count_limit', true );
		if ( '' === $term_value_count_limit ) {
			$term_value_count_limit = '0';
		};

		echo ( '<table class="form-table pwb_brand_cont">
            <tr class="form-field">
                <th>
                    <label for="pwb_brand_count_limit">' . __( 'Brand box count limit', 'perfect-woocommerce-brands' ) . '</label>
                </th>
                <td>
                    <input type="number" id="pwb_brand_count_limit" name="pwb_brand_count_limit" min="0" value="' . esc_html( $term_value_count_limit ) . '" style="max-width:5rem">
                    <p class="description">' . __( 'Maximum amount of promotional stock subscribers can add to their box <br>(Enter 0 if there is no limit)', 'ws-subscription-box' ) . '</p>
                </td>
            </tr>
        </table>' );

		wp_nonce_field( basename( __FILE__ ), 'pwb_limit_nonce' );

	}

	public function add_brands_limit_save( $term_id ) {

		if ( ! isset( $_POST['pwb_limit_nonce'] ) || ! wp_verify_nonce( $_POST['pwb_limit_nonce'], basename( __FILE__ ) ) ) {
			return;
		}

		/* ·············· Brand limit ·············· */
		$old_limit = get_term_meta( $term_id, 'pwb_brand_count_limit', true );
		$new_limit = isset( $_POST['pwb_brand_count_limit'] ) ? esc_sql( $_POST['pwb_brand_count_limit'] ) : '0';

		if ( $old_limit && '' === $new_limit ) {
			delete_term_meta( $term_id, 'pwb_brand_count_limit' );

		} elseif ( $old_limit !== $new_limit ) {
			update_term_meta( $term_id, 'pwb_brand_count_limit', $new_limit );
		}
		/* ·············· /Brand limit ·············· */

	}


	public function brand_taxonomy_columns_head( $columns ) {
		// let’s insert box limit into fifth column..
		$res = array_slice( $columns, 0, 5, true ) +
			[ 'box_limit' => __( 'Box Limit', 'ws-subscription-box' ) ] +
			array_slice( $columns, 5, count( $columns ) - 1, true );

		return $res;
	}

	public function brand_taxonomy_columns( $c, $column_name, $term_id ) {
		switch ( $column_name ) {
			case 'box_limit':
				$box_limit = get_term_meta( $term_id, 'pwb_brand_count_limit', true );
				return ( '' === $box_limit ) ? '0' : $box_limit;
				break;
		}
	}

	/*
	Extending Quadlayers Perfect Woocommerce Brands plugin ends here
	*/


    // dont think this is used. Comment out for now – 10th Mar 22.
	/* public function get_active_members_for_membership( $memberships ) {
		global $wpdb;

		// Getting all User IDs and data for a membership plan
		$query = "SELECT DISTINCT um.user_id, u.user_email, u.display_name, p2.post_title, p2.post_type
		FROM {$wpdb->prefix}posts AS p
		LEFT JOIN {$wpdb->prefix}posts AS p2 ON p2.ID = p.post_parent
		LEFT JOIN {$wpdb->prefix}users AS u ON u.id = p.post_author
		LEFT JOIN {$wpdb->prefix}usermeta AS um ON u.id = um.user_id
		WHERE p.post_type = 'wc_user_membership'
		AND p.post_status IN ('wcm-active', 'wcm-free_trial')
		AND p2.post_type = 'wc_membership_plan'
		AND p2.post_name LIKE '{$memberships}'";

		// $query = "SELECT DISTINCT "

		return $wpdb->get_results( $query );
	} */

	/**
	 * Is the item in a box subscription?
	 *
	 * @param int $line_item_id The order item id.
	 * @return boolean True if the item is in a box subscription, false if not.
	 */
	public function is_item_in_box_subscription( $line_item_id ) {
		$in_box_subscription = wc_get_order_item_meta( $line_item_id, $this->item_box_key, true );

		return ( empty( $in_box_subscription ) ) ? false : true;
	}

	/**
	 * Does the line item have a box discount applied?
	 *
	 * @param int $line_item_id The order item id.
	 * @return boolean True if the item has a box discount applied, false if not.
	 */
	public function has_box_discount( $line_item_id ) {
		$has_box_discount = wc_get_order_item_meta( $line_item_id, $this->item_discounted_key, true );
		return ( empty( $has_box_discount ) ) ? false : true;
	}

	/**
	 * Is this the line item added to bring the order to £30?
	 *
	 * @param int $line_item_id The line item id.
	 * @return boolean True if it is, false if not.
	 */
	public function is_min_box_fee( $line_item_id ) {
		$is_min_box_fee = wc_get_order_item_meta( $line_item_id, $this->min_box_fee_key, true );
		return ( empty( $is_min_box_fee ) ) ? false : true;
	}

	/**
	 * Whether or not to use the order contains a box with promotional inventory.
	 *
	 * @param int|string $order_id Who knows, WP sends the ID through as a string half the time.
	 * @return bool Whether or not the subscription uses promotional inventory for this order.
	 */
	public function is_promotional_box_order( $order_id ) {

		// Start with no.
		$is_promotional_box_order = false;

		// Get all subscriptions in the order. The order_type could be: 'any', 'parent', 'renewal' or 'switch'.
		// This always returns an array.
		$subscriptions = wcs_get_subscriptions_for_order( $order_id, [ 'order_type' => 'any' ] );

		if ( empty( $subscriptions ) && wcs_is_subscription( $order_id ) ) {
			$subscriptions = [ wcs_get_subscription( $order_id ) ];
		}

		foreach ( $subscriptions as $subscription ) {
			// Check to see if the "promotional inventory" category is set.
			// Let's check to see if this came from a template box.
			$template_box_id = $subscription->get_meta( '_shop_box_template_id', true );
			if ( ! empty( $template_box_id ) ) {
				$is_promotional_box_order = true;
			}
		}
		return $is_promotional_box_order;
	}

	/**
	 * Whether or not to use the standard inventory for a
	 *
	 * @param bool     $reduce True if the standard inventory should be reduced, false if not.
	 * @param WC_Order $order The order object.
	 * @return bool True if the standard inventory should be reduced, false if not.
	 */
	public function ws_maybe_dont_reduce_stock( $reduce, $order_id ) {
		$use_standard_inventory = ! $this->is_promotional_box_order( $order_id );
		$order                  = wc_get_order( $order_id );
		$order->get_data_store()->set_stock_reduced( $order_id, false );
		return $use_standard_inventory;
	}

	/**
	 * Whether or not to use the standard inventory when restoring stock.
	 *
	 * @param bool     $restore True if the standard inventory should be restored, false if not.
	 * @param WC_Order $order The order object.
	 * @return bool True if the standard inventory should be restored, false if not.
	 */
	public function ws_maybe_dont_restore_stock( $restore, $order ) {
		$use_standard_inventory = ! $this->is_promotional_box_order( $order->get_id() );
		return $use_standard_inventory;
	}

	/**
	 * Maybe reduce the promotional stock.
	 *
	 * @param int $order_id The order id.
	 * @return void
	 */
	public function ws_maybe_reduce_promotional_stock( $order_id ) {

		$use_promotional_inventory = $this->is_promotional_box_order( $order_id );

		// If it's not a promotional box, bail.
		if ( ! $use_promotional_inventory ) {
			return;
		}

		$order = wc_get_order( $order_id );

		// Dunno why this would happen but just in case.
		if ( empty( $order ) ) {
			return;
		}

		$this->ws_reduce_promotional_box_stock_levels( $order );
	}

	/**
	 * Reduce the promotional box stock levels in an order. I am following `wc_reduce_stock_levels`.
	 *
	 * @param WC_Order $order The order.
	 * @return void
	 */
	public function ws_reduce_promotional_box_stock_levels( $order ) {

		if ( empty( $order ) ) {
			return;
		}

		// We need an order, and a store with stock management to continue.
		if ( ! $order || 'yes' !== get_option( 'woocommerce_manage_stock' ) || ! apply_filters( 'woocommerce_can_reduce_order_stock', true, $order ) ) {
			return;
		}

		$changes = [];

		// Loop over all items.
		foreach ( $order->get_items() as $item ) {
			if ( ! $item->is_type( 'line_item' ) ) {
				continue;
			}

			// Only reduce stock once for each item.
			$product = $item->get_product();

			if ( empty( $product ) ) {
				return;
			}

			if ( ! $this->is_item_in_box_subscription( $item->get_id() ) ) {
				$this->reduce_regular_stock_level( $item, $order, $changes );
				continue;
			}

			$qty       = $item->get_quantity();
			$item_name = $product->get_formatted_name();
			$new_stock = $this->update_stock_on_promo_box_order( $product, $qty, 'decrease' );

			if ( is_wp_error( $new_stock ) ) {
				/* translators: %s item name. */
				$order->add_order_note( sprintf( __( 'Unable to reduce stock for item %s.', 'woocommerce' ), $item_name ) );
				continue;
			}

			// Not sure this is necessary tbh.
			// $item->add_meta_data( '_reduced_promo_box_stock_by', $qty, true );
			$item->save();

			$previous_reserved = (int) $new_stock['old_reserved'];
			$previous_promo    = (int) $new_stock['old_promo'];
			$new_reserved      = (int) $new_stock['new_reserved'];
			$new_promo         = (int) $new_stock['new_promo'];

			$changes[] = [
				'product'       => '<strong>' . $product->get_formatted_name() . '</strong>',
				'reserved from' => "Reserved stock was: {$previous_reserved}",
				'reserved to'   => "Reserved stock is now: {$new_reserved}",
				'promo from'    => "Promo stock was: {$previous_promo}",
				'promo to'      => "Promo stock is now: {$new_promo}",
			];
		}

		$change_note = '';
		foreach ( $changes as $change ) {
			$change_note .= '<p>' . implode( '<br />', $change ) . '<br /><br /></p>';
		}

		$order->add_order_note( $change_note );
	}

	/**
	 * If an item isn't a promotional box, reduce the stock this way.
	 * This is meant to be the same as the bit in `wc_reduce_stock_levels()`.
	 *
	 * @param object $item A line item object.
	 * @param object $order The order object.
	 * @param array  $changes An array of the changes for the order notes.
	 * @return array The updated array of the changes.
	 */
	public function reduce_regular_stock_level( $item, $order, $changes ) {
		// Only reduce stock once for each item.
		$product            = $item->get_product();
		$item_stock_reduced = $item->get_meta( '_reduced_stock', true );

		if ( $item_stock_reduced || ! $product || ! $product->managing_stock() ) {
			return;
		}

		/**
		 * Filter order item quantity.
		 *
		 * @param int|float             $quantity Quantity.
		 * @param WC_Order              $order    Order data.
		 * @param WC_Order_Item_Product $item Order item data.
		 */
		$qty       = apply_filters( 'woocommerce_order_item_quantity', $item->get_quantity(), $order, $item );
		$item_name = $product->get_formatted_name();
		$new_stock = wc_update_product_stock( $product, $qty, 'decrease' );

		if ( is_wp_error( $new_stock ) ) {
			/* translators: %s item name. */
			$order->add_order_note( sprintf( __( 'Unable to reduce stock for item %s.', 'woocommerce' ), $item_name ) );
			return;
		}

		$item->add_meta_data( '_reduced_stock', $qty, true );
		$item->save();

		$changes[] = [
			'product' => $product,
			'from'    => $new_stock + $qty,
			'to'      => $new_stock,
		];

		return $changes;
	}

	/**
	 * Get the promo stock level.
	 *
	 * @param object $product The product object.
	 * @return string|false Either an empty string if there's no value, an int as a string if there's a value and false if the post_id is not there.
	 */
	public function get_promo_stock_level( $product ) {
			return $this->get_stock_level( $product, 'promo' );
	}

	/**
	 * Get the reserved stock level.
	 *
	 * @param object $product The product object.
	 * @return string|false Either an empty string if there's no value, an int as a string if there's a value and false if the post_id is not there.
	 */
	public function get_reserved_stock_level( $product ) {
		return $this->get_stock_level( $product, 'reserved' );
	}

	/**
	 * Get the promo or reserved stock level for a product. Returns 0 if there's no value.
	 *
	 * @param object $product The product object.
	 * @param string $promo_or_reserved Either 'promo' or 'reserved'.
	 * @return int The stock level.
	 */
	public function get_stock_level( $product, $promo_or_reserved ) {
		$metakey = $this->get_metakey( $product, $promo_or_reserved );

		// This is the WooCommerce wrapper for getting metadata. It's future proof as WooCommerce is going to custom tables in the next year or so.
		// See https://github.com/woocommerce/woocommerce/blob/master/includes/abstracts/abstract-wc-data.php .
		$stock_meta = $product->get_meta( $metakey );

		// This is the previous version for comparison.
		// $product_id = $product->get_id();
		// $stock_meta = get_post_meta( (int) $product_id, $metakey, true ); .
		return ( empty( $stock_meta ) ) ? 0 : (int) $stock_meta;
	}

	/**
	 * Set the promo stock level.
	 *
	 * @param object $product    The product object.
	 * @param int    $qty        The new quantity of promo stock.
	 */
	public function set_promo_stock_level( $product, $qty ) {
		$this->set_stock_level( $product, $qty, 'promo' );
	}

	/**
	 * Set the reserved stock level.
	 *
	 * @param object $product    The product object.
	 * @param int    $qty        The new quantity of reserved stock.
	 */
	public function set_reserved_stock_level( $product, $qty ) {
		$this->set_stock_level( $product, $qty, 'reserved' );
	}

	/**
	 * Set the given stock level for the given product.
	 *
	 * @param object $product The product object.
	 * @param int    $qty The quantity to set.
	 * @param string $promo_or_reserved 'promo' or 'reserved'.
	 * @return void
	 */
	public function set_stock_level( $product, $qty, $promo_or_reserved ) {

		$metakey = $this->get_metakey( $product, $promo_or_reserved );

		$product->update_meta_data( $metakey, (int) $qty );
		$product->save();

	}

	/**
	 * Get the metakey appropriate for the product and whether or not we want the reserved or promo stock level.
	 *
	 * @param object $product The product object.
	 * @param string $promo_or_reserved Either 'promo' or 'reserved'.
	 * @return string The metakey.
	 */
	public function get_metakey( $product, $promo_or_reserved ) {
		$product_type = ( $product->is_type( 'variation' ) ) ? 'variation' : 'product';
		return "_{$product_type}_level_{$promo_or_reserved}_stock";
	}

	/**
	 * Update the promo stock and reserved stock quantities for promo boxes.
	 * On pending orders, make sure you don't increase the stock levels unless they've been decreased by a processing order!
	 *
	 * @param int    $product    The product object.
	 * @param int    $qty        The quantity of the line item in the order.
	 * @param string $increase_or_decrease Can be either "increase" (if a line item is being restocked) or "decrease" (if a line item is being reduced).
	 * @return array An associative array with the new stock quantities for use in the notes.
	 */
	public function update_stock_on_promo_box_order( $product, $qty, $increase_or_decrease ) {

		$new_promo_quantity    = $this->get_promo_stock_level( $product );
		$new_reserved_quantity = $this->get_reserved_stock_level( $product );

		$changes = [
			'old_reserved' => $new_reserved_quantity,
			'old_promo'    => $new_promo_quantity,
		];

		switch ( $increase_or_decrease ) {
			case 'decrease':
				$new_promo_quantity    -= (int) $qty;
				$new_reserved_quantity -= (int) $qty;
				break;
			case 'increase': // I don't think you'd ever increase it like this tbh.
				$new_promo_quantity    += (int) $qty;
				$new_reserved_quantity += (int) $qty;
				break;
		}

		// TODO: Should this be able to go negative? Probably?
		$this->set_promo_stock_level( $product, $new_promo_quantity );
		$changes['new_promo'] = $new_promo_quantity;
		// This should not be able to go negative, I think. The lowest it can go is zero. Think this through.
		$new_reserved_quantity = ( $new_reserved_quantity < 0 ) ? 0 : $new_reserved_quantity;

		$this->set_reserved_stock_level( $product, $new_reserved_quantity );
		$changes['new_reserved'] = $new_reserved_quantity;

		return $changes;
	}

	/**
	 * Increase the reserved stock level by the amount given.
	 *
	 * @param object $product The product object.
	 * @param int    $qty_to_increase The quantity to decrease the reserved stock by.
	 * @return int The updated amount of reserved stock. 0 if it has gone negative.
	 */
	public function increase_reserved_stock_level( $product, $qty_to_increase ) {
		$old_reserved_quantity = $this->get_reserved_stock_level( $product );
		// This should not be able to go negative, I think. The lowest it can go is zero. Think this through.
		$new_reserved_quantity = (int) $old_reserved_quantity + (int) $qty_to_increase;
		$new_reserved_quantity = ( $new_reserved_quantity < 0 ) ? 0 : $new_reserved_quantity;

		$this->set_reserved_stock_level( $product, $new_reserved_quantity );
		return $this->get_reserved_stock_level( $product );
	}

	/**
	 * Increase the promo stock level by the amount given.
	 *
	 * @param object $product The product object.
	 * @param int    $qty_to_increase The quantity to  increase the promo stock by.
	 * @return int The updated amount of promo stock. 0 if it has gone negative.
	 */
	public function increase_promo_stock_level( $product, $qty_to_increase ) {
		$old_promo_quantity = $this->get_promo_stock_level( $product );
		// This should not be able to go negative, I think. The lowest it can go is zero. Think this through.
		$new_promo_quantity = (int) $old_promo_quantity + (int) $qty_to_increase;
		$new_promo_quantity = ( $new_promo_quantity < 0 ) ? 0 : $new_promo_quantity;

		$this->set_promo_stock_level( $product, $new_promo_quantity );
		return $this->get_promo_stock_level( $product );
	}

	/**
	 * Decrease the reserved stock level.
	 *
	 * @param object $product The product object.
	 * @param int    $qty_to_decrease The quantity to decrease.
	 * @return int The updated amount of reserved stock. 0 if it has gone negative.
	 */
	public function decrease_reserved_stock_level( $product, $qty_to_decrease ) {
		$old_reserved_quantity = $this->get_reserved_stock_level( $product );
		$new_reserved_quantity = (int) $old_reserved_quantity - (int) $qty_to_decrease;
		$new_reserved_quantity = ( $new_reserved_quantity < 0 ) ? 0 : $new_reserved_quantity;

		$this->set_reserved_stock_level( $product, $new_reserved_quantity );
		return $this->get_reserved_stock_level( $product );
	}

	/**
	 * Decrease the promo stock level.
	 *
	 * @param object $product The product object.
	 * @param int    $qty_to_decrease The quantity to decrease.
	 * @return int The updated amount of promo stock. 0 if it has gone negative.
	 */
	public function decrease_promo_stock_level( $product, $qty_to_decrease ) {
		$old_promo_quantity = $this->get_promo_stock_level( $product );
		$new_promo_quantity = (int) $old_promo_quantity - (int) $qty_to_decrease;
		$new_promo_quantity = ( $new_promo_quantity < 0 ) ? 0 : $new_promo_quantity;

		$this->set_promo_stock_level( $product, $new_promo_quantity );
		return $this->get_promo_stock_level( $product );
	}

	/**
	 * This has edge cases. Because it doesn't have the context of the line item, it can only see if the product is in a promo box.
	 * At this point, it's *not* checking the promotional stock or reserved stock but it could if we decided how to make that make sense. promo_stock - reserved_stock >= 0 maybe?
	 * Also because of the way Woo Subs handles paying for pending or failed orders -- by rebuilding the cart from scratch -- we don't have the session cart to work with.
	 * This may be delicate, it needs testing.
	 *
	 * @param bool   $is_in_stock If the initial checks have said it's true or not.
	 * @param object $product     The product object.
	 * @return bool True if we should treat this as if it's in stock.
	 */
	public function maybe_in_stock( $is_in_stock, $product ) {

		// If it's true, we don't need to do our checks.
		if ( $is_in_stock ) {
			return $is_in_stock;
		}

		if ( empty( $product ) ) {
			return $is_in_stock;
		}

		// Are we in the admin area? And if not, are we not in the cart or the checkout?
		if ( is_admin() || ( ! is_cart() && ! is_checkout() ) ) {
			return $is_in_stock;
		}

		// If this is a plain old order being paid for, then let's use that id.
		$order_id = get_query_var( 'order-pay' );

		// This bit is necessary due to the way WooCommerce Subscriptions handles adding the products in a subscription pending or failed order to the cart.
		if ( empty( $order_id ) && ! empty( WC()->session ) ) {
			// WooCommerce sessions are ... not great. They can hold onto old data and it's stored everywhere.
			// Eg if you go through the process with a subscription (but don't pay for it, just click "pay") then create a new order without a subscription
			// then pay for it on the front end, it will pick up the old data.
			// If the user is paying for an order, get the id.
			$api_draft_order_id = WC()->session->get( 'store_api_draft_order' );
			$order_pay_id       = WC()->session->get( 'order_awaiting_payment' );

			// If we are not paying for an order, bail.
			if ( empty( $order_pay_id ) && empty( $api_draft_order_id ) ) {
				return $is_in_stock;
			}

			// If we're not paying for a pending or failed order then bail.
			$order_id = ( ! empty( $order_pay_id ) ) ? $order_pay_id : $api_draft_order_id;

		}

		if ( empty( $order_id ) ) {
			return $is_in_stock;
		}

		// Check if the order contains a promo box.
		$is_box_order = $this->is_promotional_box_order( $order_id );

		if ( ! $is_box_order ) {
			return $is_in_stock;
		}

		$order = wc_get_order( $order_id );

		if ( empty( $order ) ) {
			return $is_in_stock;
		}

		// If the user is logged in and this is not their order, bail.
		if ( is_user_logged_in() && $order->get_user_id() !== get_current_user_id() ) {
			return $is_in_stock;
		}

		$line_items = $order->get_items();

		// Let's at least check if the order contains the product as a line item.
		$contains_product = $is_in_stock;
		foreach ( $line_items as $line_item ) {

			if ( $line_item->get_type() !== 'line_item' ) {
				continue;
			}

			if ( $line_item->get_product()->get_id() === $product->get_id() ) {
				$contains_product = true;
			}
		}

		return $contains_product;

	}

	/**
	 * If we're allowing items to not be out of stock, then we need to filter backorders too because there are so. many. checks.
	 *
	 * @param bool   $allowed Whether or not the backorder is allowed.
	 * @param int    $product_id The product id.
	 * @param object $product The product object.
	 * @return bool Whether or not backorders are allowed for this product.
	 */
	public function maybe_on_backorder_allowed( $allowed, $product_id, $product ) {
		return $this->maybe_in_stock( $allowed, $product );
	}

	/**
	 * This handles the final stock check for items at checkout. Currently it only checks that a line item is a promo line item and does not check the reserved / promo stock.
	 *
	 * @param bool   $is_not_enough Returns true if there is not enough regular stock for this order.
	 * @param object $product The product object.
	 * @param array  $values The cart array with all sorts of useful info about the item and what type of order it's in.
	 * @return bool True is there is *not* enough stock, false if there is enough stock.
	 */
	public function maybe_required_stock_is_not_enough( $is_not_enough, $product, $values ) {

		// If it's false, we don't need to do the rest of the checks, we only need to get this in the cart at checkout.
		if ( ! $is_not_enough ) {
			return $is_not_enough;
		}

		$is_item_in_promo_box_subscription = $this->is_purchasable_promo_item_in_cart( $values );

		// We can't return that directly because we need to return false.
		if ( $is_item_in_promo_box_subscription ) {
			return false; // Should we do more checks here? Check the available promo / reserved stock again? This should account for one item in the reserved stock.
		}

		return $is_not_enough;
	}

	/**
	 * Is it a promo item in the cart?
	 *
	 * @param array $cart_item The cart item details array.
	 * @return boolean
	 */
	public function is_purchasable_promo_item_in_cart( $cart_item ) {
		$subscription_renewal = $cart_item['subscription_renewal'] ?? false;

		// If this isn't a subscription renewal, don't do anything.
		if ( ! $subscription_renewal ) {
			return false;
		}

		$is_promo_box_order = ( ! empty( $subscription_renewal['renewal_order_id'] ) ) ? $this->is_promotional_box_order( $subscription_renewal['renewal_order_id'] ) : false;

		// If this isn't a subscription renewal or a promo box order, bail.
		if ( ! $is_promo_box_order ) {
			return false;
		}

		return ! empty( $subscription_renewal['custom_line_item_meta'] ) && ! empty( $subscription_renewal['custom_line_item_meta'][ $this->item_box_key ] );
	}

	/**
	 * Get the discounted price. Currently hardcoded! This is where you can add something to get the discount if you want it to editable.
	 *
	 * @param float $price The price as a float.
	 * @return float The discounted price.
	 */
	public function get_discount_price( $price ) {
		$discounted_amount = 0.6; // This is a 40% discount.

		return number_format( (float) $price * $discounted_amount, 2 );
	}

	/**
	 * If the cart must be worth > x after the discount is applied, the full price total must be x / y where y is 1 - ( the discount / 100 )
	 * Currently hard coded! This is where you would make it editable.
	 *
	 * @return float The total regular price amount needed for a discount to be applied.
	 */
	public function total_necessary_for_discount() {
		$box_minimum = $this->get_box_minimum();
		return (int) $box_minimum / 0.6; // This is 50. A member needs £50 worth of full price product in their basket to have a basket worth £30.
	}

	/**
	 * Maybe add a discount to the promo line items.
	 * Working from https://www.businessbloomer.com/woocommerce-set-override-product-price-programmatically/ .
	 *
	 * @param bool   $add_taxes Whether or not taxes should be added.
	 * @param object $order The order object.
	 * @return void
	 */
	public function maybe_add_discount( $add_taxes, $order ) {

		// Don't keep doing this.
		if ( did_action( 'woocommerce_before_calculate_totals' ) >= 2 ) {
			return;
		};

		if ( ! $this->is_promotional_box_order( $order->get_id() ) ) {
			return;
		}

		$line_items       = $order->get_items();
		$line_items_total = 0;

		$fees = $order->get_fees();

		foreach( $fees as $fee_id => $fee ) {
			$order->remove_item( $fee_id );
		}

		foreach ( $line_items as $line_item_id => $line_item ) {

			// Remove all the fees first.
			if ( $line_item->get_type() !== 'line_item' ) {
				continue;
			}

			// check that it's a promo item.
			if ( ! $this->is_item_in_box_subscription( $line_item_id ) ) {
				continue; // Don't update any products which don't have the _in_box_subscription meta.
			}

			$quantity = $line_item->get_quantity();

			$product       = $line_item->get_product();
			$regular_price = $product->get_regular_price();
			// The discounted price which is based on the *regular* price, not any current sale price. You can change this above.
			$price           = (float) $this->get_discount_price( $regular_price );
			$line_item_total = $price * $quantity;
			$line_item->add_meta_data( $this->item_discounted_key, true, true );
			$line_item->set_subtotal( $line_item_total );
			$line_item->set_total( $line_item_total );
			$line_item->save();

			$line_items_total += $line_item_total;
		}

		if ( $line_items_total < $this->get_box_minimum( $order ) ) {
			$top_up = $this->get_box_minimum( $order ) - $line_items_total;
			// https://gist.github.com/MCKLtech/9127918e5488a21c8115a0eab14533bb
			$fee = new WC_Order_Item_Fee();
			$fee->set_name( 'Minimum box fee' );
			$fee->set_total( $top_up );
			$fee->add_meta_data( $this->min_box_fee_key, true, true );
			$order->add_item( $fee );
		}
	}

	/**
	 * Helper function so if this is made editable, it's easier to update.
	 *
	 * @return float The minimum box price.
	 */
	public function get_box_minimum( $order = null ) {
		return 30;
	}

	/**
	 * Get the fee added to bring the box price up to the minimum spend.
	 *
	 * @param object $order The order / subscription.
	 * @return float The total of the fees added for the minimum box price.
	 */
	public function get_minimum_box_fee_total( $order ) {
		$fees      = $order->get_fees();
		$fee_total = 0;

		foreach( $fees as $fee_id => $fee ) {
			if ( $this->is_min_box_fee( $fee_id ) ) {
				$fee_total += $fee->get_total();
			}
		}

		return $fee_total;
	}

	/**
	 * Get the regular price (rrp) total of an order.
	 *
	 * @param object $order The subscription or order.
	 * @return float The total rrp of all products in the order.
	 */
	public function get_rrp_total( $order ) {
		$line_items = $order->get_items();
		$rrp_total  = 0;

		foreach ( $line_items as $line_item_id => $line_item ) {
			if ( $line_item->get_type() !== 'line_item' ) {
				continue;
			}

			$product    = $line_item->get_product();
			$rrp        = number_format( (float) $product->get_regular_price(), 2 );
			$qty        = (int) $line_item->get_quantity();
			$rrp_total += $rrp * $qty;

		}

		return $rrp_total;
	}
}

