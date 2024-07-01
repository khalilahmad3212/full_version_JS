// icons
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import RadarIcon from '@mui/icons-material/Radar';
import Person2Icon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import {
  HowToReg,
  MoreHoriz,
  BeachAccess,
  LocalLibrary,
  MenuBook,
  Receipt,
  DateRange,
  LocalHospital,
  Public,
  Apartment,
  Assignment,
  Timeline,
  Language,
  CastForEducation,
  Announcement,
  Notes,
  SignalCellular0Bar,
  SignalCellularAlt,
  ViewDay
} from '@mui/icons-material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Label from '../../components/Label';
import SvgIconStyle from '../../components/SvgIconStyle';
import { title } from 'src/utils/mock-data/text';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  home: <HomeIcon />,
  about: <InfoIcon />,
  campus: <SchoolIcon />,
  mission: <RadarIcon />,
  founder: <Person2Icon />,
  history: <HistoryIcon />,
  faculty: <GroupsIcon />,
  admission: <PersonAddAlt1Icon />,
  fee: <Receipt />,
  aid: <LocalHospital />,
  howToApply: <HowToReg />,
  deadline: <DateRange />,
  academics: <MenuBook />,
  underGradeuate: <LocalLibrary />,
  summer: <BeachAccess />,
  other: <MoreHoriz />,
  publication: <Public />,
  department: <Apartment />,
  organization: <GroupsIcon />,
  program: <Assignment />,
  experience: <Timeline />,
  recognition: <Language />,
  education: <CastForEducation />,
  news: <Notes />,
  announcement: <Announcement />,
  skills: <SignalCellularAlt />,
  semester: <ViewDay />,
  calendar: getIcon('ic_calendar'),
  user: getIcon('ic_user')
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
        title: 'Users',
        role: 'ADMIN',
        path: PATH_DASHBOARD.home.root,
        icon: ICONS.user,
        children: [
          { title: 'List Users', path: PATH_DASHBOARD.user.list },
          { title: 'New User', path: PATH_DASHBOARD.user.newUser }
        ]
      },
      {
        title: 'Settings',
        path: PATH_DASHBOARD.user.account,
        icon: ICONS.user,
        children: [
          { title: 'Account', path: PATH_DASHBOARD.user.account },
          { title: 'publications', path: PATH_DASHBOARD.publications, icon: ICONS.publication },
          { title: 'Experiences', path: PATH_DASHBOARD.experience, icon: ICONS.experience },
          { title: 'Recognitions', path: PATH_DASHBOARD.recognition, icon: ICONS.recognition },
          { title: 'Educations', path: PATH_DASHBOARD.education, icon: ICONS.education },
          { title: 'Skills', path: PATH_DASHBOARD.skills, icon: ICONS.skills },
        ]
      }
    ]
  },

  // PAGES
  // ----------------------------------------------------------------------
  {
    subheader: 'pages',
    role: 'ADMIN',
    items: [
      // MANAGEMENT : Home Page Sections
      { title: 'home', role: 'ADMIN', path: PATH_DASHBOARD.home.root, icon: ICONS.home },
      {
        title: "About",
        role: 'ADMIN',
        path: PATH_DASHBOARD.about.root,
        icon: ICONS.about,
        children: [
          { title: 'overview', path: PATH_DASHBOARD.about.root },
          { title: 'campus', path: PATH_DASHBOARD.campus.root },
          { title: 'mission', path: PATH_DASHBOARD.mission.root },
          { title: 'vision', path: PATH_DASHBOARD.mission.vission },
          { title: 'founder', path: PATH_DASHBOARD.founder.root, icon: ICONS.founder },
          { title: 'history', path: PATH_DASHBOARD.history.root, icon: ICONS.history },
          { title: 'VC Message', role: 'ADMIN', path: PATH_DASHBOARD.vcMessage, icon: ICONS.about },
        ]
      },
      {
        title: 'Admission',
        role: 'ADMIN',
        path: PATH_DASHBOARD.admission.root,
        icon: ICONS.admission,
        children: [
          { title: 'overview', path: PATH_DASHBOARD.admission.root, icon: ICONS.admission },
          { title: 'how-to-apply', path: PATH_DASHBOARD.howToApply.root, icon: ICONS.howToApply },
          { title: 'tuition-fees', path: PATH_DASHBOARD.tuitionFees.root, icon: ICONS.fee },
          { title: 'financial-aid', path: PATH_DASHBOARD.financialAid.root, icon: ICONS.aid },
          { title: 'dates-deadline', path: PATH_DASHBOARD.datesDeadLines.root, icon: ICONS.deadline }
        ]
      },
      {
        title: 'Academics',
        role: 'ADMIN',
        path: PATH_DASHBOARD.academics.root,
        icon: ICONS.academics,
        children: [
          { title: 'academics', path: PATH_DASHBOARD.academics.root, icon: ICONS.academics },
          { title: 'under-graduate', path: PATH_DASHBOARD.underGraduate.root, icon: ICONS.underGradeuate },
          { title: 'graduate', path: PATH_DASHBOARD.graduate.root, icon: ICONS.underGradeuate },
          { title: 'post-graduate', path: PATH_DASHBOARD.postGraduate.root, icon: ICONS.underGradeuate },
          { title: 'summer-programs', path: PATH_DASHBOARD.summerPrograms.root, icon: ICONS.summer }
        ]
      },
      { title: 'faculty', role: 'ADMIN', path: PATH_DASHBOARD.faculty.root, icon: ICONS.faculty },
      { title: 'Other', role: 'ADMIN', path: PATH_DASHBOARD.other.root, icon: ICONS.other },
      {
        title: 'Departments',
        role: 'ADMIN',
        path: PATH_DASHBOARD.departments,
        icon: ICONS.department,
        children: [
          { title: 'List Departments', path: PATH_DASHBOARD.departments, icon: ICONS.department },
          { title: 'New Department', path: PATH_DASHBOARD.newDepartment, icon: ICONS.department },
        ]
      },
      {
        title: 'Organization',
        role: 'ADMIN',
        path: PATH_DASHBOARD.organizations,
        icon: ICONS.organization,
        children: [
          { title: 'List Organizations', path: PATH_DASHBOARD.organizations, icon: ICONS.organization },
          { title: 'New Organization', path: PATH_DASHBOARD.newOrganizations, icon: ICONS.organization },
        ]
      },
      {
        title: 'Authorities',
        role: 'ADMIN',
        path: PATH_DASHBOARD.authorities.root,
        icon: ICONS.user,
        children: [
          { title: 'Syndicate', path: PATH_DASHBOARD.authorities.syndicate, icon: ICONS.organization },
          { title: 'Senate', path: PATH_DASHBOARD.authorities.senate, icon: ICONS.organization },
          { title: 'Academic Councel', path: PATH_DASHBOARD.authorities.academicCouncel, icon: ICONS.organization },
        ]
      },
      { title: 'Programs', role: 'ADMIN', path: PATH_DASHBOARD.programs, icon: ICONS.program },
      { title: 'News', role: 'ADMIN', path: PATH_DASHBOARD.news, icon: ICONS.news },
      { title: 'Announcements', role: 'ADMIN', path: PATH_DASHBOARD.announcements, icon: ICONS.announcement },
      // { title: 'Gallery', path: PATH_DASHBOARD.gallery, icon: ICONS.calendar },
      { title: 'Resource', role: 'ADMIN', path: PATH_DASHBOARD.resource, icon: ICONS.calendar },
      { title: 'Semesters', role: 'ADMIN', path: PATH_DASHBOARD.semester, icon: ICONS.semester },
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
  // {
  //   subheader: 'app',
  //   items: [
  //     // {
  //     //   title: 'mail',
  //     //   path: PATH_DASHBOARD.mail.root,
  //     //   icon: ICONS.mail,
  //     //   info: <Label color="error">2</Label>
  //     // },
  //     // { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar }
  //     // {
  //     //   title: 'kanban',
  //     //   path: PATH_DASHBOARD.kanban,
  //     //   icon: ICONS.kanban
  //     // }
  //   ]
  // }
];

export default sidebarConfig;
