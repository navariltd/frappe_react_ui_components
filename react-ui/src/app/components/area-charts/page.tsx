"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MixedChartsPage() {
  return (
    <BaseLayout title="Mixed Charts" description="Mixed chart components">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Bar & Line Mix</CardTitle>
                <CardDescription>Bar chart with line overlay</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-48">
                  <svg className="w-full h-full" viewBox="0 0 400 200">
                    <rect
                      x="10"
                      y="80"
                      width="50"
                      height="80"
                      fill="hsl(var(--primary))"
                      rx="4"
                    />
                    <rect
                      x="80"
                      y="40"
                      width="50"
                      height="120"
                      fill="hsl(var(--primary))"
                      rx="4"
                    />
                    <rect
                      x="150"
                      y="60"
                      width="50"
                      height="100"
                      fill="hsl(var(--primary))"
                      rx="4"
                    />
                    <rect
                      x="220"
                      y="20"
                      width="50"
                      height="140"
                      fill="hsl(var(--primary))"
                      rx="4"
                    />
                    <rect
                      x="290"
                      y="50"
                      width="50"
                      height="110"
                      fill="hsl(var(--primary))"
                      rx="4"
                    />
                    <polyline
                      points="35,100 105,70 175,90 245,50 315,80"
                      fill="none"
                      stroke="hsl(var(--destructive))"
                      strokeWidth="3"
                    />
                    <circle
                      cx="35"
                      cy="100"
                      r="4"
                      fill="hsl(var(--destructive))"
                    />
                    <circle
                      cx="105"
                      cy="70"
                      r="4"
                      fill="hsl(var(--destructive))"
                    />
                    <circle
                      cx="175"
                      cy="90"
                      r="4"
                      fill="hsl(var(--destructive))"
                    />
                    <circle
                      cx="245"
                      cy="50"
                      r="4"
                      fill="hsl(var(--destructive))"
                    />
                    <circle
                      cx="315"
                      cy="80"
                      r="4"
                      fill="hsl(var(--destructive))"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Multiple Series</CardTitle>
                <CardDescription>
                  Mixed chart with multiple data series
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-48">
                  <svg className="w-full h-full" viewBox="0 0 400 200">
                    <rect
                      x="10"
                      y="100"
                      width="40"
                      height="60"
                      fill="hsl(var(--primary))"
                      rx="4"
                    />
                    <rect
                      x="70"
                      y="60"
                      width="40"
                      height="100"
                      fill="hsl(var(--primary))"
                      rx="4"
                    />
                    <rect
                      x="130"
                      y="80"
                      width="40"
                      height="80"
                      fill="hsl(var(--primary))"
                      rx="4"
                    />
                    <rect
                      x="190"
                      y="40"
                      width="40"
                      height="120"
                      fill="hsl(var(--primary))"
                      rx="4"
                    />
                    <rect
                      x="250"
                      y="70"
                      width="40"
                      height="90"
                      fill="hsl(var(--primary))"
                      rx="4"
                    />
                    <rect
                      x="310"
                      y="50"
                      width="40"
                      height="110"
                      fill="hsl(var(--primary))"
                      rx="4"
                    />
                    <polyline
                      points="30,140 90,110 150,130 210,90 270,120 330,100"
                      fill="none"
                      stroke="hsl(var(--secondary))"
                      strokeWidth="3"
                      strokeDasharray="5,5"
                    />
                    <circle
                      cx="30"
                      cy="140"
                      r="4"
                      fill="hsl(var(--secondary))"
                    />
                    <circle
                      cx="90"
                      cy="110"
                      r="4"
                      fill="hsl(var(--secondary))"
                    />
                    <circle
                      cx="150"
                      cy="130"
                      r="4"
                      fill="hsl(var(--secondary))"
                    />
                    <circle
                      cx="210"
                      cy="90"
                      r="4"
                      fill="hsl(var(--secondary))"
                    />
                    <circle
                      cx="270"
                      cy="120"
                      r="4"
                      fill="hsl(var(--secondary))"
                    />
                    <circle
                      cx="330"
                      cy="100"
                      r="4"
                      fill="hsl(var(--secondary))"
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
