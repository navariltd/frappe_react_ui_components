"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CardsPage() {
  return (
    <BaseLayout
      title="Cards"
      description="Card components for content containers"
    >
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>
                <CardDescription>
                  A simple card with header and content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  This is the card content area. You can put any content here.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>With Footer</CardTitle>
                <CardDescription>
                  Card with header, content, and footer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Card content goes here. This card has a footer with actions.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Save</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>With Badge</CardTitle>
                  <Badge variant="success">Active</Badge>
                </div>
                <CardDescription>Card with a status badge</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This card has a badge in the header showing its status.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Featured</CardTitle>
                <CardDescription>
                  Featured card with highlighted styling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-medium">
                  Special featured content goes here.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  This card stands out from the others.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="default" className="w-full">
                  Learn More
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-dashed">
              <CardHeader>
                <CardTitle>Dashed Border</CardTitle>
                <CardDescription>Card with dashed border style</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Drop content here
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle>Muted Background</CardTitle>
                <CardDescription>Card with muted background</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This card has a subtle muted background.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
