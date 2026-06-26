"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Bell,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Edit,
  Eye,
  Filter,
  Heart,
  Mail,
  Plus,
  RefreshCw,
  Save,
  Search,
  Settings,
  Share,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react";

export default function ButtonsPage() {
  return (
    <BaseLayout
      title="Buttons"
      description="Button components with variants, sizes, and states"
    >
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Variants */}
            <Card>
              <CardHeader>
                <CardTitle>Variants</CardTitle>
                <CardDescription>
                  Different button visual styles
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </CardContent>
            </Card>

            {/* Sizes */}
            <Card>
              <CardHeader>
                <CardTitle>Sizes</CardTitle>
                <CardDescription>
                  Button sizes from small to large
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon" className="h-9 w-9">
                  <Plus className="h-4 w-4" />
                </Button>
                <Button size="icon" className="h-10 w-10">
                  <Plus className="h-5 w-5" />
                </Button>
              </CardContent>
            </Card>

            {/* With Icons */}
            <Card>
              <CardHeader>
                <CardTitle>With Icons</CardTitle>
                <CardDescription>
                  Buttons with leading and trailing icons
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New
                </Button>
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
                <Button variant="secondary">
                  Download
                  <Download className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Star className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* States */}
            <Card>
              <CardHeader>
                <CardTitle>States</CardTitle>
                <CardDescription>
                  Button states for different scenarios
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button>Default</Button>
                <Button disabled>Disabled</Button>
                <Button variant="outline" disabled>
                  Disabled
                </Button>
                <Button className="cursor-progress">
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </Button>
                <Button variant="destructive">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Error
                </Button>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Action Buttons</CardTitle>
                <CardDescription>Common action button patterns</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button variant="default">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
                <Button variant="outline">
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button variant="secondary">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Navigation</CardTitle>
                <CardDescription>
                  Buttons for navigation and pagination
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button variant="outline">
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    1
                  </Button>
                  <Button variant="default" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    4
                  </Button>
                  <Button variant="outline" size="sm">
                    5
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
                <CardDescription>
                  Buttons for social media integration
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button variant="outline" className="gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                  >
                    <path
                      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                      fill="currentColor"
                    />
                  </svg>
                  GitHub
                </Button>
                <Button variant="outline" className="gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                  >
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Apple
                </Button>
              </CardContent>
            </Card>

            {/* Button Groups */}
            <Card>
              <CardHeader>
                <CardTitle>Button Groups</CardTitle>
                <CardDescription>
                  Grouped buttons for related actions
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <div className="flex rounded-md shadow-sm">
                  <Button variant="default" className="rounded-r-none">
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-l-none border-l-0"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex rounded-md shadow-sm">
                  <Button variant="outline" className="rounded-r-none">
                    Day
                  </Button>
                  <Button variant="default" className="rounded-none">
                    Week
                  </Button>
                  <Button variant="outline" className="rounded-l-none">
                    Month
                  </Button>
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    1
                  </Button>
                  <Button variant="default" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* With Badges */}
            <Card>
              <CardHeader>
                <CardTitle>With Badges</CardTitle>
                <CardDescription>
                  Buttons with badge notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button variant="outline" className="relative">
                  Notifications
                  <Badge
                    variant="destructive"
                    className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    3
                  </Badge>
                </Button>
                <Button variant="default" className="relative">
                  <Bell className="mr-2 h-4 w-4" />
                  Alerts
                  <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    5
                  </Badge>
                </Button>
                <Button variant="secondary" className="relative">
                  <Mail className="mr-2 h-4 w-4" />
                  Inbox
                  <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    12
                  </Badge>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Full Width Button Example */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Full Width</CardTitle>
              <CardDescription>
                Buttons that span the full container width
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button className="w-full">Full Width Button</Button>
              <Button variant="outline" className="w-full">
                Full Width Outline
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button>Half Width</Button>
                <Button variant="outline">Half Width</Button>
              </div>
            </CardContent>
          </Card>

          {/* Additional Examples */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Additional Examples</CardTitle>
              <CardDescription>
                More button combinations and use cases
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button variant="default" className="gap-2">
                <Plus className="h-4 w-4" />
                Create New
              </Button>
              <Button variant="secondary" className="gap-2">
                <Upload className="h-4 w-4" />
                Import
              </Button>
              <Button variant="outline" className="gap-2">
                <Copy className="h-4 w-4" />
                Duplicate
              </Button>
              <Button variant="ghost" className="gap-2">
                <Share className="h-4 w-4" />
                Share
              </Button>
              <Button variant="destructive" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Delete All
              </Button>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button variant="ghost" className="gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
              <Button variant="secondary" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Button variant="outline" className="gap-2">
                <Save className="h-4 w-4" />
                Save Draft
              </Button>
              <Button variant="default" className="gap-2">
                <Check className="h-4 w-4" />
                Publish
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
}
