import type { Monument } from '../types/monument';
import { TAJ_MAHAL_DATA } from './tajMahal';

export const AJANTA_CAVES_DATA: Monument = {
  id: 'ajanta-caves',
  slug: 'ajanta-caves',
  name: 'Ajanta Caves',
  alternateNames: ['Ajanta', 'Ajantha Leni'],
  location: 'Aurangabad, Maharashtra, India',
  period: 'Ancient Rock-Cut Architecture (2nd Century BCE – 5th Century CE)',
  builtBy: 'Satavahana & Vakataka Dynasties (King Harishena)',
  shortDescription:
    'Thirty rock-cut Buddhist cave monuments carved into a horseshoe cliff, famous for ancient fresco murals and rock sculpture.',
  historicalSummary:
    'The Ajanta Caves represent the pinnacle of ancient Indian rock-cut architecture and classical Buddhist mural painting. Carved in two distinct phases into the 75-meter volcanic basalt ravine of the Waghur river, the 30 caves comprise prayer halls (chaityagrihas) and monasteries (viharas) adorned with masterfully preserved dry-plaster frescoes depicting the Jataka tales.',
  fullDescription:
    'The Ajanta Caves in Maharashtra are approximately 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE. The caves include paintings and rock-cut sculptures described as among the finest surviving examples of ancient Indian art, particularly expressive painting that presents emotions through gesture, pose and form.',
  heroImage:
    'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=1200&auto=format&fit=crop',
  heroImageAlt:
    'Panoramic view of the rock-cut Buddhist chaitya facade and horseshoe gorge at Ajanta Caves',
  modelUrl: '/models/taj_mahal.glb',
  hotspots: [
    {
      id: 'cave-1-padmapani',
      title: 'Bodhisattva Padmapani Fresco (Cave 1)',
      position: [0, 1.8, 0],
      description:
        'World-renowned 5th-century masterpiece mural depicting the compassionate Bodhisattva holding a blue lotus with graceful tribhanga posture.',
      sourceIds: ['AJ-001'],
    },
    {
      id: 'cave-19-chaitya',
      title: 'Cave 19 Chaityagriha Facade',
      position: [-1.5, 2.0, 1.0],
      description:
        'Elaborate sculpted chaitya arch facade with standing Buddha icons and intricate sun-window (chandrashala) illumination.',
      sourceIds: ['AJ-002'],
    },
    {
      id: 'cave-26-mahaparinirvana',
      title: 'Reclining Buddha (Mahaparinirvana)',
      position: [1.2, 0.8, -1.0],
      description:
        'Colossal 7-meter monolith of the Buddha entering final Nirvana, surrounded by weeping disciples and heavenly celestials.',
      sourceIds: ['AJ-003'],
    },
  ],
  timeline: [
    {
      id: 'aj-phase-1',
      year: '2nd Century BCE',
      title: 'Hinayana Phase',
      description:
        'Earliest chaityas (Caves 9, 10, 12, 13) excavated under Satavahana patron rule focusing on stupa veneration.',
      sourceIds: ['AJ-001'],
    },
    {
      id: 'aj-phase-2',
      year: '5th Century CE',
      title: 'Mahayana Golden Age',
      description:
        'Emperor Harishena of the Vakataka dynasty commissions lavish viharas and master mural ateliers.',
      sourceIds: ['AJ-002'],
    },
    {
      id: 'aj-1983',
      year: '1983 CE',
      title: 'UNESCO World Heritage Status',
      description:
        'Inscribed as universal masterpieces of classical Indian religious art and architecture.',
      sourceIds: ['AJ-004'],
    },
  ],
  culturalSignificance: [
    'Unsurpassed classical zenith of Asian Buddhist wall painting and tempera technique.',
    'Chronicles five centuries of sacred iconography, monastic daily life, and court attire.',
    'UNESCO World Heritage Site since 1983.',
  ],
  historicalHighlights: [
    { id: 'hl-caves', label: 'Sanctuaries', value: '30 Rock Caves' },
    { id: 'hl-age', label: 'History', value: '2,200+ Years' },
    { id: 'hl-phase', label: 'Excavation', value: '2 Dynastic Eras' },
    { id: 'hl-unesco', label: 'UNESCO Site', value: 'Since 1983' },
  ],
  experience: {
    web3d: true,
    ar: false,
    vr: false,
  },
};

