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
    campusInfo: path(ROOTS_DASHBOARD, '/home/campus-info'),
    department: path(ROOTS_DASHBOARD, '/home/department'),
    newDepartment: path(ROOTS_DASHBOARD, '/home/department/new'),
    admission: path(ROOTS_DASHBOARD, '/home/admission'),
    howToApply: path(ROOTS_DASHBOARD, '/home/how-to-apply'),
    newHowToApply: path(ROOTS_DASHBOARD, '/home/how-to-apply/new'),
    scholarship: path(ROOTS_DASHBOARD, '/home/scholarship')
  }
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
