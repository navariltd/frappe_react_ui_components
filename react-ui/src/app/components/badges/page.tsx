"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BadgesPage() {
  return (
    <BaseLayout title="Badges" description="Status and notification badges">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Badge Variants</CardTitle>
                <CardDescription>Different badge styles</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Badge Sizes</CardTitle>
                <CardDescription>Badges in different sizes</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-3">
                <Badge className="text-xs">Small</Badge>
                <Badge className="text-sm">Default</Badge>
                <Badge className="text-base py-1 px-3">Large</Badge>
                <Badge variant="outline" className="text-xs">
                  Small
                </Badge>
                <Badge variant="outline" className="text-sm">
                  Default
                </Badge>
                <Badge variant="outline" className="text-base py-1 px-3">
                  Large
                </Badge>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Badge Examples</CardTitle>
              <CardDescription>Common use cases for badges</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">Status:</span>
                <Badge variant="success">Active</Badge>
                <Badge variant="warning">Pending</Badge>
                <Badge variant="destructive">Inactive</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Priority:</span>
                <Badge>Low</Badge>
                <Badge variant="warning">Medium</Badge>
                <Badge variant="destructive">High</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Tags:</span>
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">Tailwind</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
}
