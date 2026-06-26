"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BlockquotesPage() {
  return (
    <BaseLayout
      title="Blockquotes"
      description="Quotation and citation components"
    >
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Blockquotes</CardTitle>
                <CardDescription>Simple quotation blocks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="border-l-4 border-primary pl-4 italic">
                  <p>"The only way to do great work is to love what you do."</p>
                  <cite className="text-sm text-muted-foreground not-italic block mt-2">
                    - Steve Jobs
                  </cite>
                </blockquote>
                <blockquote className="border-l-4 border-blue-500 pl-4 italic">
                  <p>"In the middle of difficulty lies opportunity."</p>
                  <cite className="text-sm text-muted-foreground not-italic block mt-2">
                    - Albert Einstein
                  </cite>
                </blockquote>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Styled Blockquotes</CardTitle>
                <CardDescription>
                  Blockquotes with custom styling
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/20 pl-4 py-2 italic rounded-r-md">
                  <p className="text-purple-700 dark:text-purple-300">
                    "Simplicity is the ultimate sophistication."
                  </p>
                  <cite className="text-sm text-muted-foreground not-italic block mt-2">
                    - Leonardo da Vinci
                  </cite>
                </blockquote>
                <blockquote className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 pl-4 py-2 italic rounded-r-md">
                  <p className="text-green-700 dark:text-green-300">
                    "The journey of a thousand miles begins with one step."
                  </p>
                  <cite className="text-sm text-muted-foreground not-italic block mt-2">
                    - Lao Tzu
                  </cite>
                </blockquote>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Featured Quote</CardTitle>
              <CardDescription>Prominent quote with styling</CardDescription>
            </CardHeader>
            <CardContent>
              <blockquote className="text-center space-y-4 p-6 bg-muted rounded-lg">
                <p className="text-2xl font-serif italic">
                  "The best way to predict the future is to create it."
                </p>
                <cite className="text-sm text-muted-foreground not-italic block">
                  - Peter Drucker
                </cite>
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
}
