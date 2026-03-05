import { motion } from "framer-motion";
import { Scale } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Scale className="h-8 w-8 text-primary" />
      </motion.div>
      <p className="text-muted-foreground text-sm animate-pulse-subtle">Analyzing crime data...</p>
    </div>
  );
}
