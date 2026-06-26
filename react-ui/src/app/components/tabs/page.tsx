"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsPage() {
  return (
    <BaseLayout title="Tabs" description="Tab navigation components">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Tabs</CardTitle>
                <CardDescription>Simple tab navigation</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="tab1">
                  <TabsList>
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1">
                    <p>Content for Tab 1</p>
                  </TabsContent>
                  <TabsContent value="tab2">
                    <p>Content for Tab 2</p>
                  </TabsContent>
                  <TabsContent value="tab3">
                    <p>Content for Tab 3</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tab with Content</CardTitle>
                <CardDescription>Tabs with rich content</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="notifications">
                      Notifications
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="profile">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Profile</h3>
                      <p className="text-sm text-muted-foreground">
                        Manage your profile information and preferences.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="settings">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Settings</h3>
                      <p className="text-sm text-muted-foreground">
                        Configure your application settings.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="notifications">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Manage your notification preferences.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
