import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "outline";
};

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variant === "default" && "bg-amber-100 text-amber-800",
        variant === "secondary" && "bg-white/10 text-white",
        variant === "outline" && "border border-white/20 text-white",
        className
      )}
    >
      {children}
    </span>
  );
}
