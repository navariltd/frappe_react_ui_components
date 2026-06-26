"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AccordionsPage() {
  return (
    <BaseLayout title="Accordions" description="Collapsible content sections">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Accordion</CardTitle>
                <CardDescription>
                  Simple accordion with default styling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is React?</AccordionTrigger>
                    <AccordionContent>
                      React is a JavaScript library for building user
                      interfaces. It is maintained by Meta and a community of
                      individual developers and companies.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What is TypeScript?</AccordionTrigger>
                    <AccordionContent>
                      TypeScript is a strongly typed programming language that
                      builds on JavaScript, giving you better tooling at any
                      scale.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What is Tailwind CSS?</AccordionTrigger>
                    <AccordionContent>
                      Tailwind CSS is a utility-first CSS framework for rapidly
                      building custom user interfaces.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Multiple Selection</CardTitle>
                <CardDescription>
                  Accordion with multiple items open
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Features</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Collapsible sections</li>
                        <li>Accessible by default</li>
                        <li>Customizable styling</li>
                        <li>Multiple selection support</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Benefits</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Save screen space</li>
                        <li>Organized content</li>
                        <li>Improved user experience</li>
                        <li>Better information hierarchy</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Use Cases</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>FAQ sections</li>
                        <li>Product features</li>
                        <li>Documentation</li>
                        <li>Settings panels</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
