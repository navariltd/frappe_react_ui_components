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
import { Lock, Mail, Search, User } from "lucide-react";

export default function InputsPage() {
  return (
    <BaseLayout title="Inputs" description="Input field components">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Inputs</CardTitle>
                <CardDescription>Common input types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text">Text Input</Label>
                  <Input id="text" placeholder="Enter text" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Input</Label>
                  <Input id="email" type="email" placeholder="Enter email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password Input</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number">Number Input</Label>
                  <Input id="number" type="number" placeholder="Enter number" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Input States</CardTitle>
                <CardDescription>Different input states</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="default">Default</Label>
                  <Input id="default" placeholder="Default input" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disabled">Disabled</Label>
                  <Input id="disabled" placeholder="Disabled input" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="readonly">Read Only</Label>
                  <Input id="readonly" value="Read only value" readOnly />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Input with Icons</CardTitle>
                <CardDescription>Inputs with icon adornments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      className="pl-9"
                      placeholder="Search..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-icon">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email-icon"
                      className="pl-9"
                      placeholder="Enter email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      className="pl-9"
                      placeholder="Enter username"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Password Input</CardTitle>
                <CardDescription>
                  Password input with visibility toggle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password-icon">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password-icon"
                      type="password"
                      className="pl-9"
                      placeholder="Enter password"
                    />
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
