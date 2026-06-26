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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioButtonsPage() {
  return (
    <BaseLayout title="Radio Buttons" description="Radio button components">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Radio Group</CardTitle>
                <CardDescription>Simple radio button options</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="option1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option1" id="option1" />
                    <Label htmlFor="option1">Option 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option2" id="option2" />
                    <Label htmlFor="option2">Option 2</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option3" id="option3" />
                    <Label htmlFor="option3">Option 3</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Radio States</CardTitle>
                <CardDescription>Different radio button states</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="checked">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="default" id="default" />
                    <Label htmlFor="default">Default</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="checked" id="checked" />
                    <Label htmlFor="checked">Checked</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="disabled" id="disabled" disabled />
                    <Label htmlFor="disabled" className="text-muted-foreground">
                      Disabled
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
