"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LineChartsPage() {
  return (
    <BaseLayout title="Line Charts" description="Line chart components">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Line Chart</CardTitle>
                <CardDescription>Simple line chart with points</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-48">
                  <svg className="w-full h-full" viewBox="0 0 400 200">
                    <polyline
                      points="0,160 80,120 160,140 240,80 320,100 400,60"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                    />
                    <circle cx="0" cy="160" r="4" fill="hsl(var(--primary))" />
                    <circle cx="80" cy="120" r="4" fill="hsl(var(--primary))" />
                    <circle
                      cx="160"
                      cy="140"
                      r="4"
                      fill="hsl(var(--primary))"
                    />
                    <circle cx="240" cy="80" r="4" fill="hsl(var(--primary))" />
                    <circle
                      cx="320"
                      cy="100"
                      r="4"
                      fill="hsl(var(--primary))"
                    />
                    <circle cx="400" cy="60" r="4" fill="hsl(var(--primary))" />
                  </svg>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Multiple Lines</CardTitle>
                <CardDescription>
                  Line chart with multiple data series
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-48">
                  <svg className="w-full h-full" viewBox="0 0 400 200">
                    <polyline
                      points="0,160 80,120 160,140 240,80 320,100 400,60"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                    />
                    <polyline
                      points="0,140 80,100 160,120 240,60 320,80 400,40"
                      fill="none"
                      stroke="hsl(var(--destructive))"
                      strokeWidth="3"
                      strokeDasharray="5,5"
                    />
                    <circle cx="0" cy="160" r="4" fill="hsl(var(--primary))" />
                    <circle cx="80" cy="120" r="4" fill="hsl(var(--primary))" />
                    <circle
                      cx="160"
                      cy="140"
                      r="4"
                      fill="hsl(var(--primary))"
                    />
                    <circle cx="240" cy="80" r="4" fill="hsl(var(--primary))" />
                    <circle
                      cx="320"
                      cy="100"
                      r="4"
                      fill="hsl(var(--primary))"
                    />
                    <circle cx="400" cy="60" r="4" fill="hsl(var(--primary))" />
                    <circle
                      cx="0"
                      cy="140"
                      r="4"
                      fill="hsl(var(--destructive))"
                    />
                    <circle
                      cx="80"
                      cy="100"
                      r="4"
                      fill="hsl(var(--destructive))"
                    />
                    <circle
                      cx="160"
                      cy="120"
                      r="4"
                      fill="hsl(var(--destructive))"
                    />
                    <circle
                      cx="240"
                      cy="60"
                      r="4"
                      fill="hsl(var(--destructive))"
                    />
                    <circle
                      cx="320"
                      cy="80"
                      r="4"
                      fill="hsl(var(--destructive))"
                    />
                    <circle
                      cx="400"
                      cy="40"
                      r="4"
                      fill="hsl(var(--destructive))"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
