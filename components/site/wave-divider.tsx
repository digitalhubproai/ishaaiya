import { cn } from "@/lib/utils";

export function WaveDivider({
  flip = false,
  className,
}: {
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none relative -mb-px -mt-px", className)}
    >
      <svg
        viewBox="0 0 1440 72"
        fill="none"
        preserveAspectRatio="none"
        className={cn(
          "block h-10 w-full sm:h-14",
          flip && "-scale-y-100"
        )}
      >
        <path
          d="M0 36C240 72 480 0 720 18C960 36 1200 72 1440 36V72H0V36Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}