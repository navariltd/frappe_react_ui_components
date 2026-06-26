"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CheckboxesPage() {
  return (
    <BaseLayout title="Checkboxes" description="Checkbox input components">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Checkboxes</CardTitle>
                <CardDescription>Simple checkbox inputs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="newsletter" />
                  <Label htmlFor="newsletter">Subscribe to newsletter</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="updates" />
                  <Label htmlFor="updates">Receive product updates</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Checkbox States</CardTitle>
                <CardDescription>Different checkbox states</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="default" />
                  <Label htmlFor="default">Default</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="checked" defaultChecked />
                  <Label htmlFor="checked">Checked</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="disabled" disabled />
                  <Label htmlFor="disabled" className="text-muted-foreground">
                    Disabled
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="checked-disabled" defaultChecked disabled />
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

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Checkbox Group</CardTitle>
              <CardDescription>
                Grouped checkboxes for multiple selections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="option1" />
                <Label htmlFor="option1">Option 1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="option2" />
                <Label htmlFor="option2">Option 2</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="option3" />
                <Label htmlFor="option3">Option 3</Label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
}
