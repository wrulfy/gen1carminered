export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	bulbasaur: {
		inherit: true,
		baseStats: {hp: 45, atk: 47, def: 48, spa: 65, spd: 65, spe: 45},
	},
	ivysaur: {
		inherit: true,
		baseStats: {hp: 60, atk: 65, def: 65, spa: 80, spd: 80, spe: 60},
	},
	venusaur: {
		inherit: true,
		baseStats: {hp: 80, atk: 85, def: 85, spa: 110, spd: 110, spe: 80},
	},
	charmander: {
		inherit: true,
		baseStats: {hp: 40, atk: 50, def: 40, spa: 55, spd: 55, spe: 65},
	},
	charmeleon: {
		inherit: true,
		baseStats: {hp: 58, atk: 64, def: 58, spa: 70, spd: 70, spe: 80},
	},
	charizard: {
		inherit: true,
		baseStats: {hp: 78, atk: 84, def: 78, spa: 90, spd: 90, spe: 110},
		evoLevel: 32,
	},
	squirtle: {
		inherit: true,
		baseStats: {hp: 44, atk: 48, def: 65, spa: 50, spd: 50, spe: 43},
	},
	wartortle: {
		inherit: true,
		types: ["Water", "Rock"],
		baseStats: {hp: 59, atk: 63, def: 80, spa: 70, spd: 70, spe: 58},
	},
	blastoise: {
		inherit: true,
		types: ["Water", "Rock"],
		baseStats: {hp: 79, atk: 83, def: 110, spa: 90, spd: 90, spe: 78},
		evoLevel: 32,
	},
	caterpie: {
		inherit: true,
		baseStats: {hp: 45, atk: 30, def: 35, spa: 20, spd: 20, spe: 45},
	},
	metapod: {
		inherit: true,
		baseStats: {hp: 50, atk: 10, def: 120, spa: 60, spd: 60, spe: 15},
	},
	butterfree: {
		inherit: true,
		baseStats: {hp: 90, atk: 55, def: 60, spa: 90, spd: 90, spe: 70},
	},
	weedle: {
		inherit: true,
		baseStats: {hp: 40, atk: 35, def: 30, spa: 20, spd: 20, spe: 50},
	},
	kakuna: {
		inherit: true,
		baseStats: {hp: 45, atk: 15, def: 115, spa: 60, spd: 60, spe: 20},
	},
	beedrill: {
		inherit: true,
		baseStats: {hp: 70, atk: 90, def: 55, spa: 60, spd: 60, spe: 90},
	},
	pidgey: {
		inherit: true,
		baseStats: {hp: 40, atk: 45, def: 40, spa: 35, spd: 35, spe: 56},
	},
	pidgeotto: {
		inherit: true,
		baseStats: {hp: 63, atk: 60, def: 55, spa: 50, spd: 50, spe: 82},
	},
	pidgeot: {
		inherit: true,
		baseStats: {hp: 83, atk: 80, def: 75, spa: 70, spd: 70, spe: 111},
	},
	rattata: {
		inherit: true,
		baseStats: {hp: 30, atk: 56, def: 35, spa: 25, spd: 25, spe: 72},
	},
	raticate: {
		inherit: true,
		baseStats: {hp: 60, atk: 90, def: 60, spa: 60, spd: 60, spe: 105},
		evoLevel: 19,
	},
	spearow: {
		inherit: true,
		types: ["Flying"],
		baseStats: {hp: 40, atk: 65, def: 34, spa: 31, spd: 31, spe: 70},
	},
	fearow: {
		inherit: true,
		types: ["Flying"],
		baseStats: {hp: 69, atk: 95, def: 65, spa: 61, spd: 61, spe: 105},
		evoLevel: 22,
	},
	ekans: {
		inherit: true,
		baseStats: {hp: 35, atk: 70, def: 50, spa: 45, spd: 45, spe: 60},
	},
	arbok: {
		inherit: true,
		types: ["Poison", "Dragon"],
		baseStats: {hp: 60, atk: 105, def: 80, spa: 75, spd: 75, spe: 90},
		evoLevel: 24,
	},
	pikachu: {
		inherit: true,
		baseStats: {hp: 35, atk: 55, def: 40, spa: 55, spd: 55, spe: 90},
	},
	raichu: {
		inherit: true,
		baseStats: {hp: 60, atk: 90, def: 55, spa: 90, spd: 90, spe: 110},
	},
	sandshrew: {
		inherit: true,
		baseStats: {hp: 50, atk: 70, def: 80, spa: 25, spd: 25, spe: 35},
	},
	sandslash: {
		inherit: true,
		baseStats: {hp: 75, atk: 100, def: 115, spa: 55, spd: 55, spe: 65},
		evoLevel: 24,
	},
	nidoranf: {
		inherit: true,
		baseStats: {hp: 55, atk: 47, def: 52, spa: 40, spd: 40, spe: 41},
	},
	nidorina: {
		inherit: true,
		baseStats: {hp: 80, atk: 62, def: 67, spa: 55, spd: 55, spe: 56},
	},
	nidoqueen: {
		inherit: true,
		baseStats: {hp: 110, atk: 82, def: 87, spa: 90, spd: 90, spe: 76},
	},
	nidoranm: {
		inherit: true,
		baseStats: {hp: 46, atk: 57, def: 40, spa: 40, spd: 40, spe: 52},
	},
	nidorino: {
		inherit: true,
		baseStats: {hp: 61, atk: 82, def: 57, spa: 55, spd: 55, spe: 65},
	},
	nidoking: {
		inherit: true,
		baseStats: {hp: 81, atk: 112, def: 77, spa: 85, spd: 85, spe: 90},
	},
	clefairy: {
		inherit: true,
		types: ["Normal", "Flying"],
		baseStats: {hp: 80, atk: 45, def: 48, spa: 80, spd: 80, spe: 35},
	},
	clefable: {
		inherit: true,
		types: ["Ghost", "Flying"],
		baseStats: {hp: 110, atk: 85, def: 78, spa: 110, spd: 110, spe: 61},
	},
	vulpix: {
		inherit: true,
		baseStats: {hp: 38, atk: 41, def: 40, spa: 65, spd: 65, spe: 65},
	},
	ninetales: {
		inherit: true,
		types: ["Fire", "Ghost"],
		baseStats: {hp: 73, atk: 76, def: 75, spa: 100, spd: 100, spe: 109},
	},
	jigglypuff: {
		inherit: true,
		baseStats: {hp: 115, atk: 35, def: 40, spa: 45, spd: 45, spe: 20},
	},
	wigglytuff: {
		inherit: true,
		baseStats: {hp: 160, atk: 50, def: 55, spa: 70, spd: 70, spe: 45},
	},
	zubat: {
		inherit: true,
		baseStats: {hp: 30, atk: 45, def: 30, spa: 35, spd: 35, spe: 75},
	},
	golbat: {
		inherit: true,
		baseStats: {hp: 70, atk: 85, def: 70, spa: 75, spd: 75, spe: 115},
		evoLevel: 23,
	},
	oddish: {
		inherit: true,
		baseStats: {hp: 50, atk: 50, def: 65, spa: 75, spd: 75, spe: 30},
	},
	gloom: {
		inherit: true,
		baseStats: {hp: 65, atk: 65, def: 80, spa: 95, spd: 95, spe: 40},
	},
	vileplume: {
		inherit: true,
		baseStats: {hp: 80, atk: 80, def: 95, spa: 115, spd: 115, spe: 50},
	},
	paras: {
		inherit: true,
		baseStats: {hp: 45, atk: 80, def: 65, spa: 65, spd: 65, spe: 25},
	},
	parasect: {
		inherit: true,
		types: ["Bug", "Ground"],
		baseStats: {hp: 90, atk: 125, def: 110, spa: 110, spd: 110, spe: 30},
		evoLevel: 35,
	},
	venonat: {
		inherit: true,
		types: ["Bug", "Psychic"],
		baseStats: {hp: 60, atk: 55, def: 50, spa: 70, spd: 70, spe: 45},
	},
	venomoth: {
		inherit: true,
		types: ["Bug", "Psychic"],
		baseStats: {hp: 70, atk: 65, def: 60, spa: 115, spd: 115, spe: 90},
	},
	diglett: {
		inherit: true,
		baseStats: {hp: 10, atk: 55, def: 25, spa: 45, spd: 45, spe: 100},
	},
	dugtrio: {
		inherit: true,
		baseStats: {hp: 35, atk: 90, def: 50, spa: 70, spd: 70, spe: 145},
	},
	meowth: {
		inherit: true,
		baseStats: {hp: 40, atk: 50, def: 35, spa: 50, spd: 50, spe: 90},
	},
	persian: {
		inherit: true,
		types: ["Normal", "Ground"],
		baseStats: {hp: 70, atk: 75, def: 60, spa: 75, spd: 75, spe: 125},
	},
	psyduck: {
		inherit: true,
		baseStats: {hp: 50, atk: 52, def: 50, spa: 60, spd: 60, spe: 55},
	},
	golduck: {
		inherit: true,
		baseStats: {hp: 80, atk: 82, def: 80, spa: 90, spd: 90, spe: 85},
	},
	mankey: {
		inherit: true,
		baseStats: {hp: 40, atk: 85, def: 35, spa: 35, spd: 35, spe: 70},
	},
	primeape: {
		inherit: true,
		types: ["Fighting", "Ground"],
		baseStats: {hp: 70, atk: 110, def: 60, spa: 60, spd: 60, spe: 105},
	},
	growlithe: {
		inherit: true,
		baseStats: {hp: 55, atk: 70, def: 45, spa: 60, spd: 60, spe: 60},
	},
	arcanine: {
		inherit: true,
		types: ["Fire", "Dragon"],
		baseStats: {hp: 90, atk: 110, def: 80, spa: 100, spd: 100, spe: 95},
	},
	poliwag: {
		inherit: true,
		baseStats: {hp: 40, atk: 50, def: 40, spa: 40, spd: 40, spe: 90},
	},
	poliwhirl: {
		inherit: true,
		baseStats: {hp: 65, atk: 70, def: 65, spa: 60, spd: 60, spe: 90},
		evoLevel: 23,
	},
	poliwrath: {
		inherit: true,
		baseStats: {hp: 90, atk: 95, def: 95, spa: 80, spd: 80, spe: 70},
	},
	abra: {
		inherit: true,
		baseStats: {hp: 35, atk: 20, def: 15, spa: 100, spd: 100, spe: 90},
	},
	kadabra: {
		inherit: true,
		baseStats: {hp: 50, atk: 35, def: 30, spa: 120, spd: 120, spe: 105},
		evoLevel: 17,
},
	alakazam: {
		inherit: true,
		baseStats: {hp: 70, atk: 50, def: 45, spa: 140, spd: 140, spe: 120},
		evoLevel: 35,
	},
	machop: {
		inherit: true,
		baseStats: {hp: 50, atk: 100, def: 45, spa: 35, spd: 35, spe: 35},
	},
	machoke: {
		inherit: true,
		baseStats: {hp: 70, atk: 120, def: 60, spa: 50, spd: 50, spe: 45},
		evoLevel: 25,
	},
	machamp: {
		inherit: true,
		baseStats: {hp: 90, atk: 140, def: 80, spa: 65, spd: 65, spe: 55},
		evoLevel: 37,
	},
	bellsprout: {
		inherit: true,
		baseStats: {hp: 50, atk: 75, def: 35, spa: 70, spd: 70, spe: 40},
	},
	weepinbell: {
		inherit: true,
		baseStats: {hp: 65, atk: 90, def: 50, spa: 85, spd: 85, spe: 55},
	},
	victreebel: {
		inherit: true,
		baseStats: {hp: 80, atk: 105, def: 65, spa: 100, spd: 100, spe: 70},
	},
	tentacool: {
		inherit: true,
		baseStats: {hp: 40, atk: 40, def: 35, spa: 100, spd: 100, spe: 70},
	},
	tentacruel: {
		inherit: true,
		baseStats: {hp: 80, atk: 70, def: 65, spa: 120, spd: 120, spe: 100},
	},
	geodude: {
		inherit: true,
		types: ["Rock"],
		baseStats: {hp: 40, atk: 80, def: 100, spa: 45, spd: 45, spe: 10},
	},
	graveler: {
		inherit: true,
		types: ["Rock"],
		baseStats: {hp: 60, atk: 95, def: 120, spa: 60, spd: 60, spe: 20},
		evoLevel: 28,
	},
	golem: {
		inherit: true,
		types: ["Rock"],
		baseStats: {hp: 85, atk: 110, def: 140, spa: 75, spd: 75, spe: 30},
		evoLevel: 41,
	},
	ponyta: {
		inherit: true,
		baseStats: {hp: 45, atk: 80, def: 50, spa: 60, spd: 60, spe: 90},
	},
	rapidash: {
		inherit: true,
		baseStats: {hp: 65, atk: 100, def: 70, spa: 85, spd: 85, spe: 115},
	},
	slowpoke: {
		inherit: true,
		baseStats: {hp: 90, atk: 50, def: 65, spa: 55, spd: 55, spe: 15},
	},
	slowbro: {
		inherit: true,
		baseStats: {hp: 95, atk: 75, def: 120, spa: 90, spd: 90, spe: 30},
	},
	magnemite: {
		inherit: true,
		types: ["Electric", "Rock"],
		baseStats: {hp: 25, atk: 50, def: 70, spa: 95, spd: 95, spe: 45},
	},
	magneton: {
		inherit: true,
		types: ["Electric", "Rock"],
		baseStats: {hp: 50, atk: 70, def: 105, spa: 125, spd: 125, spe: 70},
	},
	farfetchd: {
		inherit: true,
		types: ["Ground", "Flying"],
		baseStats: {hp: 125, atk: 90, def: 60, spa: 60, spd: 60, spe: 80},
	},
	doduo: {
		inherit: true,
		baseStats: {hp: 35, atk: 90, def: 45, spa: 25, spd: 25, spe: 80},
	},
	dodrio: {
		inherit: true,
		baseStats: {hp: 60, atk: 120, def: 70, spa: 50, spd: 50, spe: 110},
	},
	seel: {
		inherit: true,
		types: ["Ice", "Normal"],
		baseStats: {hp: 65, atk: 50, def: 55, spa: 75, spd: 75, spe: 45},
	},
	dewgong: {
		inherit: true,
		types: ["Ice", "Normal"],
		baseStats: {hp: 95, atk: 75, def: 85, spa: 100, spd: 100, spe: 70},
	},
	grimer: {
		inherit: true,
		baseStats: {hp: 80, atk: 80, def: 50, spa: 65, spd: 65, spe: 20},
	},
	muk: {
		inherit: true,
		types: ["Poison", "Ghost"],
		baseStats: {hp: 120, atk: 105, def: 75, spa: 95, spd: 95, spe: 40},
	},
	shellder: {
		inherit: true,
		baseStats: {hp: 30, atk: 45, def: 100, spa: 65, spd: 65, spe: 40},
	},
	cloyster: {
		inherit: true,
		baseStats: {hp: 50, atk: 85, def: 180, spa: 95, spd: 95, spe: 70},
	},
	gastly: {
		inherit: true,
		types: ["Ghost"],
		baseStats: {hp: 30, atk: 30, def: 30, spa: 80, spd: 80, spe: 100},
	},
	haunter: {
		inherit: true,
		types: ["Ghost"],
		baseStats: {hp: 45, atk: 45, def: 45, spa: 95, spd: 95, spe: 120},
	},
	gengar: {
		inherit: true,
		types: ["Ghost"],
		baseStats: {hp: 60, atk: 65, def: 60, spa: 110, spd: 110, spe: 140},
		evoLevel: 39,
	},
	onix: {
		inherit: true,
		types: ["Rock", "Dragon"],
		baseStats: {hp: 60, atk: 70, def: 160, spa: 50, spd: 50, spe: 90},
	},
	drowzee: {
		inherit: true,
		types: ["Psychic", "Normal"],
		baseStats: {hp: 60, atk: 58, def: 45, spa: 90, spd: 90, spe: 42},
	},
	hypno: {
		inherit: true,
		types: ["Psychic", "Normal"],
		baseStats: {hp: 85, atk: 83, def: 70, spa: 115, spd: 115, spe: 67},
		evoLevel: 27,
	},
	krabby: {
		inherit: true,
		types: ["Water", "Bug"],
		baseStats: {hp: 30, atk: 105, def: 90, spa: 25, spd: 25, spe: 50},
	},
	kingler: {
		inherit: true,
		types: ["Water", "Bug"],
		baseStats: {hp: 55, atk: 130, def: 115, spa: 50, spd: 50, spe: 75},
		evoLevel: 29,
	},
	voltorb: {
		inherit: true,
		types: ["Electric", "Normal"],
		baseStats: {hp: 40, atk: 45, def: 35, spa: 60, spd: 60, spe: 105},
	},
	electrode: {
		inherit: true,
		types: ["Electric", "Normal"],
		baseStats: {hp: 60, atk: 70, def: 60, spa: 80, spd: 80, spe: 150},
	},
	exeggcute: {
		inherit: true,
		baseStats: {hp: 60, atk: 40, def: 80, spa: 60, spd: 60, spe: 40},
	},
	exeggutor: {
		inherit: true,
		baseStats: {hp: 100, atk: 100, def: 85, spa: 130, spd: 130, spe: 55},
	},
	cubone: {
		inherit: true,
		types: ["Ground", "Ice"],
		baseStats: {hp: 40, atk: 50, def: 90, spa: 50, spd: 50, spe: 25},
	},
	marowak: {
		inherit: true,
		types: ["Ground", "Ice"],
		baseStats: {hp: 60, atk: 80, def: 125, spa: 70, spd: 70, spe: 45},
		evoType: "useItem",
		evoItem: "Moon Stone",
	},
	hitmonlee: {
		inherit: true,
		baseStats: {hp: 50, atk: 110, def: 53, spa: 70, spd: 70, spe: 127},
	},
	hitmonchan: {
		inherit: true,
		baseStats: {hp: 50, atk: 75, def: 99, spa: 110, spd: 110, spe: 76},
	},
	lickitung: {
		inherit: true,
		types: ["Ghost", "Normal"],
		baseStats: {hp: 115, atk: 65, def: 85, spa: 85, spd: 85, spe: 35},
	},
	koffing: {
		inherit: true,
		baseStats: {hp: 40, atk: 65, def: 95, spa: 60, spd: 60, spe: 35},
	},
	weezing: {
		inherit: true,
		types: ["Poison", "Fire"],
		baseStats: {hp: 70, atk: 90, def: 130, spa: 85, spd: 85, spe: 60},
	},
	rhyhorn: {
		inherit: true,
		baseStats: {hp: 70, atk: 85, def: 65, spa: 30, spd: 30, spe: 65},
	},
	rhydon: {
		inherit: true,
		baseStats: {hp: 95, atk: 130, def: 90, spa: 45, spd: 45, spe: 80},
		evoLevel: 40,
	},
	chansey: {
		inherit: true,
		baseStats: {hp: 250, atk: 5, def: 5, spa: 105, spd: 105, spe: 50},
	},
	tangela: {
		inherit: true,
		baseStats: {hp: 70, atk: 55, def: 115, spa: 100, spd: 100, spe: 60},
	},
	kangaskhan: {
		inherit: true,
		types: ["Normal", "Fighting"],
		baseStats: {hp: 105, atk: 95, def: 90, spa: 40, spd: 40, spe: 90},
	},
	horsea: {
		inherit: true,
		types: ["Water", "Dragon"],
		baseStats: {hp: 30, atk: 60, def: 70, spa: 70, spd: 70, spe: 60},
	},
	seadra: {
		inherit: true,
		types: ["Water", "Dragon"],
		baseStats: {hp: 55, atk: 85, def: 95, spa: 100, spd: 100, spe: 85},
	},
	goldeen: {
		inherit: true,
		baseStats: {hp: 45, atk: 67, def: 37, spa: 50, spd: 50, spe: 41},
	},
	seaking: {
		inherit: true,
		baseStats: {hp: 80, atk: 102, def: 65, spa: 80, spd: 80, spe: 68},
		evoLevel: 22,
	},
	staryu: {
		inherit: true,
		types: ["Electric", "Ice"],
		baseStats: {hp: 30, atk: 45, def: 55, spa: 70, spd: 70, spe: 85},
	},
	starmie: {
		inherit: true,
		types: ["Electric", "Ice"],
		baseStats: {hp: 65, atk: 75, def: 85, spa: 105, spd: 105, spe: 125},
		evoItem: "Thunder Stone",
	},
	mrmime: {
		inherit: true,
		baseStats: {hp: 70, atk: 45, def: 85, spa: 110, spd: 110, spe: 90},
	},
	scyther: {
		inherit: true,
		baseStats: {hp: 70, atk: 110, def: 80, spa: 55, spd: 55, spe: 115},
	},
	jynx: {
		inherit: true,
		baseStats: {hp: 65, atk: 60, def: 40, spa: 135, spd: 135, spe: 100},
	},
	electabuzz: {
		inherit: true,
		baseStats: {hp: 65, atk: 90, def: 50, spa: 85, spd: 85, spe: 110},
	},
	magmar: {
		inherit: true,
		baseStats: {hp: 65, atk: 75, def: 60, spa: 110, spd: 110, spe: 90},
	},
	pinsir: {
		inherit: true,
		types: ["Bug", "Fighting"],
		baseStats: {hp: 65, atk: 125, def: 100, spa: 55, spd: 55, spe: 85},
	},
	tauros: {
		inherit: true,
		baseStats: {hp: 75, atk: 110, def: 95, spa: 60, spd: 60, spe: 120},
	},
	magikarp: {
		inherit: true,
		baseStats: {hp: 20, atk: 25, def: 55, spa: 5, spd: 5, spe: 80},
	},
	gyarados: {
		inherit: true,
		baseStats: {hp: 95, atk: 120, def: 79, spa: 95, spd: 95, spe: 81},
	},
	lapras: {
		inherit: true,
		types: ["Dragon", "Ice"],
		baseStats: {hp: 140, atk: 85, def: 80, spa: 95, spd: 95, spe: 60},
	},
	ditto: {
		inherit: true,
		baseStats: {hp: 74, atk: 74, def: 74, spa: 74, spd: 74, spe: 74},
	},
	eevee: {
		inherit: true,
		baseStats: {hp: 55, atk: 55, def: 50, spa: 65, spd: 65, spe: 55},
	},
	vaporeon: {
		inherit: true,
		baseStats: {hp: 130, atk: 60, def: 80, spa: 110, spd: 110, spe: 65},
	},
	jolteon: {
		inherit: true,
		baseStats: {hp: 65, atk: 80, def: 60, spa: 110, spd: 110, spe: 130},
	},
	flareon: {
		inherit: true,
		baseStats: {hp: 65, atk: 130, def: 60, spa: 110, spd: 110, spe: 80},
	},
	porygon: {
		inherit: true,
		types: ["Psychic", "Electric"],
		baseStats: {hp: 80, atk: 70, def: 85, spa: 100, spd: 100, spe: 55},
	},
	omanyte: {
		inherit: true,
		baseStats: {hp: 35, atk: 40, def: 100, spa: 90, spd: 90, spe: 35},
	},
	omastar: {
		inherit: true,
		baseStats: {hp: 70, atk: 65, def: 125, spa: 115, spd: 115, spe: 55},
	},
	kabuto: {
		inherit: true,
		types: ["Rock", "Grass"],
		baseStats: {hp: 30, atk: 80, def: 90, spa: 45, spd: 45, spe: 55},
	},
	kabutops: {
		inherit: true,
		types: ["Rock", "Grass"],
		baseStats: {hp: 60, atk: 115, def: 105, spa: 70, spd: 70, spe: 80},
	},
	aerodactyl: {
		inherit: true,
		baseStats: {hp: 80, atk: 105, def: 65, spa: 65, spd: 65, spe: 135},
	},
	snorlax: {
		inherit: true,
		baseStats: {hp: 180, atk: 110, def: 65, spa: 65, spd: 65, spe: 30},
	},
	articuno: {
		inherit: true,
		baseStats: {hp: 90, atk: 85, def: 100, spa: 125, spd: 125, spe: 85},
	},
	zapdos: {
		inherit: true,
		baseStats: {hp: 90, atk: 90, def: 85, spa: 125, spd: 125, spe: 100},
	},
	moltres: {
		inherit: true,
		baseStats: {hp: 90, atk: 100, def: 90, spa: 125, spd: 125, spe: 90},
	},
	dratini: {
		inherit: true,
		baseStats: {hp: 41, atk: 64, def: 45, spa: 50, spd: 50, spe: 50},
	},
	dragonair: {
		inherit: true,
		baseStats: {hp: 61, atk: 84, def: 65, spa: 70, spd: 70, spe: 70},
		evoLevel: 28,
	},
	dragonite: {
		inherit: true,
		baseStats: {hp: 90, atk: 135, def: 95, spa: 100, spd: 100, spe: 80},
		evoLevel: 52,
	},
	mewtwo: {
		inherit: true,
		baseStats: {hp: 106, atk: 110, def: 90, spa: 154, spd: 154, spe: 130},
	},
	mew: {
		inherit: true,
		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
	},
};
