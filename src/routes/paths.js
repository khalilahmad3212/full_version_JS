// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking')
  },
  authorities: {
    root: path(ROOTS_DASHBOARD, '/authorities'),
    syndicate: path(ROOTS_DASHBOARD, '/authorities/syndicate'),
    senate: path(ROOTS_DASHBOARD, '/authorities/senate'),
    academicCouncel: path(ROOTS_DASHBOARD, '/authorities/academic-councel'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all')
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey')
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  // publications
  publications: path(ROOTS_DASHBOARD, '/publications'),
  newPublication: path(ROOTS_DASHBOARD, '/publications/new'),
  // departments
  departments: path(ROOTS_DASHBOARD, '/departments'),
  newDepartment: path(ROOTS_DASHBOARD, '/department/new'),
  // organizations
  organizations: path(ROOTS_DASHBOARD, '/organizations'),
  newOrganizations: path(ROOTS_DASHBOARD, '/organization/new'),
  // Programs
  programs: path(ROOTS_DASHBOARD, '/programs'),
  newProgram: path(ROOTS_DASHBOARD, '/programs/new'),
  // Experience
  experience: path(ROOTS_DASHBOARD, '/experience'),
  newExperience: path(ROOTS_DASHBOARD, '/experience/new'),
  // Experience
  recognition: path(ROOTS_DASHBOARD, '/recognition'),
  newRecognition: path(ROOTS_DASHBOARD, '/recognition/new'),
  // Education
  education: path(ROOTS_DASHBOARD, '/education'),
  newEducation: path(ROOTS_DASHBOARD, '/education/new'),
  // News
  news: path(ROOTS_DASHBOARD, '/news'),
  newNews: path(ROOTS_DASHBOARD, '/news/new'),
  // Announcements
  announcements: path(ROOTS_DASHBOARD, '/announcement'),
  newAnnouncements: path(ROOTS_DASHBOARD, '/announcement/new'),
  // Gallery
  gallery: path(ROOTS_DASHBOARD, '/gallery'),
  newGallery: path(ROOTS_DASHBOARD, '/gallery/new'),
  // Resource
  resource: path(ROOTS_DASHBOARD, '/resource'),
  newResource: path(ROOTS_DASHBOARD, '/resource/new'),
  // Skills
  skills: path(ROOTS_DASHBOARD, '/skills'),
  // Semester
  semester: path(ROOTS_DASHBOARD, '/semester'),
  newSemester: path(ROOTS_DASHBOARD, '/semester/new'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/user/account')
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
    productById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    newProduct: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    editById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice')
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
    postById: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post')
  },
  home: {
    root: path(ROOTS_DASHBOARD, '/home'),
    newSliderItem: path(ROOTS_DASHBOARD, '/home/new-slider-item'),
    sliderItems: path(ROOTS_DASHBOARD, '/home/slider-items'),
    about: path(ROOTS_DASHBOARD, '/home/about'),
    mission: path(ROOTS_DASHBOARD, '/home/mission'),
    history: path(ROOTS_DASHBOARD, '/home/history'),
    statistics: path(ROOTS_DASHBOARD, '/home/statistics'),
    campusInfo: path(ROOTS_DASHBOARD, '/home/campus-info'),
    para: path(ROOTS_DASHBOARD, '/home/para'),
    department: path(ROOTS_DASHBOARD, '/home/department'),
    newDepartment: path(ROOTS_DASHBOARD, '/home/department/new'),
    admission: path(ROOTS_DASHBOARD, '/home/admission'),
    howToApply: path(ROOTS_DASHBOARD, '/home/how-to-apply'),
    newHowToApply: path(ROOTS_DASHBOARD, '/home/how-to-apply/new'),
    scholarship: path(ROOTS_DASHBOARD, '/home/scholarship'),
    sports: path(ROOTS_DASHBOARD, '/home/sports'),
    tuitionFees: path(ROOTS_DASHBOARD, '/home/tuition-fees')
  },
  about: {
    root: path(ROOTS_DASHBOARD, '/about'),
    banner: path(ROOTS_DASHBOARD, '/about/banner'),
    admissionParas: path(ROOTS_DASHBOARD, '/about/admission-paras'),
    gallery: path(ROOTS_DASHBOARD, '/about/gallery'),
    facts: path(ROOTS_DASHBOARD, '/about/facts'),
    history: path(ROOTS_DASHBOARD, '/about/history'),
    mission: path(ROOTS_DASHBOARD, '/about/mission'),
    video: path(ROOTS_DASHBOARD, '/about/video')
  },
  campus: {
    root: path(ROOTS_DASHBOARD, '/campus'),
    banner: path(ROOTS_DASHBOARD, '/campus/banner'),
    paras: path(ROOTS_DASHBOARD, '/campus/paras'),
    gallery: path(ROOTS_DASHBOARD, '/campus/gallery'),
    video: path(ROOTS_DASHBOARD, '/campus/video'),
    info: path(ROOTS_DASHBOARD, '/campus/info'),
    hours: path(ROOTS_DASHBOARD, '/campus/hours'),
    map: path(ROOTS_DASHBOARD, '/campus/map')
  },
  mission: {
    root: path(ROOTS_DASHBOARD, '/mission'),
    banner: path(ROOTS_DASHBOARD, '/mission/banner'),
    facts: path(ROOTS_DASHBOARD, '/mission/facts'),
    vission: path(ROOTS_DASHBOARD, '/mission/vission'),
    steps: path(ROOTS_DASHBOARD, '/mission/steps')
  },
  founder: {
    root: path(ROOTS_DASHBOARD, '/founder'),
    banner: path(ROOTS_DASHBOARD, '/founder/banner')
  },
  history: {
    root: path(ROOTS_DASHBOARD, '/history'),
    banner: path(ROOTS_DASHBOARD, '/history/banner'),
    events: path(ROOTS_DASHBOARD, '/history/events/list'),
    newEvent: path(ROOTS_DASHBOARD, '/history/events/new')
  },
  faculty: {
    root: path(ROOTS_DASHBOARD, '/faculty'),
    banner: path(ROOTS_DASHBOARD, '/faculty/banner')
  },
  admission: {
    root: path(ROOTS_DASHBOARD, '/admission'),
    banner: path(ROOTS_DASHBOARD, '/admission/banner'),
    admissionParas: path(ROOTS_DASHBOARD, '/admission/paras'),
    factImage: path(ROOTS_DASHBOARD, '/admission/fact-image'),
    facts: path(ROOTS_DASHBOARD, '/admission/facts'),
    first: path(ROOTS_DASHBOARD, '/admission/first'),
    second: path(ROOTS_DASHBOARD, '/admission/second')
  },
  howToApply: {
    root: path(ROOTS_DASHBOARD, '/how-to-apply'),
    banner: path(ROOTS_DASHBOARD, '/how-to-apply/banner'),
    paras: path(ROOTS_DASHBOARD, '/how-to-apply/paras'),
    process: path(ROOTS_DASHBOARD, '/how-to-apply/process'),
    requirements: path(ROOTS_DASHBOARD, '/how-to-apply/requirements')
  },
  tuitionFees: {
    root: path(ROOTS_DASHBOARD, '/tuition-fees'),
    banner: path(ROOTS_DASHBOARD, '/tuition-fees/banner'),
    graduate: path(ROOTS_DASHBOARD, '/tuition-fees/graduate'),
    postGraduate: path(ROOTS_DASHBOARD, '/tuition-fees/post-graduate'),
    underGraduate: path(ROOTS_DASHBOARD, '/tuition-fees/under-graduate')
  },
  financialAid: {
    root: path(ROOTS_DASHBOARD, '/financial-aid'),
    banner: path(ROOTS_DASHBOARD, '/financial-aid/banner'),
    facts: path(ROOTS_DASHBOARD, '/financial-aid/facts'),
    steps: path(ROOTS_DASHBOARD, '/financial-aid/steps'),
    newAid: path(ROOTS_DASHBOARD, '/financial-aid/aid/new'),
    list: path(ROOTS_DASHBOARD, '/financial-aid/list')
  },
  datesDeadLines: {
    root: path(ROOTS_DASHBOARD, '/dates-deadlines'),
    banner: path(ROOTS_DASHBOARD, '/dates-deadlines/banner'),
    deadlines: path(ROOTS_DASHBOARD, '/dates-deadlines/deadlines')
  },
  academics: {
    root: path(ROOTS_DASHBOARD, '/academics'),
    banner: path(ROOTS_DASHBOARD, '/academics/banner'),
    academicHistory: path(ROOTS_DASHBOARD, '/academics/academic-history'),
    academicGallery: path(ROOTS_DASHBOARD, '/academics/gallery'),
    academicOverview: path(ROOTS_DASHBOARD, '/academics/overview'),
    academicStudyAreas: path(ROOTS_DASHBOARD, '/academics/study-areas'),
    mission: path(ROOTS_DASHBOARD, '/academics/mission')
  },
  underGraduate: {
    root: path(ROOTS_DASHBOARD, '/under-graduate'),
    banner: path(ROOTS_DASHBOARD, '/under-graduate/banner'),
    history: path(ROOTS_DASHBOARD, '/under-graduate/history'),
    departments: path(ROOTS_DASHBOARD, '/under-graduate/departments')
  },
  graduate: {
    root: path(ROOTS_DASHBOARD, '/graduate'),
    banner: path(ROOTS_DASHBOARD, '/graduate/banner'),
    history: path(ROOTS_DASHBOARD, '/graduate/history'),
    departments: path(ROOTS_DASHBOARD, '/graduate/departments')
  },
  postGraduate: {
    root: path(ROOTS_DASHBOARD, '/post-graduate'),
    banner: path(ROOTS_DASHBOARD, '/post-graduate/banner'),
    history: path(ROOTS_DASHBOARD, '/post-graduate/history'),
    departments: path(ROOTS_DASHBOARD, '/post-graduate/departments')
  },
  summerPrograms: {
    root: path(ROOTS_DASHBOARD, '/summer-programs'),
    banner: path(ROOTS_DASHBOARD, '/summer-programs/banner'),
    courses: path(ROOTS_DASHBOARD, '/summer-programs/courses')
  },
  other: {
    root: path(ROOTS_DASHBOARD, '/other'),
    header: path(ROOTS_DASHBOARD, '/other/header'),
    footer: path(ROOTS_DASHBOARD, '/other/footer'),
    addPage: path(ROOTS_DASHBOARD, '/other/add-page'),
    listPages: path(ROOTS_DASHBOARD, '/other/list-pages')
  },
  vcMessage: path(ROOTS_DASHBOARD, '/vc-message'),
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
