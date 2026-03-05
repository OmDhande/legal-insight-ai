import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, Scale, Clock } from "lucide-react";
import { dashboardStats } from "@/lib/mockData";
import { CrimeCharts } from "@/components/CrimeCharts";

const stats = [
  { icon: BarChart3, label: "Total Crimes Analyzed", value: dashboardStats.totalCrimes.toLocaleString(), color: "text-primary" },
  { icon: Scale, label: "Most Common Crime", value: dashboardStats.mostCommonCrime, color: "text-warning" },
  { icon: Clock, label: "Average Punishment", value: dashboardStats.avgPunishment, color: "text-destructive" },
  { icon: TrendingUp, label: "Analyzed Today", value: dashboardStats.analyzedToday.toString(), color: "text-success" },
];

const Dashboard = () => (
  <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="text-sm text-muted-foreground">Overview of crime analysis statistics</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="p-5 hover:shadow-elevated transition-shadow">
            <s.icon className={`h-6 w-6 ${s.color} mb-3`} />
            <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
            <p className="text-xl font-bold text-foreground">{s.value}</p>
          </Card>
        </motion.div>
      ))}
    </div>

    <CrimeCharts />
  </div>
);

export default Dashboard;
