// data.jsx — Content for KCA Community Portal
// Bilingual English / Anishinaabemowin (Ojibwe) strings, services, events, news.
// KCA serves nine Anishinaabe First Nations in Treaty 3 territory.

const KCA_COMMUNITIES = [
  { name: 'Anishinaabeg of Naongashiing', short: 'Naongashiing' },
  { name: 'Big Grassy River First Nation', short: 'Big Grassy' },
  { name: 'Naotkamegwanning First Nation', short: 'Naotkamegwanning' },
  { name: 'Obashkaandagaang', short: 'Obashkaandagaang' },
  { name: 'Ochiichagwe\u2019Babigo\u2019Ining', short: 'Ochiichagwe\u2019Babigo\u2019Ining' },
  { name: 'Shoal Lake 40 First Nation', short: 'Shoal Lake 40' },
  { name: 'Wabaseemoong Independent Nations', short: 'Wabaseemoong' },
  { name: 'Wabauskang First Nation', short: 'Wabauskang' },
  { name: 'Wauzhushk Onigum Nation', short: 'Wauzhushk Onigum' },
];

const OJIBWE = {
  // Greetings
  boozhoo: 'Boozhoo',             // Hello
  aaniin: 'Aaniin',               // Hello/Greetings
  miigwech: 'Miigwech',           // Thank you
  gi_waabamin: 'Giga-waabamin',   // See you later
  // Nav / sections
  services: 'Naadamaagewinan',    // Helping-ways / services
  events: 'Izhichigewinan',       // Happenings / events
  news: 'Dibaajimowinan',         // Stories / news
  resources: 'Gikendaasowinan',   // Knowledge / resources
  communities: 'Anishinaabe-izhitwaawinan', // — using communities
  home: 'Endaayaang',             // At home
  profile: 'Mii Niin',            // Me / myself
  book: 'Ozhibii\u2019igeng',     // To write (book / schedule)
  // Seasons
  spring: 'Ziigwan',
  summer: 'Niibin',
  fall: 'Dagwaagin',
  winter: 'Biboon',
  // Directions (medicine wheel)
  east: 'Waabanong',
  south: 'Zhaawanong',
  west: 'Epangishimog',
  north: 'Giiwedinong',
};

const SERVICES = [
  {
    id: 'mino',
    en: 'Mino-Bimaadiziwin Wellness',
    oj: 'Mino-Bimaadiziwin',
    subtitle: 'The Good Life — holistic health & mental wellness',
    pillar: 'Wellness',
    description: 'Counselling, cultural support, traditional healing coordination, and crisis response rooted in Anishinaabe teachings.',
    duration: '45\u201360 min',
    location: 'In-person · Virtual',
    color: '#6B8E4E',
  },
  {
    id: 'family',
    en: 'Family & Child Well-being',
    oj: 'Abinoojiiyag gaye Giiwi\u2019idiwin',
    subtitle: 'Families staying strong together',
    pillar: 'Family',
    description: 'Family support workers, kinship care navigation, parenting circles, and cultural connection programs for children and youth.',
    duration: 'Varies',
    location: 'In-person',
    color: '#B8463D',
  },
  {
    id: 'health',
    en: 'Community Health',
    oj: 'Mashkiki-Naadamaagewin',
    subtitle: 'Nurses, diabetes support, maternal care',
    pillar: 'Health',
    description: 'Home & community nursing, chronic disease management, maternal-child health, immunizations, and mobile clinics.',
    duration: '30\u201345 min',
    location: 'In-person · Mobile',
    color: '#6B4A7A',
  },
  {
    id: 'youth',
    en: 'Youth & Recreation',
    oj: 'Oshki-Anishinaabeg',
    subtitle: 'Programs for youth ages 12\u201325',
    pillar: 'Youth',
    description: 'Drop-in space, land-based learning, sports, cultural camps, leadership programs, and peer support.',
    duration: 'Drop-in',
    location: 'Youth Hub · Land camp',
    color: '#E8B25C',
  },
  {
    id: 'justice',
    en: 'Justice & Mediation',
    oj: 'Gwayakochigewin',
    subtitle: 'Restorative, community-led justice',
    pillar: 'Justice',
    description: 'Court support, restorative circles, Gladue reports, and community mediation grounded in the Seven Grandfather Teachings.',
    duration: '60 min',
    location: 'In-person · Court',
    color: '#2B4A5C',
  },
  {
    id: 'education',
    en: 'Education & Training',
    oj: 'Gikinoo\u2019amaadiwin',
    subtitle: 'Pathways to learning and work',
    pillar: 'Learning',
    description: 'Tutoring, post-secondary navigation, employment readiness, trades pathways, and cultural education.',
    duration: '45 min',
    location: 'In-person · Virtual',
    color: '#8B6B3D',
  },
];

