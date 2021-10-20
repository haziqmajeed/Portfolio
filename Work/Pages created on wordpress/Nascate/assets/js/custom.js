jQuery(document).ready(function($){		
	  $('.moveSection').on('click', function () {
	        var fuller = $(this).closest('section').next('section'),
	            section = $(this).closest('.banner');
	            
	        $("html, body").animate({
	            scrollTop: fuller.offset().top
	        },700);
	    });


	  // $('.moveSection').on('click', function () {
	  //       var fuller = $(this).closest('.container').next('.container'),
	  //           section = $(this).closest('.banner');
	  //       $("html, body").animate({
	  //           scrollTop: fuller.offset().top
	  //       }, 700);
	  //   });




	  $('.collapse.show').each(function () {
	  		$(this).prev(".accordion-header").find(".plusPngIcon").addClass("minus").removeClass("plus");
	  		$(this).prev(".accordion-header").find(".activeHeader").addClass("activeHeaderStyling");
	  		$(".accordion-item").addClass("removeBorders");
	  		//$(".accordion-item").addClass("removeBorders");
	  });
	  $('.collapse').on('show.bs.collapse', function () {
	  	$(this).prev(".accordion-header").find(".plusPngIcon").addClass("minus").removeClass("plus");
	  	$(this).prev(".accordion-header").find(".activeHeader").addClass("activeHeaderStyling");
	  	$(this).prev(".accordion-item").addClass("removeBorders");
	  	// if($(this).prev(".accordion-header").find(".activeHeader").hasClass("activeHeaderStyling")){
	  	// 	$(".accordion-item").addClass("removeBorders");
	  	// }
	  	$(".accordion-item").addClass("removeBorders");
	  	
	  	
	  }).on('hide.bs.collapse', function () {
	  	$(this).prev(".accordion-header").find(".plusPngIcon").addClass("plus").removeClass("minus");
	  	$(this).prev(".accordion-header").find(".activeHeader").removeClass("activeHeaderStyling");
	  	$(this).prev(".accordion-header").prev(".accordion-item").removeClass("removeBorders");
	  	// if($(this).prev(".accordion-header").find(".activeHeader").hasClass("activeHeaderStyling")){
	  	// 	$(".accordion-item").removeClass("removeBorders");
	  	// }

	  	$(".accordion-item").removeClass("removeBorders");
	  })



// 	  $('.moveSection').each(function() {
//     $(this).on('click', function () {
//         //find the button's parent, in this case it is the section wrapper #about
//         var nextSection = $(this).parent().next();
//         //animate to the next section, edit the offset and time
//         // note: having an offset can be handy, especially if you have fixed elements that depend on these scroll bahaviours. I'll leave it up to you to decide if you need an offset or not. Feel free to delete the 1 pixel altogether, you are the captain your own ship!
//         $('html, body').animate({
//             scrollTop: nextSection.offset().top + 1
//         }, 1000 );
//     });
// });


// $('.moveSection').on('click', function () {
// 	  		var cls = $(this).closest(".banner").next().offset().top;
// 			$("html, body").animate({scrollTop: cls}, "slow");
// 	    });

	
})