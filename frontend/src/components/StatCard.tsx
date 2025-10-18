import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  isGradient?: boolean;
}

export const StatCard = ({ title, value, icon: Icon, trend, trendUp, isGradient = false }: StatCardProps) => {
  return (
    <Card className={cn("hover:shadow-md transition-shadow", { "card-gradient": isGradient })}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className={cn("text-sm mb-1", isGradient ? "text-white/80" : "text-muted-foreground")}>{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            {trend && (
              <p className={cn(
                "text-sm mt-2",
                isGradient ? "text-white/90" : (trendUp ? "text-green-600" : "text-red-600")
              )}>
                {trend}
              </p>
            )}
          </div>
          <div className={cn(
            "p-3 rounded-lg",
            isGradient ? "bg-white/20" : "bg-primary/10"
          )}>
            <Icon className={cn("w-6 h-6", isGradient ? "text-white" : "text-primary")} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};