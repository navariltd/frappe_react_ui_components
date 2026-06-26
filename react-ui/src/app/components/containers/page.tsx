"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ContainersPage() {
  return (
    <BaseLayout title="Containers" description="Layout container components">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Container Sizes</CardTitle>
                <CardDescription>
                  Different container width constraints
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="container">
                    <p className="text-sm">
                      Default container (max-width: 1280px)
                    </p>
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="container-sm">
                    <p className="text-sm">
                      Small container (max-width: 640px)
                    </p>
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="container-md">
                    <p className="text-sm">
                      Medium container (max-width: 768px)
                    </p>
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="container-lg">
                    <p className="text-sm">
                      Large container (max-width: 1024px)
                    </p>
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="container-xl">
                    <p className="text-sm">XL container (max-width: 1280px)</p>
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="container-full">
                    <p className="text-sm">
                      Full-width container (no max-width)
                    </p>
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