export const RED_FORT_DATA: Monument = {
  id: 'red-fort',
  slug: 'red-fort',
  name: 'Red Fort (Lal Qila)',
  alternateNames: ['Lal Qila', 'Qila-e-Mubarak'],
  location: 'Old Delhi, Delhi, India',
  period: 'Mughal Citadel Architecture (1638–1648 CE)',
  builtBy: 'Emperor Shah Jahan',
  shortDescription:
    'The historic red sandstone imperial citadel of the Mughal emperors, crowned by the Lahori Gate and Diwan-i-Khas.',
  historicalSummary:
    'Commissioned in 1638 when Emperor Shah Jahan shifted his imperial capital from Agra to Shahjahanabad (Old Delhi), the Red Fort represents the peak of Mughal palace-fortress planning. Enclosed by 2.4 kilometers of massive red sandstone ramparts along the Yamuna river, the fort synthesizes Persian, Timurid, and Hindu architectural traditions into octagonal pavilions, marble waterways (Nahr-i-Bihisht), and ornamental chattris.',
  fullDescription:
    'The Red Fort is a historic fort in Old Delhi, India, that served as the main residence of the Mughal emperors. Emperor Shah Jahan commissioned construction of the Red Fort on 12 May 1638, when he decided to shift his capital from Agra to Delhi. Originally red and white, its design is credited to architect Ustad Ahmad Lahori.',
  heroImage:
    'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200&auto=format&fit=crop',
  heroImageAlt:
    'The majestic red sandstone bastions and Lahori Gate of the Red Fort in Delhi',
  modelUrl: '/models/taj_mahal.glb',
  hotspots: [
    {
      id: 'lahori-gate',
      title: 'Lahori Gate & Chhatta Chowk',
      position: [0, 1.5, 2.0],
      description:
        'The ceremonial main portal with octagonal ramparts leading into the vaulted covered bazaar.',
      sourceIds: ['RF-001'],
    },
    {
      id: 'diwan-i-khas',
      title: 'Diwan-i-Khas (Hall of Private Audience)',
      position: [0, 2.2, 0],
      description:
        'White marble pavilion famous for inlaid pietra dura floral columns and the Persian inscription: "If there is a paradise on earth, it is this, it is this, it is this."',
      sourceIds: ['RF-002'],
    },
    {
      id: 'moti-masjid',
      title: 'Moti Masjid (Pearl Mosque)',
      position: [1.5, 1.2, -0.8],
      description:
        'White marble private mosque built by Emperor Aurangzeb with three polished bulbous domes.',
      sourceIds: ['RF-003'],
    },
  ],
  timeline: [
    {
      id: 'rf-1638',
      year: '1638 CE',
      title: 'Foundation Laid',
      description:
        'Emperor Shah Jahan initiates construction of the new imperial capital Shahjahanabad.',
      sourceIds: ['RF-001'],
    },
    {
      id: 'rf-1648',
      year: '1648 CE',
      title: 'Inauguration Ceremony',
      description:
        'The imperial court enters the completed palace fortress under architect Ustad Ahmad Lahori.',
      sourceIds: ['RF-001', 'RF-002'],
    },
    {
      id: 'rf-2007',
      year: '2007 CE',
      title: 'UNESCO World Heritage Status',
      description:
        'Inscribed for its refined synthesis of Islamic, Persian, Timurid and Hindu design traditions.',
      sourceIds: ['RF-004'],
    },
  ],
  culturalSignificance: [
    'The political heart of the Mughal Empire for two centuries.',
    'Site of national independence day addresses from the ramparts of Lahori Gate.',
    'UNESCO World Heritage Site since 2007.',
  ],
  historicalHighlights: [
    { id: 'hl-perimeter', label: 'Rampart Walls', value: '2.41 km' },
    { id: 'hl-built', label: 'Completed', value: '1648 CE' },
    { id: 'hl-style', label: 'Architecture', value: 'Shahjahani Mughal' },
    { id: 'hl-unesco', label: 'UNESCO Site', value: 'Since 2007' },
  ],
  experience: {
    web3d: true,
    ar: false,
    vr: false,
  },
};

