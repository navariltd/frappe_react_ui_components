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
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw } from "lucide-react";

export default function LoadingStatesPage() {
  return (
    <BaseLayout
      title="Loading States"
      description="Loading indicator components"
    >
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Skeletons</CardTitle>
                <CardDescription>Simple loading skeletons</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card Skeleton</CardTitle>
                <CardDescription>Loading state for cards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                  <Skeleton className="h-[125px] w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spinner Loading</CardTitle>
                <CardDescription>Spinner animation</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-8">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  <p className="text-sm text-muted-foreground">Loading...</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Button Loading</CardTitle>
                <CardDescription>Loading state on buttons</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button disabled>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </Button>
                <Button variant="outline" disabled>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </Button>
                <Button variant="secondary" disabled>
                  Please wait...
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
