"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TextInputsPage() {
  return (
    <BaseLayout title="Text Inputs" description="Text input components">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Input Types</CardTitle>
                <CardDescription>Different text input types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text">Text</Label>
                  <Input id="text" placeholder="Enter text" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <Input id="search" type="search" placeholder="Search..." />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Input Sizes</CardTitle>
                <CardDescription>Inputs in different sizes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="small">Small</Label>
                  <Input
                    id="small"
                    className="h-8 text-sm"
                    placeholder="Small input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default">Default</Label>
                  <Input id="default" placeholder="Default input" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="large">Large</Label>
                  <Input
                    id="large"
                    className="h-12 text-base"
                    placeholder="Large input"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