export const HAMPI_DATA: Monument = {
  id: 'hampi',
  slug: 'hampi',
  name: 'Hampi (Vijayanagara)',
  alternateNames: ['Group of Monuments at Hampi', 'Pampa Kshetra'],
  location: 'Vijayanagara, Karnataka, India',
  period: 'Vijayanagara Dravidian Architecture (14th–16th Century CE)',
  builtBy: 'Sangama & Tuluva Dynasties (King Krishnadevaraya)',
  shortDescription:
    'The sprawling ruins of the medieval Vijayanagara Empire, featuring the iconic Stone Chariot, musical pillared halls, and monolithic shrines.',
  historicalSummary:
    'Nestled within the dramatic boulder-strewn landscape along the Tungabhadra river, Hampi was the capital of the Vijayanagara Empire—one of the wealthiest and largest medieval metropolises in the world. Its over 1,600 surviving monuments include massive Dravidian temple complexes with pushkarinis, monolithic Narasimha and Ganesha statues, elephant stables, and the legendary Vittala Temple stone chariot.',
  fullDescription:
    'Hampi is an ancient village in the south Indian state of Karnataka. It is dotted with numerous ruined temple complexes from the Vijayanagara Empire. On the south bank of the River Tungabhadra is the 7th-century Hindu Virupaksha Temple, near the revived Hampi Bazaar. A carved stone chariot stands in front of the huge Vittala Temple site.',
  heroImage:
    'https://images.unsplash.com/photo-1600100397608-f010f4439c36?q=80&w=1200&auto=format&fit=crop',
  heroImageAlt:
    'The iconic Stone Chariot in the courtyard of Vittala Temple at Hampi, Karnataka',
  modelUrl: '/models/taj_mahal.glb',
  hotspots: [
    {
      id: 'stone-chariot',
      title: 'Vittala Temple Stone Chariot',
      position: [0, 1.4, 0],
      description:
        'Ornate shrine dedicated to Garuda carved as an intricate granite ceremonial chariot with revolving stone wheels.',
      sourceIds: ['HM-001'],
    },
    {
      id: 'musical-pillars',
      title: 'Maha-Mandapa Musical Pillars',
      position: [-1.2, 1.8, 1.0],
      description:
        'Fifty-six monolith granite pillars engineered to emit precise musical notes and resonance frequencies when tapped.',
      sourceIds: ['HM-002'],
    },
    {
      id: 'virupaksha-temple',
      title: 'Virupaksha Temple Gopuram',
      position: [1.5, 2.5, -0.5],
      description:
        'Nine-tiered 50-meter gateway tower continuously active since the 7th century CE overlooking Hampi Bazaar.',
      sourceIds: ['HM-003'],
    },
  ],
  timeline: [
    {
      id: 'hm-1336',
      year: '1336 CE',
      title: 'Empire Founded',
      description:
        'Brothers Harihara I and Bukka Raya I establish the Vijayanagara Empire capital at Hampi.',
      sourceIds: ['HM-001'],
    },
    {
      id: 'hm-1509',
      year: '1509–1529 CE',
      title: 'Golden Age under Krishnadevaraya',
      description:
        'Construction of the Vittala Temple mandapas, Krishna temple, and royal irrigation networks.',
      sourceIds: ['HM-002'],
    },
    {
      id: 'hm-1986',
      year: '1986 CE',
      title: 'UNESCO World Heritage Inscription',
      description:
        'Recognized for exceptional Dravidian temple architecture and urban landscape integration.',
      sourceIds: ['HM-004'],
    },
  ],
  culturalSignificance: [
    'One of the largest preserved medieval temple metropolis landscapes in the world.',
    'Mastery of granite monolith carving and advanced watershed engineering.',
    'UNESCO World Heritage Site since 1986.',
  ],
  historicalHighlights: [
    { id: 'hl-area', label: 'Archaeological Area', value: '4,100+ Hectares' },
    { id: 'hl-monuments', label: 'Surviving Relics', value: '1,600+ Sites' },
    { id: 'hl-empire', label: 'Dynasty', value: 'Vijayanagara' },
    { id: 'hl-unesco', label: 'UNESCO Site', value: 'Since 1986' },
  ],
  experience: {
    web3d: true,
    ar: false,
    vr: false,
  },
};

