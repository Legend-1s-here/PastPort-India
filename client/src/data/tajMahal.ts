import type { Monument } from '../types/monument';

export const TAJ_MAHAL_DATA: Monument = {
  id: 'taj-mahal',
  name: 'Taj Mahal',
  alternateNames: ['Tāj Mahal', 'Crown of the Palace'],
  location: 'Agra, Uttar Pradesh, India',
  period: 'Mughal Architecture (1631–1648 CE)',
  builtBy: 'Emperor Shah Jahan',
  shortDescription: 'An immense mausoleum of white marble, built in Agra by order of the Mughal emperor Shah Jahan in memory of his favourite wife Mumtaz Mahal.',
  fullDescription: 'The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river in Agra. It was commissioned in 1631 by the fifth Mughal emperor, Shah Jahan, to house the tomb of his favourite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself.',
  heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop',
  modelUrl: '/models/taj_mahal.glb', // Placeholder model path
  hotspots: [
    {
      id: 'main-dome',
      title: 'Central Onion Dome (Amrud)',
      position: [0, 2.5, 0],
      description: 'The white marble dome that surmounts the mausoleum is its most spectacular feature. Heightened by a cylindrical drum, it stands nearly 35 metres tall.',
      sourceIds: ['TM-001']
    },
    {
      id: 'minarets',
      title: 'Four Corner Minarets',
      position: [2, 1.5, 2],
      description: 'Four minarets, each over 40 metres tall, frame the tomb. They were constructed slightly tilted outward to protect the main dome in case of collapse.',
      sourceIds: ['TM-002']
    },
    {
      id: 'pishtaq',
      title: 'Main Vaulted Archway (Pishtaq)',
      position: [0, 0.8, 1.2],
      description: 'Grand vaulted archways decorated with Quranic calligraphy and intricate pietra dura floral inlay work using semi-precious stones.',
      sourceIds: ['TM-003']
    },
    {
      id: 'charbagh-gardens',
      title: 'Charbagh (Four Gardens)',
      position: [0, 0, 3],
      description: 'The complex is set around a large 300-metre square charbagh garden using raised pathways that divide each of the 4 quarters into 16 sunken flowerbeds.',
      sourceIds: ['TM-004']
    }
  ],
  timeline: [
    {
      id: 'tm-1631',
      year: '1631 CE',
      title: 'Construction Begins',
      description: 'Shah Jahan orders construction of the grand mausoleum following the death of Mumtaz Mahal.',
      sourceIds: ['TM-001']
    },
    {
      id: 'tm-1648',
      year: '1648 CE',
      title: 'Main Complex Completed',
      description: 'The primary marble mausoleum structure and main dome are completed.',
      sourceIds: ['TM-001', 'TM-002']
    },
    {
      id: 'tm-1653',
      year: '1653 CE',
      title: 'Surrounding Complex Completed',
      description: 'Outlying buildings, gardens, and main gateway (Darwaza-i rauza) are fully finished.',
      sourceIds: ['TM-003']
    },
    {
      id: 'tm-1983',
      year: '1983 CE',
      title: 'UNESCO World Heritage Status',
      description: 'Recognized as "the jewel of Muslim art in India and one of the universally admired masterpieces of world heritage".',
      sourceIds: ['TM-004']
    }
  ],
  culturalSignificance: [
    'Masterpiece of Mughal architecture blending Persian, Islamic, and Indian architectural styles.',
    'Symbol of eternal devotion and monumental craftsmanship.',
    'UNESCO World Heritage Site and one of the New 7 Wonders of the World.'
  ]
};
