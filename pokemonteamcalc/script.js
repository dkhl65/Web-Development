$(document).ready(() => {
	const SE = 1; // super effective
	const ND = 0; // normal damage
	const NV = -1; // not very effective
	const IM = -2; // immune
	const types = [
		"normal", "fire", "water", "grass", "electric", "ice", 
		"fighting", "poison", "ground", "flying", "psychic", "bug", 
		"rock", "ghost", "dragon", "dark", "steel", "fairy"
	];
	const effectiveness = [
	//   NOR FIR WTR GRS ELC ICE FTN PSN GND FLY PSY BUG ROC GOS DRA DRK STL FAR
		[ND, ND, ND, ND, ND, ND, ND, ND, ND, ND, ND, ND, NV, IM, ND, ND, NV, ND], // normal
		[ND, NV, NV, SE, ND, SE, ND, ND, ND, ND, ND, SE, NV, ND, NV, ND, SE, ND], // fire
		[ND, SE, NV, NV, ND, ND, ND, ND, SE, ND, ND, ND, SE, ND, NV, ND, ND, ND], // water
		[ND, NV, SE, NV, ND, ND, ND, NV, SE, NV, ND, NV, SE, ND, NV, ND, NV, ND], // grass
		[ND, ND, SE, NV, NV, ND, ND, ND, IM, SE, ND, ND, ND, ND, NV, ND, ND, ND], // electric
		[ND, NV, NV, SE, ND, NV, ND, ND, SE, SE, ND, ND, ND, ND, SE, ND, NV, ND], // ice
		[SE, ND, ND, ND, ND, SE, ND, NV, ND, NV, NV, NV, SE, IM, ND, SE, SE, NV], // fighting
		[ND, ND, ND, SE, ND, ND, ND, NV, NV, ND, ND, ND, NV, NV, ND, ND, IM, SE], // poison
		[ND, SE, ND, NV, SE, ND, ND, SE, ND, IM, ND, NV, SE, ND, ND, ND, SE, ND], // ground
		[ND, ND, ND, SE, NV, ND, SE, ND, ND, ND, ND, SE, NV, ND, ND, ND, NV, ND], // flying
		[ND, ND, ND, ND, ND, ND, SE, SE, ND, ND, NV, ND, ND, ND, ND, IM, NV, ND], // psychic
		[ND, NV, ND, SE, ND, ND, NV, NV, ND, NV, SE, ND, ND, NV, ND, SE, NV, NV], // bug
		[ND, SE, ND, ND, ND, SE, NV, ND, NV, SE, ND, SE, ND, ND, ND, ND, NV, ND], // rock
		[IM, ND, ND, ND, ND, ND, ND, ND, ND, ND, SE, ND, ND, SE, ND, NV, ND, ND], // ghost
		[ND, ND, ND, ND, ND, ND, ND, ND, ND, ND, ND, ND, ND, ND, SE, ND, NV, IM], // dragon
		[ND, ND, ND, ND, ND, ND, NV, ND, ND, ND, SE, ND, ND, SE, ND, NV, ND, NV], // dark
		[ND, NV, NV, ND, NV, SE, ND, ND, ND, ND, ND, ND, SE, ND, ND, ND, NV, SE], // steel
		[ND, NV, ND, ND, ND, ND, SE, NV, ND, ND, ND, ND, ND, ND, SE, SE, NV, ND], // fairy
		[ND, NV, SE, SE, ND, NV, ND, ND, SE, SE, ND, ND, ND, ND, SE, ND, NV, ND], // freeze-dry
		[ND, SE, ND, NV, SE, ND, ND, SE, ND, ND, ND, NV, SE, ND, ND, ND, SE, ND] // thousand arrows
	];
	const abilities = ["Lightning Rod", "Motor Drive", "Volt Absorb", "Storm Drain", "Water Absorb", "Dry Skin",
	"Fluffy", "Flash Fire", "Heatproof", "Water Bubble", "Thick Fat", "Levitate", "Sap Sipper", "Wonder Guard"];
	
	// set up the type select menus
	for(let i = 0; i < types.length; i++) {
		$(".type-select, .attack-select").append(`<option value="${i}">${types[i][0].toUpperCase() + types[i].substring(1)}</option>`);
		if(i > 0 && i % 6 === 0) {
			$(".type-chart").append("<br>");
		}
		$(".type-chart").append(`<span><img src="icons/${types[i]}.png"></img><label class="icon-label"></label></span>`);
	}
	$(".attack-select").append('<option value="18">Freeze-Dry</option>');
	$(".attack-select").append('<option value="19">Thousand Arrows</option>');
	
	// set up the ability menu
	for(let i = 0; i < abilities.length; i++) {
		$(".ability-select").append(`<option value="${i}">${abilities[i]}</option>`);
	}
	
	// make six copies of pokemon rows
	for(let i = 1; i <= 5; i++) {
		let row = $(".pokemon-row:last");
		let newRow = row.clone();
		row.after(newRow);
	}
	
	// update type counts when a setting is changed
	$("select").change(() => {
		$(".pokemon-row").each((i, row) => {
			if($(row).find(".ignore-checkbox").prop("checked")) {
				return;
			}
		});
	});
});
