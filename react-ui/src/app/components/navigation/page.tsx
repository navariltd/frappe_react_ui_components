"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function NavigationPage() {
  return (
    <BaseLayout title="Navigation" description="Navigation components">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Navigation Menu</CardTitle>
                <CardDescription>Primary navigation component</CardDescription>
              </CardHeader>
              <CardContent>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuLink className="px-4 py-2 hover:bg-muted rounded-md">
                        Home
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink className="px-4 py-2 hover:bg-muted rounded-md">
                        Products
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink className="px-4 py-2 hover:bg-muted rounded-md">
                        About
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink className="px-4 py-2 hover:bg-muted rounded-md">
                        Contact
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Button Navigation</CardTitle>
                <CardDescription>Navigation using buttons</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button variant="default">Home</Button>
                <Button variant="outline">Products</Button>
                <Button variant="secondary">About</Button>
                <Button variant="ghost">Contact</Button>
                <Button variant="link">Support</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
