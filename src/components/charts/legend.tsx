export const ChartLegend = () => {
  return (
    <div className="flex gap-4 justify-center text-sm text-muted-foreground">
      <div className="flex items-center gap-1.5">
        <div className="w-8 h-px border-t-3 border-dashed border-chart-1" />
        <span>Current Setting</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-8 h-px border-t-3 border-dashed border-chart-2" />
        <span>Sweet Spot</span>
      </div>
    </div>
  );
};
