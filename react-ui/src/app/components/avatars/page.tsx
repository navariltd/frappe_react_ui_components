"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AvatarsPage() {
  return (
    <BaseLayout title="Avatars" description="User avatar components">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Avatar Sizes</CardTitle>
                <CardDescription>Different sizes of avatars</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="h-16 w-16">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="h-32 w-32">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avatar Fallbacks</CardTitle>
                <CardDescription>Avatars with fallback text</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback className="bg-blue-500 text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback className="bg-green-500 text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback className="bg-red-500 text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback className="bg-purple-500 text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Avatar Group</CardTitle>
              <CardDescription>
                Grouped avatars for team displays
              </CardDescription>
            </CardHeader>
            <CardContent className="flex -space-x-3">
              <Avatar className="border-2 border-background">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarImage src="https://github.com/vercel.png" />
                <AvatarFallback>VZ</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarImage src="https://github.com/radix-ui.png" />
                <AvatarFallback>RU</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarFallback>+3</AvatarFallback>
              </Avatar>
            </CardContent>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
}
