import type { FrankenMonster } from '$lib/types';

export function calculateRarity(monster: FrankenMonster): 'common' | 'rare' | 'epic' | 'legendary' | 'cursed' {
	const totalPower = monster.monster_data.torso.total_power;
	const nameLength = monster.monster_data.head.name.length;
	const factLength = monster.monster_data.legs.spooky_fact.length;
	
	const score = totalPower + nameLength + factLength;
	const random = Math.random();

	if (random < 0.05) return 'cursed';
	if (score > 700) return 'legendary';
	if (score > 600) return 'epic';
	if (score > 500) return 'rare';
	return 'common';
}

export function generateBackstory(monster: FrankenMonster): string {
	const name = monster.monster_data.head.name;
	const location = monster.monster_data.head.location;
	const pokemon = monster.monster_data.torso.pokemon_name;
	const fact = monster.monster_data.legs.spooky_fact;

	const stories = [
		`Born in the shadows of ${location}, ${name} was infused with the essence of ${pokemon}. ${fact.split('.')[0]}... and that's when the transformation began.`,
		`Legend speaks of ${name}, a being from ${location} who merged with the spirit of ${pokemon}. The ancient texts warn: "${fact.substring(0, 100)}..."`,
		`In ${location}, ${name} discovered forbidden knowledge about ${pokemon}. ${fact.split(',')[0]}, leading to an unholy fusion of flesh and power.`,
		`${name} wasn't always a monster. Once a resident of ${location}, they sought the power of ${pokemon}. But as the old saying goes: ${fact.substring(0, 80)}...`
	];

	return stories[Math.floor(Math.random() * stories.length)];
}

export function generatePersonality(monster: FrankenMonster): string[] {
	const traits = [];
	const { hp, attack, defense, speed } = monster.monster_data.torso;

	if (hp > 80) traits.push('Resilient');
	if (hp < 50) traits.push('Fragile');
	if (attack > 100) traits.push('Aggressive');
	if (attack < 60) traits.push('Gentle');
	if (defense > 100) traits.push('Protective');
	if (defense < 60) traits.push('Vulnerable');
	if (speed > 100) traits.push('Swift');
	if (speed < 50) traits.push('Methodical');

	const gender = monster.monster_data.head.gender;
	if (gender === 'male') traits.push('Bold');
	if (gender === 'female') traits.push('Cunning');

	const extraTraits = ['Mysterious', 'Haunted', 'Ancient', 'Cursed', 'Wise', 'Chaotic', 'Noble', 'Sinister'];
	traits.push(extraTraits[Math.floor(Math.random() * extraTraits.length)]);

	return traits.slice(0, 4);
}

export function generateCurse(monster: FrankenMonster): string | undefined {
	if (Math.random() < 0.15) {
		const curses = [
			'Cursed to wander eternally under the purple moon',
			'Cannot be photographed without causing camera malfunctions',
			'Speaks only in backwards riddles at midnight',
			'Leaves a trail of purple mist wherever they go',
			'Ages backwards during full moons',
			'Can only consume foods that are purple',
			'Casts no shadow in direct moonlight',
			'Attracts ravens and crows wherever they roam'
		];
		return curses[Math.floor(Math.random() * curses.length)];
	}
	return undefined;
}

export function generateMonsterName(monster: FrankenMonster): string {
	const firstName = monster.monster_data.head.name.split(' ')[0];
	const pokemon = monster.monster_data.torso.pokemon_name;
	
	const prefixes = ['Dark', 'Shadow', 'Cursed', 'Ancient', 'Phantom', 'Spectral', 'Mystic', 'Void'];
	const suffixes = ['bane', 'shade', 'wraith', 'fiend', 'reaper', 'walker', 'stalker', 'haunter'];
	
	const styles = [
		`${firstName} the ${pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}`,
		`${prefixes[Math.floor(Math.random() * prefixes.length)]}-${firstName}`,
		`${firstName}${suffixes[Math.floor(Math.random() * suffixes.length)]}`,
		`${pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}-${firstName}`
	];

	return styles[Math.floor(Math.random() * styles.length)];
}
