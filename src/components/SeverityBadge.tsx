import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const severityConfig = {
  Low: "bg-success/10 text-success border-success/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  High: "bg-destructive/10 text-destructive border-destructive/20",
  Critical: "bg-destructive/20 text-destructive border-destructive/30 font-semibold",
};

export function SeverityBadge({ severity }: { severity: keyof typeof severityConfig }) {
  return (
    <Badge variant="outline" className={cn("text-xs", severityConfig[severity])}>
      {severity}
    </Badge>
  );
}
