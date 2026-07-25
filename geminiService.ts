import { GoogleGenAI, Type } from '@google/genai';
import { AnimalInfo } from '../types/animal';
import { PRESET_ANIMALS } from '../data/presetAnimals';

export async function fetchAnimalInfoFromGemini(query: string): Promise<{ data: AnimalInfo; isAiGenerated: boolean; message?: string }> {
  const cleanQuery = query.trim().toLowerCase();
  
  // Check preset animals first
  const presetMatch = PRESET_ANIMALS.find(
    (a) =>
      a.name.toLowerCase() === cleanQuery ||
      a.scientificName?.toLowerCase() === cleanQuery ||
      a.id === cleanQuery ||
      a.name.toLowerCase().includes(cleanQuery)
  );

  const apiKey = process.env.GEMINI_API_KEY || '';
  
  if (!apiKey) {
    if (presetMatch) {
      return {
        data: presetMatch,
        isAiGenerated: false,
        message: 'Loaded instantly from verified animal catalog.'
      };
    }
    return {
      data: generateFallbackInfo(query),
      isAiGenerated: false,
      message: 'Loaded offline animal summary. Add GEMINI_API_KEY in secrets for live AI search on any species.'
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Provide detailed, factual, and fascinating wildlife information for the animal named "${query}".
Format the response strictly as JSON with the following fields:
- "name": proper common name
- "scientificName": Latin binomial name
- "category": e.g. Mammal, Bird, Marine Life, Reptile, Amphibian, Insect, Fish
- "habitat": detailed description of natural habitat, climate, and geography
- "diet": eating habits (e.g. Herbivore, Carnivore, Omnivore) and specific preferred foods
- "lifespan": average lifespan in wild and in captivity
- "conservationStatus": status (e.g., Least Concern, Vulnerable, Endangered, Critically Endangered)
- "facts": array of 3 distinct, highly interesting, specific facts about this animal
- "funTagline": a captivating 6-10 word tagline describing the animal`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            scientificName: { type: Type.STRING },
            category: { type: Type.STRING },
            habitat: { type: Type.STRING },
            diet: { type: Type.STRING },
            lifespan: { type: Type.STRING },
            conservationStatus: { type: Type.STRING },
            facts: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            funTagline: { type: Type.STRING }
          },
          required: ['name', 'habitat', 'diet', 'lifespan', 'facts']
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error('No response text received from Gemini');
    }

    const parsed = JSON.parse(text) as AnimalInfo;
    return {
      data: {
        ...parsed,
        queryTerm: query,
        searchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      isAiGenerated: true
    };
  } catch (err: any) {
    console.warn('Gemini AI call failed:', err);
    if (presetMatch) {
      return {
        data: presetMatch,
        isAiGenerated: false,
        message: 'Loaded verified entry from animal catalog.'
      };
    }
    return {
      data: generateFallbackInfo(query),
      isAiGenerated: false,
      message: `Gemini AI query encountered an issue. Showing offline summary for ${query}.`
    };
  }
}

function generateFallbackInfo(query: string): AnimalInfo {
  const formattedName = query
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return {
    name: formattedName,
    scientificName: `${query.toLowerCase().replace(/[^a-z]/g, '')}us wildlife`,
    category: 'Wildlife Species',
    habitat: `Native wild habitats, natural sanctuaries, and ecosystems tailored to ${formattedName}.`,
    diet: `Adapted to its specific food chain position, foraging on appropriate organic matter and prey in its natural ecosystem.`,
    lifespan: 'Varies by environmental factors, wild conditions, and habitat health.',
    conservationStatus: 'Protected Wildlife',
    funTagline: `An impressive creature contributing to nature's rich biodiversity.`,
    facts: [
      `The ${formattedName} possesses key biological adaptations that enable survival in its primary habitat.`,
      `Ecologists monitor populations of species like the ${formattedName} to measure broader ecosystem stability.`,
      `Interactions between the ${formattedName} and surrounding species form an integral part of the local food web.`
    ],
    queryTerm: query
  };
}
