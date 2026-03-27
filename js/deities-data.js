/**
 * Hindu Deities — Principal devas and devis honored across Hindu traditions
 * Optional map links where a journey location relates to the deity’s pastimes.
 */

const HINDU_DEITIES = [
  {
    id: 1,
    name: 'Vishnu',
    sanskrit: 'विष्णु',
    subtitle: 'The All-Pervading Preserver',
    description: 'The sustaining aspect of the Trimurti: He rests on Shesha, holds the discus and conch, and descends again and again whenever dharma declines.',
    locationIds: [6],
    icon: 'discus',
    color: '#1A237E'
  },
  {
    id: 2,
    name: 'Shiva',
    sanskrit: 'शिव',
    subtitle: 'The Auspicious Destroyer',
    description: 'The transformer who dissolves worlds in cosmic fire yet grants liberation; Lord of yoga, the Ganga in His hair, and the rhythm of creation through His damaru.',
    locationIds: [12],
    icon: 'trident',
    color: '#424242'
  },
  {
    id: 3,
    name: 'Devi',
    sanskrit: 'देवी',
    subtitle: 'The Divine Mother',
    description: 'Mahadevi manifests as Durga, Kali, Parvati, and countless forms — the active power (shakti) that animates the universe and defeats the forces of chaos.',
    locationIds: [],
    icon: 'shakti',
    color: '#C2185B'
  },
  {
    id: 4,
    name: 'Brahma',
    sanskrit: 'ब्रह्मा',
    subtitle: 'The Creator',
    description: 'Born from the lotus from Vishnu’s navel, the four-faced lord of vidya who shapes the worlds and gives forth the Vedas — though rarely worshipped alone, he opens every cycle.',
    locationIds: [],
    icon: 'swan',
    color: '#FF8F00'
  },
  {
    id: 5,
    name: 'Lakshmi',
    sanskrit: 'लक्ष्मी',
    subtitle: 'Goddess of Fortune',
    description: 'The eternal consort of Vishnu, radiant on the lotus, bestowing prosperity, purity, and grace — wherever He descends, She follows as His beloved strength.',
    locationIds: [6],
    icon: 'lotus-gold',
    color: '#FFD700'
  },
  {
    id: 6,
    name: 'Saraswati',
    sanskrit: 'सरस्वती',
    subtitle: 'Goddess of Learning',
    description: 'Seated on a white swan with vina in hand, she is shakti of speech, music, and wisdom — adored by students, artists, and seekers of truth.',
    locationIds: [],
    icon: 'veena',
    color: '#E1F5FE'
  },
  {
    id: 7,
    name: 'Ganesha',
    sanskrit: 'गणेश',
    subtitle: 'Lord of Beginnings',
    description: 'The beloved elephant-headed son of Shiva and Parvati, remover of obstacles, patron of writers and travelers — invoked first in rites across the Hindu world.',
    locationIds: [],
    icon: 'elephant',
    color: '#FF9800'
  },
  {
    id: 8,
    name: 'Kartikeya',
    sanskrit: 'कार्तिकेय',
    subtitle: 'Commander of the Gods',
    description: 'The radiant warrior born to destroy Taraka, riding a peacock with vel in hand — Skanda, Murugan, or Subrahmanya to many traditions.',
    locationIds: [],
    icon: 'spear',
    color: '#FF6F00'
  },
  {
    id: 9,
    name: 'Hanuman',
    sanskrit: 'हनुमान',
    subtitle: 'The Perfect Servant',
    description: 'Son of the wind, incarnation of devotion — he leaped to Lanka, carried the mountain of herbs, and in every age reminds the world of unwavering love for Rama.',
    locationIds: [],
    icon: 'mace',
    color: '#E65100'
  },
  {
    id: 10,
    name: 'Surya',
    sanskrit: 'सूर्य',
    subtitle: 'The Sun God',
    description: 'The visible face of the highest light, charioteer of the day, healer and witness of all deeds — father of legends and axis of time in Vedic praise.',
    locationIds: [],
    icon: 'sun',
    color: '#FDD835'
  }
];
