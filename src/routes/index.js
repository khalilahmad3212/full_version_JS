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
        { element: <Navigate to="/dashboard/app" replace /> },
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
            { element: <Navigate to="/dashboard/user/profile" replace /> },
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
            { path: 'campus-info', element: <UpdateHomeCampusInfo /> },
            { path: 'department', element: <DepartmentItemsList /> },
            { path: 'department/new', element: <AddDepartmentItem /> },
            { path: 'department/:id/edit', element: <AddDepartmentItem /> },
            { path: 'admission', element: <UpdateHomeAdmission /> },
            { path: 'how-to-apply', element: <HowToApplyItemList /> },
            { path: 'how-to-apply/new', element: <AddHowToApplyItem /> },
            { path: 'how-to-apply/:id/edit', element: <AddHowToApplyItem /> },
            { path: 'scholarship', element: <UpdateHomeScholarship /> }
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
        // Organizations
        { path: 'organizations', element: <OrganizationList /> },
        { path: 'organization/new', element: <AddOrganization /> },
        { path: 'organizations/:id/edit', element: <AddOrganization /> },
        // Organizations
        { path: 'programs', element: <ProgramList /> },
        { path: 'programs/new', element: <AddProgram /> },
        { path: 'programs/:id/edit', element: <AddProgram /> },
        // Experience
        { path: 'experience', element: <ExperienceList /> },
        { path: 'experience/new', element: <AddExperience /> },
        { path: 'experience/:id/edit', element: <AddExperience /> },
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
        {
          path: 'chat',
          children: [
            { element: <Chat /> },
            { path: 'new', element: <Chat /> },
            { path: ':conversationKey', element: <Chat /> }
          ]
        },
        { path: 'calendar', element: <Calendar /> },
        { path: 'kanban', element: <Kanban /> }
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
const Chat = Loadable(lazy(() => import('../pages/dashboard/Chat')));
const Mail = Loadable(lazy(() => import('../pages/dashboard/Mail')));
const Calendar = Loadable(lazy(() => import('../pages/dashboard/Calendar')));
const Kanban = Loadable(lazy(() => import('../pages/dashboard/Kanban')));
// Home Page Sections
const AddSliderItem = Loadable(lazy(() => import('../pages/dashboard/pages/home/AddSliderItem')));
const SliderItemsList = Loadable(lazy(() => import('../pages/dashboard/pages/home/SliderItemsList')));
const UpdateHomeAbout = Loadable(lazy(() => import('../pages/dashboard/pages/home/UpdateHomeAbout')));
const UpdateHomeMission = Loadable(lazy(() => import('../pages/dashboard/pages/home/UpdateHomeMission')));
const UpdateHomeHistory = Loadable(lazy(() => import('../pages/dashboard/pages/home/UpdateHomeHistory')));
const UpdateHomeCampusInfo = Loadable(lazy(() => import('../pages/dashboard/pages/home/UpdateHomeCampusInfo')));
const DepartmentItemsList = Loadable(lazy(() => import('../pages/dashboard/pages/home/DepartmentItemsList')));
const AddDepartmentItem = Loadable(lazy(() => import('../pages/dashboard/pages/home/AddDepartmentItem')));
const UpdateHomeAdmission = Loadable(lazy(() => import('../pages/dashboard/pages/home/UpdateHomeAdmission')));
const HowToApplyItemList = Loadable(lazy(() => import('../pages/dashboard/pages/home/HowToApplyItemList')));
const AddHowToApplyItem = Loadable(lazy(() => import('../pages/dashboard/pages/home/AddHowToApplyItem')));
const UpdateHomeScholarship = Loadable(lazy(() => import('../pages/dashboard/pages/home/UpdateHomeScholarship')));
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
