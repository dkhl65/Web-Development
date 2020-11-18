
$(document).ready(() => {
	// set up the table rows
	let types = ["normal", "fire", "water", "grass", "electric", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"];
	for(let i = 0; i < types.length; i++) {
		$(".type-select, .move-select").append(`<option value="${i}">${types[i][0].toUpperCase() + types[i].substring(1)}</option>`);
		if(i > 0 && i % 6 === 0) {
			$(".type-chart").append("<br>");
		}
		$(".type-chart").append(`<img src="icons/${types[i]}.png"></img><label class="icon-label">&nbsp;</label>`);
	}
	$(".move-select").append('<option value="18">Freeze-Dry</option>');
	$(".move-select").append('<option value="19">Thousand Arrows</option>');
	for(let i = 1; i <= 5; i++) {
		let row = $(".pokemon-row:last");
		let newRow = row.clone();
		row.after(newRow);
	}
	
	$("select").change(() => {
		$(".pokemon-row").each((i, row) => {
			$(row).find(".coverage-column").children("img").eq(3).css("opacity", "1");
			$(row).find(".coverage-column").children(".icon-label").eq(3).text("SE");
		});
	});
});