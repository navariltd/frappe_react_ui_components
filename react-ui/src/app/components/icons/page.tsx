"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  Bell,
  Check,
  Copy,
  Download,
  Edit,
  Eye,
  EyeOff,
  Filter,
  Heart,
  HelpCircle,
  Home,
  Info,
  Lock,
  Mail,
  Minus,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Share,
  Star,
  Trash2,
  Unlock,
  Upload,
  User,
  X,
} from "lucide-react";

export default function IconsPage() {
  return (
    <BaseLayout title="Icons" description="Icon library and usage">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Icons</CardTitle>
                <CardDescription>Frequently used icons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <Home className="h-8 w-8" />
                    <span className="text-xs">Home</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <User className="h-8 w-8" />
                    <span className="text-xs">User</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <Settings className="h-8 w-8" />
                    <span className="text-xs">Settings</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <Mail className="h-8 w-8" />
                    <span className="text-xs">Mail</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <Bell className="h-8 w-8" />
                    <span className="text-xs">Bell</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <Star className="h-8 w-8" />
                    <span className="text-xs">Star</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <Heart className="h-8 w-8" />
                    <span className="text-xs">Heart</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <Share className="h-8 w-8" />
                    <span className="text-xs">Share</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <Download className="h-8 w-8" />
                    <span className="text-xs">Download</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <Upload className="h-8 w-8" />
                    <span className="text-xs">Upload</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <Search className="h-8 w-8" />
                    <span className="text-xs">Search</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <Filter className="h-8 w-8" />
                    <span className="text-xs">Filter</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Action Icons</CardTitle>
                <CardDescription>
                  Icons for actions and interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <Plus className="h-8 w-8" />
                    <span className="text-xs">Plus</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <Minus className="h-8 w-8" />
                    <span className="text-xs">Minus</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <X className="h-8 w-8" />
                    <span className="text-xs">Close</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <Check className="h-8 w-8" />
                    <span className="text-xs">Check</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <Edit className="h-8 w-8" />
                    <span className="text-xs">Edit</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <Copy className="h-8 w-8" />
                    <span className="text-xs">Copy</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <Trash2 className="h-8 w-8" />
                    <span className="text-xs">Delete</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <RefreshCw className="h-8 w-8" />
                    <span className="text-xs">Refresh</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Icons</CardTitle>
                <CardDescription>Icons for status and feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <AlertCircle className="h-8 w-8 text-destructive" />
                    <span className="text-xs">Error</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <Info className="h-8 w-8 text-blue-500" />
                    <span className="text-xs">Info</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <HelpCircle className="h-8 w-8" />
                    <span className="text-xs">Help</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <Lock className="h-8 w-8" />
                    <span className="text-xs">Lock</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <Unlock className="h-8 w-8" />
                    <span className="text-xs">Unlock</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <Eye className="h-8 w-8" />
                    <span className="text-xs">View</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-muted">
                    <EyeOff className="h-8 w-8" />
                    <span className="text-xs">Hide</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
