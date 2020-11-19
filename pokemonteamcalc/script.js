const SE = 2; // super effective
const ND = 1; // normal damage
const NV = 0.5; // not very effective
const IM = 0; // immune
const TYPES = [
	"normal", "fire", "water", "grass", "electric", "ice", 
	"fighting", "poison", "ground", "flying", "psychic", "bug", 
	"rock", "ghost", "dragon", "dark", "steel", "fairy"
];
const MATCHUPS = [
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
const ABILITIES = ["Lightning Rod", "Motor Drive", "Volt Absorb", "Storm Drain", "Water Absorb", "Dry Skin",
"Fluffy", "Flash Fire", "Heatproof", "Water Bubble", "Thick Fat", "Levitate", "Sap Sipper", "Wonder Guard",
"Scrappy", "Tinted Lens"];

function getIneffectiveCoverage(attacks) {
	if(attacks.length < 1) {
		return [];
	}
	
	let ineffective = [];
	for(let type1 = 0; type1 < TYPES.length; type1++) {
		//check effectiveness against a single type
		let effective = false;
		for(let i = 0; i < attacks.length; i++) {
			if(MATCHUPS[attacks[i]][type1] >= 1) {
				effective = true;
				break;
			}
		}
		if(!effective && ineffective.indexOf(`${type1}`) < 0) {
			for(let i = 0; i < ineffective.length; i++) {
				if(ineffective[i].indexOf(`${type1}`) >= 0) {
					ineffective.splice(i, 1);
					i--;
				}
			}
			ineffective.push(`${type1}`);
			continue;
		}
		
		// effectiveness for type combos
		for(let type2 = 0; type2 < TYPES.length; type2++) {
			effective = false;
			if(type1 === type2 || ineffective.indexOf(`${type2}-${type1}`) > -1 || ineffective.indexOf(`${type2}`) > -1) {
				continue;
			}
			for(let i = 0; i < attacks.length; i++) {
				if(MATCHUPS[attacks[i]][type1] * MATCHUPS[attacks[i]][type2] >= 1) {
					effective = true;
					break;
				}
			}
			if(!effective) {
				ineffective.push(`${type1}-${type2}`);
			}
		}
	}
	
	return ineffective.slice();
}

$(document).ready(() => {
	// set up the type select menus
	for(let i = 0; i < TYPES.length; i++) {
		$(".type-select, .attack-select").append(`<option value="${i}">${TYPES[i][0].toUpperCase() + TYPES[i].substring(1)}</option>`);
		if(i > 0 && i % 6 === 0) {
			$(".type-chart").append("<br>");
		}
		$(".type-chart").append(`<span><img class="matchup-img" src="icons/${TYPES[i]}.png"></img><label class="icon-label"></label></span>`);
	}
	$(".attack-select").append('<option value="18">Freeze-Dry</option>');
	$(".attack-select").append('<option value="19">Thousand Arrows</option>');
	
	// set up the ability menu
	for(let i = 0; i < ABILITIES.length; i++) {
		$(".ability-select").append(`<option value="${i}">${ABILITIES[i]}</option>`);
	}
	
	// make six copies of pokemon rows
	for(let i = 1; i <= 5; i++) {
		let row = $(".pokemon-row:last");
		let newRow = row.clone();
		row.after(newRow);
	}
	
	// update matchups when a setting is changed
	$(".type-column").change(() => {
		// reset totals
		let weaknesses = [];
		let resistances = [];
		let immunities = [];
		for(let i = 0; i < TYPES.length; i++) {
			weaknesses.push(0);
			resistances.push(0);
			immunities.push(0);
		}
		$("#total-row").find(".matchup-img").css("opacity", "0.1");
		$("#total-row").find(".icon-label").html("");
		
		$(".pokemon-row").each((a, row) => {
			// refresh the row
			$(row).find(".matchup-img").css("opacity", "0.1");
			$(row).find(".icon-label").html("");
			
			// calculate weaknesses and resistances (matchups)
			let type = [];
			$(row).find(".type-select").each((b, obj) => {
				let value = parseInt($(obj).val());
				if(value >= 0 && type.indexOf(value) < 0) {
					type.push(value);
				}
			});
			let ability = parseInt($(row).find(".ability-select").val());
			for(let i = 0; i < TYPES.length; i++) {
				let matchup = 1;
				let weakness = 0;
				let immunity = 0;
				let resistance = 0;
				
				// ability effects
				if((ability >= 0 && ability <= 2 && i === TYPES.indexOf("electric")) ||
				(ability >= 3 && ability <= 5 && i === TYPES.indexOf("water")) ||
				(ability === ABILITIES.indexOf("Flash Fire") && i === TYPES.indexOf("fire")) ||
				(ability === ABILITIES.indexOf("Levitate") && i === TYPES.indexOf("ground")) ||
				(ability === ABILITIES.indexOf("Sap Sipper") && i === TYPES.indexOf("grass"))) {
					$(row).find(".resistances-column").find(".matchup-img").eq(i).css("opacity", "1");
					$(row).find(".resistances-column").find(".icon-label").eq(i).html("Im");
					immunity = 1;
					immunities[i] += immunity;
					continue;
				}
				if(ability === ABILITIES.indexOf("Dry Skin") && i === TYPES.indexOf("fire")) {
					matchup *= 1.25;
				}
				if(ability === ABILITIES.indexOf("Fluffy") && i === TYPES.indexOf("fire")) {
					matchup *= 2;
				}
				if(ability >= 8 && ability <= 10 && i === TYPES.indexOf("fire")) {
					matchup *= 0.5;
				}
				if(ability === ABILITIES.indexOf("Thick Fat") && i === TYPES.indexOf("ice")) {
					matchup *= 0.5;
				}
				
				// label the row and count the total
				for(let j = 0; j < type.length; j++) {
					matchup *= MATCHUPS[i][type[j]];
				}
				if(matchup > 1) {
					$(row).find(".weaknesses-column").find(".matchup-img").eq(i).css("opacity", "1");
					weakness = 1;
				}
				if(matchup > 2) {
					$(row).find(".weaknesses-column").find(".icon-label").eq(i).html("2");
					weakness = 2;
				}
				if(matchup < 1 || (matchup <= 1 && ability === ABILITIES.indexOf("Wonder Guard"))) {
					$(row).find(".resistances-column").find(".matchup-img").eq(i).css("opacity", "1");
				}
				if(matchup === 0 || (matchup <= 1 && ability === ABILITIES.indexOf("Wonder Guard"))) {
					$(row).find(".resistances-column").find(".icon-label").eq(i).html("Im");
					immunity = 1;
				} else if(matchup > 0 && matchup <= 0.25) {
					$(row).find(".resistances-column").find(".icon-label").eq(i).html("2");
					resistance = 2;
				} else if(matchup > 0 && matchup < 1) {
					resistance = 1;
				}
				if(!$(row).find(".ignore-checkbox").prop("checked")) {
					weaknesses[i] += weakness;
					resistances[i] += resistance;
					immunities[i] += immunity;
				}
			}
			
			// display the total matchup
			for(let i = 0; i < weaknesses.length; i++) {
				if(weaknesses[i] > 0) {
					$("#total-row").find(".weaknesses-column").find(".matchup-img").eq(i).css("opacity", "1");
					$("#total-row").find(".weaknesses-column").find(".icon-label").eq(i).html(weaknesses[i]);
				}
				if(immunities[i] > 0) {
					$("#total-row").find(".resistances-column").find(".matchup-img").eq(i).css("opacity", "1");
					$("#total-row").find(".resistances-column").find(".icon-label").eq(i).html(`${resistances[i]}+${immunities[i]}`);
				} else if(resistances[i] > 0) {
					$("#total-row").find(".resistances-column").find(".matchup-img").eq(i).css("opacity", "1");
					$("#total-row").find(".resistances-column").find(".icon-label").eq(i).html(resistances[i]);
				}
			}
		});
	});
	
	$(".attack-column, .ignore-checkbox").change(() => {
		$(".coverage-column").empty();
		let allAttacks = [];
		
		$(".pokemon-row").each((a, row) => {
			let attacks = [];
			$(row).find(".attack-select").each((b, obj) => {
				let attack = parseInt($(obj).val());
				if(attack >= 0) {
					if(attacks.indexOf(attack) < 0) {
						attacks.push(attack);
					}
					if(allAttacks.indexOf(attack) < 0 && !$(row).find(".ignore-checkbox").prop("checked")) {
						allAttacks.push(attack);
					}
				}
			});		
			
			let ineffective = getIneffectiveCoverage(attacks);
			for(let i = 0; i < ineffective.length; i++) {
				let types = ineffective[i].split('-');
				if(types.length > 1) {
					$(row).find(".coverage-column").append(`<label>${TYPES[types[0]]}-${TYPES[types[1]]}</label>, `);
				} else {
					$(row).find(".coverage-column").append(`<label>${TYPES[types[0]]}</label>, `);
				}
			}
		});
		
		// show the common uncovered types
		let totalIneffective = getIneffectiveCoverage(allAttacks);
		for(let i = 0; i < totalIneffective.length; i++) {
			let types = totalIneffective[i].split('-');
			if(types.length > 1) {
				$("#total-row").find(".coverage-column").append(`<label>${TYPES[types[0]]}-${TYPES[types[1]]}</label>, `);
			} else {
				$("#total-row").find(".coverage-column").append(`<label>${TYPES[types[0]]}</label>, `);
			}
		}
	});
	
	// reset button
	$(".reset-button").click((ev) => {
		$(ev.target).parents(".pokemon-row").find(".matchup-img").css("opacity", "0.1");
		$(ev.target).parents(".pokemon-row").find(".icon-label").html("");
		$(ev.target).parents(".pokemon-row").find("select").val("-1");
		$("td").trigger("change");
	});
	$("#reset-all-button").click(() => {
		$(".matchup-img").css("opacity", "0.1");
		$(".icon-label").html("");
		$("table").find("select").val("-1");
		$("td").trigger("change");
	});
});
