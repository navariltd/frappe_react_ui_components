"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SidebarLayoutsPage() {
  return (
    <BaseLayout title="Sidebar Layouts" description="Sidebar layout components">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Left Sidebar</CardTitle>
                <CardDescription>
                  Content with sidebar on the left
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex min-h-[200px]">
                  <div className="w-32 bg-muted/50 p-4 rounded-l-lg">
                    <p className="text-sm font-medium">Sidebar</p>
                    <ul className="mt-4 space-y-2 text-sm">
                      <li>Item 1</li>
                      <li>Item 2</li>
                      <li>Item 3</li>
                    </ul>
                  </div>
                  <div className="flex-1 bg-muted/30 p-4 rounded-r-lg">
                    <p className="text-sm">Main Content Area</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Right Sidebar</CardTitle>
                <CardDescription>
                  Content with sidebar on the right
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex min-h-[200px]">
                  <div className="flex-1 bg-muted/30 p-4 rounded-l-lg">
                    <p className="text-sm">Main Content Area</p>
                  </div>
                  <div className="w-32 bg-muted/50 p-4 rounded-r-lg">
                    <p className="text-sm font-medium">Sidebar</p>
                    <ul className="mt-4 space-y-2 text-sm">
                      <li>Item 1</li>
                      <li>Item 2</li>
                      <li>Item 3</li>
                    </ul>
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