export const KONARK_DATA: Monument = {
  id: 'konark-sun-temple',
  slug: 'konark-sun-temple',
  name: 'Konark Sun Temple',
  alternateNames: ['Black Pagoda', 'Surya Devalaya'],
  location: 'Puri District, Odisha, India',
  period: 'Kalinga Temple Architecture (1250 CE)',
  builtBy: 'King Narasimhadeva I (Eastern Ganga Dynasty)',
  shortDescription:
    'A colossal 13th-century stone temple conceived as the 24-wheeled chariot of Surya the Sun God, pulled by seven stone steeds.',
  historicalSummary:
    'Built on the shores of the Bay of Bengal around 1250 CE, the Konark Sun Temple is the crowning glory of ancient Kalinga stone architecture. Conceived as a colossal celestial chariot with 24 intricately sculpted stone wheels functioning as precision sundials, the sanctuary aligns astronomically with the first rays of the dawn sun. Over twelve hundred artisans spent twelve years carving its khondalite stone surfaces with dancers, celestial nymphs, and cosmic epics.',
  fullDescription:
    'Konark Sun Temple is a 13th-century CE Sun temple at Konark about 35 kilometres northeast from Puri on the coastline of Odisha, India. The temple is attributed to king Narasimhadeva I of the Eastern Ganga dynasty about 1250 CE. Dedicated to the Hindu Sun God Surya, what remains of the temple complex has the appearance of a 100-foot high chariot with immense wheels and horses, all carved from stone.',
  heroImage:
    'https://images.unsplash.com/photo-1628080967341-3eb287e07664?q=80&w=1200&auto=format&fit=crop',
  heroImageAlt:
    'The colossal carved stone wheel of the Konark Sun Temple with detailed astronomical spokes, Odisha',
  modelUrl: '/models/taj_mahal.glb',
  hotspots: [
    {
      id: 'konark-wheel',
      title: 'Astronomical Sundial Wheel',
      position: [0, 1.5, 0],
      description:
        'Nine-foot stone wheels whose spoke shadows calculate exact time down to the minute, incorporating solar and lunar alignments.',
      sourceIds: ['KN-001'],
    },
    {
      id: 'natya-mandap',
      title: 'Natya Mandap (Hall of Dance)',
      position: [1.2, 1.8, 1.2],
      description:
        'Pillared dancing pavilion adorned with 128 classical Odissi dance postures, musicians, and celestial apsaras.',
      sourceIds: ['KN-002'],
    },
    {
      id: 'seven-horses',
      title: 'Seven Cosmic Steeds',
      position: [-1.4, 0.9, 1.8],
      description:
        'Monumental galloping stone horses symbolizing the seven days of the week and the seven colors of sunlight.',
      sourceIds: ['KN-003'],
    },
  ],
  timeline: [
    {
      id: 'kn-1250',
      year: '1250 CE',
      title: 'Temple Consecration',
      description:
        'King Narasimhadeva I consecrates the monument following his military triumphs, dedicating it to Surya.',
      sourceIds: ['KN-001'],
    },
    {
      id: 'kn-1600',
      year: '16th Century CE',
      title: 'Maritime Navigational Beacon',
      description:
        'European sailors nickname the dark stone temple the "Black Pagoda" as a landmark for Bay of Bengal voyages.',
      sourceIds: ['KN-002'],
    },
    {
      id: 'kn-1984',
      year: '1984 CE',
      title: 'UNESCO World Heritage Status',
      description:
        'Inscribed as one of India’s most monumental sculptural and astronomical architectural achievements.',
      sourceIds: ['KN-004'],
    },
  ],
  culturalSignificance: [
    'Supreme architectural achievement of the Kalinga style.',
    'Sophisticated integration of ancient Indian astronomy, mathematics, and sculptural artistry.',
    'UNESCO World Heritage Site since 1984.',
  ],
  historicalHighlights: [
    { id: 'hl-wheels', label: 'Sundial Wheels', value: '24 Chariot Wheels' },
    { id: 'hl-horses', label: 'Celestial Steeds', value: '7 Sculpted Horses' },
    { id: 'hl-dynasty', label: 'Dynasty', value: 'Eastern Ganga' },
    { id: 'hl-unesco', label: 'UNESCO Site', value: 'Since 1984' },
  ],
  experience: {
    web3d: true,
    ar: false,
    vr: false,
  },
};

