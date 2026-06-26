import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Landing = lazy(() => import("@/app/landing/page"));
const Dashboard = lazy(() => import("@/app/dashboard/page"));
const Dashboard2 = lazy(() => import("@/app/dashboard-2/page"));
const Mail = lazy(() => import("@/app/mail/page"));
const Tasks = lazy(() => import("@/app/tasks/page"));
const Chat = lazy(() => import("@/app/chat/page"));
const Calendar = lazy(() => import("@/app/calendar/page"));
const Users = lazy(() => import("@/app/users/page"));
const FAQs = lazy(() => import("@/app/faqs/page"));
const Pricing = lazy(() => import("@/app/pricing/page"));

const SignIn = lazy(() => import("@/app/auth/sign-in/page"));
const SignIn2 = lazy(() => import("@/app/auth/sign-in-2/page"));
const SignIn3 = lazy(() => import("@/app/auth/sign-in-3/page"));
const SignUp = lazy(() => import("@/app/auth/sign-up/page"));
const SignUp2 = lazy(() => import("@/app/auth/sign-up-2/page"));
const SignUp3 = lazy(() => import("@/app/auth/sign-up-3/page"));
const ForgotPassword = lazy(() => import("@/app/auth/forgot-password/page"));
const ForgotPassword2 = lazy(() => import("@/app/auth/forgot-password-2/page"));
const ForgotPassword3 = lazy(() => import("@/app/auth/forgot-password-3/page"));

const Unauthorized = lazy(() => import("@/app/errors/unauthorized/page"));
const Forbidden = lazy(() => import("@/app/errors/forbidden/page"));
const NotFound = lazy(() => import("@/app/errors/not-found/page"));
const InternalServerError = lazy(
  () => import("@/app/errors/internal-server-error/page"),
);
const UnderMaintenance = lazy(
  () => import("@/app/errors/under-maintenance/page"),
);

const UserSettings = lazy(() => import("@/app/settings/user/page"));
const AccountSettings = lazy(() => import("@/app/settings/account/page"));
const BillingSettings = lazy(() => import("@/app/settings/billing/page"));
const AppearanceSettings = lazy(() => import("@/app/settings/appearance/page"));
const NotificationSettings = lazy(
  () => import("@/app/settings/notifications/page"),
);
const ConnectionSettings = lazy(
  () => import("@/app/settings/connections/page"),
);

const ButtonsPage = lazy(() => import("@/app/components/buttons/page"));
const AccordionsPage = lazy(() => import("@/app/components/accordions/page"));
const AlertsPage = lazy(() => import("@/app/components/alerts/page"));
const AvatarsPage = lazy(() => import("@/app/components/avatars/page"));
const BadgesPage = lazy(() => import("@/app/components/badges/page"));
const BlockquotesPage = lazy(() => import("@/app/components/blockquotes/page"));
const BreadcrumbsPage = lazy(() => import("@/app/components/breadcrumbs/page"));
const CardsPage = lazy(() => import("@/app/components/cards/page"));
const CarouselsPage = lazy(() => import("@/app/components/carousels/page"));
const CheckboxesPage = lazy(() => import("@/app/components/checkboxes/page"));
const ContainersPage = lazy(() => import("@/app/components/containers/page"));
const DataGridsPage = lazy(() => import("@/app/components/data-grids/page"));
const DataListsPage = lazy(() => import("@/app/components/data-lists/page"));
const DatePickersPage = lazy(
  () => import("@/app/components/date-pickers/page"),
);
const DropdownsPage = lazy(() => import("@/app/components/dropdowns/page"));
const FileUploadsPage = lazy(
  () => import("@/app/components/file-uploads/page"),
);
const FormsPage = lazy(() => import("@/app/components/forms/page"));
const GridPage = lazy(() => import("@/app/components/grid/page"));
const HeadingsPage = lazy(() => import("@/app/components/headings/page"));
const IconsPage = lazy(() => import("@/app/components/icons/page"));
const ImagesPage = lazy(() => import("@/app/components/images/page"));
const InputsPage = lazy(() => import("@/app/components/inputs/page"));
const ListsPage = lazy(() => import("@/app/components/lists/page"));
const LoadingStatesPage = lazy(
  () => import("@/app/components/loading-states/page"),
);
const ModalsPage = lazy(() => import("@/app/components/modals/page"));
const NavigationPage = lazy(() => import("@/app/components/navigation/page"));
const PaginationPage = lazy(() => import("@/app/components/pagination/page"));
const RadioButtonsPage = lazy(
  () => import("@/app/components/radio-buttons/page"),
);
const SelectInputsPage = lazy(
  () => import("@/app/components/select-inputs/page"),
);
const SidebarLayoutsPage = lazy(
  () => import("@/app/components/sidebar-layouts/page"),
);
const SkeletonsPage = lazy(() => import("@/app/components/skeletons/page"));
const SwitchesPage = lazy(() => import("@/app/components/switches/page"));
const TabsPage = lazy(() => import("@/app/components/tabs/page"));
const TextInputsPage = lazy(() => import("@/app/components/text-inputs/page"));
const TextStylesPage = lazy(() => import("@/app/components/text-styles/page"));
const ToastsPage = lazy(() => import("@/app/components/toasts/page"));
const ProgressBarsPage = lazy(
  () => import("@/app/components/progress-bars/page"),
);
const BarChartsPage = lazy(() => import("@/app/components/bar-charts/page"));
const LineChartsPage = lazy(() => import("@/app/components/line-charts/page"));
const PieChartsPage = lazy(() => import("@/app/components/pie-charts/page"));
const AreaChartsPage = lazy(() => import("@/app/components/area-charts/page"));
const MixedChartsPage = lazy(
  () => import("@/app/components/mixed-charts/page"),
);
const TablePage = lazy(() => import("@/app/components/table/page"));

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}

