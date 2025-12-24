import { motion } from 'framer-motion';

interface FrequencyChartProps {
  data: Map<string, { count: number; percentage: number }>;
}

export function FrequencyChart({ data }: FrequencyChartProps) {
  const entries = Array.from(data.entries());
  const maxPercentage = Math.max(...entries.map(([, v]) => v.percentage), 1);
  
  if (entries.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Masukkan teks untuk melihat analisis frekuensi
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      {entries.map(([char, { count, percentage }], i) => (
        <motion.div
          key={char}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.02 }}
          className="flex items-center gap-3 font-mono text-sm"
        >
          <span className="w-6 text-primary font-bold">{char}</span>
          <span className="w-12 text-right text-muted-foreground">{count}×</span>
          <div className="flex-1 h-5 bg-muted rounded overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(percentage / maxPercentage) * 100}%` }}
              transition={{ delay: i * 0.02 + 0.2, duration: 0.5 }}
              className="h-full bg-gradient-to-r from-primary/80 to-primary rounded"
            />
          </div>
          <span className="w-16 text-right text-muted-foreground">
            {percentage.toFixed(1)}%
          </span>
        </motion.div>
      ))}
    </div>
  );
}