export const SHANIWAR_WADA_DATA: Monument = {
  id: 'shaniwar-wada',
  slug: 'shaniwar-wada',
  name: 'Shaniwar Wada',
  alternateNames: ['Sanivarvada', 'Peshwa Palace'],
  location: 'Pune, Maharashtra, India',
  period: 'Maratha Citadel Architecture (1732 CE)',
  builtBy: 'Peshwa Baji Rao I',
  shortDescription:
    'The historic 18th-century seven-story fortified palace and seat of the Maratha Empire, famed for the grand Dilli Darwaza and fortified bastions.',
  historicalSummary:
    'Shaniwar Wada was built in 1732 as the ceremonial and administrative seat of the Peshwas of the Maratha Empire. Commissioned by Peshwa Baji Rao I, this legendary fortress-palace complex featured five grand gateways, massive teak doors armored with elephant-deterrent steel spikes, expansive courtyards, lotus-shaped fountains, and intricate teak wood balconies showcasing classic Maratha military and palace architecture.',
  fullDescription:
    'Shaniwar Wada is an 18th-century fortification in the city of Pune in Maharashtra, India. Built in 1732, it was the seat of the Peshwas of the Maratha Empire until 1818. Following the rise of the Maratha Empire, the palace became the center of Indian politics in the 18th century. The complex originally contained a seven-story palace made of stone and teakwood, surrounded by monumental ramparts and five ornate security gates including the Delhi Gate.',
  heroImage: '/images/shaniwar-wada.jpg',
  heroImageAlt:
    'The grand fortified stone facade and Delhi Gate of Shaniwar Wada in Pune, Maharashtra',
  modelUrl: '/models/taj_mahal.glb',
  hotspots: [
    {
      id: 'dilli-darwaza',
      title: 'Dilli Darwaza (Delhi Gate)',
      position: [0, 1.8, 1.5],
      description:
        'The monumental north-facing main portal armed with 72 sharp steel spikes designed to repel war elephants, crowned by the drum-chamber (Nagar Khana).',
      sourceIds: ['SW-001'],
    },
    {
      id: 'hazari-karanje',
      title: 'Hazari Karanje (Fountain of a Thousand Jets)',
      position: [0, 0.5, 0],
      description:
        'Exquisite 16-petal lotus fountain engineered with complex subterranean hydraulic channels to shoot thousands of mist jets.',
      sourceIds: ['SW-002'],
    },
    {
      id: 'mastani-darwaza',
      title: 'Mastani Darwaza & Bastions',
      position: [1.5, 1.5, -1.0],
      description:
        'The historic eastern gateway used by Mastani, flanked by massive semicircular dressed basalt stone bastions with archery loopholes.',
      sourceIds: ['SW-003'],
    },
  ],
  timeline: [
    {
      id: 'sw-1730',
      year: '1730 CE',
      title: 'Foundation Laid',
      description:
        'Peshwa Baji Rao I lays the foundation stone on an auspicious Saturday (Shaniwar).',
      sourceIds: ['SW-001'],
    },
    {
      id: 'sw-1732',
      year: '1732 CE',
      title: 'Palace Consecration',
      description:
        'Formal Griha Pravesh ceremony inaugurates the seven-story wooden palace and court.',
      sourceIds: ['SW-002'],
    },
    {
      id: 'sw-1758',
      year: '1758 CE',
      title: 'Fortress Ramparts Completed',
      description:
        'Massive stone ramparts, nine bastions, and five fortified gates completed by Peshwa Nanasaheb.',
      sourceIds: ['SW-003'],
    },
    {
      id: 'sw-1919',
      year: '1919 CE',
      title: 'Archaeological Protection',
      description:
        'Declared a protected monument of national importance under the Archaeological Survey of India (ASI).',
      sourceIds: ['SW-004'],
    },
  ],
  culturalSignificance: [
    'Supreme symbol of Maratha imperial sovereignty and 18th-century military engineering.',
    'Seat of governance for Peshwa Baji Rao I, Nanasaheb, and Madhavrao I during peak territorial expansion.',
    'Protected National Heritage Monument under the Archaeological Survey of India (ASI).',
  ],
  historicalHighlights: [
    { id: 'hl-dynasty', label: 'Empire', value: 'Maratha Confederacy' },
    { id: 'hl-founder', label: 'Built By', value: 'Peshwa Baji Rao I' },
    { id: 'hl-gates', label: 'Fortified Gates', value: '5 Bastion Gates' },
    { id: 'hl-status', label: 'ASI Heritage', value: 'National Monument' },
  ],
  experience: {
    web3d: true,
    ar: false,
    vr: false,
  },
  categories: ['maratha', 'fort'],
  isUnesco: false,
};

