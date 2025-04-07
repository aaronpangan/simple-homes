"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { auth, googleAuth } from "../../app/auth/auth.actions";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const profileFormSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type AuthDialogFormProps = {
  closeDialog?: () => void;
};

export default function AuthDialogForm({ closeDialog }: AuthDialogFormProps) {
  const [emailLoading, setEmailLoading] = React.useState(false);
  const [googleLoading, setGoogleLoading] = React.useState(false);

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    try {
      setEmailLoading(true);
      const formData = new FormData();
      formData.append("email", values.email);
      await auth(formData);
    } catch (error) {
      console.error("Email authentication error:", error);
    } finally {
      setEmailLoading(false);
      closeDialog?.();
      toast.success("Check your email for the authentication link!");
    }
  }

  async function handleGoogleAuth() {
    try {
      setGoogleLoading(true);
      await googleAuth();
    } catch (error) {
      console.error("Google authentication error:", error);
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <div className="mx-auto flex w-[300px] flex-col gap-6">
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md font-semibold">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="text-md h-12 px-4"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="text-md h-12 font-bold"
            loading={emailLoading}
          >
            Continue with email
          </Button>
        </form>
      </Form>

      {/* Separator */}
      <div className="relative w-full">
        <div className="absolute inset-0 flex items-center">
          <div className="border-border w-full border-t"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">
            Or continue with
          </span>
        </div>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleGoogleAuth}
              variant="outline"
              className="h-12 w-full text-lg"
              loading={googleLoading}
            >
              <img
                src="/google-icon.svg"
                alt="Google Icon"
                className="h-full w-auto"
              />
              <span className="sr-only">Continue using Google</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sign up with Google</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
