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

	$sliderDiv = $portfolioBody.find(".slider");
	$displayUl = $sliderDiv.find("ul");
	$displayLi = $displayUl.find("li");
	$display = $displayLi.find(".display")

//Variables
	slideSpeed = 500;
	screenWidth = $(window).width() * 2;
	screenHeight = $(window).height();
	currentPage = $portfolioBody;

//functions
	
	var slideRight = function() {
		if ($displayUl.css("margin-left") === "0px") {
			$displayUl.animate({"margin-left": "-=" + screenWidth}, slideSpeed, function() {
				console.log("sliding right");
			});
		};
	};

	var slideLeft = function() {
		if ($displayUl.css("margin-left") === -screenWidth + "px") {
			$displayUl.animate({"margin-left": "+=" + screenWidth}, slideSpeed, function() {
				console.log("sliding left");
			});
		};
	};

	var slideUp = function(newPage) {
		currentPage.animate({"margin-top": "-=" + screenHeight}, slideSpeed, function() {
			$sites.addClass("hidden");
			newPage.css("margin-top", screenHeight);
			newPage.removeClass("hidden");
			newPage.animate({"margin-top": "-=" + screenHeight}, slideSpeed, function() {
				currentPage = newPage;
			});
		});
	};

	console.log(screenWidth + "px");
	$frontEndClick.click(function() {
		slideLeft();
	});
	$backEndClick.click(function() {
		slideRight();
	});



	$(".btn").click(function() {
		var $id = $(this).attr("value");
		if ($id === "portfolioBtn" && currentPage !== $portfolioBody) {
			slideUp($portfolioBody);
		} else if ($id === "resumeBtn" && currentPage !== $resumeBody) {
			slideUp($resumeBody);
		} else if ($id === "aboutMeBtn" && currentPage !== $aboutMeBody) {
			slideUp($aboutMeBody);
		};
	});
}); 