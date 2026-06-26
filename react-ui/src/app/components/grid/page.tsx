"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function GridPage() {
  return (
    <BaseLayout title="Grid System" description="Grid layout components">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Grid Columns</CardTitle>
                <CardDescription>Different grid column layouts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    1 Column
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    2 Columns
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    2 Columns
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    3 Columns
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    3 Columns
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    3 Columns
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    4 Columns
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    4 Columns
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    4 Columns
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    4 Columns
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Responsive Grid</CardTitle>
                <CardDescription>
                  Grid that adapts to screen size
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div className="bg-primary/10 p-4 rounded-lg text-center">
                    Col 1
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg text-center">
                    Col 2
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg text-center">
                    Col 3
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg text-center">
                    Col 4
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
