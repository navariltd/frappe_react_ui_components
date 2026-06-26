"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PieChartsPage() {
  return (
    <BaseLayout title="Pie Charts" description="Pie chart components">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Pie Chart</CardTitle>
                <CardDescription>
                  Simple pie chart with segments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-48 h-48">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full -rotate-90"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="20"
                        strokeDasharray="251.2"
                        strokeDashoffset="0"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="hsl(var(--destructive))"
                        strokeWidth="20"
                        strokeDasharray="251.2"
                        strokeDashoffset="75.36"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="hsl(var(--secondary))"
                        strokeWidth="20"
                        strokeDasharray="251.2"
                        strokeDashoffset="150.72"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="20"
                        strokeDasharray="251.2"
                        strokeDashoffset="226.08"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span>Category A</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-destructive" />
                      <span>Category B</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-secondary" />
                      <span>Category C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-muted" />
                      <span>Category D</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Donut Chart</CardTitle>
                <CardDescription>Pie chart with center hole</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-48 h-48">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full -rotate-90"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="30"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="20"
                        strokeDasharray="188.4"
                        strokeDashoffset="0"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="30"
                        fill="none"
                        stroke="hsl(var(--destructive))"
                        strokeWidth="20"
                        strokeDasharray="188.4"
                        strokeDashoffset="56.52"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="30"
                        fill="none"
                        stroke="hsl(var(--secondary))"
                        strokeWidth="20"
                        strokeDasharray="188.4"
                        strokeDashoffset="113.04"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="30"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="20"
                        strokeDasharray="188.4"
                        strokeDashoffset="169.56"
                      />
                      <circle cx="50" cy="50" r="15" fill="white" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-medium">Total</span>
                    </div>
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
