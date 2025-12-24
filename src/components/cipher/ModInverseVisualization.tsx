import { motion } from 'framer-motion';
import { ModInverseStep, ALPHABET_SIZE } from '@/lib/affineCipher';

interface ModInverseVisualizationProps {
  a: number;
  steps: ModInverseStep[];
  inverse: number | null;
}

export function ModInverseVisualization({ a, steps, inverse }: ModInverseVisualizationProps) {
  const displaySteps = steps.slice(0, 6);
  const hasMore = steps.length > 6;
  
  return (
    <div className="space-y-3">
      <div className="font-mono text-sm text-muted-foreground">
        Mencari a⁻¹ dari {a} mod {ALPHABET_SIZE}:
      </div>
      <div className="font-mono text-xs text-muted-foreground">
        Mencari nilai x dimana ({a} × x) mod {ALPHABET_SIZE} = 1
      </div>
      
      <div className="space-y-1 font-mono text-sm">
        {displaySteps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={step.found ? 'text-success' : 'text-muted-foreground'}
          >
            x = {step.x}: {step.calculation} = {step.result}
            {step.found && ' ✓ KETEMU!'}
          </motion.div>
        ))}
        {hasMore && !steps.find(s => s.found && displaySteps.includes(s)) && (
          <div className="text-muted-foreground">...</div>
        )}
      </div>
      
      {inverse !== null && (
        <div className="font-mono text-sm text-success">
          ✓ Hasil: {a}⁻¹ mod {ALPHABET_SIZE} = {inverse}
        </div>
      )}
    </div>
  );
}
