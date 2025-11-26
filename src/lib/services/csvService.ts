import type { LegsData } from '../types';
import factsData from '$lib/data/facts.json';

export function fetchLegsData(): LegsData {
  try {
    // Select a random spooky fact
    const facts = factsData.spookyFacts;
    const randomIndex = Math.floor(Math.random() * facts.length);
    
    return {
      spooky_fact: facts[randomIndex],
      fact_index: randomIndex
    };
  } catch (error) {
    console.error('Failed to fetch legs data from facts.json:', error);
    throw new Error('Could not assemble the legs');
  }
}
