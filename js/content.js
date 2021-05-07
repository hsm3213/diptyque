$(function(){
	if($('.datepicker').length != 0){
		$('.calendarArea .datepicker').datepicker({
			showMonthAfterYear:true,
			showOtherMonths:true,
			showOn:"both",
			minDate:'-100y',
			nextText:'다음 달',
			prevText:'이전 달',
			yearRange:'c-100:c+10',
			dateFormat:"yy-mm-dd",
			showMonthAfterYear:true,
			dayNamesMin:['월', '화', '수', '목', '금', '토', '일'],
			monthNamesShort:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		});
	};
	$('.menuList > li > a').click(function(){
		$(this).next().slideToggle();
	});
	mobileMenu();
	$('.layerPop .popupCloseBtn').click(function(){
		$(this).closest('.layerPop').removeClass('open');
	});
	$('.prdNumInput').each(function(){
		var setting = $.extend({
			'plus_btn':'.plus',
			'minus_btn':'.minus',
			'min_num':1,
			'max_num':9,
		});
		$(this).each(function(){
			var $this = $(this);
			var $minus_btn = $this.find(setting.minus_btn);
			var $plus_btn = $this.find(setting.plus_btn);
			var $input_num = $('.prdNumInput .numberInput');
			$minus_btn.click(function(){
				var countval = parseFloat($input_num.val());
				if(countval > setting.min_num){
					countval--
					$input_num.val(countval);
					$('.item li .prdPrice p').text($input_num.val() * 180000);
				}
			});
			$plus_btn.click(function(){
				var countval = parseFloat($input_num.val());
				if(countval < setting.max_num){
					countval++
					$input_num.val(countval);
					var totalprice = $('.item li .prdPrice p').text($input_num.val() * 180000);
					totalprice.toLocaleString();
					var totalPrice = $('.totalPrice .num').text($input_num.val() * 180000);
					totalPrice.toLocaleString();
				}
			});
		});
	});
	$('.sampleList li label input').click(function(){
	if($(".sampleList li label input:checked").length >2){
			alert('2가지만 선택 해주세요.');
			$(this).prop("checked",false); 
		}else{
			var index = $(this).parents('li').index();
			$('.gift li').eq(index).toggleClass('on');
		}		
	});
	$('.deleteBtn').click(function(){
		$(this).parents('li').removeClass('on')
		var index = $(this).parents('li').index();
		var cartindex = $('.cartCheck li').eq(index);
		if ($(".cartCheck li label input").is(':checked')) {
			$('.cartCheck li label input').eq(index).prop("checked", false);
		}
	});
	toggleSelect();
	toggleMoGnb();
	topButton();
	inputReset();
});

function topButton(){
	if($('.topBtn').length != 0){
		var lastPos = 0,
			delta = 20;
		$(window).scroll(function(){
			var startPos = $(this).scrollTop();
			if($(this).outerWidth() < 768){
				if(startPos < delta){
					$('.topBtn').removeClass('on');
				} else if ((startPos > lastPos) && (lastPos > 0)) {
					$('.topBtn').removeClass('on');
				} else {
					$('.topBtn').addClass('on');
				}
				lastPos = startPos;
			} else {
				if(startPos < delta){
					$('.topBtn').removeClass('on');
				} else {
					$('.topBtn').addClass('on');
				}
			}
		});
		$('.topBtn').click(function(){
			$('html, body').animate({scrollTop:0},400);
		});

	}
}

function mainSlide(){
	var mainSlide = new Swiper('.mainSlide', {
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		autoHeight: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		speed: 500,
		loop: true,
		on: {
			init: function () {
				$(".swiper-progress-bar").removeClass("animate");
				$(".swiper-progress-bar").removeClass("active");
				$(".swiper-progress-bar").eq(0).addClass("animate");
				$(".swiper-progress-bar").eq(0).addClass("active");
			},
			slideChangeTransitionStart: function () {
				$(".swiper-progress-bar").removeClass("animate");
				$(".swiper-progress-bar").removeClass("active");
				$(".swiper-progress-bar").eq(0).addClass("active");
			},
			slideChangeTransitionEnd: function () {
				$(".swiper-progress-bar").eq(0).addClass("animate");
			},
		}
	});
	
	$(".swiper-pagination").append('<span class="playBtn"></span>');
	$(".swiper-pagination").append('<span class="stopBtn"></span>');
	$('.mainSlide .playBtn').click(function(){
		mainSlide.autoplay.start();
	});
	$('.mainSlide .stopBtn').click(function(){
		mainSlide.autoplay.stop();
	});
}

