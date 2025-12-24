import { motion } from 'framer-motion';

export function Watermark() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <div className="px-4 py-2 rounded-full bg-card/90 backdrop-blur-xl border border-border shadow-lg">
        <span className="text-xs font-mono text-muted-foreground">
          website by{' '}
          <span className="text-primary font-semibold">Diva Ahmad</span>
        </span>
      </div>
    </motion.div>
  );
}
