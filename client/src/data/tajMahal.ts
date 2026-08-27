import type { Monument } from '../types/monument';

export interface TajMahalPerspective {
  id: string;
  name: string;
  timeOfDay: string;
  imageUrl: string;
  caption: string;
  tag: string;
}

export interface TajMahalArchitecturalSecret {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconType: 'symmetry' | 'optics' | 'acoustics' | 'engineering' | 'pietraDura';
  badge: string;
  sourceId: string;
}

export const TAJ_MAHAL_PERSPECTIVES: TajMahalPerspective[] = [
  {
    id: 'sunrise',
    name: 'Dawn & Sunrise Glow',
    timeOfDay: '06:00 AM',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1600&auto=format&fit=crop',
    caption: 'Soft pink and golden hues illuminating the Makrana white marble across the reflecting pool.',
    tag: 'Classic Reflection',
  },
  {
    id: 'archway',
    name: 'Grand Pishtaq & Inlay',
    timeOfDay: '12:00 PM',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1600&auto=format&fit=crop',
    caption: 'Intricate Parchin Kari (pietra dura) calligraphy and floral motifs inlaid with jasper and jade.',
    tag: 'Pietra Dura Detail',
  },
  {
    id: 'aerial-charbagh',
    name: 'Charbagh Symmetry',
    timeOfDay: '03:30 PM',
    imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1600&auto=format&fit=crop',
    caption: 'The quadripartite Persian Paradise Garden dividing the earthly realm into four spiritual rivers.',
    tag: 'Aerial Garden View',
  },
  {
    id: 'twilight',
    name: 'Twilight Yamuna Bank',
    timeOfDay: '07:15 PM',
    imageUrl: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?q=80&w=1600&auto=format&fit=crop',
    caption: 'Silhouetted minarets and iridescent marble glowing under the twilight sky along River Yamuna.',
    tag: 'Riverbank Twilight',
  },
];

export const TAJ_MAHAL_SECRETS: TajMahalArchitecturalSecret[] = [
  {
    id: 'seismic-minarets',
    title: 'Outward-Canted Seismic Minarets',
    subtitle: 'Protective Structural Engineering',
    description:
      'All four 40-metre minarets are deliberately engineered with a slight outward tilt (approx. 2 degrees). In the event of a catastrophic earthquake, the pillars are designed to collapse away from the central tomb rather than onto the precious inner dome.',
    iconType: 'engineering',
    badge: 'Seismic Safety',
    sourceId: 'TM-002',
  },
  {
    id: 'optical-calligraphy',
    title: 'Perspective-Corrected Calligraphy',
    subtitle: 'Optical Illusions by Amanat Khan',
    description:
      'The Quranic calligraphy adorning the towering pishtaqs increases incrementally in font size and stroke width as it climbs higher up the archway. When viewed from the ground, the script appears perfectly uniform to the human eye.',
    iconType: 'optics',
    badge: 'Optical Mastery',
    sourceId: 'TM-003',
  },
  {
    id: 'subterranean-wells',
    title: 'Yamuna Hydraulic Wood Foundations',
    subtitle: 'Living Subterranean Foundation Matrix',
    description:
      'The colossal weight rests on a subterranean network of masonry wells filled with ebony and sal timber caissons. The river Yamuna supplies the critical subterranean moisture that keeps the specialized wood petrified and rock-solid for centuries.',
    iconType: 'engineering',
    badge: 'Hydraulic Matrix',
    sourceId: 'TM-001',
  },
  {
    id: 'acoustic-resonance',
    title: '28-Second Dome Acoustic Chamber',
    subtitle: 'Sacred Sound Architecture',
    description:
      'The inner vaulted dome is tuned with an astonishing 28-second acoustic reverberation. A musical note or prayer chanted inside echoes and merges into a celestial, continuous drone intended to symbolize the eternal divine presence.',
    iconType: 'acoustics',
    badge: 'Acoustic Tuning',
    sourceId: 'TM-004',
  },
];

