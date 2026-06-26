"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HeadingsPage() {
  return (
    <BaseLayout title="Headings" description="Heading typography components">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Heading Levels</CardTitle>
                <CardDescription>
                  All heading sizes from H1 to H6
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  H1 Heading
                </h1>
                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                  H2 Heading
                </h2>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  H3 Heading
                </h3>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  H4 Heading
                </h4>
                <h5 className="scroll-m-20 text-lg font-semibold tracking-tight">
                  H5 Heading
                </h5>
                <h6 className="scroll-m-20 text-base font-semibold tracking-tight">
                  H6 Heading
                </h6>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Heading with Description</CardTitle>
                <CardDescription>Headings with supporting text</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">Page Title</h2>
                  <p className="text-muted-foreground">
                    This is a description for the page heading
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Section Title</h3>
                  <p className="text-sm text-muted-foreground">
                    Supporting text for the section
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-medium">Subsection Title</h4>
                  <p className="text-xs text-muted-foreground">
                    Additional context for the subsection
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
