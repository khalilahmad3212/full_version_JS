import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> }
      ]
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/dashboard/user" replace /> },
        { path: 'app', element: <GeneralApp /> },
        { path: 'ecommerce', element: <GeneralEcommerce /> },
        { path: 'analytics', element: <GeneralAnalytics /> },
        { path: 'banking', element: <GeneralBanking /> },
        { path: 'booking', element: <GeneralBooking /> },

        {
          path: 'e-commerce',
          children: [
            { element: <Navigate to="/dashboard/e-commerce/shop" replace /> },
            { path: 'shop', element: <EcommerceShop /> },
            { path: 'product/:name', element: <EcommerceProductDetails /> },
            { path: 'list', element: <EcommerceProductList /> },
            { path: 'product/new', element: <EcommerceProductCreate /> },
            { path: 'product/:name/edit', element: <EcommerceProductCreate /> },
            { path: 'checkout', element: <EcommerceCheckout /> },
            { path: 'invoice', element: <EcommerceInvoice /> }
          ]
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/account" replace /> },
            { path: 'profile', element: <UserProfile /> },
            { path: 'cards', element: <UserCards /> },
            { path: 'list', element: <UserList2 /> },
            { path: 'list2', element: <UserList2 /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':name/edit', element: <UserCreate /> },
            { path: 'account', element: <UserAccount /> }
          ]
        },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace /> },
            { path: 'posts', element: <BlogPosts /> },
            { path: 'post/:title', element: <BlogPost /> },
            { path: 'new-post', element: <BlogNewPost /> }
          ]
        },
        {
          path: 'home',
          element: <HomePage />,
          children: [
            { element: <Navigate to="/dashboard/home/slider-items" replace /> },
            { path: 'new-slider-item', element: <AddSliderItem /> },
            { path: 'slider-item/:id/edit', element: <AddSliderItem /> },
            { path: 'slider-items', element: <SliderItemsList /> },
            { path: 'about', element: <UpdateHomeAbout /> },
            { path: 'mission', element: <UpdateHomeMission /> },
            { path: 'history', element: <UpdateHomeHistory /> },
            { path: 'statistics', element: <AddHomeFacts /> },
            { path: 'campus-info', element: <UpdateHomeCampusInfo /> },
            { path: 'department', element: <DepartmentItemsList /> },
            { path: 'department/new', element: <AddDepartmentItem /> },
            { path: 'department/:id/edit', element: <AddDepartmentItem /> },
            { path: 'admission', element: <UpdateHomeAdmission /> },
            { path: 'how-to-apply', element: <HowToApplyItemList /> },
            { path: 'how-to-apply/new', element: <AddHowToApplyItem /> },
            { path: 'how-to-apply/:id/edit', element: <AddHowToApplyItem /> },
            { path: 'scholarship', element: <UpdateHomeScholarship /> },
            { path: 'sports', element: <AddHomeSports /> },
            { path: 'tuition-fees', element: <AddHomeTuition /> },
            { path: 'para', element: <AddHomeProgramsPara /> }
          ]
        },
        {
          path: 'about',
          element: <AboutPage />,
          children: [
            { element: <Navigate to="/dashboard/about/banner" replace /> },
            { path: 'banner', element: <AddAboutBanner /> },
            { path: 'admission-paras', element: <AddAboutPara /> },
            { path: 'gallery', element: <AboutGalleryList /> },
            { path: 'gallery/new', element: <AddAboutGallery /> },
            { path: 'gallery/:id/edit', element: <AddAboutGallery /> },
            { path: 'facts', element: <AddAboutFacts /> },
            { path: 'history', element: <AddAboutHistory /> },
            { path: 'mission', element: <AddAboutMission /> },
            { path: 'video', element: <AddAboutVideo /> }
          ]
        },
        {
          path: 'campus',
          element: <CampusPage />,
          children: [
            { element: <Navigate to="/dashboard/campus/banner" replace /> },
            { path: 'banner', element: <AddCampusBanner /> },
            { path: 'paras', element: <AddCampusPara /> },
            { path: 'gallery', element: <CampusGalleryList /> },
            { path: 'gallery/new', element: <AddCampusGallery /> },
            { path: 'gallery/:id/edit', element: <AddCampusGallery /> },
            { path: 'video', element: <AddCampusVideo /> },
            { path: 'info', element: <AddCampusInfo /> },
            { path: 'hours', element: <AddCampusHours /> },
            { path: 'map', element: <AddCampusMap /> }
          ]
        },
        {
          path: 'mission',
          element: <MissionPage />,
          children: [
            { element: <Navigate to="/dashboard/mission/banner" replace /> },
            { path: 'banner', element: <AddMissionBanner /> },
            { path: 'facts', element: <AddMissionFacts /> },
            { path: 'vission', element: <AddMissionVission /> },
            { path: 'steps', element: <AddMissionSteps /> }
          ]
        },
        {
          path: 'founder',
          element: <FounderPage />,
          children: [
            { element: <Navigate to="/dashboard/founder/banner" replace /> },
            { path: 'banner', element: <AddFounderBanner /> }
          ]
        },
        {
          path: 'history',
          element: <HistoryPage />,
          children: [
            { element: <Navigate to="/dashboard/history/banner" replace /> },
            { path: 'banner', element: <AddHistoryBanner /> },
            { path: 'events/new', element: <AddHistoryEvent /> },
            { path: 'events/:id/edit', element: <AddHistoryEvent /> },
            { path: 'events/list', element: <HistoryEventList /> }
          ]
        },
        {
          path: 'faculty',
          element: <FacultyPage />,
          children: [
            { element: <Navigate to="/dashboard/faculty/banner" replace /> },
            { path: 'banner', element: <AddFacultyBanner /> }
          ]
        },
        {
          path: 'admission',
          element: <AdmissionPage />,
          children: [
            { element: <Navigate to="/dashboard/admission/banner" replace /> },
            { path: 'banner', element: <AddAdmissionBanner /> },
            { path: 'paras', element: <AddAdmissionPara /> },
            { path: 'fact-image', element: <AddAdmissionFactImage /> },
            { path: 'facts', element: <AddAdmissionFacts /> },
            { path: 'first', element: <AddAdmissionFirst /> },
            { path: 'second', element: <AddAdmissionSecond /> }
          ]
        },
        {
          path: 'how-to-apply',
          element: <HowToApplyPage />,
          children: [
            { element: <Navigate to="/dashboard/how-to-apply/banner" replace /> },
            { path: 'banner', element: <AddHowToApplyBanner /> },
            { path: 'paras', element: <AddApplyPara /> },
            { path: 'process', element: <AddApplyProcess /> },
            { path: 'requirements', element: <AddApplyRequirements /> }
          ]
        },
        {
          path: 'tuition-fees',
          element: <TuitionFeesPage />,
          children: [
            { element: <Navigate to="/dashboard/tuition-fees/banner" replace /> },
            { path: 'banner', element: <AddTuitionFeesBanner /> },
            { path: 'graduate', element: <AddGraduateFee /> },
            { path: 'under-graduate', element: <AddUnderGraduateFee /> },
            { path: 'post-graduate', element: <AddPostGraduateFee /> }
          ]
        },
        {
          path: 'authorities',
          children: [
            // { element: <Navigate to="/dashboard/authorities/syndicate" replace /> },
            {
              path: 'syndicate',
              element: <SyndicatePage />,
              children: [
                { element: <Navigate to="/dashboard/authorities/syndicate/list" replace /> },
                { path: 'list', element: <SyndicateList /> },
                { path: 'new', element: <AddSyndicate /> },
                { path: ':id/edit', element: <AddSyndicate /> }
              ]
            },
            {
              path: 'senate',
              element: <SenatePage />,
              children: [
                { element: <Navigate to="/dashboard/authorities/senate/list" replace /> },
                { path: 'list', element: <SenateList /> },
                { path: 'new', element: <AddSenate /> },
                { path: ':id/edit', element: <AddSenate /> }
              ]
            },
            {
              path: 'academic-councel',
              element: <AcademicCouncelPage />,
              children: [
                { element: <Navigate to="/dashboard/authorities/academic-councel/list" replace /> },
                { path: 'list', element: <AcademicCouncelList /> },
                { path: 'new', element: <AddAcademicCouncel /> },
                { path: ':id/edit', element: <AddAcademicCouncel /> }
              ]
            }
          ]
        },
        {
          path: 'financial-aid',
          element: <FinancialAidPage />,
          children: [
            { element: <Navigate to="/dashboard/financial-aid/banner" replace /> },
            { path: 'banner', element: <AddFinancialAidBanner /> },
            { path: 'facts', element: <AddFinancialFacts /> },
            { path: 'steps', element: <AddFinancialSteps /> },
            { path: 'aid/new', element: <AddFinancialAid /> },
            { path: 'aid/:id/edit', element: <AddFinancialAid /> },
            { path: 'list', element: <ListFinancialAid /> }
          ]
        },
        {
          path: 'dates-deadlines',
          element: <DatesDeadLinesPage />,
          children: [
            { element: <Navigate to="/dashboard/dates-deadlines/banner" replace /> },
            { path: 'banner', element: <AddDatesDeadLinesBanner /> },
            { path: 'deadlines', element: <AddDeadLines /> }
          ]
        },
        {
          path: 'academics',
          element: <AcademicsPage />,
          children: [
            { element: <Navigate to="/dashboard/academics/banner" replace /> },
            { path: 'banner', element: <AddAcademicsBanner /> },
            { path: 'academic-history', element: <AddAcademicHistory /> },
            { path: 'gallery', element: <AcademicGalleryList /> },
            { path: 'gallery/new', element: <AddAcademicGallery /> },
            { path: 'gallery/:id/edit', element: <AddAcademicGallery /> },
            { path: 'overview', element: <AddAcademicOverview /> },
            { path: 'study-areas', element: <AddAcademicStudyAreas /> },
            { path: 'mission', element: <AddAcademicMission /> }
          ]
        },
        {
          path: 'under-graduate',
          element: <UnderGraduatePage />,
          children: [
            { element: <Navigate to="/dashboard/under-graduate/banner" replace /> },
            { path: 'banner', element: <AddUnderGraduateBanner /> },
            { path: 'history', element: <AddUnderGraduateHistory /> }
          ]
        },
        {
          path: 'graduate',
          element: <GraduatePage />,
          children: [
            { element: <Navigate to="/dashboard/graduate/banner" replace /> },
            { path: 'banner', element: <AddGraduateBanner /> },
            { path: 'history', element: <AddGraduateHistory /> },
            { path: 'departments', element: <AddGraduateDepartments /> }
          ]
        },
        {
          path: 'post-graduate',
          element: <PostGraduatePage />,
          children: [
            { element: <Navigate to="/dashboard/post-graduate/banner" replace /> },
            { path: 'banner', element: <AddPostGraduateBanner /> },
            { path: 'history', element: <AddPostGraduateHistory /> },
            { path: 'departments', element: <AddPostGraduateDepartments /> }
          ]
        },
        {
          path: 'summer-programs',
          element: <SummerProgramsPage />,
          children: [
            { element: <Navigate to="/dashboard/summer-programs/banner" replace /> },
            { path: 'banner', element: <AddSummerProgramsBanner /> },
            { path: 'courses', element: <AddSummerCourses /> }
          ]
        },
        {
          path: 'other',
          element: <OtherPage />,
          children: [
            { element: <Navigate to="/dashboard/other/header" replace /> },
            // with header route
            { path: 'header', element: <AddOtherHeader /> },
            { path: 'footer', element: <AddOtherFooter /> },
            { path: 'add-page', element: <AddPage /> },
            { path: 'add-page/:id/edit', element: <AddPage /> },
            { path: 'list-pages', element: <ListDynamicPages /> }
          ]
        },
        // PUblications
        { path: 'publications', element: <PublicationList /> },
        { path: 'publications/new', element: <AddPublication /> },
        { path: 'publications/:id/edit', element: <AddPublication /> },
        // Departments
        { path: 'departments', element: <DepartmentList /> },
        { path: 'department/new', element: <AddDepartment /> },
        { path: 'departments/:id/edit', element: <AddDepartment /> },
        // Campus
        { path: 'subcampus', element: <CampusList /> },
        { path: 'subcampus/new', element: <AddSubCampus /> },
        { path: 'subcampus/:id/edit', element: <AddSubCampus /> },
        // Organizations
        { path: 'organizations', element: <OrganizationList /> },
        { path: 'organization/new', element: <AddOrganization /> },
        { path: 'organizations/:id/edit', element: <AddOrganization /> },
        // Programs
        { path: 'programs', element: <ProgramList /> },
        { path: 'programs/new', element: <AddProgram /> },
        { path: 'programs/:id/edit', element: <AddProgram /> },
        // Experience
        { path: 'experience', element: <ExperienceList /> },
        { path: 'experience/new', element: <AddExperience /> },
        { path: 'experience/:id/edit', element: <AddExperience /> },
        // Recognition
        { path: 'recognition', element: <RecognitionList /> },
        { path: 'recognition/new', element: <AddRecognition /> },
        { path: 'recognition/:id/edit', element: <AddRecognition /> },
        // Education
        { path: 'education', element: <EducationList /> },
        { path: 'education/new', element: <AddEducation /> },
        { path: 'education/:id/edit', element: <AddEducation /> },
        // News
        { path: 'news', element: <NewsList /> },
        { path: 'news/new', element: <AddNews /> },
        { path: 'news/:id/edit', element: <AddNews /> },
        // Annoucnements
        { path: 'announcement', element: <AnnouncementList /> },
        { path: 'announcement/new', element: <AddAnnouncement /> },
        { path: 'announcement/:id/edit', element: <AddAnnouncement /> },
        // Gallery
        { path: 'gallery', element: <GalleryList /> },
        { path: 'gallery/new/:page', element: <AddGallery /> },
        { path: 'gallery/:id/edit', element: <AddGallery /> },
        // Resource
        { path: 'resource', element: <ResourceList /> },
        { path: 'resource/new', element: <AddResource /> },
        { path: 'resource/:id/edit', element: <AddResource /> },
        // Skills
        { path: 'skills', element: <Skills /> },
        // Semester
        { path: 'semester', element: <SemesterList /> },
        { path: 'semester/new', element: <AddSemester /> },
        { path: 'semester/:id/edit', element: <AddSemester /> },
        // Faculty
        { path: 'faculty/new', element: <AddFaculty /> },
        {
          path: 'mail',
          children: [
            { element: <Navigate to="/dashboard/mail/all" replace /> },
            { path: 'label/:customLabel', element: <Mail /> },
            { path: 'label/:customLabel/:mailId', element: <Mail /> },
            { path: ':systemLabel', element: <Mail /> },
            { path: ':systemLabel/:mailId', element: <Mail /> }
          ]
        },
        { path: 'calendar', element: <Calendar /> },
        { path: 'kanban', element: <Kanban /> },
        { path: 'vc-message', element: <AddVCMessage /> }
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'pricing', element: <Pricing /> },
        { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [{ element: <LandingPage /> }]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
// Dashboard
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));
const GeneralBanking = Loadable(lazy(() => import('../pages/dashboard/GeneralBanking')));
const GeneralBooking = Loadable(lazy(() => import('../pages/dashboard/GeneralBooking')));
const EcommerceShop = Loadable(lazy(() => import('../pages/dashboard/EcommerceShop')));
const EcommerceProductDetails = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductDetails')));
const EcommerceProductList = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductList')));
const EcommerceProductCreate = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductCreate')));
const EcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/EcommerceCheckout')));
const EcommerceInvoice = Loadable(lazy(() => import('../pages/dashboard/EcommerceInvoice')));
const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
const UserList2 = Loadable(lazy(() => import('../pages/dashboard/UserList2')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
const HomePage = Loadable(lazy(() => import('../pages/dashboard/pages/home/HomePage')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));
const Mail = Loadable(lazy(() => import('../pages/dashboard/Mail')));
const Calendar = Loadable(lazy(() => import('../pages/dashboard/Calendar')));
const Kanban = Loadable(lazy(() => import('../pages/dashboard/Kanban')));
// Home Page Sections
const AddSliderItem = Loadable(lazy(() => import('../pages/dashboard/pages/home/AddSliderItem')));
const SliderItemsList = Loadable(lazy(() => import('../pages/dashboard/pages/home/SliderItemsList')));
const UpdateHomeAbout = Loadable(lazy(() => import('../pages/dashboard/pages/home/UpdateHomeAbout')));
const UpdateHomeMission = Loadable(lazy(() => import('../pages/dashboard/pages/home/UpdateHomeMission')));
const UpdateHomeHistory = Loadable(lazy(() => import('../pages/dashboard/pages/home/UpdateHomeHistory')));
const AddHomeFacts = Loadable(lazy(() => import('../pages/dashboard/pages/home/AddHomeFacts')));
const UpdateHomeCampusInfo = Loadable(lazy(() => import('../pages/dashboard/pages/home/UpdateHomeCampusInfo')));
const DepartmentItemsList = Loadable(lazy(() => import('../pages/dashboard/pages/home/DepartmentItemsList')));
const AddDepartmentItem = Loadable(lazy(() => import('../pages/dashboard/pages/home/AddDepartmentItem')));
const UpdateHomeAdmission = Loadable(lazy(() => import('../pages/dashboard/pages/home/UpdateHomeAdmission')));
const HowToApplyItemList = Loadable(lazy(() => import('../pages/dashboard/pages/home/HowToApplyItemList')));
const AddHowToApplyItem = Loadable(lazy(() => import('../pages/dashboard/pages/home/AddHowToApplyItem')));
const UpdateHomeScholarship = Loadable(lazy(() => import('../pages/dashboard/pages/home/UpdateHomeScholarship')));
const AddHomeSports = Loadable(lazy(() => import('../pages/dashboard/pages/home/AddHomeSports')));
const AddHomeTuition = Loadable(lazy(() => import('../pages/dashboard/pages/home/AddHomeTuition')));
const AddHomeProgramsPara = Loadable(lazy(() => import('../pages/dashboard/pages/home/AddHomeProgramsPara')));
// About Page Sections
const AboutPage = Loadable(lazy(() => import('../pages/dashboard/pages/about/AboutPage')));
const AddAboutBanner = Loadable(lazy(() => import('../pages/dashboard/pages/about/AddAboutBanner')));
const AddAboutPara = Loadable(lazy(() => import('../pages/dashboard/pages/about/AddAboutPara')));
const AboutGalleryList = Loadable(lazy(() => import('../pages/dashboard/pages/about/AboutGalleryList')));
const AddAboutGallery = Loadable(lazy(() => import('../pages/dashboard/pages/about/AddAboutGallery')));
const AddAboutFacts = Loadable(lazy(() => import('../pages/dashboard/pages/about/AddAboutFacts')));
const AddAboutHistory = Loadable(lazy(() => import('../pages/dashboard/pages/about/AddAboutHistory')));
const AddAboutMission = Loadable(lazy(() => import('../pages/dashboard/pages/about/AddAboutMission')));
// Campus Page Sections
const CampusPage = Loadable(lazy(() => import('../pages/dashboard/pages/campus/CampusPage')));
const AddCampusBanner = Loadable(lazy(() => import('../pages/dashboard/pages/campus/AddCampusBanner')));
const AddCampusPara = Loadable(lazy(() => import('../pages/dashboard/pages/campus/AddCampusPara')));
const CampusGalleryList = Loadable(lazy(() => import('../pages/dashboard/pages/campus/CampusGalleryList')));
const AddCampusGallery = Loadable(lazy(() => import('../pages/dashboard/pages/campus/AddCampusGallery')));
const AddAboutVideo = Loadable(lazy(() => import('../pages/dashboard/pages/about/AddAboutVideo')));
const AddCampusVideo = Loadable(lazy(() => import('../pages/dashboard/pages/campus/AddCampusVideo')));
const AddCampusInfo = Loadable(lazy(() => import('../pages/dashboard/pages/campus/AddCampusInfo')));
const AddCampusHours = Loadable(lazy(() => import('../pages/dashboard/pages/campus/AddCampusHours')));
const AddCampusMap = Loadable(lazy(() => import('../pages/dashboard/pages/campus/AddCampusMap')));
// Mission Page Sections
const MissionPage = Loadable(lazy(() => import('../pages/dashboard/pages/mission/MissionPage')));
const AddMissionBanner = Loadable(lazy(() => import('../pages/dashboard/pages/mission/AddMissionBanner')));
const AddMissionFacts = Loadable(lazy(() => import('../pages/dashboard/pages/mission/AddMissionFacts')));
const AddMissionVission = Loadable(lazy(() => import('../pages/dashboard/pages/mission/AddMissionVission')));
const AddMissionSteps = Loadable(lazy(() => import('../pages/dashboard/pages/mission/AddMissionSteps')));
// Founder Page Sections
const FounderPage = Loadable(lazy(() => import('../pages/dashboard/pages/founder/FounderPage')));
const AddFounderBanner = Loadable(lazy(() => import('../pages/dashboard/pages/founder/AddFounderBanner')));
// History Page Sections
const HistoryPage = Loadable(lazy(() => import('../pages/dashboard/pages/history/HistoryPage')));
const AddHistoryBanner = Loadable(lazy(() => import('../pages/dashboard/pages/history/AddHistoryBanner')));
const AddHistoryEvent = Loadable(lazy(() => import('../pages/dashboard/pages/history/AddHistoryEvent')));
const HistoryEventList = Loadable(lazy(() => import('../pages/dashboard/pages/history/HistoryEventList')));
// Faculty Page Sections
const FacultyPage = Loadable(lazy(() => import('../pages/dashboard/pages/faculty/FacultyPage')));
const AddFacultyBanner = Loadable(lazy(() => import('../pages/dashboard/pages/faculty/AddFacultyBanner')));
// Admission Page Sections
const AdmissionPage = Loadable(lazy(() => import('../pages/dashboard/pages/admission/AdmissionPage')));
const AddAdmissionBanner = Loadable(lazy(() => import('../pages/dashboard/pages/admission/AddAdmissionBanner')));
const AddAdmissionPara = Loadable(lazy(() => import('../pages/dashboard/pages/admission/AddAdmissionPara')));
const AddAdmissionFactImage = Loadable(lazy(() => import('../pages/dashboard/pages/admission/AddAdmissionFactImage')));
const AddAdmissionFacts = Loadable(lazy(() => import('../pages/dashboard/pages/admission/AddAdmissionFacts')));
const AddAdmissionFirst = Loadable(lazy(() => import('../pages/dashboard/pages/admission/AddAdmissionFirst')));
const AddAdmissionSecond = Loadable(lazy(() => import('../pages/dashboard/pages/admission/AddAdmissionSecond')));
// How To Apply Page Sections
const HowToApplyPage = Loadable(lazy(() => import('../pages/dashboard/pages/how-to-apply/HowToApplyPage')));
const AddHowToApplyBanner = Loadable(lazy(() => import('../pages/dashboard/pages/how-to-apply/AddHowToApplyBanner')));
const AddApplyPara = Loadable(lazy(() => import('../pages/dashboard/pages/how-to-apply/AddApplyPara')));
const AddApplyProcess = Loadable(lazy(() => import('../pages/dashboard/pages/how-to-apply/AddApplyProcess')));
const AddApplyRequirements = Loadable(lazy(() => import('../pages/dashboard/pages/how-to-apply/AddApplyRequirements')));
// Tuition Fees Page Sections
const TuitionFeesPage = Loadable(lazy(() => import('../pages/dashboard/pages/tuition-fees/TuitionFeesPage')));
const AddTuitionFeesBanner = Loadable(lazy(() => import('../pages/dashboard/pages/tuition-fees/AddTuitionFeesBanner')));
const AddGraduateFee = Loadable(lazy(() => import('../pages/dashboard/pages/tuition-fees/AddGraduateFee')));
const AddUnderGraduateFee = Loadable(lazy(() => import('../pages/dashboard/pages/tuition-fees/AddUnderGraduateFee')));
const AddPostGraduateFee = Loadable(lazy(() => import('../pages/dashboard/pages/tuition-fees/AddPostGraduateFee')));
// Financial Aid Page Sections
const FinancialAidPage = Loadable(lazy(() => import('../pages/dashboard/pages/financial-aid/FinancialAidPage')));
const AddFinancialAidBanner = Loadable(
  lazy(() => import('../pages/dashboard/pages/financial-aid/AddFinancialAidBanner'))
);
const AddFinancialFacts = Loadable(lazy(() => import('../pages/dashboard/pages/financial-aid/AddFinancialFacts')));
const AddFinancialSteps = Loadable(lazy(() => import('../pages/dashboard/pages/financial-aid/AddFinancialSteps')));
const AddFinancialAid = Loadable(lazy(() => import('../pages/dashboard/pages/financial-aid/AddFinancialAid')));
const ListFinancialAid = Loadable(lazy(() => import('../pages/dashboard/pages/financial-aid/ListFinancialAid')));
// Dates Deadlines Page Sections
const DatesDeadLinesPage = Loadable(lazy(() => import('../pages/dashboard/pages/dates-deadlines/DatesDeadLinesPage')));
const AddDatesDeadLinesBanner = Loadable(
  lazy(() => import('../pages/dashboard/pages/dates-deadlines/AddDatesDeadLinesBanner'))
);
const AddDeadLines = Loadable(lazy(() => import('../pages/dashboard/pages/dates-deadlines/AddDeadLines')));
// Academics Page Sections
const AcademicsPage = Loadable(lazy(() => import('../pages/dashboard/pages/academics/AcademicsPage')));
const AddAcademicsBanner = Loadable(lazy(() => import('../pages/dashboard/pages/academics/AddAcademicsBanner')));
const AddAcademicHistory = Loadable(lazy(() => import('../pages/dashboard/pages/academics/AddAcademicHistory')));
const AddAcademicGallery = Loadable(lazy(() => import('../pages/dashboard/pages/academics/AddAcademicGallery')));
const AcademicGalleryList = Loadable(lazy(() => import('../pages/dashboard/pages/academics/AcademicGalleryList')));
const AddAcademicOverview = Loadable(lazy(() => import('../pages/dashboard/pages/academics/AddAcademicOverview')));
const AddAcademicStudyAreas = Loadable(lazy(() => import('../pages/dashboard/pages/academics/AddAcademicStudyAreas')));
const AddAcademicMission = Loadable(lazy(() => import('../pages/dashboard/pages/academics/AddAcademicMission')));
// Under Graduate page Sections
const UnderGraduatePage = Loadable(lazy(() => import('../pages/dashboard/pages/under-graduate/UnderGraduatePage')));
const AddUnderGraduateBanner = Loadable(
  lazy(() => import('../pages/dashboard/pages/under-graduate/AddUnderGraduateBanner'))
);
const AddUnderGraduateHistory = Loadable(
  lazy(() => import('../pages/dashboard/pages/under-graduate/AddUnderGraduateHistory'))
);
const AddUnderGraduateDepartments = Loadable(
  lazy(() => import('../pages/dashboard/pages/under-graduate/AddUnderGraduateDepartments'))
);
// Graduate Page Sections
const GraduatePage = Loadable(lazy(() => import('../pages/dashboard/pages/graduate/GraduatePage')));
const AddGraduateBanner = Loadable(lazy(() => import('../pages/dashboard/pages/graduate/AddGraduateBanner')));
const AddGraduateHistory = Loadable(lazy(() => import('../pages/dashboard/pages/graduate/AddGraduateHistory')));
const AddGraduateDepartments = Loadable(lazy(() => import('../pages/dashboard/pages/graduate/AddGraduateDepartments')));
// Post Graduate Page Sections
const PostGraduatePage = Loadable(lazy(() => import('../pages/dashboard/pages/post-graduate/PostGraduatePage')));
const AddPostGraduateBanner = Loadable(
  lazy(() => import('../pages/dashboard/pages/post-graduate/AddPostGraduateBanner'))
);
const AddPostGraduateHistory = Loadable(
  lazy(() => import('../pages/dashboard/pages/post-graduate/AddPostGraduateHistory'))
);
const AddPostGraduateDepartments = Loadable(
  lazy(() => import('../pages/dashboard/pages/post-graduate/AddPostGraduateDepartments'))
);
// Summer Programs Page Sections
const SummerProgramsPage = Loadable(lazy(() => import('../pages/dashboard/pages/summer-programs/SummerProgramsPage')));
const AddSummerProgramsBanner = Loadable(
  lazy(() => import('../pages/dashboard/pages/summer-programs/AddSummerProgramsBanner'))
);
const AddSummerCourses = Loadable(lazy(() => import('../pages/dashboard/pages/summer-programs/AddSummerCourses')));
// Other Components
const OtherPage = Loadable(lazy(() => import('../pages/dashboard/pages/other/OtherPage')));
const AddOtherHeader = Loadable(lazy(() => import('../pages/dashboard/pages/other/AddOtherHeader')));
const AddOtherFooter = Loadable(lazy(() => import('../pages/dashboard/pages/other/AddOtherFooter')));
const AddPage = Loadable(lazy(() => import('../pages/dashboard/pages/other/AddPage')));
const ListDynamicPages = Loadable(lazy(() => import('../pages/dashboard/pages/other/ListDynamicPages')));
// Publication Page
const AddPublication = Loadable(lazy(() => import('../pages/dashboard/pages/AddPublication')));
const PublicationList = Loadable(lazy(() => import('../pages/dashboard/pages/PublicationList')));
// Department
const DepartmentList = Loadable(lazy(() => import('../pages/dashboard/department/DepartmentList')));
const AddDepartment = Loadable(lazy(() => import('../pages/dashboard/department/AddDepartment')));
// Organizations
const AddOrganization = Loadable(lazy(() => import('../pages/dashboard/organization/AddOrganization')));
const OrganizationList = Loadable(lazy(() => import('../pages/dashboard/organization/OrganizationList')));
// Organizations
const ProgramList = Loadable(lazy(() => import('../pages/dashboard/program/ProgramList')));
const AddProgram = Loadable(lazy(() => import('../pages/dashboard/program/AddProgram')));
// Experiences
const AddExperience = Loadable(lazy(() => import('../pages/dashboard/experience/AddExperience')));
const ExperienceList = Loadable(lazy(() => import('../pages/dashboard/experience/ExperienceList')));
// Recognitions
const AddRecognition = Loadable(lazy(() => import('../pages/dashboard/recognition/AddRecognition')));
const RecognitionList = Loadable(lazy(() => import('../pages/dashboard/recognition/RecognitionList')));
// Recognitions
const AddEducation = Loadable(lazy(() => import('../pages/dashboard/education/AddEducation')));
const EducationList = Loadable(lazy(() => import('../pages/dashboard/education/EducationList')));
// News
const AddNews = Loadable(lazy(() => import('../pages/dashboard/news/AddNews')));
const NewsList = Loadable(lazy(() => import('../pages/dashboard/news/NewsList')));
// Announcements
const AddAnnouncement = Loadable(lazy(() => import('../pages/dashboard/announcement/AddAnnouncement')));
const AnnouncementList = Loadable(lazy(() => import('../pages/dashboard/announcement/AnnouncementList')));
// Gallery
const AddGallery = Loadable(lazy(() => import('../pages/dashboard/gallery/AddGallery')));
const GalleryList = Loadable(lazy(() => import('../pages/dashboard/gallery/GalleryList')));
// Resource
const AddResource = Loadable(lazy(() => import('../pages/dashboard/resource/AddResource')));
const ResourceList = Loadable(lazy(() => import('../pages/dashboard/resource/ResourceList')));
// Skills
const Skills = Loadable(lazy(() => import('../pages/dashboard/skills/Skills')));
// Semester
const AddSemester = Loadable(lazy(() => import('../pages/dashboard/semester/AddSemester')));
const SemesterList = Loadable(lazy(() => import('../pages/dashboard/semester/SemesterList')));
// Faculty
const AddFaculty = Loadable(lazy(() => import('../pages/dashboard/faculty/AddFaculty')));
// Sub Campus
const CampusList = Loadable(lazy(() => import('../pages/dashboard/campus/CampusList')));
const AddSubCampus = Loadable(lazy(() => import('../pages/dashboard/campus/AddSubCampus')));
// Authorities
// Syndicate
const AddSyndicate = Loadable(lazy(() => import('../pages/dashboard/pages/authorities/syndicate/AddSyndicate')));
const SyndicatePage = Loadable(lazy(() => import('../pages/dashboard/pages/authorities/syndicate/SyndicatePage')));
const SyndicateList = Loadable(lazy(() => import('../pages/dashboard/pages/authorities/syndicate/SyndicateList')));
// Senate
const AddSenate = Loadable(lazy(() => import('../pages/dashboard/pages/authorities/senate/AddSenate')));
const SenatePage = Loadable(lazy(() => import('../pages/dashboard/pages/authorities/senate/SenatePage')));
const SenateList = Loadable(lazy(() => import('../pages/dashboard/pages/authorities/senate/SenateList')));
// Academic Councel
const AddAcademicCouncel = Loadable(lazy(() => import('../pages/dashboard/pages/authorities/academic-councel/AddAcademicCouncel')));
const AcademicCouncelPage = Loadable(lazy(() => import('../pages/dashboard/pages/authorities/academic-councel/AcademicCouncelPage')));
const AcademicCouncelList = Loadable(lazy(() => import('../pages/dashboard/pages/authorities/academic-councel/AcademicCouncelList')));
// VC Message
const AddVCMessage = Loadable(lazy(() => import('../pages/AddVCMessage')));
// Main
const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));
const About = Loadable(lazy(() => import('../pages/About')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
