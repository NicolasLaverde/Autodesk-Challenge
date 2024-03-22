import forestWaterfallImg from '../assets/forest-waterfall.jpg'
import desertDunes from '../assets/desert-dunes.jpg'
import majesticMountains from '../assets/majestic-mountains.jpg'
import caribbeanBeachImg from '../assets/caribbean-beach.jpg'
import ruinsImg from '../assets/ruins.jpg'
import rainforestImg from '../assets/rainforest.jpg'
import northernLightsImg from '../assets/northern-lights.jpg'
import japaneseTempleImg from '../assets/japanese-temple.jpg'
import tajMahalImg from '../assets/taj-mahal.jpg'
import victoriaFallsImg from '../assets/victoria-falls.jpg'
import machuPicchuImg from '../assets/machu-picchu.jpg'
import amazonRiverImg from '../assets/amazon-river.jpg'

type Image = {
    src: string,
    alt: string
}

export type Place = {
    id: string
    title: string
    image: Image
    description: string
}

export const AVAILABLE_PLACES: Place[] = [
  {
    id: 'p1',
    title: 'Forest Waterfall',
    image: {
      src: forestWaterfallImg,
      alt: 'A tranquil forest with a cascading waterfall amidst greenery.'
    },
    description: "Hidden in dense forest, a mesmerizing sight unfolds: Forest Waterfall. Nature's artwork, cascading gracefully over mossy rocks, a symphony of tranquility amid lush greenery"
  },
  {
    id: 'p2',
    title: 'Sahara Desert Dunes',
    image: {
      src: desertDunes,
      alt: 'Golden dunes stretching to the horizon in the Sahara Desert.'
    },
    description: "Sahara's vast expanse reveals majestic dunes, sculpted by relentless winds. Golden waves stretch endlessly, a mesmerizing landscape under the blazing sun, embodying nature's timeless artistry."
  },
  {
    id: 'p3',
    title: 'Himalayan Peaks',
    image: {
      src: majesticMountains,
      alt: 'The sun setting behind snow-capped peaks of majestic mountains.'
    },
    description: "Himalayan peaks pierce the sky, their snow-capped summits glistening in the sun's embrace. Majestic guardians of ancient mysteries, they stand tall, inspiring awe and reverence in all who behold them."
  },
  {
    id: 'p4',
    title: 'Caribbean Beach',
    image: {
      src: caribbeanBeachImg,
      alt: 'Pristine white sand and turquoise waters of a Caribbean beach.'
    },
    description: "Turquoise waters lap gently against powdery sands, kissed by the sun's golden rays. Palm trees sway in the tropical breeze, framing a paradise of relaxation and rejuvenation."
  },
  {
    id: 'p5',
    title: 'Ancient Grecian Ruins',
    image: {
      src: ruinsImg,
      alt: 'Historic ruins standing tall against the backdrop of the Grecian sky.'
    },
    description: "Ancient Grecian ruins stand as silent witnesses to bygone glory. Time-worn pillars and weathered stones evoke tales of gods and heroes, whispering echoes of a civilization's grandeur amidst serene Mediterranean vistas"
  },
  {
    id: 'p6',
    title: 'Amazon Rainforest Canopy',
    image: {
      src: rainforestImg,
      alt: 'Lush canopy of a rainforest, teeming with life.'
    },
    description: "The Amazon Rainforest canopy is a vibrant tapestry of life, where emerald foliage intertwines beneath a verdant ceiling. A symphony of chirps and rustles fills the air, as sunlight filters through, illuminating a thriving ecosystem teeming with biodiversity and wonder."
  },
  {
    id: 'p7',
    title: 'Northern Lights',
    image: {
      src: northernLightsImg,
      alt: 'Dazzling display of the Northern Lights in a starry sky.'
    },
    description: "Northern Lights: Ethereal ribbons of color dance across Arctic skies, painting celestial masterpieces. Nature's mesmerizing light show, captivating hearts under the blanket of the polar night."
  },
  {
    id: 'p8',
    title: 'Japanese Temple',
    image: {
      src: japaneseTempleImg,
      alt: 'Ancient Japanese temple surrounded by autumn foliage.'
    },
    description: "Japanese Temple: Serene sanctuary amidst tranquil gardens, where vermilion pagodas rise against the backdrop of cherry blossoms. A sacred haven for contemplation and spiritual solace."
  },
  {
    id: 'p9',
    title: 'Taj Mahal',
    image: {
      src: tajMahalImg,
      alt: 'The iconic Taj Mahal reflecting in its surrounding waters during sunrise.'
    },
    description: "Taj Mahal: A timeless marvel of white marble, an ode to love's enduring legacy. Graceful minarets and intricate carvings adorn its symmetrical splendor, reflecting in the tranquil waters of the reflecting pool."
  },
  {
    id: 'p10',
    title: 'Victoria Falls ',
    image: {
      src: victoriaFallsImg,
      alt: 'The powerful cascade of Victoria Falls, a natural wonder between Zambia and Zimbabwe.'
    },
    description: "Victoria Falls: Africa's majestic wonder, where thundering waters cascade into misty depths. A symphony of nature's power and beauty, echoing across the Zambezi River, captivating all who behold its grandeur."
  },
  {
    id: 'p11',
    title: 'Machu Picchu',
    image: {
      src: machuPicchuImg,
      alt: 'The historic Incan citadel of Machu Picchu illuminated by the morning sun.'
    },
    description: "Machu Picchu: Ancient Incan citadel perched atop mist-shrouded Andean peaks. A testament to ingenuity, its terraces and temples whisper tales of a lost civilization, embraced by mystical mountain vistas."
  },
  {
    id: 'p12',
    title: 'Amazon River',
    image: {
      src: amazonRiverImg,
      alt: 'Navigating the waters of the Amazon River, surrounded by dense rainforest.'
    },
    description: "The Amazon River: Lifeline of the rainforest, coursing through verdant jungles with untamed grace. Its murky waters hide mysteries and marvels, nurturing a staggering array of flora and fauna."
  }
]
