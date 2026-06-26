"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ListsPage() {
  return (
    <BaseLayout title="Lists" description="List components for data display">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Lists</CardTitle>
                <CardDescription>Simple list items</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                    <span>Item 1</span>
                    <span className="text-sm text-muted-foreground">
                      10:00 AM
                    </span>
                  </li>
                  <li className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                    <span>Item 2</span>
                    <span className="text-sm text-muted-foreground">
                      11:30 AM
                    </span>
                  </li>
                  <li className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                    <span>Item 3</span>
                    <span className="text-sm text-muted-foreground">
                      2:00 PM
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>List with Badges</CardTitle>
                <CardDescription>List items with status badges</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                    <span>Task 1</span>
                    <Badge variant="success">Done</Badge>
                  </li>
                  <li className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                    <span>Task 2</span>
                    <Badge variant="warning">In Progress</Badge>
                  </li>
                  <li className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                    <span>Task 3</span>
                    <Badge variant="destructive">Overdue</Badge>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
