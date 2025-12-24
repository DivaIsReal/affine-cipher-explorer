import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface StepCardProps {
  title: string;
  children: React.ReactNode;
  index?: number;
  status?: 'success' | 'error' | 'neutral';
}

export function StepCard({ title, children, index = 0, status = 'neutral' }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={`rounded-lg border p-4 glass ${
        status === 'success' ? 'border-success/50 border-glow-success' :
        status === 'error' ? 'border-destructive/50 border-glow-error' :
        'border-border'
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        {status === 'success' && <Check className="w-4 h-4 text-success" />}
        {status === 'error' && <X className="w-4 h-4 text-destructive" />}
        <h4 className="font-mono text-sm font-medium text-primary">{title}</h4>
      </div>
      <div className="text-sm">{children}</div>
    </motion.div>
  );
}
