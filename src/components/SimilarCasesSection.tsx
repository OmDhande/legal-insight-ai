import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import type { SimilarCase } from "@/lib/mockData";

export function SimilarCasesSection({ cases }: { cases: SimilarCase[] }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
        <Bookmark className="h-5 w-5 text-primary" />
        Similar Cases
      </h2>
      <div className="space-y-2">
        {cases.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:shadow-elevated transition-shadow">
              <div>
                <p className="font-medium text-foreground text-sm">{c.caseName}</p>
                <p className="text-xs text-muted-foreground">{c.crime}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-destructive">{c.punishment}</p>
                <p className="text-xs text-muted-foreground">{c.year}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
