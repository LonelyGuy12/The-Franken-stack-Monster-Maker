import { readFileSync } from 'fs';
import { join } from 'path';
import type { LegsData } from '../types';

export function fetchLegsData(): LegsData {
  try {
    // Read the local facts.json file
    const factsPath = join(process.cwd(), 'src', 'lib', 'data', 'facts.json');
    const factsFile = readFileSync(factsPath, 'utf-8');
    const factsData = JSON.parse(factsFile);
    
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
