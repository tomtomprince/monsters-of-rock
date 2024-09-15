"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DateTime } from "luxon";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import React from "react";
import { LocationContext } from "./Events";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().optional(),
  startDate: z.string().date(),
  startTime: z.string().time(),
  endDate: z.string().date(),
  endTime: z.string().time(),
  latitude: z.number().gte(-90).lte(90),
  longitude: z.number().gte(-180).lte(180),
});

export function EventForm() {
  const { location } = React.useContext(LocationContext);
  const createEvent = useMutation(api.events.createEvent);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      latitude: location?.lat,
      longitude: location?.lng,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const startTime = DateTime.fromISO(values.startTime);
    const startDate = DateTime.fromISO(values.startDate)
      .set({
        hour: startTime.hour,
        minute: startTime.minute,
      })
      .toUTC()
      .toISO();
    const endTime = DateTime.fromISO(values.endTime);
    const endDate = DateTime.fromISO(values.endDate)
      .set({
        hour: endTime.hour,
        minute: endTime.minute,
      })
      .toUTC()
      .toISO();

    if (startDate === null || endDate === null) {
      throw new Error("Start or end date is invalid");
    }

    await createEvent({
      title: values.title,
      description: values.description || "",
      startDateTime: startDate,
      endDateTime: endDate,
      // TODO: allow user to select timezone rather than defaulting to browser timezone
      timezone: DateTime.local().zoneName,
      latitude: values.latitude,
      longitude: values.longitude,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Godzilla-con" {...field} />
              </FormControl>
              <FormDescription>Whatever your event is called</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Baby Godzilla will be there!"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Some extra details not described by our provided fields
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>
                Some extra details not described by our provided fields
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input
                  type="time"
                  {...field}
                  onChange={(e) => {
                    // append seconds value
                    field.onChange(`${e.target.value}:00`);
                  }}
                />
              </FormControl>
              <FormDescription>
                Some extra details not described by our provided fields
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>
                Some extra details not described by our provided fields
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input
                  type="time"
                  {...field}
                  onChange={(e) => {
                    // append seconds value
                    field.onChange(`${e.target.value}:00`);
                  }}
                />
              </FormControl>
              <FormDescription>
                Some extra details not described by our provided fields
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="latitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.0001"
                  {...field}
                  onChange={(e) => {
                    // convert to number
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value)) {
                      field.onChange(value);
                    }
                  }}
                />
              </FormControl>
              <FormDescription>Latitude of the event</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="longitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.0001"
                  {...field}
                  onChange={(e) => {
                    // convert to number
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value)) {
                      field.onChange(value);
                    }
                  }}
                />
              </FormControl>
              <FormDescription>Latitude of the event</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