export const ELLORA_CAVES_DATA: Monument = {
  id: 'ellora-caves',
  slug: 'ellora-caves',
  name: 'Ellora Caves (Kailasa Temple)',
  alternateNames: ['Verul Leni', 'Kailashnath Temple'],
  location: 'Aurangabad, Maharashtra, India',
  period: 'Rashtrakuta Monolithic Rock-Cut Architecture (6th–10th Century CE)',
  builtBy: 'Rashtrakuta Dynasty (King Krishna I)',
  shortDescription:
    'A breathtaking complex of 34 rock-cut sanctuaries carved into Charanandri hills, centered on the monolithic multi-story Kailasa Temple.',
  historicalSummary:
    'Ellora represents the epitome of Indian rock-cut architecture. The 34 monasteries and temples, excavated side by side into the basalt cliffs, represent Buddhist, Hindu, and Jain sanctuaries. The crowning achievement is Cave 16 (Kailasa Temple), a colossal multi-story temple complex carved entirely from top to bottom out of a single monolithic basalt rock cliff, removing over 200,000 tonnes of volcanic rock without scaffolding.',
  fullDescription:
    'Ellora is a UNESCO World Heritage Site located in the Aurangabad district of Maharashtra, India. It is one of the largest rock-cut temple complexes in the world, featuring Hindu, Buddhist and Jain monuments from the Rashtrakuta and Yadava dynasties.',
  heroImage:
    'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?q=80&w=1200&auto=format&fit=crop',
  heroImageAlt: 'The monolithic rock-cut Kailasa Temple carved out of vertical cliff rock at Ellora Caves',
  modelUrl: '/models/taj_mahal.glb',
  hotspots: [
    {
      id: 'kailasa-shikhara',
      title: 'Monolith Kailasa Shikhara',
      position: [0, 2.0, 0],
      description: 'The 30-meter-tall central vimana tower carved out of solid vertical basalt rock.',
      sourceIds: ['EL-001'],
    },
  ],
  timeline: [
    {
      id: 'el-757',
      year: '757–773 CE',
      title: 'Kailasa Monolith Excavation',
      description: 'King Krishna I of the Rashtrakuta dynasty commissions the top-down excavation of Cave 16.',
      sourceIds: ['EL-001'],
    },
    {
      id: 'el-1983',
      year: '1983 CE',
      title: 'UNESCO World Heritage Status',
      description: 'Inscribed alongside Ajanta as masterpieces of rock-cut sculpture and dynastic harmony.',
      sourceIds: ['EL-002'],
    },
  ],
  culturalSignificance: [
    'Largest monolithic rock excavation in architectural history.',
    'Harmonious coexistence of Hindu, Buddhist, and Jain traditions.',
    'UNESCO World Heritage Site since 1983.',
  ],
  historicalHighlights: [
    { id: 'hl-monolith', label: 'Excavation', value: '200,000 Tonnes' },
    { id: 'hl-caves', label: 'Caves', value: '34 Sanctuaries' },
    { id: 'hl-dynasty', label: 'Dynasty', value: 'Rashtrakuta' },
    { id: 'hl-unesco', label: 'UNESCO Site', value: 'Since 1983' },
  ],
  experience: {
    web3d: true,
    ar: false,
    vr: false,
  },
  categories: ['ancient', 'temple', 'unesco'],
  isUnesco: true,
};

