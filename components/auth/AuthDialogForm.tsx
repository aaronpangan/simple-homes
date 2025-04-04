"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { auth } from "../../app/auth/auth.actions";
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

export default function AuthDialogForm() {
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    const formData = new FormData();
    formData.append("email", values.email);

    await auth(formData);
  }

  return (
    <div className="mx-auto flex w-[300px] flex-col gap-6">
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Email Field */}
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

          {/* Submit Button */}
          <Button type="submit" className="text-md h-12 font-bold">
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

      {/* Google Signup Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" className="h-12 w-full text-lg">
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