function bestSlide (){
	var $gal = $(".bestWrap"),
	galW = $gal.outerWidth(true),
	galSW = $gal[0].scrollWidth,
	wDiff = (galSW / galW) - 1, // widths difference ratio
	mPadd = 250, // mousemove Padding
	damp = 20, // Mmusemove response softness
	mX = 0, // real mouse position
	mX2 = 0, // modified mouse position
	posX = 0,
	mmAA = galW - (mPadd * 2), // the mousemove available area
	mmAAr = (galW / mmAA); // get available mousemove didderence ratio
	$gal.mousemove(function(e) {
		mX = e.pageX - $(this).parent().offset().left - this.offsetLeft;
		mX2 = Math.min(Math.max(0, mX - mPadd), mmAA) * mmAAr;
	});
	setInterval(function() {
		posX += (mX2 - posX) / damp; // zeno's paradox equation "catching delay"	
		$gal.scrollLeft(posX * wDiff);
	}, 10);
}

function scrollEvent(){
	var aaaa = $('.widgetWrap.sequence01').offset().top;
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop();
		var mainH = $('.mainSlide').height() / 2;
		var sec01H = $('.widgetWrap.sequence01').height() / 2;
		if(scrollTop > mainH){
			$('.scrEvt.sequence01').addClass('scroll');
		}
		if (scrollTop > aaaa + sec01H){
			$('.scrEvt.sequence02').addClass('scroll');
		}
	});
}

