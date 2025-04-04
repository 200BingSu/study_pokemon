import { Pokemon, PokemonSpecies } from "../types/type";

export const initPokemonData: Pokemon = {
  id: 0,
  name: "",
  base_experience: 0,
  height: 0,
  is_default: false,
  order: 0,
  weight: 0,
  abilities: [],
  forms: [],
  game_indices: [],
  held_items: [],
  location_area_encounters: "",
  moves: [],
  past_types: [],
  sprites: {
    back_default: "",
    back_female: "",
    back_shiny: "",
    back_shiny_female: "",
    front_default: "",
    front_female: "",
    front_shiny: "",
    front_shiny_female: "",
  },
  cries: {
    latest: "",
    legacy: "",
  },
  species: {
    name: "",
    url: "",
  },
  stats: [],
  types: [],
};

export const initPokemonSpecies: PokemonSpecies = {
  id: 0,
  name: "unknown",
  order: 0,
  color: {
    name: "gray",
    url: "",
  },
  habitat: null,
  shape: {
    name: "ball",
    url: "",
  },
  is_legendary: false,
  is_mythical: false,
  is_baby: false,
  gender_rate: -1,
  capture_rate: 0,
  base_happiness: 0,
  growth_rate: {
    name: "medium",
    url: "",
  },
  egg_groups: [
    {
      name: "no-eggs",
      url: "",
    },
  ],
  evolution_chain: {
    url: "",
  },
  names: [
    {
      name: "Unknown",
      language: {
        name: "en",
        url: "",
      },
    },
  ],
  genera: [
    {
      genus: "Unknown Pokémon",
      language: {
        name: "en",
        url: "",
      },
    },
  ],
  flavor_text_entries: [
    {
      flavor_text: "No description available.",
      language: {
        name: "en",
        url: "",
      },
      version: {
        name: "unknown",
        url: "",
      },
    },
  ],
};
