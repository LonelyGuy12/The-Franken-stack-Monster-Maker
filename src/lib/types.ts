// Franken-monster data structure combining multiple sources
export interface FrankenMonster {
  monster_data: {
    head: HeadData;
    torso: TorsoData;
    legs: LegsData;
  };
  assembled_at: string;
  monster_id: string;
}

// The Head (Identity) - from randomuser.me
export interface HeadData {
  name: string;
  gender: string;
  email: string;
  picture: string;
  location: string;
}

// The Torso (Power) - from PokeAPI
export interface TorsoData {
  pokemon_name: string;
  pokemon_id: number;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  total_power: number;
}

// The Legs (Story) - from local facts.json
export interface LegsData {
  spooky_fact: string;
  fact_index: number;
}