export const TAJ_MAHAL_DATA: Monument = {
  id: 'taj-mahal',
  slug: 'taj-mahal',
  name: 'Taj Mahal',
  alternateNames: ['Tāj Mahal', 'Rauza-i-Munawwara', 'Crown of the Palace'],
  location: 'Agra, Uttar Pradesh, India',
  period: 'Mughal Architecture (1631–1648 CE)',
  builtBy: 'Emperor Shah Jahan',
  shortDescription:
    'An ivory-white marble mausoleum on the south bank of the Yamuna river in Agra, commissioned in 1631 by Emperor Shah Jahan in memory of his beloved empress Mumtaz Mahal.',
  historicalSummary:
    'The Taj Mahal stands as the supreme zenith of Mughal architecture, a synthesis of Persian, Turkish, Indian, and Islamic traditions. Commissioned in 1631 following the untimely demise of Empress Mumtaz Mahal, the complex required over 22 years, 20,000 master artisans, and 1,000 elephants to transport Makrana translucent marble across Rajasthan. Rising above a raised riverfront terrace, its crystalline bilateral symmetry, pietra dura lapidary inlays, and quadripartite Charbagh paradise gardens form an enduring monument of world heritage.',
  fullDescription:
    'The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river in Agra, India. It was commissioned in 1631 by the Mughal emperor Shah Jahan (reigned 1628–1658) to house the tomb of his favourite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself. The tomb is the centerpiece of a 17-hectare (42-acre) complex, which includes a mosque and a guest house (jawab), and is set in formal gardens bounded on three sides by a crenellated wall.',
  heroImage:
    'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1600&auto=format&fit=crop',
  heroImageAlt:
    'The majestic Taj Mahal at dawn with radiant golden sunlight reflecting in the lotus pool',
  modelUrl: '/models/taj_mahal.glb',
  hotspots: [
    {
      id: 'main-dome',
      title: 'Central Bulbous Dome (Amrud)',
      position: [0, 2.5, 0],
      description:
        'The monumental white marble dome surmounting the tomb stands 35 metres high on an elevated drum, capped by a gilded lotus finial synthesizing Islamic and Hindu iconography.',
      sourceIds: ['TM-001'],
    },
    {
      id: 'minarets',
      title: 'Four Corner Minarets (40m)',
      position: [2, 1.5, 2],
      description:
        'Four three-tiered minarets standing 40 metres tall frame the marble plinth, engineered with outward canting to preserve the central dome during seismic events.',
      sourceIds: ['TM-002'],
    },
    {
      id: 'pishtaq',
      title: 'Grand Pishtaq & Inlaid Calligraphy',
      position: [0, 0.8, 1.2],
      description:
        'Towering vaulted portal adorned with verses from Surah Ya-Sin in Thuluth calligraphy by master Amanat Khan, bordered by inlaid jasper and carnelian arabesques.',
      sourceIds: ['TM-003'],
    },
    {
      id: 'charbagh-gardens',
      title: 'Charbagh Paradise Gardens',
      position: [0, 0, 3],
      description:
        'A 300-metre square Persian Charbagh divided by marble walkways and sunken watercourses, representing the four spiritual rivers described in paradise.',
      sourceIds: ['TM-004'],
    },
  ],
  timeline: [
    {
      id: 'tm-1631',
      year: '1631 CE',
      title: 'The Imperial Vow & Site Selection',
      description:
        'Following the passing of Empress Mumtaz Mahal in Burhanpur, Emperor Shah Jahan chooses the tranquil southern banks of the Yamuna River in Agra for an eternal monument of devotion.',
      sourceIds: ['TM-001'],
    },
    {
      id: 'tm-1632',
      year: '1632 CE',
      title: 'Subterranean Well Foundations Begun',
      description:
        'Chief architect Ustad Ahmad Lahori initiates earthworks, sinking dozens of masonry wells reinforced with moisture-cured ebony timbers along the alluvial riverbed.',
      sourceIds: ['TM-001', 'TM-003'],
    },
    {
      id: 'tm-1643',
      year: '1643 CE',
      title: 'The Central Marble Mausoleum Rises',
      description:
        'The main plinth, octagonal central chamber, and towering bulbous dome are completed using flawless translucent white marble hauled from Makrana, Rajasthan.',
      sourceIds: ['TM-001', 'TM-002'],
    },
    {
      id: 'tm-1648',
      year: '1648 CE',
      title: 'Pietra Dura & Cenotaph Consecration',
      description:
        'Lapidaries from Florence, Shiraz, and Lahore complete the intricate Parchin Kari inlays using lapis lazuli, turquoise, and jade around the interior marble jali screen.',
      sourceIds: ['TM-002', 'TM-003'],
    },
    {
      id: 'tm-1653',
      year: '1653 CE',
      title: 'Full Complex & Charbagh Inception',
      description:
        'The red sandstone Great Gate (Darwaza-i rauza), the mosque, matching Mehman Khana (Jawab), and 300-meter quadripartite Charbagh gardens reach final completion.',
      sourceIds: ['TM-003', 'TM-004'],
    },
    {
      id: 'tm-1983',
      year: '1983 CE',
      title: 'UNESCO World Heritage Inscription',
      description:
        'Inscribed by UNESCO as "the jewel of Muslim art in India and one of the universally admired masterpieces of the world’s heritage".',
      sourceIds: ['TM-004'],
    },
    {
      id: 'tm-present',
      year: 'Present Era',
      title: 'PastPort Digital Spatial Archiving',
      description:
        'High-precision photogrammetry and 3D geometric preservation enable universal interactive WebXR and augmented spatial exploration for future generations.',
      sourceIds: ['TM-001', 'TM-004'],
    },
  ],
  culturalSignificance: [
    'Peak expression of classical Mughal architecture, fusing Persian symmetry, Turkish ornamentation, and Indian stone craftsmanship.',
    'World-renowned symbol of immortal devotion, engineered with mathematical and optical perfection.',
    'UNESCO World Heritage Site (1983) and chosen among the New 7 Wonders of the World.',
  ],
  historicalHighlights: [
    { id: 'hl-builder', label: 'Imperial Patron', value: 'Shah Jahan' },
    { id: 'hl-era', label: 'Epoch', value: '1631–1653 CE' },
    { id: 'hl-style', label: 'Architecture', value: 'Mughal Classical' },
    { id: 'hl-unesco', label: 'UNESCO Status', value: 'Inscribed 1983' },
  ],
  experience: {
    web3d: true,
    ar: true,
    vr: false,
  },
  categories: ['mughal', 'unesco'],
  isUnesco: true,
  isFlagship: true,
};

