"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = ({ 
  className, 
  ref,
  ...props 
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & { ref?: React.Ref<React.ElementRef<typeof TabsPrimitive.List>> }) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      " lg:inline-flex h-full lg:h-16 items-center justify-evenly w-full bg-[#DED4F2] p-1 text-[#3B2565]",
      className
    )}
    {...props}
  />
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = ({ 
  className, 
  ref,
  ...props 
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & { ref?: React.Ref<React.ElementRef<typeof TabsPrimitive.Trigger>> }) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex w-full h-full items-center justify-center whitespace-nowrap  px-3 py-3 lg:py-1.5 text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#3B2565] data-[state=active]:text-background data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = ({ 
  className, 
  ref,
  ...props 
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & { ref?: React.Ref<React.ElementRef<typeof TabsPrimitive.Content>> }) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
