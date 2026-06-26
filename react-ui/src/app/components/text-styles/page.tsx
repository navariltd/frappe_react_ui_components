"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TextStylesPage() {
  return (
    <BaseLayout title="Text Styles" description="Typography text styling">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Text Sizes</CardTitle>
                <CardDescription>Different text size utilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-xs">Text XS (0.75rem)</p>
                <p className="text-sm">Text SM (0.875rem)</p>
                <p className="text-base">Text Base (1rem)</p>
                <p className="text-lg">Text LG (1.125rem)</p>
                <p className="text-xl">Text XL (1.25rem)</p>
                <p className="text-2xl">Text 2XL (1.5rem)</p>
                <p className="text-3xl">Text 3XL (1.875rem)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Text Weights</CardTitle>
                <CardDescription>Different font weights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-thin">Thin (100)</p>
                <p className="font-light">Light (300)</p>
                <p className="font-normal">Normal (400)</p>
                <p className="font-medium">Medium (500)</p>
                <p className="font-semibold">Semibold (600)</p>
                <p className="font-bold">Bold (700)</p>
                <p className="font-extrabold">Extrabold (800)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Text Colors</CardTitle>
                <CardDescription>Text color utilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-primary">Primary</p>
                <p className="text-secondary">Secondary</p>
                <p className="text-muted-foreground">Muted Foreground</p>
                <p className="text-destructive">Destructive</p>
                <p className="text-foreground">Foreground</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Text Alignment</CardTitle>
                <CardDescription>Text alignment utilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-left">Left aligned text</p>
                <p className="text-center">Center aligned text</p>
                <p className="text-right">Right aligned text</p>
                <p className="text-justify">
                  Justified text that stretches to fill the container width
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
