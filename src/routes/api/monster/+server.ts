import { json, type RequestHandler } from '@sveltejs/kit';
import type { FrankenMonster } from '$lib/types';
import { fetchHeadData } from '$lib/services/soapService';
import { fetchTorsoData } from '$lib/services/restService';
import { fetchLegsData } from '$lib/services/csvService';

export const GET: RequestHandler = async () => {
	try {
		// Fetch The Head (Identity) and The Torso (Power) in parallel
		// The Legs (Story) is synchronous file read
		const [head, torso] = await Promise.all([fetchHeadData(), fetchTorsoData()]);

		const legs = fetchLegsData();

		// Assemble the Franken-monster
		const frankenMonster: FrankenMonster = {
			monster_data: {
				head,
				torso,
				legs
			},
			assembled_at: new Date().toISOString(),
			monster_id: `franken-${Date.now()}`
		};

		return json(frankenMonster);
	} catch (error) {
		console.error('Error assembling monster:', error);
		return json(
			{
				error: 'Failed to assemble the Franken-monster',
				message: error instanceof Error ? error.message : 'Unknown error'
			},
			{ status: 500 }
		);
	}
};
