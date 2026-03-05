import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { History, Search } from "lucide-react";
import { crimeHistory } from "@/lib/mockData";
import { SeverityBadge } from "@/components/SeverityBadge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const HistoryPage = () => {
  const [search, setSearch] = useState("");
  const filtered = crimeHistory.filter(
    (h) =>
      h.crime.toLowerCase().includes(search.toLowerCase()) ||
      h.lawSection.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <History className="h-6 w-6 text-primary" />
          Search History
        </h1>
        <p className="text-sm text-muted-foreground">Your previous crime analyses</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filter history..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="space-y-2">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:shadow-elevated transition-shadow">
              <div>
                <p className="font-medium text-foreground text-sm">{item.crime}</p>
                <p className="text-xs text-muted-foreground font-mono">{item.lawSection}</p>
              </div>
              <div className="flex items-center gap-3">
                <SeverityBadge severity={item.severity} />
                <span className="text-xs text-muted-foreground">{item.date}</span>
              </div>
            </Card>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-8">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
