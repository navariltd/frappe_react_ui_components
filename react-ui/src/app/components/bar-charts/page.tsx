"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BarChartsPage() {
  return (
    <BaseLayout title="Bar Charts" description="Bar chart components">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Vertical Bar Chart</CardTitle>
                <CardDescription>Simple vertical bar chart</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-around items-end h-48">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="w-12 bg-primary rounded-t"
                      style={{ height: "80px" }}
                    />
                    <span className="text-sm">Jan</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="w-12 bg-primary rounded-t"
                      style={{ height: "120px" }}
                    />
                    <span className="text-sm">Feb</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="w-12 bg-primary rounded-t"
                      style={{ height: "100px" }}
                    />
                    <span className="text-sm">Mar</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="w-12 bg-primary rounded-t"
                      style={{ height: "140px" }}
                    />
                    <span className="text-sm">Apr</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="w-12 bg-primary rounded-t"
                      style={{ height: "90px" }}
                    />
                    <span className="text-sm">May</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Horizontal Bar Chart</CardTitle>
                <CardDescription>Simple horizontal bar chart</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-12 text-sm">Product A</span>
                  <div className="flex-1 bg-muted rounded h-6">
                    <div
                      className="bg-primary h-6 rounded"
                      style={{ width: "70%" }}
                    />
                  </div>
                  <span className="text-sm">70%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-12 text-sm">Product B</span>
                  <div className="flex-1 bg-muted rounded h-6">
                    <div
                      className="bg-primary h-6 rounded"
                      style={{ width: "45%" }}
                    />
                  </div>
                  <span className="text-sm">45%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-12 text-sm">Product C</span>
                  <div className="flex-1 bg-muted rounded h-6">
                    <div
                      className="bg-primary h-6 rounded"
                      style={{ width: "90%" }}
                    />
                  </div>
                  <span className="text-sm">90%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-12 text-sm">Product D</span>
                  <div className="flex-1 bg-muted rounded h-6">
                    <div
                      className="bg-primary h-6 rounded"
                      style={{ width: "30%" }}
                    />
                  </div>
                  <span className="text-sm">30%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
