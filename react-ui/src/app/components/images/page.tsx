"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ImagesPage() {
  return (
    <BaseLayout title="Images" description="Image components and styling">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Image Sizes</CardTitle>
                <CardDescription>Images in different sizes</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4 items-center">
                <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">64x64</span>
                </div>
                <div className="w-32 h-32 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">128x128</span>
                </div>
                <div className="w-48 h-48 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">192x192</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Image Shapes</CardTitle>
                <CardDescription>
                  Images with different border radii
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <div className="w-24 h-24 bg-muted rounded-none flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">Square</span>
                </div>
                <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">Rounded</span>
                </div>
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">Circle</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Responsive Image</CardTitle>
              <CardDescription>Image that fills its container</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Image placeholder</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
}
