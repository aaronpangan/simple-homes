"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { addUserProfile } from "../../app/profile/profile.actions";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

type ProfileDialogFormProps = {
  closeDialog?: () => void;
};

export default function ProfileDialogForm({
  closeDialog,
}: ProfileDialogFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    try {
      setIsSubmitting(true);
      const result = await addUserProfile(values.name, values.address);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      closeDialog?.();
      setIsSubmitting(false);
      toast.success("Profile has been successfully added");
    }
  }

  return (
    <div className="mx-auto flex w-[300px] flex-col gap-6">
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md font-semibold">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    className="text-md h-12 px-4"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address Field */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md font-semibold">Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your address"
                    className="text-md h-12 px-4"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="text-md h-12 font-bold"
            loading={isSubmitting}
          >
            Save profile
          </Button>
        </form>
      </Form>
    </div>
  );
}
