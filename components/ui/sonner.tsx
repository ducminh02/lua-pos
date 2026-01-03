"use client";
import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="bottom-left"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-l-4 group-[.toaster]:border-l-primary group-[.toaster]:shadow-2xl group-[.toaster]:rounded-xl group-[.toaster]:ring-1 group-[.toaster]:ring-black/5",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toaster]:border-l-green-500 group-[.toaster]:bg-green-50 group-[.toaster]:text-green-900 dark:group-[.toaster]:bg-green-950 dark:group-[.toaster]:text-green-100",
          error: "group-[.toaster]:border-l-red-500 group-[.toaster]:bg-red-50 group-[.toaster]:text-red-900 dark:group-[.toaster]:bg-red-950 dark:group-[.toaster]:text-red-100",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