export const GOLCONDA_FORT_DATA: Monument = {
  id: 'golconda-fort',
  slug: 'golconda-fort',
  name: 'Golconda Fort',
  alternateNames: ['Golla Konda', 'Shepherd Hill Fort'],
  location: 'Hyderabad, Telangana, India',
  period: 'Kakatiya & Qutb Shahi Citadel Architecture (12th–17th Century CE)',
  builtBy: 'Kakatiya Dynasty & Sultan Quli Qutb-ul-Mulk',
  shortDescription:
    'A fortified medieval citadel famed for its acoustic signalling engineering, royal palaces, and as the diamond vault of the Koh-i-Noor.',
  historicalSummary:
    'Perched on a 120-metre-high granite hill, Golconda Fort was the formidable capital of the medieval Qutb Shahi dynasty. Famed worldwide for its diamond trade that yielded the Koh-i-Noor, Hope, and Daria-i-Noor diamonds, the citadel features sophisticated acoustic engineering where a hand-clap at the entrance portal can be heard clearly a kilometer away at the highest pavilion (Bala Hissar).',
  fullDescription:
    'Golconda is a fortified citadel and an early capital city of the Qutb Shahi dynasty, located in Hyderabad, Telangana, India. Because of the vicinity of diamond mines, especially Kollur Mine, Golconda flourished as a trade center of large diamonds.',
  heroImage:
    'https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=1200&auto=format&fit=crop',
  heroImageAlt: 'The stone ramparts, battlements, and arched bastions of Golconda Fort in Hyderabad',
  modelUrl: '/models/taj_mahal.glb',
  hotspots: [
    {
      id: 'bala-hissar',
      title: 'Bala Hissar & Acoustic Clapping Portico',
      position: [0, 2.0, 0],
      description: 'Acoustic architectural design echoing sound from Fateh Darwaza to the hilltop summit.',
      sourceIds: ['GF-001'],
    },
  ],
  timeline: [
    {
      id: 'gf-1518',
      year: '1518 CE',
      title: 'Qutb Shahi Fortification',
      description: 'Sultan Quli Qutb-ul-Mulk expands the mud fort into a formidable granite citadel.',
      sourceIds: ['GF-001'],
    },
  ],
  culturalSignificance: [
    'Epicenter of the historic Golconda diamond trading empire.',
    'Mastery of defensive acoustic and hydraulic hill-fort engineering.',
    'ASI Protected Monument of National Importance.',
  ],
  historicalHighlights: [
    { id: 'hl-circuit', label: 'Rampart Circuit', value: '10 Kilometres' },
    { id: 'hl-height', label: 'Hilltop Elevation', value: '120 Metres' },
    { id: 'hl-diamonds', label: 'Heritage', value: 'Koh-i-Noor Vault' },
    { id: 'hl-status', label: 'ASI Heritage', value: 'National Monument' },
  ],
  experience: {
    web3d: true,
    ar: false,
    vr: false,
  },
  categories: ['fort'],
  isUnesco: false,
};

// Set categories on existing monuments
AJANTA_CAVES_DATA.categories = ['ancient', 'unesco'];
AJANTA_CAVES_DATA.isUnesco = true;

RED_FORT_DATA.categories = ['mughal', 'fort', 'unesco'];
RED_FORT_DATA.isUnesco = true;

HAMPI_DATA.categories = ['ancient', 'temple', 'unesco'];
HAMPI_DATA.isUnesco = true;

KONARK_DATA.categories = ['ancient', 'temple', 'unesco'];
KONARK_DATA.isUnesco = true;

/**
 * Central monument collection.
 * Registers major featured Indian heritage sites.
 */
export const MONUMENTS: Monument[] = [
  TAJ_MAHAL_DATA,
  SHANIWAR_WADA_DATA,
  AJANTA_CAVES_DATA,
  RED_FORT_DATA,
  HAMPI_DATA,
  KONARK_DATA,
  ELLORA_CAVES_DATA,
  GOLCONDA_FORT_DATA,
];

/**
 * Look up a monument by its URL slug.
 */
export function getMonumentBySlug(slug: string): Monument | undefined {
  return MONUMENTS.find((m) => m.slug === slug);
}

/**
 * Look up a monument by its unique id.
 */
export function getMonumentById(id: string): Monument | undefined {
  return MONUMENTS.find((m) => m.id === id);
}

