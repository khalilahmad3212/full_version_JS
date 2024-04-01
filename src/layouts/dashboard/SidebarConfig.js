// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Label from '../../components/Label';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'general',
  //   items: [
  //     {
  //       title: 'app',
  //       path: PATH_DASHBOARD.general.app,
  //       icon: ICONS.dashboard
  //     },
  //     { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
  //     { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
  //     { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
  //     { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking }
  //   ]
  // },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     // MANAGEMENT : USER
  //     // {
  //     //   title: 'user',
  //     //   path: PATH_DASHBOARD.user.root,
  //     //   icon: ICONS.user,
  //     //   children: [
  //     //     { title: 'profile', path: PATH_DASHBOARD.user.profile },
  //     //     { title: 'cards', path: PATH_DASHBOARD.user.cards },
  //     //     { title: 'list', path: PATH_DASHBOARD.user.list },
  //     //     { title: 'create', path: PATH_DASHBOARD.user.newUser },
  //     //     { title: 'edit', path: PATH_DASHBOARD.user.editById },
  //     //     { title: 'account', path: PATH_DASHBOARD.user.account }
  //     //   ]
  //     // },

  //     // MANAGEMENT : E-COMMERCE
  //     {
  //       title: 'e-commerce',
  //       path: PATH_DASHBOARD.eCommerce.root,
  //       icon: ICONS.cart,
  //       children: [
  //         { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
  //         { title: 'product', path: PATH_DASHBOARD.eCommerce.productById },
  //         { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
  //         { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
  //         { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById },
  //         { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
  //         { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice }
  //       ]
  //     },

  //     // MANAGEMENT : BLOG
  //     {
  //       title: 'blog',
  //       path: PATH_DASHBOARD.blog.root,
  //       icon: ICONS.blog,
  //       children: [
  //         { title: 'posts', path: PATH_DASHBOARD.blog.posts },
  //         { title: 'post', path: PATH_DASHBOARD.blog.postById },
  //         { title: 'new post', path: PATH_DASHBOARD.blog.newPost }
  //       ]
  //     }
  //   ]
  // },

  // USER
  // ----------------------------------------------------------------------
  {
    subheader: 'user',
    items: [
      {
        title: 'User',
        path: PATH_DASHBOARD.home.root,
        icon: ICONS.user,
        children: [
          { title: 'All Users', path: PATH_DASHBOARD.user.list },
          { title: 'Account', path: PATH_DASHBOARD.user.account }
        ]
      }
    ]
  },

  // PAGES
  // ----------------------------------------------------------------------
  {
    subheader: 'pages',
    items: [
      // MANAGEMENT : Home Page Sections
      {
        title: 'home',
        path: PATH_DASHBOARD.home.root,
        icon: ICONS.user,
        children: [
          { title: 'Content', path: PATH_DASHBOARD.home.sliderItems }
          // { title: 'About', path: PATH_DASHBOARD.home.about },
          // { title: 'Mission', path: PATH_DASHBOARD.home.mission },
          // { title: 'History', path: PATH_DASHBOARD.home.history },
          // { title: 'Campus Info', path: PATH_DASHBOARD.home.campusInfo },
          // { title: 'Department', path: PATH_DASHBOARD.home.department },
          // { title: 'Admission', path: PATH_DASHBOARD.home.admission },
          // { title: 'How To Apply', path: PATH_DASHBOARD.home.howToApply },
          // { title: 'Scholarship', path: PATH_DASHBOARD.home.scholarship }
        ]
      },
      { title: 'publications', path: PATH_DASHBOARD.publications, icon: ICONS.calendar },
      { title: 'departments', path: PATH_DASHBOARD.departments, icon: ICONS.calendar },
      { title: 'organizations', path: PATH_DASHBOARD.organizations, icon: ICONS.calendar },
      { title: 'Prgorams', path: PATH_DASHBOARD.programs, icon: ICONS.calendar },
      { title: 'Experiences', path: PATH_DASHBOARD.experience, icon: ICONS.calendar }
      // MANAGEMENT : E-COMMERCE
      // {
      //   title: 'e-commerce',
      //   path: PATH_DASHBOARD.eCommerce.root,
      //   icon: ICONS.cart,
      //   children: [
      //     { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
      //     { title: 'product', path: PATH_DASHBOARD.eCommerce.productById },
      //     { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
      //     { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
      //     { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById },
      //     { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
      //     { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice }
      //   ]
      // },

      // MANAGEMENT : BLOG
      // {
      //   title: 'blog',
      //   path: PATH_DASHBOARD.blog.root,
      //   icon: ICONS.blog,
      //   children: [
      //     { title: 'posts', path: PATH_DASHBOARD.blog.posts },
      //     { title: 'post', path: PATH_DASHBOARD.blog.postById },
      //     { title: 'new post', path: PATH_DASHBOARD.blog.newPost }
      //   ]
      // }
    ]
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'app',
    items: [
      // {
      //   title: 'mail',
      //   path: PATH_DASHBOARD.mail.root,
      //   icon: ICONS.mail,
      //   info: <Label color="error">2</Label>
      // },
      // { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
      { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar }
      // {
      //   title: 'kanban',
      //   path: PATH_DASHBOARD.kanban,
      //   icon: ICONS.kanban
      // }
    ]
  }
];

export default sidebarConfig;
