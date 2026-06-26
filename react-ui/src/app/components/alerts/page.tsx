"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  Terminal,
} from "lucide-react";

export default function AlertsPage() {
  return (
    <BaseLayout title="Alerts" description="Contextual feedback messages">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert Variants</CardTitle>
                <CardDescription>
                  Different alert styles for various contexts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Alert>
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Default Alert</AlertTitle>
                  <AlertDescription>
                    This is a default alert message.
                  </AlertDescription>
                </Alert>
                <Alert variant="default">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    This is an informational alert message.
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    This is an error alert message.
                  </AlertDescription>
                </Alert>
                <Alert variant="success">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    This is a success alert message.
                  </AlertDescription>
                </Alert>
                <Alert variant="warning">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    This is a warning alert message.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert with Content</CardTitle>
                <CardDescription>
                  Alerts with additional content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Heads up!</AlertTitle>
                  <AlertDescription>
                    Your session will expire in 5 minutes. Please save your work
                    to avoid losing any changes.
                  </AlertDescription>
                </Alert>
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>
                    Your profile has been updated successfully. You can view
                    your changes in your profile page.
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Something went wrong</AlertTitle>
                  <AlertDescription>
                    There was an error processing your request. Please try again
                    or contact support if the issue persists.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
