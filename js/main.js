$(document).ready(function() {

//DOM
	$sites = $("body").children();

	$portfolioBody = $("body").find("#portfolio");
	$resumeBody = $("body").find("#resume");
	$aboutMeBody = $("body").find("#aboutMe");

	$portfolioHeader = $portfolioBody.find(".header");
	$portfolioNavbar2 = $portfolioHeader.find("#portNavbar2");

	$frontEndClick = $portfolioNavbar2.find("#frontEndClick");
	$backEndClick = $portfolioNavbar2.find("#backEndClick");
	$slideIndicator = $portfolioNavbar2.find(".butt");
	$slideIndicator1 = $frontEndClick.find(".butt");
	$slideIndicator2 = $backEndClick.find(".butt");

	$sliderDiv = $portfolioBody.find(".slider");
	$displayUl = $sliderDiv.find(".slide");
	$displayLi = $displayUl.find("li");
	$display = $displayLi.find(".show");
	$displaySpan = $display.find("span");
    
    $frontend = $sliderDiv.find("#frontend");
    $backend = $sliderDiv.find("#backend");
	$exampleImg = $(".exampleImg");
	
	$modal = $("body").find("#myModal");
	$modalHeader = $modal.find(".modal-header")
	$modalContent = $modal.find(".modal-content");
	$modalBody = $modalContent.find(".modal-body");
	$modalFooter = $modalContent.find(".modal-footer");
	
//Variables
	slideSpeed = 500;
	screenWidth = 0;
	screenHeight = 0;
	bodyHeight = 0;
	currentPage = $portfolioBody;

//Size function
	var calculateSize = function() {
		
		//screenwidth
		screenWidth = $(window).width();
		screenHeight = $(window).height();
		bodyHeight = $(document).height();
		
		//body class
		if ($resumeBody.height() < $(window).height()) {
			setHeight = $(window).height() - ($resumeBody.height() - $resumeBody.find(".body").height());
			$resumeBody.find(".body").height(setHeight);
		}
		
		if ($aboutMeBody.height() < $(window).height()) {
			setHeight = $(window).height() - ($aboutMeBody.height() - $aboutMeBody.find(".body").height());
			$aboutMeBody.find(".body").height(setHeight);
		}
		
		
		//slideindicator
		$slideIndicator1.css("left","0px");
		$slideIndicator2.css("left","-" + $slideIndicator2.width() + "px");
		
		//height
		if ($frontend.height() > $backend.height()) {
            $backend.height($frontend.height());
        } else {
            $frontend.height($backend.height());
        };
		
		//exampleImg
		//$displaySpan.width() = $display.width();
		
		$exampleImg.each(function() {
			thisAspectRatio = $(this).width() / $(this).height();
		});
	};
	
//functions
	
	var slideRight = function() {
		if ($displayUl.css("margin-left") === "0px") {
			$displayUl.velocity({"margin-left": "-=" + screenWidth}, slideSpeed, function() {
			});
			$slideIndicator.velocity({"margin-left": "+=" + (screenWidth / 2) + "px"}, slideSpeed);
		};
	};

	var slideLeft = function() {
		if ($displayUl.css("margin-left") === -screenWidth + "px") {
			$displayUl.velocity({"margin-left": "+=" + screenWidth}, slideSpeed, function() {
			});
			$slideIndicator.velocity({"margin-left": "-=" + (screenWidth / 2) + "px"}, slideSpeed);
		};
	};

	var slideUp = function(newPage) {
		currentPage.velocity({"margin-top": "-=" + bodyHeight}, slideSpeed, function() {
			$sites.addClass("hidden");
			newPage.css("margin-top", bodyHeight);
			newPage.removeClass("hidden");
			newPage.animate({"margin-top": "-=" + bodyHeight}, slideSpeed, function() {
				currentPage = newPage;
			});
		});
	};
	
	$frontEndClick.click(function() {
		slideLeft();
	});
	$backEndClick.click(function() {
		slideRight();
	});
	
	calculateSize();
	
	$(".show").on("click", function() {
		if ($modal.hasClass("hidden")) {
			$modal.removeClass("hidden");
		};
		$modal.modal("toggle");
		$modalHeader.empty();
		$modalBody.empty();
		$modalFooter.empty();
		
		$(this).find(".modal-title").clone().appendTo($modalHeader);
		$(this).find(".modal-description").clone().appendTo($modalBody);
		$(this).find(".modal-link").clone().appendTo($modalBody);
		$modalBody.find(".modal-description").removeClass("hidden");
		$modalBody.find(".modal-link").removeClass("hidden");
		$(this).find("img").clone().appendTo($modalBody);
		$(this).find("ul").clone().appendTo($modalFooter);
	});
	
	$(".btn").on("click", function() {
		var $id = $(this).attr("value");
		if ($id === "portfolioBtn" && currentPage !== $portfolioBody) {
			slideUp($portfolioBody);
		} else if ($id === "resumeBtn" && currentPage !== $resumeBody) {
			slideUp($resumeBody);
		} else if ($id === "aboutMeBtn" && currentPage !== $aboutMeBody) {
			slideUp($aboutMeBody);
		};
	});
	
	$(window).resize(calculateSize).trigger("resize");
	
	$resumeBody.addClass("hidden");
	$aboutMeBody.addClass("hidden");
});