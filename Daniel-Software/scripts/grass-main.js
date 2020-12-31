$(document).ready(() => {
	for(let i = 0; i < 50; i++) {
		for(let j = 0; j < 50; j++) {
			$("#editor-div").append('<img class="grass-img" src="images/grass/dark.png"></img>');
		}
		$("#editor-div").append("<br>");
	}
	
	let grassDeployed = 0;
	$(".grass-img").click((ev) => {
		if ($(ev.target).prop("src").indexOf("dark.png") >= 0 && grassDeployed < 50) {
			$(ev.target).prop("src", "images/grass/grass.png");
			grassDeployed++;
		} else if($(ev.target).prop("src").indexOf("grass.png") >= 0) {
			$(ev.target).prop("src", "images/grass/dark.png");
			grassDeployed--;
		}
		$("#remaining-grass-text").text(50 - grassDeployed);
	});
	$(".grass-img").on("mousedown", (ev) => {
		if(ev.which === 2) {
			return false;
		}
	});
	$(".grass-img").on("mousemove", (ev) => {
		if(ev.which === 2 && $(ev.target).prop("src").indexOf("dark.png") >= 0 && grassDeployed < 50) {
			$(ev.target).prop("src", "images/grass/grass.png");
			grassDeployed++;
		}
		$("#remaining-grass-text").text(50 - grassDeployed);
	});
	$("body").keypress((ev) => {
		if(ev.which === 32) {
			$(".grass-img").prop("src", "images/grass/dark.png");
			grassDeployed = 0;
			ev.preventDefault();
		}
		$("#remaining-grass-text").text(50 - grassDeployed);
	});
});
