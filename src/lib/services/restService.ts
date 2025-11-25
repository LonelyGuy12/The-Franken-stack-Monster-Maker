import axios from 'axios';
import type { TorsoData } from '../types';

export async function fetchTorsoData(): Promise<TorsoData> {
  try {
    // Generate random Pokemon ID (1-898 for all Pokemon up to Gen 8)
    const randomId = Math.floor(Math.random() * 898) + 1;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const pokemon = response.data;
    
    // Extract stats
    const stats = pokemon.stats.reduce((acc: any, stat: any) => {
      acc[stat.stat.name] = stat.base_stat;
      return acc;
    }, {});
    
    const totalPower = pokemon.stats.reduce((sum: number, stat: any) => sum + stat.base_stat, 0);
    
    return {
      pokemon_name: pokemon.name,
      pokemon_id: pokemon.id,
      hp: stats.hp || 0,
      attack: stats.attack || 0,
      defense: stats.defense || 0,
      speed: stats.speed || 0,
      total_power: totalPower
    };
  } catch (error) {
    console.error('Failed to fetch torso data from PokeAPI:', error);
    throw new Error('Could not assemble the torso');
  }
}
