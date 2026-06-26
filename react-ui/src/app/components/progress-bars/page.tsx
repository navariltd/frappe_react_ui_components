"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function ProgressBarsPage() {
  return (
    <BaseLayout title="Progress Bars" description="Progress bar components">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Progress Values</CardTitle>
                <CardDescription>
                  Different progress percentages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>0%</span>
                    <span className="text-muted-foreground">Not started</span>
                  </div>
                  <Progress value={0} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>25%</span>
                    <span className="text-muted-foreground">In progress</span>
                  </div>
                  <Progress value={25} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>50%</span>
                    <span className="text-muted-foreground">Halfway</span>
                  </div>
                  <Progress value={50} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>75%</span>
                    <span className="text-muted-foreground">Almost done</span>
                  </div>
                  <Progress value={75} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>100%</span>
                    <span className="text-muted-foreground">Complete</span>
                  </div>
                  <Progress value={100} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress Sizes</CardTitle>
                <CardDescription>
                  Progress bars in different sizes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm">Small</div>
                  <Progress value={60} className="h-1" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm">Default</div>
                  <Progress value={60} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm">Large</div>
                  <Progress value={60} className="h-4" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm">Extra Large</div>
                  <Progress value={60} className="h-6" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress Colors</CardTitle>
                <CardDescription>
                  Progress bars with different colors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm">Primary</div>
                  <Progress value={60} />
                </div>
                <div className="space-y-2">
                  <div className="text-sm">Success</div>
                  <Progress value={60} className="[&>div]:bg-green-500" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm">Warning</div>
                  <Progress value={60} className="[&>div]:bg-yellow-500" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm">Destructive</div>
                  <Progress value={60} className="[&>div]:bg-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Indeterminate Progress</CardTitle>
                <CardDescription>
                  Progress bar in indeterminate state
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm">Loading...</div>
                  <Progress
                    value={50}
                    className="relative overflow-hidden [&>div]:w-full [&>div]:origin-top-left [&>div]:animate-[progress-indeterminate_1s_linear_infinite]"
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
