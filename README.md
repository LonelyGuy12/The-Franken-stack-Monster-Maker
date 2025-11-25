# Franken-Monster API 🧟‍♂️

A SvelteKit application that assembles a "Franken-monster" by stitching together data from three mismatched sources - just like Dr. Frankenstein's creation!

## The Monster's Anatomy

Each monster is assembled from three distinct parts:

- **The Head (Identity)**: A random person from [randomuser.me](https://randomuser.me/api/)
- **The Torso (Power)**: A random Pokémon's stats from [PokeAPI](https://pokeapi.co/)
- **The Legs (Story)**: A random spooky fact from our local collection

## Setup

1. Install dependencies:
```bash
cd franken-monster-app
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Test the API:
```bash
curl http://localhost:5173/api/monster
```

## API Response Structure

```json
{
  "monster_data": {
    "head": {
      "name": "John Doe",
      "gender": "male",
      "email": "john.doe@example.com",
      "picture": "https://...",
      "location": "London, United Kingdom"
    },
    "torso": {
      "pokemon_name": "charizard",
      "pokemon_id": 6,
      "hp": 78,
      "attack": 84,
      "defense": 78,
      "speed": 100,
      "total_power": 534
    },
    "legs": {
      "spooky_fact": "In 1816, Mary Shelley conceived Frankenstein...",
      "fact_index": 0
    }
  },
  "assembled_at": "2024-11-26T12:00:00.000Z",
  "monster_id": "franken-1732622400000"
}
```

## Project Structure

- `src/lib/types.ts` - TypeScript interfaces for the Franken-monster
- `src/lib/data/facts.json` - Collection of 5 spooky facts
- `src/lib/services/soapService.ts` - Fetches head data (identity)
- `src/lib/services/restService.ts` - Fetches torso data (power)
- `src/lib/services/csvService.ts` - Reads legs data (story)
- `src/routes/api/monster/+server.ts` - Main API endpoint

## How It Works

1. **Parallel Fetching**: The head and torso are fetched simultaneously from external APIs
2. **Local Reading**: The legs are read from a local JSON file
3. **Assembly**: All three parts are combined into a single monster_data object
4. **Response**: Returns the assembled monster with metadata

Each request creates a unique monster - refresh to see different combinations!
