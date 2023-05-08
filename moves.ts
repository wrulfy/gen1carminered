/**
 * A lot of Gen 1 moves have to be updated due to different mechanics.
 * Some moves have had major changes, such as Bite's typing.
 */

export const Moves: {[k: string]: ModdedMoveData} = {
	absorb: { //small buff to basic move
		inherit: true,
		desc: "The user recovers 1/2 the HP lost by the target, rounded down. If this move breaks the target's substitute, the user does not recover any HP.",
		basePower: 30,
		pp: 30,
	},
	acid: {
		inherit: true,
		desc: "Has a 33% chance to lower the target's Defense by 1 stage.",
		shortDesc: "33% chance to lower the target's Defense by 1.",
		secondary: {
			chance: 33,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
	},
	acidarmor: {
		inherit: true,
		pp: 20,
	},
	agility: {
		inherit: true,
		pp: 10,
		type: "Flying",
	},
	amnesia: {
		inherit: true,
		desc: "Raises the user's Special by 2 stages.",
		shortDesc: "Raises the user's Special by 2.",
		pp: 10,
		boosts: {
			spd: 2,
			spa: 2,
		},
	},
	aurorabeam: {
		inherit: true,
		desc: "Has a 33% chance to lower the target's Attack by 1 stage.",
		shortDesc: "33% chance to lower the target's Attack by 1.",
		secondary: {
			chance: 33,
			boosts: {
				atk: -1,
			},
		},
	},
	barrage: { // rock blast clone
		inherit: true,
		desc: "Hits two to five times. Has a 3/8 chance to hit two or three times, and a 1/8 chance to hit four or five times. Damage is calculated once for the first hit and used for every hit. If one of the hits breaks the target's substitute, the move ends.",
		accuracy: 95,
		basePower: 25,
		type: "Rock",
	},
	barrier: {
		inherit: true,
		pp: 15,
	},
	bide: {
		inherit: true,
		desc: "The user spends two or three turns locked into this move and then, on the second or third turn after using this move, the user attacks the opponent, inflicting double the damage in HP it lost during those turns. This move ignores type immunity and cannot be avoided even if the target is using Dig or Fly. The user can choose to switch out during the effect. If the user switches out or is prevented from moving during this move's use, the effect ends. During the effect, if the opposing Pokemon switches out or uses Confuse Ray, Conversion, Focus Energy, Glare, Haze, Leech Seed, Light Screen, Mimic, Mist, Poison Gas, Poison Powder, Recover, Reflect, Rest, Soft-Boiled, Splash, Stun Spore, Substitute, Supersonic, Teleport, Thunder Wave, Toxic, or Transform, the previous damage dealt to the user will be added to the total.",
		priority: 0,
		accuracy: true,
		ignoreEvasion: true,
		pp: 20,
		condition: {
			duration: 2,
			durationCallback(target, source, effect) {
				return this.random(3, 4);
			},
			onStart(pokemon) {
				this.effectData.totalDamage = 0;
				this.effectData.lastDamage = 0;
				this.add('-start', pokemon, 'Bide');
			},
			onHit(target, source, move) {
				if (source && source !== target && move.category !== 'Physical' && move.category !== 'Special') {
					const damage = this.effectData.totalDamage;
					this.effectData.totalDamage += damage;
					this.effectData.lastDamage = damage;
					this.effectData.sourcePosition = source.position;
					this.effectData.sourceSide = source.side;
				}
			},
			onDamage(damage, target, source, move) {
				if (!source || source.side === target.side) return;
				if (!move || move.effectType !== 'Move') return;
				if (!damage && this.effectData.lastDamage > 0) {
					damage = this.effectData.totalDamage;
				}
				this.effectData.totalDamage += damage;
				this.effectData.lastDamage = damage;
				this.effectData.sourcePosition = source.position;
				this.effectData.sourceSide = source.side;
			},
			onAfterSetStatus(status, pokemon) {
				// Sleep, freeze, and partial trap will just pause duration.
				if (pokemon.volatiles['flinch']) {
					this.effectData.duration++;
				} else if (pokemon.volatiles['partiallytrapped']) {
					this.effectData.duration++;
				} else {
					switch (status.id) {
					case 'slp':
					case 'frz':
						this.effectData.duration++;
						break;
					}
				}
			},
			onBeforeMove(pokemon, t, move) {
				if (this.effectData.duration === 1) {
					if (!this.effectData.totalDamage) {
						this.debug("Bide failed due to 0 damage taken");
						this.add('-fail', pokemon);
						return false;
					}
					this.add('-end', pokemon, 'Bide');
					const target = this.effectData.sourceSide.active[this.effectData.sourcePosition];
					this.moveHit(target, pokemon, move, {damage: this.effectData.totalDamage * 2} as ActiveMove);
					return false;
				}
				this.add('-activate', pokemon, 'Bide');
				return false;
			},
			onDisableMove(pokemon) {
				if (!pokemon.hasMove('bide')) {
					return;
				}
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id !== 'bide') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
		type: "Rock", // needs testing, it should display as rock type but be no different from regular bide, if doing so changes its behavior, it goes back to ???
	},
	bind: { // grass type clamp
		inherit: true,
		desc: "The user spends two to five turns using this move. Has a 3/8 chance to last two or three turns, and a 1/8 chance to last four or five turns. The damage calculated for the first turn is used for every other turn. The user cannot select a move and the target cannot execute a move during the effect, but both may switch out. If the user switches out, the target remains unable to execute a move during that turn. If the target switches out, the user uses this move again automatically, and if it had 0 PP at the time, it becomes 63. If the user or the target switch out, or the user is prevented from moving, the effect ends. This move can prevent the target from moving even if it has type immunity, but will not deal damage.",
		shortDesc: "Prevents the target from moving for 2-5 turns.",
		accuracy: 75,
		basePower: 35,
		category: "Special",
		ignoreImmunity: true,
		volatileStatus: 'partiallytrapped',
		self: {
			volatileStatus: 'partialtrappinglock',
		},
		// FIXME: onBeforeMove(pokemon, target) {target.removeVolatile('mustrecharge')}
		onHit(target, source) {
			/**
			 * The duration of the partially trapped must be always renewed to 2
			 * so target doesn't move on trapper switch out as happens in gen 1.
			 * However, this won't happen if there's no switch and the trapper is
			 * about to end its partial trapping.
			 **/
			if (target.volatiles['partiallytrapped']) {
				if (source.volatiles['partialtrappinglock'] && source.volatiles['partialtrappinglock'].duration > 1) {
					target.volatiles['partiallytrapped'].duration = 2;
				}
			}
		},
		type: "Grass",	
	},
	bite: {
		inherit: true,
		desc: "Has a 10% chance to flinch the target.",
		shortDesc: "10% chance to flinch the target.",
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		type: "Normal",
	},
	blizzard: {
		inherit: true,
		accuracy: 85,
		target: "normal",
	},
	bodyslam: {
		inherit: true,
	},
	boneclub: {
		inherit: true,
		accuracy: 100,
	},	
	bonemerang: {
		inherit: true,
		desc: "Hits twice. If the first hit breaks the target's substitute, the move ends.",
		accuracy: 95,
	},
	bubble: {
		inherit: true,
		desc: "Has a 33% chance to lower the target's Speed by 1 stage.",
		shortDesc: "33% chance to lower the target's Speed by 1.",
		pp: 40,
		secondary: {
			chance: 33,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
	},
	bubblebeam: {
		inherit: true,
		desc: "Has a 33% chance to lower the target's Speed by 1 stage.",
		shortDesc: "33% chance to lower the target's Speed by 1.",
		secondary: {
			chance: 33,
			boosts: {
				spe: -1,
			},
		},
	},
	clamp: {
		inherit: true,
		desc: "The user spends two to five turns using this move. Has a 3/8 chance to last two or three turns, and a 1/8 chance to last four or five turns. The damage calculated for the first turn is used for every other turn. The user cannot select a move and the target cannot execute a move during the effect, but both may switch out. If the user switches out, the target remains unable to execute a move during that turn. If the target switches out, the user uses this move again automatically, and if it had 0 PP at the time, it becomes 63. If the user or the target switch out, or the user is prevented from moving, the effect ends. This move can prevent the target from moving even if it has type immunity, but will not deal damage.",
		shortDesc: "Prevents the target from moving for 2-5 turns.",
		accuracy: 75,
		basePower: 35,
		pp: 10,
		volatileStatus: 'partiallytrapped',
		self: {
			volatileStatus: 'partialtrappinglock',
		},
		// FIXME: onBeforeMove(pokemon, target) {target.removeVolatile('mustrecharge')}
		onHit(target, source) {
			/**
			 * The duration of the partially trapped must be always renewed to 2
			 * so target doesn't move on trapper switch out as happens in gen 1.
			 * However, this won't happen if there's no switch and the trapper is
			 * about to end its partial trapping.
			 **/
			if (target.volatiles['partiallytrapped']) {
				if (source.volatiles['partialtrappinglock'] && source.volatiles['partialtrappinglock'].duration > 1) {
					target.volatiles['partiallytrapped'].duration = 2;
				}
			}
		},
	},
	cometpunch: { // in line with the other multi hit moves, arm thurst but better
		inherit: true,
		desc: "Hits two to five times. Has a 3/8 chance to hit two or three times, and a 1/8 chance to hit four or five times. Damage is calculated once for the first hit and used for every hit. If one of the hits breaks the target's substitute, the move ends.",
		accuracy: 95,
		basePower: 25,
		pp: 20,
		type: "Fighting",	
	},
	confuseray: { // shadow ball but on the surf tier
		inherit: true,
		desc: "Has a 10% chance to confuse the target.",
		shortDesc: "10% chance to confuse the target.",
		accuracy: 100,
		basePower: 95,
		category: "Special",
		name: "Confuse Ray",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: null, // I have no idea if this works, I just need to disable this effect
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
	},
	confusion: {
		inherit: true,
		basePower: 40,
		pp: 30,		
	},
	constrict: { // standard strong bug move, on par with x-scissor/bug buzz
		inherit: true,
		desc: "Has a 33% chance to lower the target's Speed by 1 stage.",
		shortDesc: "33% chance to lower the target's Speed by 1.",
		basePower: 90,
		pp: 15,
		
		secondary: {
			chance: 33,
			boosts: {
				spe: -1,
			},
		},
		type: "Bug",
	},
	conversion: {
		inherit: true,
		desc: "Causes the user's types to become the same as the current types of the target.",
		shortDesc: "User becomes the same type as the target.",
		volatileStatus: 'conversion',
		accuracy: true,
		target: "normal",
		onHit(target, source) {
			source.types = target.types;
			this.add('-start', source, 'typechange', source.types.join(', '), '[from] move: Conversion', '[of] ' + source);
		},
	},
	counter: {
		inherit: true,
		desc: "Deals damage to the opposing Pokemon equal to twice the damage dealt by the last move used in the battle. This move ignores type immunity. Fails if the user moves first, or if the opposing side's last move was Counter, had 0 power, or was not Normal or Fighting type. Fails if the last move used by either side did 0 damage and was not Confuse Ray, Conversion, Focus Energy, Glare, Haze, Leech Seed, Light Screen, Mimic, Mist, Poison Gas, Poison Powder, Recover, Reflect, Rest, Soft-Boiled, Splash, Stun Spore, Substitute, Supersonic, Teleport, Thunder Wave, Toxic, or Transform.",
		ignoreImmunity: true,
		willCrit: false,
		damageCallback(pokemon, target) {
			// Counter mechanics in gen 1:
			// - a move is Counterable if it is Normal or Fighting type, has nonzero Base Power, and is not Counter
			// - if Counter is used by the player, it will succeed if the opponent's last used move is Counterable
			// - if Counter is used by the opponent, it will succeed if the player's last selected move is Counterable
			// - (Counter will thus desync if the target's last used move is not as counterable as the target's last selected move)
			// - if Counter succeeds it will deal twice the last move damage dealt in battle (even if it's from a different pokemon because of a switch)
			const lastMove = target.side.lastMove && this.dex.getMove(target.side.lastMove.id);
			const lastMoveIsCounterable = lastMove && lastMove.basePower > 0 &&
				['Normal', 'Fighting'].includes(lastMove.type) && lastMove.id !== 'counter';

			const lastSelectedMove = target.side.lastSelectedMove && this.dex.getMove(target.side.lastSelectedMove);
			const lastSelectedMoveIsCounterable = lastSelectedMove && lastSelectedMove.basePower > 0 &&
				['Normal', 'Fighting'].includes(lastSelectedMove.type) && lastSelectedMove.id !== 'counter';

			if (!lastMoveIsCounterable && !lastSelectedMoveIsCounterable) {
				this.debug("Gen 1 Counter: last move was not Counterable");
				this.add('-fail', pokemon);
				return false;
			}
			if (this.lastDamage <= 0) {
				this.debug("Gen 1 Counter: no previous damage exists");
				this.add('-fail', pokemon);
				return false;
			}
			if (!lastMoveIsCounterable || !lastSelectedMoveIsCounterable) {
				this.hint("Desync Clause Mod activated!");
				this.add('-fail', pokemon);
				return false;
			}

			return 2 * this.lastDamage;
		},
	},
	crabhammer: {
		inherit: true,
		accuracy: 90,
		critRatio: 2,
	},
	cut: { //grass type because is plant related
		inherit: true,
		accuracy: 100,
		basePower: 55,
		category: "Special",
		pp: 25,
		type: "Grass",
	},
	defensecurl: {
		inherit: true,
		desc: "Raises the user's Defense by 1 stage.",
		pp: 25,
	},
	dig: { // low power like in gen 2-3 but more PP because is a normal gameplay move
		inherit: true,
		desc: "This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Bide, Swift, and Transform. If the user is fully paralyzed on the second turn, it continues avoiding attacks until it switches out or successfully executes the second turn of this move or Fly.",
		basePower: 60,
		pp: 20,
		condition: {
			duration: 2,
			onLockMove: 'dig',
			onInvulnerability(target, source, move) {
				if (move.id === 'swift') return true;
				this.add('-message', 'The foe ' + target.name + ' can\'t be hit underground!');
				return false;
			},
			onDamage(damage, target, source, move) {
				if (!move || move.effectType !== 'Move') return;
				if (!source) return;
				if (move.id === 'earthquake') {
					this.add('-message', 'The foe ' + target.name + ' can\'t be hit underground!');
					return null;
				}
			},
		},
	},
	disable: { // usable accuracy but not perfect
		inherit: true,
		desc: "For 0 to 7 turns, one of the target's known moves that has at least 1 PP remaining becomes disabled, at random. Fails if one of the target's moves is already disabled, or if none of the target's moves have PP remaining. If any Pokemon uses Haze, this effect ends. Whether or not this move was successful, it counts as a hit for the purposes of the opponent's use of Rage.",
		shortDesc: "For 0-7 turns, disables one of the target's moves.",
		accuracy: 90,
		condition: {
			duration: 4,
			durationCallback(target, source, effect) {
				const duration = this.random(1, 7);
				return duration;
			},
			onStart(pokemon) {
				if (!this.queue.willMove(pokemon)) {
					this.effectData.duration++;
				}
				const moves = pokemon.moves;
				const move = this.dex.getMove(this.sample(moves));
				this.add('-start', pokemon, 'Disable', move.name);
				this.effectData.move = move.id;
				return;
			},
			onResidualOrder: 14,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Disable');
			},
			onBeforeMove(attacker, defender, move) {
				if (move.id === this.effectData.move) {
					this.add('cant', attacker, 'Disable', move);
					return false;
				}
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id === this.effectData.move) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
	},
	dizzypunch: { // drain punch clone but a bit stronger because is the stronger drain move
		inherit: true,
		desc: "The user recovers 1/2 the HP lost by the target, rounded down. If this move breaks the target's substitute, the user does not recover any HP.",
		shortDesc: "User recovers 50% of the damage dealt.",
		basePower: 90,
		pp: 5,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		type: "Fighting",
	},
	doubleedge: {
		inherit: true,
		desc: "If the target lost HP, the user takes recoil damage equal to 1/4 the HP lost by the target, rounded down, but not less than 1 HP. If this move breaks the target's substitute, the user does not take any recoil damage.",
		basePower: 110,
		pp: 10,
	},
	doublekick: {
		inherit: true,
		desc: "Hits twice. Damage is calculated once for the first hit and used for both hits. If the first hit breaks the target's substitute, the move ends.",
		pp: 25,
	},
	doubleteam: {
		inherit: true,
		pp: 10,
	},
	doubleslap: { // actual usable early in gameplay with more PP and accuracy
		inherit: true,
		desc: "Hits two to five times. Has a 3/8 chance to hit two or three times, and a 1/8 chance to hit four or five times. Damage is calculated once for the first hit and used for every hit. If one of the hits breaks the target's substitute, the move ends.",
		accuracy: 100,
		basePower: 20,
		pp: 25,
	},
	dragonrage: { //standard strong dragon move, like a mix of dragon pulse + outrage
		inherit: true,
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		damage: null,
		basePower: 100,
		category: "Physical",


	},

	dreameater: {//regular draining move, does not require sleep, totally not a thpp ripoff
		inherit: true,
		desc: "The target is unaffected by this move unless it is asleep. The user recovers 1/2 the HP lost by the target, rounded down, but not less than 1 HP. If this move breaks the target's substitute, the user does not recover any HP.",
		basePower: 70,
		category: "Special",
		onTryImmunity(target) {}, //hope doing this overrides tring to test for sleep
		type: "Ghost",
	},
	drillpeck: {
		inherit: true,
		basePower: 90,
		pp: 15,
	},
	earthquake: {
		inherit: true,
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
	},
	eggbomb: { // Standand strong rock move, nicknamed "Geode Bomb"
		inherit: true,
		accuracy: 100,
		basePower: 95,
		type: "Rock",
	},
	ember: {
		inherit: true,
		pp: 30,
	},
	explosion: { // a bit stronger but not as strong as gen2+
		inherit: true,
		desc: "The user faints after using this move, unless this move broke the target's substitute. The target's Defense is halved during damage calculation.",
		basePower: 200,
		target: "normal",
	},
	fireblast: { //since it goes back to 10% burn, and stays at 120/85, this should just work
		inherit: true,
	},
	firespin: {// on line with clamp
		inherit: true,
		desc: "The user spends two to five turns using this move. Has a 3/8 chance to last two or three turns, and a 1/8 chance to last four or five turns. The damage calculated for the first turn is used for every other turn. The user cannot select a move and the target cannot execute a move during the effect, but both may switch out. If the user switches out, the target remains unable to execute a move during that turn. If the target switches out, the user uses this move again automatically, and if it had 0 PP at the time, it becomes 63. If the user or the target switch out, or the user is prevented from moving, the effect ends. This move can prevent the target from moving even if it has type immunity, but will not deal damage.",
		shortDesc: "Prevents the target from moving for 2-5 turns.",
		accuracy: 75,
		basePower: 35,
		pp: 10,
		volatileStatus: 'partiallytrapped',
		self: {
			volatileStatus: 'partialtrappinglock',
		},
		// FIXME: onBeforeMove(pokemon, target) {target.removeVolatile('mustrecharge')}
		onHit(target, source) {
			/**
			 * The duration of the partially trapped must be always renewed to 2
			 * so target doesn't move on trapper switch out as happens in gen 1.
			 * However, this won't happen if there's no switch and the trapper is
			 * about to end its partial trapping.
			 **/
			if (target.volatiles['partiallytrapped']) {
				if (source.volatiles['partialtrappinglock'] && source.volatiles['partialtrappinglock'].duration > 1) {
					target.volatiles['partiallytrapped'].duration = 2;
				}
			}
		},
	},
	fissure: {// strong move with recoil instead of OHKO
		inherit: true,
		desc: "If the target lost HP, the user takes recoil damage equal to 1/4 the HP lost by the target, rounded down, but not less than 1 HP. If this move breaks the target's substitute, the user does not take any recoil damage.",
		shortDesc: "Has 1/4 recoil.",
		accuracy: 90,
		basePower: 130,
		ohko: false,
		recoil: [25, 100],	
	},
	flamethrower: { 
		inherit: true,
	},
	flash: { 
		inherit: true,
		accuracy: 85,
	},
	fly: {
		inherit: true,
		desc: "This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Bide, Swift, and Transform. If the user is fully paralyzed on the second turn, it continues avoiding attacks until it switches out or successfully executes the second turn of this move or Dig.",
		accuracy: 100,
		basePower: 85,
		condition: {
			duration: 2,
			onLockMove: 'fly',
			onInvulnerability(target, source, move) {
				if (move.id === 'swift') return true;
				this.add('-message', 'The foe ' + target.name + ' can\'t be hit while flying!');
				return false;
			},
			onDamage(damage, target, source, move) {
				if (!move || move.effectType !== 'Move') return;
				if (!source || source.side === target.side) return;
				if (move.id === 'gust' || move.id === 'thunder') {
					this.add('-message', 'The foe ' + target.name + ' can\'t be hit while flying!');
					return null;
				}
			},
		},
	},
	focusenergy: { // now just a +1 speed
		inherit: true,
		desc: "While the user remains active, its chance for a critical hit is quartered. Fails if the user already has the effect. If any Pokemon uses Haze, this effect ends.",
		shortDesc: "Quarters the user's chance for a critical hit.",
		pp: 20,
		volatileStatus: null,
		condition: {},
		boosts: {
			spe: 1,
		},
	},
	furyattack: { // multihit peck
		inherit: true,
		desc: "Hits two to five times. Has a 3/8 chance to hit two or three times, and a 1/8 chance to hit four or five times. Damage is calculated once for the first hit and used for every hit. If one of the hits breaks the target's substitute, the move ends.",
		accuracy: 95,
		basePower: 25,
		type: "Flying",
	},
	furyswipes: { // multihit ground move
		inherit: true,
		desc: "Hits two to five times. Has a 3/8 chance to hit two or three times, and a 1/8 chance to hit four or five times. Damage is calculated once for the first hit and used for every hit. If one of the hits breaks the target's substitute, the move ends.",
		accuracy: 95,
		basePower: 25,
		type: "Ground",
	},
	glare: {
		inherit: true,
		desc: "Paralyzes the target.",
		accuracy: 100,
		pp: 15,
		ignoreImmunity: true,
	},
	growl: { 
		inherit: true,
	},
	growth: {
		inherit: true,
		desc: "Raises the user's Special by 1 stage.",
		shortDesc: "Raises the user's Special by 1.",
		pp: 20,
		boosts: {
			spa: 1,
			spd: 1,
		},
	},
	guillotine: {// strong move with recoil instead of OHKO
		inherit: true,
		desc: "If the target lost HP, the user takes recoil damage equal to 1/4 the HP lost by the target, rounded down, but not less than 1 HP. If this move breaks the target's substitute, the user does not take any recoil damage.",
		shortDesc: "Has 1/4 recoil.",
		accuracy: 90,
		basePower: 130,
		ohko: false,
		recoil: [25, 100],
		type: "Bug",
	},
	gust: {// basic dragon move, like twister
		inherit: true,
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		category: "Physical",
		pp: 30,
		type: "Dragon",
	},
	harden: { 
		inherit: true,
		type: "Rock",
	},
	haze: {// haze itself goes unused as I couldn't replicate a clear smog in the hack, so it just uses an unused effect that lowers evasion
		inherit: true,
		desc: "Has a 33% chance to lower the target's Evasion by 1 stage.",
		shortDesc: "33% chance to lower the target's Evasion by 1.",
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		pp: 25,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		onHitField() {},
		secondary: {
			chance: 33,
			boosts: {
				evasion: -1,
			},
		},
		target: "normal",
		type: "Poison",
	},
	headbutt: { 
		inherit: true,
	},
	highjumpkick: {//maybe in the future I'll make crash moves work in the hack, until then it remains as recoil move
		inherit: true,
		desc: "If the target lost HP, the user takes recoil damage equal to 1/4 the HP lost by the target, rounded down, but not less than 1 HP. If this move breaks the target's substitute, the user does not take any recoil damage.",
		shortDesc: "Has 1/4 recoil.",
		name: "Hi-Jump Kick",
		onMoveFail(target, source, move) {},
		basePower: 120,
		hasCrashDamage: false,
		pp: 10,
		recoil: [25, 100],
	},
	hornattack: { 
		inherit: true,
	},
	horndrill: {//the one ohko move that's not changed
		inherit: true,
		desc: "Deals 65535 damage to the target. Fails if the target's Speed is greater than the user's.",
		shortDesc: "Deals 65535 damage. Fails if target is faster.",
	},
	hydropump: { 
		inherit: true,
		accuracy: 85,	
	},
	hyperbeam: {
		inherit: true,
		desc: "If this move is successful, the user must recharge on the following turn and cannot select a move, unless the target or its substitute was knocked out by this move.",
		shortDesc: "Can't move next turn if target or sub is not KOed.",
	},
	hyperfang: {
		inherit: true,
		accuracy: 90,
		basePower: 100,
	},
	hypnosis: { 
		inherit: true,
		pp: 25,
	},
	icebeam: { 
		inherit: true,
	},
	icepunch: { //yes that's JP blizzard's 30% freeze chance effect
		inherit: true,
		secondary: {
			chance: 30,
			status: 'frz',
		},
	},
	jumpkick: { // aura sphere in kick form
		inherit: true,
		desc: "This move does not check accuracy and hits even if the target is using Dig, Fly, or Withdraw.",
		shortDesc: "Never misses, even against Dig, Fly, and Withdraw.",
		basePower: 90,
		pp: 10,
		hasCrashDamage: false,
		accuracy: true,
		onMoveFail(target, source, move) {},
	},
	karatechop: {
		inherit: true,
		accuracy: 95,
		pp: 20,
		critRatio: 2,
	},
	kinesis: { // now a special move instead of a status move
		inherit: true,
		desc: "Has a 33% chance to lower the target's accuracy by 1 stage.",
		shortDesc: "33% chance to lower the target's accuracy by 1.",
		accuracy: 100,
		basePower: 50,
		category: "Special",
		pp: 25,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 33,
			boosts: {
				accuracy: -1,
			},
		},
	},
	leechlife: {
		inherit: true,
		basePower: 60,
		pp: 20,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1},
	},
	leechseed: {
		inherit: true,
		desc: "At the end of each of the target's turns, The Pokemon at the user's position steals 1/16 of the target's maximum HP, rounded down and multiplied by the target's current Toxic counter if it has one, even if the target currently has less than that amount of HP remaining. If the target switches out or any Pokemon uses Haze, this effect ends. Grass-type Pokemon are immune to this move.",
		onHit() {},
		condition: {
			onStart(target) {
				this.add('-start', target, 'move: Leech Seed');
			},
			onAfterMoveSelfPriority: 1,
			onAfterMoveSelf(pokemon) {
				const leecher = pokemon.side.foe.active[pokemon.volatiles['leechseed'].sourcePosition];
				if (!leecher || leecher.fainted || leecher.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				// We check if leeched Pokémon has Toxic to increase leeched damage.
				let toxicCounter = 1;
				const residualdmg = pokemon.volatiles['residualdmg'];
				if (residualdmg) {
					residualdmg.counter++;
					toxicCounter = residualdmg.counter;
				}
				const toLeech = this.clampIntRange(Math.floor(pokemon.baseMaxhp / 16), 1) * toxicCounter;
				const damage = this.damage(toLeech, pokemon, leecher);
				if (residualdmg) this.hint("In Gen 1, Leech Seed's damage is affected by Toxic's counter.", true);
				if (!damage || toLeech > damage) {
					this.hint("In Gen 1, Leech Seed recovery is not limited by the remaining HP of the seeded Pokemon.", true);
				}
				this.heal(toLeech, leecher, pokemon);
			},
		},
	},
	leer: { // now lowers special instead of tail whip clone
		inherit: true,
		boosts: {
			spa: -1,
			spd: -1,
		},
	},
	lick: {// basic ghost move, now not as weak but paralyzes less
		inherit: true,
		basePower: 40,
		category: "Special",
		secondary: {
			chance: 10,
			status: 'par',
		},
	},
	lightscreen: {
		num: 113,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "While the user remains active, its Special is doubled when taking damage. Critical hits ignore this effect. If any Pokemon uses Haze, this effect ends.",
		shortDesc: "While active, user's Special is 2x when damaged.",
		name: "Light Screen",
		pp: 30,
		priority: 0,
		flags: {},
		volatileStatus: 'lightscreen',
		onTryHit(pokemon) {
			if (pokemon.volatiles['lightscreen']) {
				return false;
			}
		},
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Light Screen');
			},
		},
		target: "self",
		type: "Psychic",
	},
	lovelykiss: {
		inherit: true,
		accuracy: 90,
		type: "Ice",
	},
	lowkick: {
		inherit: true,
		accuracy: 100,
		basePower: 40,
		basePowerCallback() {
			return 40;
		},
		pp: 30,
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
	},
	meditate: {
		inherit: true,
		pp: 25,
		type: "Fighting",
	},
	megadrain: {
		inherit: true,
		basePower: 80,
	},
	megakick: {
		inherit: true,
		accuracy: 85,
		pp: 10,
	},
	megapunch: {
		inherit: true,
		accuracy: 90,
	},
	metronome: {
		inherit: true,
		desc: "A random move is selected for use, other than Metronome or Struggle.",
		noMetronome: ["Metronome", "Struggle"],
		pp: 40,
		secondary: null,
		target: "self",
		type: "Normal",
	},
	mimic: {
		inherit: true,
		desc: "While the user remains active, this move is replaced by a random move known by the target, even if the user already knows that move. The copied move keeps the remaining PP for this move, regardless of the copied move's maximum PP. Whenever one PP is used for a copied move, one PP is used for this move.",
		shortDesc: "Random move known by the target replaces this.",
		onHit(target, source) {
			const moveslot = source.moves.indexOf('mimic');
			if (moveslot < 0) return false;
			const moves = target.moves;
			const moveid = this.sample(moves);
			if (!moveid) return false;
			const move = this.dex.getMove(moveid);
			source.moveSlots[moveslot] = {
				move: move.name,
				id: move.id,
				pp: source.moveSlots[moveslot].pp,
				maxpp: move.pp * 8 / 5,
				target: move.target,
				disabled: false,
				used: false,
				virtual: true,
			};
			this.add('-start', source, 'Mimic', move.name);
		},
	},
	minimize: {
		inherit: true,
		desc: "Raises the user's evasiveness by 1 stage.",
		pp: 15,
	},
	mirrormove: {
		inherit: true,
		desc: "The user uses the last move used by the target. Fails if the target has not made a move, or if the last move used was Mirror Move.",
		onHit(pokemon) {
			const foe = pokemon.side.foe.active[0];
			if (!foe || !foe.lastMove || foe.lastMove.id === 'mirrormove') {
				return false;
			}
			this.useMove(foe.lastMove.id, pokemon);
		},
	},
	mist: { //mist effect goes unused and turns into a makeshift icy wind. Intended to make it a 100% to drop speed but didn't make the cut into the hack
		inherit: true,
		desc: "Has a 33% chance to lower the target's Speed by 1 stage.",
		shortDesc: "33% chance to lower the target's Speed by 1.",
		accuracy: 100,
		basePower: 50,
		pp: 25,
		category: "Special",
		flags: {protect: 1, mirror: 1, wind: 1},
		condition: {},
		sideCondition: null,
		volatileStatus: null,
		secondary: {
			chance: 33,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
	},
	nightshade: {//reworked into a strong ghost move. Nothing is really lost since seismic toss does the same
		inherit: true,
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		damage: null,
		pp: 5,
		accuracy: 100,
		category: "Special",
		ignoreImmunity: false,
		basePower: 120,
	},
	payday: {// dreams in technician
		inherit: true,
		basePower: 60,
	},
	peck: {
		inherit: true,
		basePower: 40,
		pp: 30,
	},
	petaldance: {//now is a regular move
		inherit: true,
		desc: "Has a 33% chance to lower the target's Evasion by 1 stage.",
		shortDesc: "33% chance to lower the target's Evasion by 1.",
		basePower: 65,
		pp: 20,
		self: {},
		onAfterMove(pokemon) {},
		onMoveFail() {},
		target: "normal",
		secondary: {
			chance: 33,
			boosts: {
				evasion: -1,
			},
		},
	},
	pinmissile: {
		inherit: true,
		desc: "Hits two to five times. Has a 3/8 chance to hit two or three times, and a 1/8 chance to hit four or five times. Damage is calculated once for the first hit and used for every hit. If one of the hits breaks the target's substitute, the move ends.",
		accuracy: 95,
		basePower: 25,
	},
	poisongas: {//now is just toxic
		inherit: true,
		desc: "Badly poisons the target.",
		shortDesc: "Badly poisons the target.",
		accuracy: 90,
		target: "normal",
		status: 'tox',
		pp: 10,
	},
	poisonsting: {
		inherit: true,
		desc: "Has a 20% chance to poison the target.",
		shortDesc: "20% chance to poison the target.",
		basePower: 20,
		pp: 40,
		secondary: {
			chance: 20,
			status: 'psn',
		},
	},
	poisonpowder: {
		inherit: true,
		accuracy: 100,
	},
	pound: {
		inherit: true,
	},
	psybeam: {
		inherit: true,
	},
	psychic: {
		inherit: true,
		desc: "Has a 33% chance to lower the target's Special by 1 stage.",
		shortDesc: "33% chance to lower the target's Special by 1.",
		secondary: {
			chance: 33,
			boosts: {
				spd: -1,
				spa: -1,
			},
		},
	},
	psywave: {
		inherit: true,
		basePower: 120,
		accuracy: 85,
		damageCallback(pokemon) {},
		pp: 5,
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
	},
	quickattack: {
		inherit: true,
	},
	rage: {
		inherit: true,
		desc: "Once this move is successfully used, the user automatically uses this move every turn and can no longer switch out. During the effect, the user's Attack is raised by 1 stage every time it is hit by the opposing Pokemon, and this move's accuracy is overwritten every turn with the current calculated accuracy including stat stage changes, but not to less than 1/256 or more than 255/256.",
		shortDesc: "Lasts forever. Raises user's Attack by 1 when hit.",
		basePower: 30,
		self: {
			volatileStatus: 'rage',
		},
		condition: {
			// Rage lock
			duration: 255,
			onStart(target, source, effect) {
				this.effectData.move = 'rage';
			},
			onLockMove: 'rage',
			onTryHit(target, source, move) {
				if (target.boosts.atk < 6 && move.id === 'disable') {
					this.boost({atk: 1});
				}
			},
			onHit(target, source, move) {
				if (target.boosts.atk < 6 && move.category !== 'Status') {
					this.boost({atk: 1});
				}
			},
		},
	},
	razorleaf: {
		inherit: true,
		critRatio: 2,
		basePower: 50,
		pp: 20,
		target: "normal",
	},
	razorwind: {//now an actual move, basically a stronger aerial ace
		inherit: true,
		desc: "This move does not check accuracy and hits even if the target is using Dig, Fly, or Withdraw.",
		shortDesc: "Never misses, even against Dig, Fly, and Withdraw.",
		accuracy: true,
		basePower: 75,
		pp: 15,
		critRatio: 1,
		flags: {protect: 1, mirror: 1, distance: 1, slicing: 1, wind:1},
		onTryMove(attacker, defender, move) {},
		target: "any",
		type: "Flying",
	},
	recover: {
		inherit: true,
		desc: "The user restores 1/2 of its maximum HP, rounded down. Fails if (user's maximum HP - user's current HP + 1) is divisible by 256.",
		heal: null,
		pp: 15,
		onHit(target) {
			// Fail when health is 255 or 511 less than max
			if (target.hp === (target.maxhp - 255) || target.hp === (target.maxhp - 511) || target.hp === target.maxhp) {
				this.hint("In Gen 1, recovery moves fail if (user's maximum HP - user's current HP + 1) is divisible by 256.");
				return false;
			}
			this.heal(Math.floor(target.maxhp / 2), target, target);
		},
	},
	reflect: {
		num: 115,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "While the user remains active, its Defense is doubled when taking damage. Critical hits ignore this protection. This effect can be removed by Haze.",
		shortDesc: "While active, the user's Defense is doubled.",
		name: "Reflect",
		pp: 20,
		priority: 0,
		flags: {},
		volatileStatus: 'reflect',
		onTryHit(pokemon) {
			if (pokemon.volatiles['reflect']) {
				return false;
			}
		},
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Reflect');
			},
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},
	rest: {
		inherit: true,
		desc: "The user falls asleep for the next two turns and restores all of its HP, curing itself of any major status condition in the process. This does not remove the user's stat penalty for burn or paralysis. Fails if the user has full HP.",
		onTryMove() {},
		onHit(target, source, move) {
			if (target.hp === target.maxhp) return false;
			// Fail when health is 255 or 511 less than max
			if (target.hp === (target.maxhp - 255) || target.hp === (target.maxhp - 511)) {
				this.hint("In Gen 1, recovery moves fail if (user's maximum HP - user's current HP + 1) is divisible by 256.");
				return false;
			}
			if (!target.setStatus('slp', source, move)) return false;
			target.statusData.time = 2;
			target.statusData.startTime = 2;
			this.heal(target.maxhp); // Aesthetic only as the healing happens after you fall asleep in-game
		},
	},
	roar: {// now works like screech
		inherit: true,
		desc: "Lowers the target's Defense by 2 stages.",
		shortDesc: "Lowers the target's Defense by 2.",
		accuracy: 85,
		forceSwitch: false,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1, allyanim: 1},
		type: "Dragon",
		onTryHit() {},
		boosts: {
			def: -2,
		},
		priority: 0,
	},
	rockslide: {// now a very strong rock move, on the fireblast line.
		inherit: true,
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		accuracy: 85,
		basePower: 120,
		secondary: null,
		target: "normal",
	},
	rockthrow: {// now a basic rock move that actually hits
		inherit: true,
		accuracy: 100,
		basePower: 40,
		pp: 30,

	},
	rollingkick: {
		inherit: true,
		accuracy: 100,
		basePower: 65,
		pp: 20,
	},
	sandattack: {//now a cross between bubble and mud slap as a basic weak attack
		inherit: true,
		desc: "Has a 33% chance to lower the target's accuracy by 1 stage.",
		shortDesc: "33% chance to lower the target's accuracy by 1.",
		basePower: 20,
		category: "Physical",
		flags: {protect: 1, mirror: 1},
		pp: 40,
		boosts: {},
		secondary: {
			chance: 33,
			boosts: {
				accuracy: -1,
			},
		},
	},
	scratch: { 
		inherit: true,
	},
	screech: {//now a regular ghost attack
		inherit: true,
		desc: "Has a 33% chance to lower the target's Special by 1 stage.",
		shortDesc: "33% chance to lower the target's Special by 1.",
		accuracy: 100,
		basePower: 65,
		category: "Special",
		pp: 20,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1,},
		boosts: {},
		secondary: {
			chance: 33,
			boosts: {
				spd: -1,
				spa: -1,
			},
		},
		type: "Ghost",
	},
	seismictoss: {
		inherit: true,
		desc: "Deals damage to the target equal to the user's level. This move ignores type immunity.",
		shortDesc: "Damage = user's level. Can hit Ghost types.",
		ignoreImmunity: true,
		basePower: 1,
	},
	selfdestruct: {
		inherit: true,
		desc: "The user faints after using this move, unless the target's substitute was broken by the damage. The target's Defense is halved during damage calculation.",
		basePower: 140,
		target: "normal",
	},
	sharpen: {
		inherit: true,
		pp: 20,
	},
	sing: {
		inherit: true,
		accuracy: 80,
	},
	skullbash: {
		inherit: true,
		desc: "This attack charges on the first turn and executes on the second.",
		shortDesc: "Charges turn 1. Hits turn 2.",
		basePower: 150,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	skyattack: { //single turn attack now
		inherit: true,
		desc: "Has a 10% chance to flinch the target.",
		shortDesc: "10% chance to flinch the target.",
		accuracy: 85,
		basePower: 120,
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		onTryMove(attacker, defender, move) {},
	},
	slam: { // regular dragon move now
		inherit: true,
		category: "Physical",
		accuracy: 90,
		type: "Dragon",
	},
	slash: {
		inherit: true,
		accuracy: 95,
		pp: 15,
		critRatio: 2,
	},
	sleeppowder: {
		inherit: true,
		accuracy: 70,
		pp: 20,
	},
	sludge: {// now basically sludge bomb
		inherit: true,
		desc: "Has a 40% chance to poison the target.",
		shortDesc: "40% chance to poison the target.",
		basePower: 90,
		pp: 15,
		secondary: {
			chance: 40,
			status: 'psn',
		},
	},
	smog: {// now a regular poison move instead of a joke of a move
		inherit: true,
		accuracy: 100,
		basePower: 65,
	},
	smokescreen: {// now a fire attack instead of status
		inherit: true,
		desc: "Has a 20% chance to poison the target.",
		shortDesc: "20% chance to poison the target.",
		basePower: 65,
		category: "Special",
		flags: {protect: 1, mirror: 1},
		boosts: {},
		secondary: {
			chance: 20,
			status: 'psn',
		},
		type: "Fire",
	},
	softboiled: { // now more "egg lay" than ever, learned by birds, ducks, eggy, and the pink blobs that already could get it
		inherit: true,
		desc: "The user restores 1/2 of its maximum HP, rounded down. Fails if (user's maximum HP - user's current HP + 1) is divisible by 256.",
		heal: null,
		onHit(target) {
			// Fail when health is 255 or 511 less than max
			if (target.hp === (target.maxhp - 255) || target.hp === (target.maxhp - 511) || target.hp === target.maxhp) {
				this.hint("In Gen 1, recovery moves fail if (user's maximum HP - user's current HP + 1) is divisible by 256.");
				return false;
			}
			this.heal(Math.floor(target.maxhp / 2), target, target);
		},
		type: "Flying",
	},
	solarbeam: { // now a single turn move in line with fire blast
		inherit: true,
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		accuracy: 85,
		pp: 5,
		onTryMove(attacker, defender, move) {},
	},
	sonicboom: {//now a regular electric move, Shockwave's cousin.
		inherit: true,
		desc: "Has a 33% chance to lower the target's Special by 1 stage.",
		shortDesc: "33% chance to lower the target's Special by 1.",
		accuracy: 100,
		basePower: 65,
		damage: null,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1,},
		type: "Electric",
		category: "Special",
	},
	spikecannon: {//icicle spear clone
		inherit: true,
		desc: "Hits two to five times. Has a 3/8 chance to hit two or three times, and a 1/8 chance to hit four or five times. Damage is calculated once for the first hit and used for every hit. If one of the hits breaks the target's substitute, the move ends.",
		accuracy: 95,
		basePower: 25,
		category: "Special",
		pp: 20,
		type: "Ice",
	},
	splash: {// what if gyarados had actual flying stab?
		inherit: true,
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		accuracy: 100,
		basePower: 100,
		pp: 10,
		category: "Physical",
		onTryHit(target, source) {},
		target: "any",
		type: "Flying",
	},
	spore: {
		inherit: true,
		pp: 10,
		type: "Bug",
	},
	stomp: {
		inherit: true,
		desc: "Has a 30% chance to flinch the target.",
	},
	strength: {// now rock type because I say so
		inherit: true,
		basePower: 70,
		pp: 20,
		type: "Rock",
	},
	stringshot: {//now a weak attack in line with bubble
		inherit: true,
		desc: "Has a 33% chance to lower the target's Speed by 1 stage.",
		shortDesc: "33% chance to lower the target's Speed by 1.",
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		boosts: {},
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 33,
			boosts: {
				spe: -1,
			},
			target: "normal",
	},
	struggle: {//made bird type so is true neutral
		inherit: true,
		desc: "Deals Normal-type damage. If this move was successful, the user takes damage equal to 1/2 the HP lost by the target, rounded down, but not less than 1 HP. This move is automatically used if none of the user's known moves can be selected.",
		shortDesc: "User loses 1/2 the HP lost by the target.",
		pp: 10,
		recoil: [1, 2],
		onModifyMove() {},
		type: "Bird",
	},
	stunspore: {
		inherit: true,
		accuracy: 90,
		pp: 20,
		desc: "Paralyzes the target.",
	},
	submission: {//no longer garbage
		inherit: true,
		desc: "If the target lost HP, the user takes recoil damage equal to 1/4 the HP lost by the target, rounded down, but not less than 1 HP. If this move breaks the target's substitute, the user does not take any recoil damage.",
		accuracy: 100,
		pp: 25,
	},
	substitute: {
		num: 164,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user takes 1/4 of its maximum HP, rounded down, and puts it into a substitute to take its place in battle. The substitute has 1 HP plus the HP used to create it, and is removed once enough damage is inflicted on it or 255 damage is inflicted at once, or if the user switches out or faints. Until the substitute is broken, it receives damage from all attacks made by the opposing Pokemon and shields the user from status effects and stat stage changes caused by the opponent, unless the effect is Disable, Leech Seed, sleep, primary paralysis, or secondary confusion and the user's substitute did not break. The user still takes normal damage from status effects while behind its substitute, unless the effect is confusion damage, which is applied to the opposing Pokemon's substitute instead. If the substitute breaks during a multi-hit attack, the attack ends. Fails if the user does not have enough HP remaining to create a substitute, or if it already has a substitute. The user will create a substitute and then faint if its current HP is exactly 1/4 of its maximum HP.",
		shortDesc: "User takes 1/4 its max HP to put in a Substitute.",
		name: "Substitute",
		pp: 10,
		priority: 0,
		volatileStatus: 'substitute',
		onTryHit(target) {
			if (target.volatiles['substitute']) {
				this.add('-fail', target, 'move: Substitute');
				return null;
			}
			// We only prevent when hp is less than one quarter.
			// If you use substitute at exactly one quarter, you faint.
			if (target.hp === target.maxhp / 4) target.faint();
			if (target.hp < target.maxhp / 4) {
				this.add('-fail', target, 'move: Substitute', '[weak]');
				return null;
			}
		},
		onHit(target) {
			// If max HP is 3 or less substitute makes no damage
			if (target.maxhp > 3) {
				this.directDamage(target.maxhp / 4, target, target);
			}
		},
		condition: {
			onStart(target) {
				this.add('-start', target, 'Substitute');
				this.effectData.hp = Math.floor(target.maxhp / 4) + 1;
				delete target.volatiles['partiallytrapped'];
			},
			onTryHitPriority: -1,
			onTryHit(target, source, move) {
				if (move.category === 'Status') {
					// In gen 1 it only blocks:
					// poison, confusion, secondary effect confusion, stat reducing moves and Leech Seed.
					const SubBlocked = ['lockon', 'meanlook', 'mindreader', 'nightmare'];
					if (
						move.status === 'psn' || move.status === 'tox' || (move.boosts && target !== source) ||
						move.volatileStatus === 'confusion' || SubBlocked.includes(move.id)
					) {
						return false;
					}
					return;
				}
				if (move.volatileStatus && target === source) return;
				// NOTE: In future generations the damage is capped to the remaining HP of the
				// Substitute, here we deliberately use the uncapped damage when tracking lastDamage etc.
				// Also, multi-hit moves must always deal the same damage as the first hit for any subsequent hits
				let uncappedDamage = move.hit > 1 ? source.lastDamage : this.getDamage(source, target, move);
				if (!uncappedDamage) return null;
				uncappedDamage = this.runEvent('SubDamage', target, source, move, uncappedDamage);
				if (!uncappedDamage) return uncappedDamage;
				source.lastDamage = uncappedDamage;
				target.volatiles['substitute'].hp -= uncappedDamage > target.volatiles['substitute'].hp ?
					target.volatiles['substitute'].hp : uncappedDamage;
				if (target.volatiles['substitute'].hp <= 0) {
					target.removeVolatile('substitute');
					target.subFainted = true;
				} else {
					this.add('-activate', target, 'Substitute', '[damage]');
				}
				// Drain/recoil does not happen if the substitute breaks
				if (target.volatiles['substitute']) {
					if (move.recoil) {
						this.damage(Math.round(uncappedDamage * move.recoil[0] / move.recoil[1]), source, target, 'recoil');
					}
					if (move.drain) {
						this.heal(Math.ceil(uncappedDamage * move.drain[0] / move.drain[1]), source, target, 'drain');
					}
				}
				this.runEvent('AfterSubDamage', target, source, move, uncappedDamage);
				// Add here counter damage
				const lastAttackedBy = target.getLastAttackedBy();
				if (!lastAttackedBy) {
					target.attackedBy.push({source: source, move: move.id, damage: uncappedDamage, thisTurn: true});
				} else {
					lastAttackedBy.move = move.id;
					lastAttackedBy.damage = uncappedDamage;
				}
				return 0;
			},
			onEnd(target) {
				this.add('-end', target, 'Substitute');
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
		flags: {},
	},
	superfang: {
		inherit: true,
		desc: "Deals damage to the target equal to half of its current HP, rounded down, but not less than 1 HP. This move ignores type immunity.",
		shortDesc: "Damage = 1/2 target's current HP. Hits Ghosts.",
		ignoreImmunity: true,
		accuracy: 100,
		basePower: 1,
	},
	supersonic: { // better accuracy in relation with confuseray no longer confuseray
		inherit: true,
		accuracy: 80,
	},
	surf: {
		inherit: true,
	},
	swift: {
		inherit: true,
		desc: "This move does not check accuracy and hits even if the target is using Dig, Fly, or Withdraw.",
		shortDesc: "Never misses, even against Dig, Fly, and Withdraw.",
	},
	swordsdance: {
		inherit: true,
		pp: 10,
	},
	tackle: {
		inherit: true,
		accuracy: 100,
		basePower: 40,
	},
	tailwhip: {
		inherit: true,
		pp: 35,
	},
	takedown: {
		inherit: true,
		desc: "If the target lost HP, the user takes recoil damage equal to 1/4 the HP lost by the target, rounded down, but not less than 1 HP. If this move breaks the target's substitute, the user does not take any recoil damage.",
		accuracy: 100,
		pp: 15,
	},
	teleport: {
		inherit: true,
	},
	thrash: {
		inherit: true,
		desc: "Whether or not this move is successful, the user spends three or four turns locked into this move and becomes confused immediately after its move on the last turn of the effect, even if it is already confused. If the user is prevented from moving, the effect ends without causing confusion. During the effect, this move's accuracy is overwritten every turn with the current calculated accuracy including stat stage changes, but not to less than 1/256 or more than 255/256.",
		shortDesc: "Lasts 3-4 turns. Confuses the user afterwards.",
		onMoveFail() {},
		basePower: 95,
	},
	thunder: {
		inherit: true,
		desc: "Has a 10% chance to paralyze the target.",
		shortDesc: "10% chance to paralyze the target.",
		accuracy: 85,
		pp: 5,
		secondary: {
			chance: 10,
			status: 'par',
		},
	},
	thunderbolt: {
		inherit: true,
	},
	thunderpunch: {
		inherit: true,
		desc: "Has a 30% chance to paralyze the target.",
		shortDesc: "30% chance to paralyze the target.",
		secondary: {
			chance: 30,
			status: 'par',
		},
	},
	thundershock: {
		inherit: true,
	},
	thunderwave: {//use glare or stun spore if you want more reliability
		inherit: true,
		accuracy: 80,
		onTryHit(target) {
			if (target.hasType('Ground')) {
				this.add('-immune', target);
				return null;
			}
		},
	},
	toxic: {//now a strong poison move, similar to gunkshot
		inherit: true,
		desc: "Has a 20% chance to poison the target.",
		shortDesc: "20% chance to poison the target.",
		ignoreImmunity: false,
		basePower: 120,
		category: "Physical",
		pp: 5,
		condition: {},
		flags: {protect: 1, mirror: 1},
		status: null,
		secondary: {
			chance: 20,
			status: 'psn',
		},
	},
	transform: {
		inherit: true,
		desc: "The user transforms into the target. The target's current stats, stat stages, types, moves, DVs, species, and sprite are copied. The user's level and HP remain the same and each copied move receives only 5 PP. This move can hit a target using Dig or Fly.",
		pp: 40,
	},
	triattack: {
		inherit: true,
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		basePower: 100,
		pp: 15,
		onHit() {},
		secondary: null,
	},
	twineedle: {//now a bonemerang clone
		inherit: true,
		desc: "Hits twice, with the second hit having a 20% chance to poison the target. If the first hit breaks the target's substitute, the move ends.",
		accuracy: 95,
		basePower: 50,
		pp: 15,
	},
	whirlwind: {//Now a regular dragon move
		inherit: true,
		desc: "Has a 33% chance to lower the target's Defense by 1 stage.",
		shortDesc: "33% chance to lower the target's Defense by 1.",
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		forceSwitch: false,
		onTryHit() {},
		secondary: {
			chance: 33,
			boosts: {
				def: -1,
			},
		},
		type: "Dragon",
		priority: 0,
	},
	wingattack: {
		inherit: true,
		basePower: 35,
	},
	wrap: {
		inherit: true,
		desc: "The user spends two to five turns using this move. Has a 3/8 chance to last two or three turns, and a 1/8 chance to last four or five turns. The damage calculated for the first turn is used for every other turn. The user cannot select a move and the target cannot execute a move during the effect, but both may switch out. If the user switches out, the target remains unable to execute a move during that turn. If the target switches out, the user uses this move again automatically, and if it had 0 PP at the time, it becomes 63. If the user or the target switch out, or the user is prevented from moving, the effect ends. This move can prevent the target from moving even if it has type immunity, but will not deal damage.",
		shortDesc: "Prevents the target from moving for 2-5 turns.",
		accuracy: 85,
		ignoreImmunity: true,
		volatileStatus: 'partiallytrapped',
		self: {
			volatileStatus: 'partialtrappinglock',
		},
		// FIXME: onBeforeMove(pokemon, target) {target.removeVolatile('mustrecharge')}
		onHit(target, source) {
			/**
			 * The duration of the partially trapped must be always renewed to 2
			 * so target doesn't move on trapper switch out as happens in gen 1.
			 * However, this won't happen if there's no switch and the trapper is
			 * about to end its partial trapping.
			 **/
			if (target.volatiles['partiallytrapped']) {
				if (source.volatiles['partialtrappinglock'] && source.volatiles['partialtrappinglock'].duration > 1) {
					target.volatiles['partiallytrapped'].duration = 2;
				}
			}
		},
	},
};
