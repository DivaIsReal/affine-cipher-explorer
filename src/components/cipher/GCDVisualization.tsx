import { motion } from 'framer-motion';
import { GCDStep } from '@/lib/affineCipher';

interface GCDVisualizationProps {
  a: number;
  m: number;
  steps: GCDStep[];
  result: number;
}

export function GCDVisualization({ a, m, steps, result }: GCDVisualizationProps) {
  const isCoprime = result === 1;
  
  return (
    <div className="space-y-3">
      <div className="font-mono text-sm text-muted-foreground">
        Menghitung GCD({a}, {m}) menggunakan Euclidean Algorithm:
      </div>
      
      <div className="space-y-1 font-mono text-sm">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-muted-foreground"
          >
            {step.a} = {step.b} × {step.quotient} + <span className="text-primary">{step.remainder}</span>
          </motion.div>
        ))}
      </div>
      
      <div className={`font-mono text-sm ${isCoprime ? 'text-success' : 'text-destructive'}`}>
        {isCoprime ? '✓' : '✗'} GCD({a}, {m}) = {result}
        {isCoprime ? ' (coprime)' : ' (tidak coprime)'}
      </div>
    </div>
  );
}
