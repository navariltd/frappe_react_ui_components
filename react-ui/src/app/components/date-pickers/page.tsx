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

export default function DatePickersPage() {
  return (
    <BaseLayout title="Date Pickers" description="Date input components">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Date Input</CardTitle>
                <CardDescription>
                  Basic date picker using native input
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input type="date" id="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="datetime">Date & Time</Label>
                  <Input type="datetime-local" id="datetime" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Range Picker</CardTitle>
                <CardDescription>Date range selection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="start">Start Date</Label>
                  <Input type="date" id="start" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end">End Date</Label>
                  <Input type="date" id="end" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Time Picker</CardTitle>
              <CardDescription>Time selection inputs</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input type="time" id="time" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="week">Week</Label>
                <Input type="week" id="week" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="month">Month</Label>
                <Input type="month" id="month" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input type="text" id="year" placeholder="2024" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
}
