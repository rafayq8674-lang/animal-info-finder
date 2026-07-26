import { PresetAnimal } from '../types/animal';

export const PRESET_ANIMALS: PresetAnimal[] = [
  {
    id: 'african-elephant',
    name: 'African Elephant',
    scientificName: 'Loxodonta africana',
    category: 'Mammal',
    emoji: '🐘',
    imageAccentColor: 'from-emerald-700 to-teal-900',
    habitat: 'Savannahs, dense forests, deserts, and wetlands across Sub-Saharan Africa.',
    diet: 'Herbivore (consumes up to 300 lbs of grasses, roots, bark, and leaves daily).',
    lifespan: '60 – 70 years in the wild.',
    conservationStatus: 'Endangered',
    funTagline: "Earth's gentle, highly intelligent giants of the savannah.",
    facts: [
      'An elephant trunk contains over 40,000 individual muscles, enabling it to pick up a single blade of grass or snap massive tree trunks.',
      'They communicate using low-frequency infrasound that travels through the ground and can be felt through their feet miles away.',
      'Elephants possess extraordinary long-term memory, recognizing family members and water sources even after decades apart.'
    ]
  },
  {
    id: 'red-panda',
    name: 'Red Panda',
    scientificName: 'Ailurus fulgens',
    category: 'Mammal',
    emoji: '🐼',
    imageAccentColor: 'from-amber-600 to-emerald-800',
    habitat: 'High-altitude mountain forests in the Himalayas of Nepal, India, Bhutan, and China.',
    diet: 'Herbivore / Folivore (bamboo leaves and shoots account for 95% of their diet).',
    lifespan: '8 – 10 years in the wild (up to 14 years in care).',
    conservationStatus: 'Endangered',
    funTagline: 'Tree-dwelling acrobat with a plush ringed tail.',
    facts: [
      'Red pandas use their long, bushy tails like cozy blankets to wrap around themselves for warmth during freezing Himalayan winters.',
      'Despite sharing a name and diet with giant pandas, red pandas belong to their own unique evolutionary family (Ailuridae).',
      'They possess an elongated wrist bone that functions like a thumb to help grip slick bamboo stalks while climbing.'
    ]
  },
  {
    id: 'bottlenose-dolphin',
    name: 'Bottlenose Dolphin',
    scientificName: 'Tursiops truncatus',
    category: 'Marine Mammal',
    emoji: '🐬',
    imageAccentColor: 'from-teal-600 to-cyan-900',
    habitat: 'Warm and temperate coastal oceans and estuaries worldwide.',
    diet: 'Carnivore (small fish, squids, and crustaceans).',
    lifespan: '40 – 50 years in natural habitats.',
    conservationStatus: 'Least Concern',
    funTagline: 'Playful master of ocean echolocation.',
    facts: [
      'Dolphins sleep with one eye open and half of their brain awake at a time to stay alert for predators and breathe consciously.',
      'Each dolphin develops a unique, signature whistle that acts like a human name to identify itself to pod members.',
      'They emit up to 1,000 click sounds per second to map out their underwater environment in crystal-clear acoustic detail.'
    ]
  },
  {
    id: 'monarch-butterfly',
    name: 'Monarch Butterfly',
    scientificName: 'Danaus plexippus',
    category: 'Insect',
    emoji: '🦋',
    imageAccentColor: 'from-orange-500 to-emerald-800',
    habitat: 'Meadows, gardens, and forests across North America, migrating to central Mexican pine forests.',
    diet: 'Herbivore / Nectarivore (milkweed leaves as caterpillars, floral nectar as adults).',
    lifespan: '2 to 6 weeks for summer generations; up to 8 months for the overwintering migratory generation.',
    conservationStatus: 'Vulnerable',
    funTagline: 'The world champion long-distance migratory insect.',
    facts: [
      'Monarchs undertake an astounding annual migration of up to 3,000 miles, relying on magnetic fields and solar position to navigate.',
      'Caterpillars feed exclusively on poisonous milkweed, which renders the adult butterfly toxic and unpalatable to birds.',
      'They taste their surroundings through microscopic sensors located in their tiny feet.'
    ]
  },
  {
    id: 'snow-leopard',
    name: 'Snow Leopard',
    scientificName: 'Panthera uncia',
    category: 'Mammal',
    emoji: '🐆',
    imageAccentColor: 'from-slate-600 to-emerald-900',
    habitat: 'Rugged alpine mountain ranges across 12 countries in Central Asia.',
    diet: 'Carnivore (wild sheep like ibex, blue sheep, and small mountain rodents).',
    lifespan: '15 – 18 years in mountain ecosystems.',
    conservationStatus: 'Vulnerable',
    funTagline: 'The elusive "Ghost of the Mountains".',
    facts: [
      'Snow leopards cannot roar like lions or tigers; instead, they make soft chuffing sounds, purrs, and piercing whistles.',
      'Their massive furry paws act like natural snowshoes to distribute body weight evenly on soft powder drifts.',
      'They can leap distance up to 50 feet in a single bound across steep mountain ravines.'
    ]
  },
  {
    id: 'barn-owl',
    name: 'Barn Owl',
    scientificName: 'Tyto alba',
    category: 'Bird',
    emoji: '🦉',
    imageAccentColor: 'from-emerald-800 to-stone-900',
    habitat: 'Open country, grasslands, farmland, and light woodland on every continent except Antarctica.',
    diet: 'Carnivore (small mammals like field mice, voles, and shrews).',
    lifespan: '4 – 8 years in the wild.',
    conservationStatus: 'Least Concern',
    funTagline: 'Silent nocturnal hunter with heart-shaped acoustics.',
    facts: [
      'The unique comb-like edges on their flight feathers muffle the sound of rushing air, allowing completely silent flight.',
      'Their heart-shaped facial disc acts like a satellite dish to channel tiny rustling sounds directly into asymmetrically placed ear openings.',
      'A single family of barn owls can consume over 1,000 rodents during a single breeding season.'
    ]
  },
  {
    id: 'veined-octopus',
    name: 'Veined Octopus',
    scientificName: 'Amphioctopus marginatus',
    category: 'Cephalopod',
    emoji: '🐙',
    imageAccentColor: 'from-teal-700 to-indigo-950',
    habitat: 'Tropical ocean floors of the Western Pacific and Indian Ocean.',
    diet: 'Carnivore (crabs, clams, shrimp, and small fish).',
    lifespan: '1 – 2 years.',
    conservationStatus: 'Data Deficient',
    funTagline: 'Tool-using genius of the seafloor.',
    facts: [
      'They are one of the few invertebrates known to collect and use tools, carrying coconut shells across the ocean floor to assemble shelters.',
      'Octopuses possess three hearts and blue copper-based blood called hemocyanin.',
      'Two-thirds of an octopus\'s neurons are located in its arms, allowing each arm to explore, taste, and manipulate objects independently.'
    ]
  },
  {
    id: 'koala',
    name: 'Koala',
    scientificName: 'Phascolarctos cinereus',
    category: 'Marsupial',
    emoji: '🐨',
    imageAccentColor: 'from-emerald-700 to-lime-900',
    habitat: 'Eucalyptus woodlands of eastern and southeastern Australia.',
    diet: 'Herbivore (eucalyptus leaves).',
    lifespan: '13 – 18 years in protected eucalyptus bushlands.',
    conservationStatus: 'Endangered',
    funTagline: 'Sleepy tree-dwelling eucalyptus specialist.',
    facts: [
      'Koalas sleep up to 18 to 22 hours a day because eucalyptus leaves are tough, low in nutrients, and require vast energy to digest.',
      'Like humans, koalas have unique individual fingerprints with whorls and loops that are virtually indistinguishable from human prints under a microscope.',
      'They rarely drink water directly; their name comes from an Indigenous word meaning "no drink" as they get moisture from eucalyptus foliage.'
    ]
  }
];
