import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowRight, Scale, Shield, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { exampleCrimes } from "@/lib/mockData";

const Index = () => {
  const [crime, setCrime] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!crime.trim()) return;
    navigate("/results", { state: { crime } });
  };

  const features = [
    { icon: Scale, title: "Legal Sections", desc: "Identify applicable law sections instantly" },
    { icon: Shield, title: "Punishment Prediction", desc: "Get detailed punishment & fine estimates" },
    { icon: Brain, title: "AI Explanation", desc: "Understand the law in plain language" },
  ];

  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="gradient-hero text-primary-foreground py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/20 rounded-full px-4 py-1.5 text-sm mb-6 border border-primary-foreground/10">
              <Brain className="h-4 w-4" />
              AI-Powered Legal Analysis
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
              AI Crime to Punishment
              <br />
              <span className="text-info">Prediction System</span>
            </h1>
            <p className="text-primary-foreground/70 text-base md:text-lg max-w-xl mx-auto mb-10">
              Enter a crime description and get the possible legal sections and punishment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevated">
              <Textarea
                value={crime}
                onChange={(e) => setCrime(e.target.value)}
                placeholder="Describe the crime in detail..."
                className="min-h-[100px] text-foreground bg-background border-border resize-none text-sm md:text-base"
              />
              <div className="flex justify-end mt-3">
                <Button
                  onClick={handleSubmit}
                  disabled={!crime.trim()}
                  className="gradient-primary text-primary-foreground gap-2"
                  size="lg"
                >
                  <Search className="h-4 w-4" />
                  Analyze Crime
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Example Crimes */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-foreground mb-4">Try an example</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {exampleCrimes.map((ex, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <Card
                  className="p-3 cursor-pointer hover:shadow-elevated hover:border-primary/30 transition-all duration-200 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setCrime(ex);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {ex}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 bg-secondary/50">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <Card className="p-5 text-center hover:shadow-elevated transition-shadow">
                  <f.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground text-sm mb-1">{f.title}</h3>
                  <p className="text-muted-foreground text-xs">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
