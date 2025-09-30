import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn(
        "animate-pulse rounded-lg bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 bg-[length:200%_100%]",
        "animate-[shimmer_2s_ease-in-out_infinite]",
        className
      )} 
      {...props} 
    />
  );
}

export { Skeleton };
