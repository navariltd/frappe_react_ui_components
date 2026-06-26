"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SwitchesPage() {
  return (
    <BaseLayout title="Switches" description="Switch toggle components">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Switches</CardTitle>
                <CardDescription>Simple toggle switches</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="airplane-mode" />
                  <Label htmlFor="airplane-mode">Airplane Mode</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="wifi" defaultChecked />
                  <Label htmlFor="wifi">Wi-Fi</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="bluetooth" />
                  <Label htmlFor="bluetooth">Bluetooth</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Switch States</CardTitle>
                <CardDescription>Different switch states</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="default" />
                  <Label htmlFor="default">Default</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="checked" defaultChecked />
                  <Label htmlFor="checked">Checked</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="disabled" disabled />
                  <Label htmlFor="disabled" className="text-muted-foreground">
                    Disabled
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="checked-disabled" defaultChecked disabled />
                  <Label
                    htmlFor="checked-disabled"
                    className="text-muted-foreground"
                  >
                    Checked & Disabled
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
