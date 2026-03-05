import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Scale, Clock, DollarSign, AlertTriangle, Shield, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SeverityBadge } from "@/components/SeverityBadge";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { mockResults, similarCases, type CrimeResult } from "@/lib/mockData";
import { SimilarCasesSection } from "@/components/SimilarCasesSection";
import { AIExplanationPanel } from "@/components/AIExplanationPanel";
import { CrimeCharts } from "@/components/CrimeCharts";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const crime = (location.state as any)?.crime || "";
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<CrimeResult | null>(null);

  useEffect(() => {
    if (!crime) {
      navigate("/");
      return;
    }
    const timer = setTimeout(() => {
      setResult({ ...mockResults.default, crime });
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, [crime, navigate]);

  if (loading) return <LoadingSpinner />;
  if (!result) return null;

  const infoCards = [
    { icon: Scale, label: "Law Section", value: result.lawSection, color: "text-primary" },
    { icon: Clock, label: "Punishment", value: result.punishment, color: "text-destructive" },
    { icon: DollarSign, label: "Fine Amount", value: result.fineAmount, color: "text-warning" },
    { icon: Shield, label: "Bail Status", value: result.bailable ? "Bailable" : "Non-Bailable", color: result.bailable ? "text-success" : "text-destructive" },
  ];

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => navigate("/")} className="gap-2 text-muted-foreground">
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="p-5 border-l-4 border-l-primary">
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium">Crime Description</p>
          <p className="text-foreground text-sm">{result.crime}</p>
          <div className="mt-3 flex items-center gap-2">
            <SeverityBadge severity={result.severity} />
            <span className="text-xs text-muted-foreground">Severity Level</span>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {infoCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-4 hover:shadow-elevated transition-shadow">
              <card.icon className={`h-5 w-5 ${card.color} mb-2`} />
              <p className="text-xs text-muted-foreground mb-1">{card.label}</p>
              <p className="text-sm font-semibold text-foreground">{card.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <AIExplanationPanel explanation={result.explanation} />
      <SimilarCasesSection cases={similarCases} />
      <CrimeCharts />
    </div>
  );
};

export default Results;
