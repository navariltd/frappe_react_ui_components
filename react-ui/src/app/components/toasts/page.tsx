"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { toast } from "sonner";

export default function ToastsPage() {
  return (
    <BaseLayout title="Toasts" description="Toast notification components">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Toast Variants</CardTitle>
                <CardDescription>
                  Different toast notification styles
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button
                  onClick={() => {
                    toast("Success", {
                      description: "Your changes have been saved.",
                    });
                  }}
                >
                  Default
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    toast.error("Error", {
                      description: "Something went wrong.",
                    });
                  }}
                >
                  Destructive
                </Button>
                <Button
                  variant="default"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    toast.success("Success", {
                      description: "Operation completed successfully.",
                    });
                  }}
                >
                  Success
                </Button>
                <Button
                  variant="default"
                  className="bg-yellow-600 hover:bg-yellow-700"
                  onClick={() => {
                    toast.warning("Warning", {
                      description: "Please review your changes.",
                    });
                  }}
                >
                  Warning
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>With Icons</CardTitle>
                <CardDescription>
                  Toast notifications with icons
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button
                  onClick={() => {
                    toast.success("Success", {
                      description: "Your changes have been saved.",
                      icon: <CheckCircle className="h-5 w-5" />,
                    });
                  }}
                >
                  Success
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    toast.error("Error", {
                      description: "Something went wrong.",
                      icon: <AlertCircle className="h-5 w-5" />,
                    });
                  }}
                >
                  Error
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    toast.info("Information", {
                      description: "New update available.",
                      icon: <Info className="h-5 w-5" />,
                    });
                  }}
                >
                  Info
                </Button>
                <Button
                  variant="outline"
                  className="border-yellow-500 text-yellow-700"
                  onClick={() => {
                    toast.warning("Warning", {
                      description: "Your session will expire soon.",
                      icon: <AlertTriangle className="h-5 w-5" />,
                    });
                  }}
                >
                  Warning
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>With Actions</CardTitle>
                <CardDescription>Toast with action buttons</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => {
                    toast("New message", {
                      description: "You have a new message from John Doe.",
                      action: {
                        label: "View",
                        onClick: () => console.log("View message clicked"),
                      },
                    });
                  }}
                >
                  Show Toast with Action
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Duration</CardTitle>
                <CardDescription>Toast with custom duration</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button
                  onClick={() => {
                    toast("Quick toast", {
                      description: "This will disappear in 2 seconds.",
                      duration: 2000,
                    });
                  }}
                >
                  2 Seconds
                </Button>
                <Button
                  onClick={() => {
                    toast("Long toast", {
                      description: "This will disappear in 10 seconds.",
                      duration: 10000,
                    });
                  }}
                >
                  10 Seconds
                </Button>
                <Button
                  onClick={() => {
                    toast("Persistent toast", {
                      description: "This will stay until dismissed.",
                      duration: Infinity,
                    });
                  }}
                >
                  Persistent
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rich Content</CardTitle>
                <CardDescription>Toast with rich HTML content</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button
                  onClick={() => {
                    toast(
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Upload complete</p>
                            <p className="text-sm text-muted-foreground">
                              File uploaded successfully
                            </p>
                          </div>
                        </div>
                      </div>,
                    );
                  }}
                >
                  Rich Content
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Promise Toast</CardTitle>
                <CardDescription>Toast for async operations</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => {
                    const promise = new Promise((resolve) => {
                      setTimeout(() => resolve("Data loaded!"), 2000);
                    });

                    toast.promise(promise, {
                      loading: "Loading data...",
                      success: (data) => {
                        return `Success: ${data}`;
                      },
                      error: "Failed to load data",
                    });
                  }}
                >
                  Load Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
