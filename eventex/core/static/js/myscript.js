var fixed_menu = true;
window.jQuery = window.$ = jQuery;

/* Custom Scripts */

function calculateScroll() {
	var contentTop      =   [];
	var contentBottom   =   [];
	var winTop      =   $(window).scrollTop();
	var rangeTop    =   200;
	var rangeBottom =   500;
	$('.navmenu').find('a').each(function(){
		contentTop.push( $( $(this).attr('href') ).offset().top );
		contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
	})
	$.each( contentTop, function(i){
		if ( winTop > contentTop[i] - rangeTop && winTop < contentBottom[i] - rangeBottom ){
			$('.navmenu li')
			.removeClass('active')
			.eq(i).addClass('active');
			
			$('#top .navmenu li').first().addClass('active');
			jQuery('.mobile_menu_wrapper').css({'display' : 'none'});
			
		}
	})
};


jQuery(document).ready(function() {		
	//Fixed Menu
	if (jQuery('.fixed-menu').size() && fixed_menu == true) {
		
		jQuery('.fixed-menu').append('<div class="fixed-menu-wrapper container">'+jQuery('#top header .container').html()+'</div>');
		jQuery('.fixed-menu').find('.menu').children('li').each(function(){
			jQuery(this).children('a').append('<div class="menu_fadder"/>');
		});
		
		var fixd_menu = setInterval(scrolled_menu, 100);
	}
	
	//MobileMenu
	jQuery('#top header .container').append('<a href="javascript:void(0)" class="menu_toggler"/>');
	jQuery('#top').append('<div class="mobile_menu_wrapper"><ul class="mobile_menu container"/></div>');	
	jQuery('.mobile_menu').html(jQuery('#top header').find('.navmenu').html());
	jQuery('.mobile_menu_wrapper').hide();
	jQuery('.menu_toggler').click(function(){
		jQuery('.mobile_menu_wrapper').slideToggle(300);
	});
		
	// if single_page
	if (jQuery("#page").hasClass("single_page")) {			
	}
	else {
		$(window).scroll(function(event) {
			calculateScroll();
		});
		$('.navmenu ul li a, .mobile_menu ul li a, .down_btn').click(function() {  
			$('html, body').animate({scrollTop: $(this.hash).offset().top - 75}, 1000);
			return false;
		});
	};

	
	//Iframe transparent
	$("iframe").each(function(){
		var ifr_source = $(this).attr('src');
		var wmode = "wmode=transparent";
		if(ifr_source.indexOf('?') != -1) {
		var getQString = ifr_source.split('?');
		var oldString = getQString[1];
		var newString = getQString[0];
		$(this).attr('src',newString+'?'+wmode+'&'+oldString);
		}
		else $(this).attr('src',ifr_source+'?'+wmode);
	});
	
	
	//PrettyPhoto
	$("a[rel^='prettyPhoto']").prettyPhoto();
	
	
	//Home Height
	sliderHeight();
	
	
	//Welcome Block Vertical Align
	mymargtop();
	
	
	//Parallax Effect
	$(window).stellar();
	
	
	//Portfolio Item Size
	portfolio_item_w();
	
});

jQuery(window).load(function(){
	
	
});


jQuery(window).resize(function(){
	//Home Height
	sliderHeight();
	
	
	//Welcome Block Vertical Align
	mymargtop();
	
	
	//Portfolio Item Size
	portfolio_item_w();
		
});

function scrolled_menu() {
	if (jQuery(window).scrollTop() > jQuery('#top header').height()+50) {
		jQuery('.fixed-menu').addClass('fixed_show');
	} else {
		jQuery('.fixed-menu').removeClass('fixed_show');
	}
};


//Home Height
function sliderHeight(){
	wh = $(window).height()-74;
	$('#home').css({height:wh});
	
}

//Welcome Block Vertical Align
function mymargtop() {
	var body_h = $(window).height();
	var container_h = $('.welcome_block').height();	
	var marg_top = Math.abs((body_h - container_h)/2);	
	$('.welcome_block').css('padding-top', marg_top-156);
	$('.welcome_block').css('padding-bottom', marg_top);
}

/*
function portfolio_item_w() {
	//Portfolio Item size
	var nav_w = jQuery('.portfolio_block').width();
	if (jQuery(window).width() > 1000) {
		var nav_w_li = nav_w/4;
	} else {
		var nav_w_li = (nav_w-1)/2;
	}
	if (jQuery(window).width() <= 479) {
		var nav_w_li = nav_w/1;
	}
	jQuery('.portfolio_block').children().css('width', nav_w_li + 'px');
	
	jQuery('.description').css('width', nav_w_li + 'px');
	
	var descr_h = jQuery('.portfolio_item .hover_img img').height();
	jQuery('.description').css('height', descr_h + 'px');
	
	
}
*/








