"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DataListsPage() {
  return (
    <BaseLayout
      title="Data Lists"
      description="List components for displaying data"
    >
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Unordered List</CardTitle>
                <CardDescription>Basic bulleted list</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Item 1</li>
                  <li>Item 2</li>
                  <li>Item 3</li>
                  <li>Item 4</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ordered List</CardTitle>
                <CardDescription>Numbered list</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>First item</li>
                  <li>Second item</li>
                  <li>Third item</li>
                  <li>Fourth item</li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Definition List</CardTitle>
                <CardDescription>
                  List with terms and definitions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div>
                    <dt className="font-medium">Term 1</dt>
                    <dd className="text-sm text-muted-foreground ml-4">
                      Definition for term 1
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">Term 2</dt>
                    <dd className="text-sm text-muted-foreground ml-4">
                      Definition for term 2
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom List</CardTitle>
                <CardDescription>List with custom styling</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                    <span className="text-primary">✓</span>
                    <span>Completed task</span>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                    <span className="text-muted-foreground">○</span>
                    <span>Pending task</span>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                    <span className="text-destructive">✕</span>
                    <span>Failed task</span>
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
