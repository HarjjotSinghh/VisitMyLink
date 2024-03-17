"use client";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ComponentPropsWithoutRef, useState } from "react";
import { cn } from "@/lib/utils";

const createLinkFormSchema = z.object({
  slug: z.string().min(3, {
    message: "Link title for the link must be at least 3 characters"
  }),
  url: z.string().url({ message: "Please enter a valid URL/link" })
});
export default function CreateLinkForm({
  ...props
}: ComponentPropsWithoutRef<"form">) {
  const form = useForm<z.infer<typeof createLinkFormSchema>>({
    resolver: zodResolver(createLinkFormSchema),
    defaultValues: {
      slug: "",
      url: ""
    }
  });
  const [message, setMessage] = useState("");
  async function onSubmit(values: z.infer<typeof createLinkFormSchema>) {
    // console.log(values);
    const response = await fetch("/api/link/create", {
      method: "POST",
      body: JSON.stringify(values)
    });
    const data = await response.json();
    setMessage(data.message);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "flex flex-col gap-4 sm:p-12 p-6 border-2 border-primary/60 hover:border-primary/80 transition-all duration-300 ease-in-out rounded-lg hover:shadow-xl hover:shadow-primary/5",
          props.className
        )}
      >
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold tracking-tight text-base">
                Title for the link
              </FormLabel>

              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription className="text-foreground/60 text-sm leading-6">
                This is the title that will be displayed on the link.<br></br>
                For example, if you enter <br></br>
                <code className="text-foreground border-primary border px-2 py-[1px] rounded-[4px]">
                  Harjot Singh
                </code>{" "}
                <br></br>
                then the link formed will be <br></br>
                <code className="text-foreground border-primary border px-2 py-[1px] rounded-[4px]">
                  https://visitmyl.ink/harjot-singh
                </code>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold tracking-tight text-base">
                URL/Link
              </FormLabel>

              <FormControl>
                <Input placeholder="https://shadcn.com" {...field} />
              </FormControl>
              <FormDescription className="text-foreground/60 text-sm leading-6">
                This is the URL/link that you want to shorten.
                <br></br>
                For example, if you enter <br></br>
                <code className="text-foreground border-primary border px-2 py-[1px] rounded-[4px]">
                  https://harjot.pro
                </code>{" "}
                <br></br>
                then <br></br>
                <code className="text-foreground border-primary border px-2 py-[1px] rounded-[4px]">
                  https://visitmyl.ink/harjot-singh
                </code> <br></br>
                will redirect to <br></br>
                <code className="text-foreground border-primary border px-2 py-[1px] rounded-[4px]">
                  https://harjot.pro
                </code>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormDescription className="text-foreground/90 text-sm leading-6 font-semibold whitespace-pre-wrap">
          {message}
        </FormDescription>
        <Button
          type="submit"
          variant={"outline"}
          className="font-semibold text-base py-5 border-2 border-primary/60 hover:border-primary/80 transition-all duration-500 ease-in-out rounded-lg hover:shadow-xl hover:shadow-primary/5 "
        >
          Shorten Link 🚀
        </Button>
      </form>
    </Form>
  );
}
