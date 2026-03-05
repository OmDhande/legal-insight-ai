import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Brain, Bot, User } from "lucide-react";

export function AIExplanationPanel({ explanation }: { explanation: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < explanation.length) {
        setDisplayedText(explanation.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 12);
    return () => clearInterval(interval);
  }, [explanation]);

  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
        <Brain className="h-5 w-5 text-primary" />
        AI Legal Explanation
      </h2>
      <Card className="p-5 bg-accent/30 border-accent">
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="bg-card rounded-lg p-3 text-sm text-foreground shadow-card">
              Explain this law section in simple terms.
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 h-7 w-7 rounded-full gradient-primary flex items-center justify-center">
              <Bot className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <div className="bg-card rounded-lg p-3 text-sm text-foreground shadow-card flex-1">
              {displayedText}
              {!done && <span className="inline-block w-1.5 h-4 bg-primary ml-0.5 animate-pulse-subtle" />}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
