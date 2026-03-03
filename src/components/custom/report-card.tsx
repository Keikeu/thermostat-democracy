import { cn } from "@/lib/utils";

export default function ReportCard({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col align-center justify-center text-center bg-background p-4 w-full h-[140] gap-2",
        className,
      )}
    >
      <span className="text-sm uppercase text-muted-foreground">{label}</span>
      <span className="font-bold text-4xl">{value}</span>
    </div>
  );
}
