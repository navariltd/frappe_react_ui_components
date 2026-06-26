"use client";

import { Logo } from "@/components/logo";
import {
  AlertTriangle,
  BarChart3,
  Box,
  Calendar,
  CheckSquare,
  CreditCard,
  FormInput,
  HelpCircle,
  Image,
  LayoutDashboard,
  LayoutGrid,
  LayoutPanelLeft,
  LayoutTemplate,
  Mail,
  MessageCircle,
  Palette,
  Settings,
  Shield,
  Table,
  Type,
  Users,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useFrappeAuth, useFrappeGetDoc } from "frappe-react-sdk";

const data = {
  navGroups: [
    {
      label: "Dashboards",
      items: [
        {
          title: "Dashboard 1",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Dashboard 2",
          url: "/dashboard-2",
          icon: LayoutPanelLeft,
        },
      ],
    },
    {
      label: "Components",
      items: [
        {
          title: "UI Elements",
          url: "#",
          icon: Box,
          items: [
            {
              title: "Buttons",
              url: "/components/buttons",
            },
            {
              title: "Cards",
              url: "/components/cards",
            },
            {
              title: "Forms",
              url: "/components/forms",
            },
            {
              title: "Inputs",
              url: "/components/inputs",
            },
            {
              title: "Modals",
              url: "/components/modals",
            },
            {
              title: "Dropdowns",
              url: "/components/dropdowns",
            },
            {
              title: "Tabs",
              url: "/components/tabs",
            },
            {
              title: "Accordions",
              url: "/components/accordions",
            },
            {
              title: "Alerts",
              url: "/components/alerts",
            },
            {
              title: "Badges",
              url: "/components/badges",
            },
          ],
        },
        {
          title: "Layout",
          url: "#",
          icon: LayoutGrid,
          items: [
            {
              title: "Grid System",
              url: "/components/grid",
            },
            {
              title: "Containers",
              url: "/components/containers",
            },
            {
              title: "Sidebar Layouts",
              url: "/components/sidebar-layouts",
            },
            {
              title: "Navigation",
              url: "/components/navigation",
            },
            {
              title: "Breadcrumbs",
              url: "/components/breadcrumbs",
            },
          ],
        },
        {
          title: "Typography",
          url: "#",
          icon: Type,
          items: [
            {
              title: "Headings",
              url: "/components/headings",
            },
            {
              title: "Text Styles",
              url: "/components/text-styles",
            },
            {
              title: "Lists",
              url: "/components/lists",
            },
            {
              title: "Blockquotes",
              url: "/components/blockquotes",
            },
          ],
        },
        {
          title: "Data Display",
          url: "#",
          icon: Table,
          items: [
            {
              title: "Tables",
              url: "/components/tables",
            },
            {
              title: "Data Grids",
              url: "/components/data-grids",
            },
            {
              title: "Lists",
              url: "/components/data-lists",
            },
            {
              title: "Pagination",
              url: "/components/pagination",
            },
          ],
        },
        {
          title: "Charts",
          url: "#",
          icon: BarChart3,
          items: [
            {
              title: "Bar Charts",
              url: "/components/bar-charts",
            },
            {
              title: "Line Charts",
              url: "/components/line-charts",
            },
            {
              title: "Pie Charts",
              url: "/components/pie-charts",
            },
            {
              title: "Area Charts",
              url: "/components/area-charts",
            },
            {
              title: "Mixed Charts",
              url: "/components/mixed-charts",
            },
          ],
        },
        {
          title: "Feedback",
          url: "#",
          icon: MessageCircle,
          items: [
            {
              title: "Toast Notifications",
              url: "/components/toasts",
            },
            {
              title: "Loading States",
              url: "/components/loading-states",
            },
            {
              title: "Progress Bars",
              url: "/components/progress-bars",
            },
            {
              title: "Skeleton Loaders",
              url: "/components/skeletons",
            },
          ],
        },
        {
          title: "Forms & Inputs",
          url: "#",
          icon: FormInput,
          items: [
            {
              title: "Text Inputs",
              url: "/components/text-inputs",
            },
            {
              title: "Select Inputs",
              url: "/components/select-inputs",
            },
            {
              title: "Checkboxes",
              url: "/components/checkboxes",
            },
            {
              title: "Radio Buttons",
              url: "/components/radio-buttons",
            },
            {
              title: "Switches",
              url: "/components/switches",
            },
            {
              title: "File Uploads",
              url: "/components/file-uploads",
            },
            {
              title: "Date Pickers",
              url: "/components/date-pickers",
            },
          ],
        },
        {
          title: "Icons",
          url: "/components/icons",
          icon: Palette,
        },
        {
          title: "Images & Media",
          url: "#",
          icon: Image,
          items: [
            {
              title: "Images",
              url: "/components/images",
            },
            {
              title: "Icons",
              url: "/components/icons",
            },
            {
              title: "Avatars",
              url: "/components/avatars",
            },
            {
              title: "Carousels",
              url: "/components/carousels",
            },
          ],
        },
      ],
    },
    {
      label: "Apps",
      items: [
        {
          title: "Mail",
          url: "/mail",
          icon: Mail,
        },
        {
          title: "Tasks",
          url: "/tasks",
          icon: CheckSquare,
        },
        {
          title: "Chat",
          url: "/chat",
          icon: MessageCircle,
        },
        {
          title: "Calendar",
          url: "/calendar",
          icon: Calendar,
        },
        {
          title: "Users",
          url: "/users",
          icon: Users,
        },
      ],
    },
    {
      label: "Pages",
      items: [
        {
          title: "Landing",
          url: "/landing",
          target: "_blank",
          icon: LayoutTemplate,
        },
        {
          title: "Auth Pages",
          url: "#",
          icon: Shield,
          items: [
            {
              title: "Sign In 1",
              url: "/auth/sign-in",
            },
            {
              title: "Sign In 2",
              url: "/auth/sign-in-2",
            },
            {
              title: "Sign In 3",
              url: "/auth/sign-in-3",
            },
            {
              title: "Sign Up 1",
              url: "/auth/sign-up",
            },
            {
              title: "Sign Up 2",
              url: "/auth/sign-up-2",
            },
            {
              title: "Sign Up 3",
              url: "/auth/sign-up-3",
            },
            {
              title: "Forgot Password 1",
              url: "/auth/forgot-password",
            },
            {
              title: "Forgot Password 2",
              url: "/auth/forgot-password-2",
            },
            {
              title: "Forgot Password 3",
              url: "/auth/forgot-password-3",
            },
          ],
        },
        {
          title: "Errors",
          url: "#",
          icon: AlertTriangle,
          items: [
            {
              title: "Unauthorized",
              url: "/errors/unauthorized",
            },
            {
              title: "Forbidden",
              url: "/errors/forbidden",
            },
            {
              title: "Not Found",
              url: "/errors/not-found",
            },
            {
              title: "Internal Server Error",
              url: "/errors/internal-server-error",
            },
            {
              title: "Under Maintenance",
              url: "/errors/under-maintenance",
            },
          ],
        },
        {
          title: "Settings",
          url: "#",
          icon: Settings,
          items: [
            {
              title: "User Settings",
              url: "/settings/user",
            },
            {
              title: "Account Settings",
              url: "/settings/account",
            },
            {
              title: "Plans & Billing",
              url: "/settings/billing",
            },
            {
              title: "Appearance",
              url: "/settings/appearance",
            },
            {
              title: "Notifications",
              url: "/settings/notifications",
            },
            {
              title: "Connections",
              url: "/settings/connections",
            },
          ],
        },
        {
          title: "FAQs",
          url: "/faqs",
          icon: HelpCircle,
        },
        {
          title: "Pricing",
          url: "/pricing",
          icon: CreditCard,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { currentUser, isLoading: authLoading, logout } = useFrappeAuth();

  const {
    data: userData,
    error: userError,
    isValidating: userLoading,
  } = useFrappeGetDoc<any>("User", currentUser || "", {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const user = {
    name: userData?.full_name || userData?.username || currentUser || "Guest",
    email: userData?.email || "guest@example.com",
    avatar: userData?.user_image || "",
  };

  if (authLoading || userLoading) {
    return (
      <Sidebar {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to="/dashboard">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Logo size={24} className="text-current" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">ReactUI</span>
                    <span className="truncate text-xs">Loading...</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <div className="flex items-center justify-center p-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        </SidebarContent>
        <SidebarFooter>
          <div className="p-2 text-center text-sm text-muted-foreground">
            Loading user...
          </div>
        </SidebarFooter>
      </Sidebar>
    );
  }

  if (userError) {
    console.error("Error fetching user data:", userError);
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Logo size={24} className="text-current" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">ReactUI</span>
                  <span className="truncate text-xs">Admin Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {data.navGroups.map((group) => (
          <NavMain key={group.label} label={group.label} items={group.items} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} onLogout={logout} />
      </SidebarFooter>
    </Sidebar>
  );
}
