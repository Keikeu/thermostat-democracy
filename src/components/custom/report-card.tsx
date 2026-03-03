import { cn } from "@/lib/utils";

export default function ReportCard({
  label,
  value,
  sub,
  className,
}: {
  label: string;
  value: string;
  sub?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col align-center justify-center text-center bg-background p-4 w-full h-[140] gap-2",
        className,
      )}
    >
      <span className="text-sm uppercase text-brown">{label}</span>
      <span className="font-bold text-4xl">{value}</span>
      {sub && <sub className="text-muted-foreground">{sub}</sub>}
    </div>
  );
}
