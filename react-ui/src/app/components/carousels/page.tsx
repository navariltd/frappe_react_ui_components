"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselsPage() {
  return (
    <BaseLayout title="Carousels" description="Carousel and slider components">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Carousel</CardTitle>
                <CardDescription>
                  Simple image carousel with navigation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Carousel className="w-full max-w-sm mx-auto">
                  <CarouselContent>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <CarouselItem key={item}>
                        <div className="flex aspect-square items-center justify-center bg-muted rounded-lg p-6">
                          <span className="text-4xl font-bold text-muted-foreground">
                            Slide {item}
                          </span>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Multiple Items</CardTitle>
                <CardDescription>
                  Carousel showing multiple items at once
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Carousel className="w-full max-w-4xl mx-auto">
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <CarouselItem
                        key={item}
                        className="pl-2 md:pl-4 basis-1/2 md:basis-1/3"
                      >
                        <div className="flex aspect-square items-center justify-center bg-muted rounded-lg p-6">
                          <span className="text-2xl font-bold text-muted-foreground">
                            Item {item}
                          </span>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
