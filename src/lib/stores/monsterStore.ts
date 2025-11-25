import { writable } from 'svelte/store';
import type { FrankenMonster } from '$lib/types';

interface MonsterWithMetadata extends FrankenMonster {
	name?: string;
	rarity?: 'common' | 'rare' | 'epic' | 'legendary' | 'cursed';
	backstory?: string;
	personality?: string[];
	curse?: string;
}

function createMonsterStore() {
	const { subscribe, set, update } = writable<MonsterWithMetadata[]>([]);

	// Load from localStorage on init
	if (typeof window !== 'undefined') {
		const stored = localStorage.getItem('monster-collection');
		if (stored) {
			set(JSON.parse(stored));
		}
	}

	return {
		subscribe,
		addMonster: (monster: MonsterWithMetadata) => {
			update((monsters) => {
				const updated = [monster, ...monsters].slice(0, 50); // Keep last 50
				if (typeof window !== 'undefined') {
					localStorage.setItem('monster-collection', JSON.stringify(updated));
				}
				return updated;
			});
		},
		clear: () => {
			set([]);
			if (typeof window !== 'undefined') {
				localStorage.removeItem('monster-collection');
			}
		}
	};
}

export const monsterCollection = createMonsterStore();