function bestMobileSlide(){
	var bestMobile = new Swiper('.bestWrap', {
		slidesPerView: 2,
	});
}
function mobileMenu(){
	$('.moMenu .menuClose').click(function(){
		$('html, body').removeClass('menuOpen');
		$(this).parent().removeClass('open');
	});
	$('.moGnb > li').click(function(){
		$('.moGnb > li').removeClass('on');
		$(this).addClass('on');
		var idx = $(this).index();
		console.log(idx);
		var aaaa = $(this).next();
		console.log(aaaa);
		$('.moSnb').addClass('on');
		$('.moSnb li').removeClass('open');
		$(this).parent().next().children('li').eq(idx).addClass('open');
	});
	$('.moSnb li .title').click(function(){
		$(this).parent().removeClass('open');
		$(this).parents('.moSnb').removeClass('on');
	});
	$('.moToggleMenu').click(function(){
		$('html, body').addClass('menuOpen');
		$('.moMenu').addClass('open');
	});
}
function toggleSelect(){
	$('.toggleBtn').click(function(){
		$(this).next('ul').slideToggle();
	});
	$('.selectWrap ul li a').click(function(){
		var selcetText = $(this).html();
		$(this).parents('ul').prev().children('.name').html(selcetText);
		$(this).parents('ul').css("display","none");
	});
}
function toggleMoGnb(){
	$('.moGnbTitle').click(function(){
		$(this).parents('li').prevAll('li').children('.gnbList').slideUp();
		$(this).parents('li').nextAll('li').children('.gnbList').slideUp();
		$(this).next('.gnbList').slideToggle();
	});
}
function layerPopOpen(id){
	$('#'+id).addClass('open');
	$('#'+id).draggable();
};
function selectBox(){
	$('.selected').click(function(){
		$(this).toggleClass('on');
		$('.selected').not(this).siblings('.select').removeClass('on');
		if(!$(this).siblings('.select').hasClass('on')){
			$(this).siblings('.select').addClass('on');
		}
		else {
			$(this).siblings('.select').removeClass('on');
		}
	});
	$('.option').click(function(){
		$(this).parent().removeClass('on');
		$(this).parent().siblings('.selected').text($(this).text());
		if ($(this).parent().siblings('.selected').hasClass('on')){
			$(this).parent().siblings('.selected').removeClass('on');
		}
	});
	$('body').mouseup(function(e){
		if($('.select').hasClass('on')){
			if(!$('.select').has(e.target).length){ 
				$('.selected').removeClass('on');
				$('.select').removeClass('on');
			} 
		}
	});
};
function selectBox(){
	$('.selected').click(function(){
		$(this).toggleClass('on');
		$('.selected').not(this).siblings('.select').removeClass('on');
		if(!$(this).siblings('.select').hasClass('on')){
			$(this).siblings('.select').addClass('on');
		}
		else {
			$(this).siblings('.select').removeClass('on');
		}
	});
	$('.option').click(function(){
		$(this).parent().removeClass('on');
		$(this).parent().siblings('.selected').text($(this).text());
		if ($(this).parent().siblings('.selected').hasClass('on')){
			$(this).parent().siblings('.selected').removeClass('on');
		}
	});
	$('body').mouseup(function(e){
		if($('.select').hasClass('on')){
			if(!$('.select').has(e.target).length){ 
				$('.selected').removeClass('on');
				$('.select').removeClass('on');
			} 
		}
	});
};
function prdHeadEvent(){
	var headH = $('.prdDetailHead li').height();
	$('.prdDetailHead li').click(function(){
		var thisIndex = $('.prdDetailHead li').index(this);
		var headT = $('.prdDetailArea .section').eq(thisIndex).offset();
		$('html, body').scrollTop(headT.top - headH);
		$('.prdDetailHead li').removeClass('active');
		$(this).addClass('active');
	});
	$(window).scroll(function(){
		var winScrT = $(this).scrollTop();
		$('.prdDetailArea .section').each(function(i){
			if($(this).offset().top <= winScrT + headH + 1){
				$('.prdDetailHead li.active').removeClass('active');
				$('.prdDetailHead li').eq(i).addClass('active');
			}
		});
	});
};
function reviewCount(){
	var reviewNum = $('.section.review .utilList li').length;
	var qnaNum = $('.section.qna .utilList li').length;
	$('.prdDetailHead .review .num').text(reviewNum);
	$('.prdDetailHead .qna .num').text(qnaNum);
	$('.section.review .count').text(reviewNum);
	$('.section.qna .count').text(qnaNum);
};
function prdDetailSlide(){
	var galleryThumbs = new Swiper('.gallery-thumbs', {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
	});
	var galleryTop = new Swiper('.gallery-top', {
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		thumbs: {
			swiper: galleryThumbs
		}
	});
};
function detailTxtWidth(){
	var detailImgW = $('.detailImg').width();
	var detailTxtW = $('.content').width() - detailImgW;
	$('.prdDetailTop .detailTxt').css('width',detailTxtW);
};
function prdDetailSticky(){
	if($(window).outerWidth() < 768){
		$(".prdDetailTop").stick_in_parent({parent:'.content'});
	}else{
		$(".prdDetailTop").trigger("sticky_kit:detach");
	}
};
function viewAllSlide(){
	var viewAllSlide = new Swiper('.viewAllSlide', {
		slidesPerView: 2,
		 loop:true,
		 navigation: {
			nextEl: '.slideWrap .swiper-button-next',
			prevEl: '.slideWrap .swiper-button-prev',
		},
	});
};
function moViewAllSlide(){
	var moViewAllSlide = new Swiper('.viewAllSlide', {
		slidesPerView:1,
		loop:true,
	});
};
function inputReset(){
	//Form inputbox clear
	if ($('.inputForm').length != 0) {
		$('.inputForm input').each(function(){
			$(this).next('span').on('click',function(){
				$(this).prev('input').val('');
				$(this).parent().removeClass('clear');
			});
			$(this).on('textchange keyup paste',function(e){
				if(e.target.value.length > 0){
					$(this).parent().addClass('clear');
					$(this).css({'padding-right' : '42px'})
				}else{
					$(this).parent().removeClass('clear');
				}
			});
		});
	};
};