export const routes: RouteConfig[] = [
  {
    path: "/",
    element: <Navigate to="dashboard" replace />,
  },
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard-2",
    element: <Dashboard2 />,
  },
  {
    path: "/mail",
    element: <Mail />,
  },
  {
    path: "/tasks",
    element: <Tasks />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/calendar",
    element: <Calendar />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/faqs",
    element: <FAQs />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/auth/sign-in",
    element: <SignIn />,
  },
  {
    path: "/auth/sign-in-2",
    element: <SignIn2 />,
  },
  {
    path: "/auth/sign-in-3",
    element: <SignIn3 />,
  },
  {
    path: "/auth/sign-up",
    element: <SignUp />,
  },
  {
    path: "/auth/sign-up-2",
    element: <SignUp2 />,
  },
  {
    path: "/auth/sign-up-3",
    element: <SignUp3 />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/auth/forgot-password-2",
    element: <ForgotPassword2 />,
  },
  {
    path: "/auth/forgot-password-3",
    element: <ForgotPassword3 />,
  },
  {
    path: "/errors/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/errors/forbidden",
    element: <Forbidden />,
  },
  {
    path: "/errors/not-found",
    element: <NotFound />,
  },
  {
    path: "/errors/internal-server-error",
    element: <InternalServerError />,
  },
  {
    path: "/errors/under-maintenance",
    element: <UnderMaintenance />,
  },
  {
    path: "/settings/user",
    element: <UserSettings />,
  },
  {
    path: "/settings/account",
    element: <AccountSettings />,
  },
  {
    path: "/settings/billing",
    element: <BillingSettings />,
  },
  {
    path: "/settings/appearance",
    element: <AppearanceSettings />,
  },
  {
    path: "/settings/notifications",
    element: <NotificationSettings />,
  },
  {
    path: "/settings/connections",
    element: <ConnectionSettings />,
  },
  {
    path: "/components/buttons",
    element: <ButtonsPage />,
  },
  {
    path: "/components/accordions",
    element: <AccordionsPage />,
  },
  {
    path: "/components/alerts",
    element: <AlertsPage />,
  },
  {
    path: "/components/avatars",
    element: <AvatarsPage />,
  },
  {
    path: "/components/badges",
    element: <BadgesPage />,
  },
  {
    path: "/components/blockquotes",
    element: <BlockquotesPage />,
  },
  {
    path: "/components/breadcrumbs",
    element: <BreadcrumbsPage />,
  },
  {
    path: "/components/cards",
    element: <CardsPage />,
  },
  {
    path: "/components/carousels",
    element: <CarouselsPage />,
  },
  {
    path: "/components/checkboxes",
    element: <CheckboxesPage />,
  },
  {
    path: "/components/containers",
    element: <ContainersPage />,
  },
  {
    path: "/components/data-grids",
    element: <DataGridsPage />,
  },
  {
    path: "/components/data-lists",
    element: <DataListsPage />,
  },
  {
    path: "/components/date-pickers",
    element: <DatePickersPage />,
  },
  {
    path: "/components/dropdowns",
    element: <DropdownsPage />,
  },
  {
    path: "/components/file-uploads",
    element: <FileUploadsPage />,
  },
  {
    path: "/components/forms",
    element: <FormsPage />,
  },
  {
    path: "/components/grid",
    element: <GridPage />,
  },
  {
    path: "/components/headings",
    element: <HeadingsPage />,
  },
  {
    path: "/components/icons",
    element: <IconsPage />,
  },
  {
    path: "/components/images",
    element: <ImagesPage />,
  },
  {
    path: "/components/inputs",
    element: <InputsPage />,
  },
  {
    path: "/components/lists",
    element: <ListsPage />,
  },
  {
    path: "/components/loading-states",
    element: <LoadingStatesPage />,
  },
  {
    path: "/components/modals",
    element: <ModalsPage />,
  },
  {
    path: "/components/navigation",
    element: <NavigationPage />,
  },
  {
    path: "/components/pagination",
    element: <PaginationPage />,
  },
  {
    path: "/components/radio-buttons",
    element: <RadioButtonsPage />,
  },
  {
    path: "/components/select-inputs",
    element: <SelectInputsPage />,
  },
  {
    path: "/components/sidebar-layouts",
    element: <SidebarLayoutsPage />,
  },
  {
    path: "/components/skeletons",
    element: <SkeletonsPage />,
  },
  {
    path: "/components/switches",
    element: <SwitchesPage />,
  },
  {
    path: "/components/tabs",
    element: <TabsPage />,
  },
  {
    path: "/components/text-inputs",
    element: <TextInputsPage />,
  },
  {
    path: "/components/text-styles",
    element: <TextStylesPage />,
  },
  {
    path: "/components/toasts",
    element: <ToastsPage />,
  },
  {
    path: "/components/progress-bars",
    element: <ProgressBarsPage />,
  },
  {
    path: "/components/bar-charts",
    element: <BarChartsPage />,
  },
  {
    path: "/components/line-charts",
    element: <LineChartsPage />,
  },
  {
    path: "/components/pie-charts",
    element: <PieChartsPage />,
  },
  {
    path: "/components/area-charts",
    element: <AreaChartsPage />,
  },
  {
    path: "/components/mixed-charts",
    element: <MixedChartsPage />,
  },
  {
    path: "/components/tables",
    element: <TablePage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
