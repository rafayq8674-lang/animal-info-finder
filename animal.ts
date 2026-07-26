export interface AnimalInfo {
  name: string;
  scientificName?: string;
  category?: string;
  habitat: string;
  diet: string;
  lifespan: string;
  conservationStatus?: string;
  facts: string[];
  funTagline?: string;
  queryTerm?: string;
  searchedAt?: string;
}

export interface PresetAnimal extends AnimalInfo {
  id: string;
  emoji: string;
  imageAccentColor: string;
}