// Events — aligned with seasonal Anishinaabe calendar
const EVENTS = [
  {
    id: 'ev1',
    day: 28, month: 'APR', monthOj: 'Iskigamizige-giizis',
    title: 'Spring Sugar Bush Camp',
    oj: 'Ziigwani-Ziinzibaakwadwaaboo-Gabeshiwin',
    time: '9:00 AM \u2013 3:00 PM',
    location: 'Land Camp · Kenora',
    category: 'Cultural',
    hostedBy: 'Elders Council',
    spots: 12,
    color: '#6B8E4E',
    featured: true,
  },
  {
    id: 'ev2',
    day: 3, month: 'MAY', monthOj: 'Zaagibagaa-giizis',
    title: 'Youth Night \u2014 Beading Circle',
    oj: 'Mazinigwaaso-Giizhebaawagak',
    time: '6:00 PM \u2013 8:30 PM',
    location: 'Youth Hub · Kenora',
    category: 'Youth',
    hostedBy: 'Youth & Rec',
    spots: 20,
    color: '#E8B25C',
  },
  {
    id: 'ev3',
    day: 10, month: 'MAY', monthOj: 'Zaagibagaa-giizis',
    title: 'Mother\u2019s Moon Feast',
    oj: 'Nimamaa Dibiki-Giizis Wiikwandiwin',
    time: '5:00 PM \u2013 9:00 PM',
    location: 'Community Hall',
    category: 'Ceremony',
    hostedBy: 'Elders & Family Services',
    spots: 60,
    color: '#B8463D',
  },
  {
    id: 'ev4',
    day: 17, month: 'MAY', monthOj: 'Zaagibagaa-giizis',
    title: 'Traditional Medicine Walk',
    oj: 'Mashkiki-Babaamose',
    time: '10:00 AM \u2013 1:00 PM',
    location: 'Rushing River trail',
    category: 'Land-based',
    hostedBy: 'Community Health',
    spots: 15,
    color: '#6B4A7A',
  },
  {
    id: 'ev5',
    day: 24, month: 'MAY', monthOj: 'Zaagibagaa-giizis',
    title: 'Annual Spring Pow Wow',
    oj: 'Ziigwan Niimi\u2019idiwin',
    time: 'Grand Entry 1:00 PM',
    location: 'Anicinabe Park',
    category: 'Pow Wow',
    hostedBy: 'Kenora Chiefs Advisory',
    spots: 500,
    color: '#2B4A5C',
    featured: true,
  },
  {
    id: 'ev6',
    day: 5, month: 'JUN', monthOj: 'Ode\u2019imini-giizis',
    title: 'Fathers & Children Fishing Derby',
    oj: 'Giigoonykewin',
    time: '7:00 AM \u2013 2:00 PM',
    location: 'Lake of the Woods',
    category: 'Land-based',
    hostedBy: 'Family Services',
    spots: 40,
    color: '#8B6B3D',
  },
];

const NEWS = [
  {
    id: 'n1',
    kicker: 'Announcement',
    title: 'New Mobile Health Unit launches in June',
    excerpt: 'Our new mobile clinic will visit each of the nine member communities on a rotating 6-week schedule starting June 10.',
    author: 'Community Health',
    date: 'April 18',
    readTime: '3 min',
    pinned: true,
    color: '#6B4A7A',
  },
  {
    id: 'n2',
    kicker: 'Story',
    title: 'Youth delegates return from National Gathering',
    excerpt: 'Twelve Oshki-Anishinaabeg delegates share what they learned at the National Indigenous Youth Gathering in Winnipeg.',
    author: 'Youth & Rec',
    date: 'April 14',
    readTime: '5 min',
    color: '#E8B25C',
  },
  {
    id: 'n3',
    kicker: 'Notice',
    title: 'Office closed for Ziigwan ceremony \u2014 April 25',
    excerpt: 'All KCA offices will be closed Friday for a staff-wide spring ceremony. Emergency lines remain open.',
    author: 'Administration',
    date: 'April 12',
    readTime: '1 min',
    color: '#B8463D',
  },
  {
    id: 'n4',
    kicker: 'Story',
    title: 'Language revitalization: 40 new speakers this year',
    excerpt: 'Our Anishinaabemowin immersion program graduates its largest cohort to date.',
    author: 'Education',
    date: 'April 7',
    readTime: '4 min',
    color: '#6B8E4E',
  },
];

const RESOURCES = [
  { id: 'r1', title: 'Jordan\u2019s Principle \u2014 Request Form', type: 'PDF Form', size: '248 KB', cat: 'Forms' },
  { id: 'r2', title: 'Non-Insured Health Benefits Guide', type: 'Guide', size: '1.2 MB', cat: 'Guides' },
  { id: 'r3', title: 'Seven Grandfather Teachings \u2014 Youth Workbook', type: 'Workbook', size: '3.4 MB', cat: 'Cultural' },
  { id: 'r4', title: 'Post-Secondary Funding Application', type: 'PDF Form', size: '412 KB', cat: 'Forms' },
  { id: 'r5', title: 'Traditional Foods & Diabetes', type: 'Booklet', size: '2.1 MB', cat: 'Health' },
  { id: 'r6', title: 'Gladue Report \u2014 What to Expect', type: 'Guide', size: '680 KB', cat: 'Guides' },
  { id: 'r7', title: 'Anishinaabemowin Learner\u2019s Audio Pack', type: 'Audio', size: '42 MB', cat: 'Cultural' },
  { id: 'r8', title: 'Family Services Intake Form', type: 'PDF Form', size: '320 KB', cat: 'Forms' },
];

// Current "moon" / season — late April is Iskigamizige-giizis (Sugar-bush moon, spring)
const CURRENT_MOON = {
  name: 'Iskigamizige-giizis',
  en: 'Sugar-bush Moon',
  season: 'Ziigwan',
  seasonEn: 'Spring',
  phase: 0.55, // waxing gibbous
};

Object.assign(window, {
  KCA_COMMUNITIES, OJIBWE, SERVICES, EVENTS, NEWS, RESOURCES, CURRENT_MOON,
});
