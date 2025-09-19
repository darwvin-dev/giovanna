import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost" | "outline" | "secondary" | "destructive";
  size?: "default" | "icon";
};

export function Button({
  variant = "default",
  size = "default",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none",
        variant === "default" && "bg-amber-500 hover:bg-amber-600 text-black",
        variant === "ghost" && "bg-transparent hover:bg-white/10 text-white",
        variant === "outline" &&
          "border border-white/20 hover:bg-white/5 text-white",
        variant === "secondary" &&
          "bg-white/5 hover:bg-white/10 border border-white/10 text-white",
        variant === "destructive" &&
          "bg-red-500 hover:bg-red-600 text-white",
        size === "icon" &&
          "p-2 h-9 w-9 flex items-center justify-center rounded-md",
        className
      )}
    />
  );
}
