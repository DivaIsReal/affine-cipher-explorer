import { motion } from 'framer-motion';
import { EncryptionStep, DecryptionStep, ALPHABET_SIZE } from '@/lib/affineCipher';

interface EncryptStepProps {
  step: EncryptionStep;
  a: number;
  b: number;
  index: number;
}

export function EncryptCharacterStep({ step, a, b, index }: EncryptStepProps) {
  if (!step.isLetter) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="p-3 rounded-lg bg-muted/30 border border-border/50"
      >
        <div className="flex items-center gap-2">
          <span className="font-mono text-muted-foreground">#{step.index + 1}</span>
          <span className="text-muted-foreground">
            '{step.original}' → tetap '{step.encrypted}' (bukan huruf)
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="p-4 rounded-lg bg-card border border-border"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-sm text-muted-foreground">Karakter #{step.index + 1}</span>
        <span className="font-mono text-lg">
          '<span className="text-foreground">{step.original}</span>' →{' '}
          '<span className="text-primary font-bold">{step.encrypted}</span>'
        </span>
      </div>
      
      <div className="space-y-1.5 font-mono text-sm step-line">
        <div className="text-muted-foreground">
          1. Konversi: '<span className="text-foreground">{step.original.toUpperCase()}</span>' → x = <span className="text-primary">{step.x}</span>
        </div>
        <div className="text-muted-foreground">
          2. E({step.x}) = ({a} × {step.x} + {b}) mod {ALPHABET_SIZE}
        </div>
        <div className="text-muted-foreground pl-4">
          = ({step.ax} + {b}) mod {ALPHABET_SIZE}
        </div>
        <div className="text-muted-foreground pl-4">
          = {step.axPlusB} mod {ALPHABET_SIZE}
        </div>
        <div className="text-muted-foreground pl-4">
          = <span className="text-primary">{step.result}</span>
        </div>
        <div className="text-muted-foreground">
          3. Konversi: {step.result} → '<span className="text-primary font-bold">{step.encrypted.toUpperCase()}</span>'
        </div>
      </div>
    </motion.div>
  );
}

interface DecryptStepProps {
  step: DecryptionStep;
  aInverse: number;
  b: number;
  index: number;
}

export function DecryptCharacterStep({ step, aInverse, b, index }: DecryptStepProps) {
  if (!step.isLetter) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="p-3 rounded-lg bg-muted/30 border border-border/50"
      >
        <div className="flex items-center gap-2">
          <span className="font-mono text-muted-foreground">#{step.index + 1}</span>
          <span className="text-muted-foreground">
            '{step.original}' → tetap '{step.decrypted}' (bukan huruf)
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="p-4 rounded-lg bg-card border border-border"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-sm text-muted-foreground">Karakter #{step.index + 1}</span>
        <span className="font-mono text-lg">
          '<span className="text-foreground">{step.original}</span>' →{' '}
          '<span className="text-success font-bold">{step.decrypted}</span>'
        </span>
      </div>
      
      <div className="space-y-1.5 font-mono text-sm step-line">
        <div className="text-muted-foreground">
          1. Konversi: '<span className="text-foreground">{step.original.toUpperCase()}</span>' → y = <span className="text-success">{step.y}</span>
        </div>
        <div className="text-muted-foreground">
          2. D({step.y}) = {aInverse} × ({step.y} - {b}) mod {ALPHABET_SIZE}
        </div>
        <div className="text-muted-foreground pl-4">
          = {aInverse} × {step.yMinusB} mod {ALPHABET_SIZE}
        </div>
        <div className="text-muted-foreground pl-4">
          = {step.aInvTimesYMinusB} mod {ALPHABET_SIZE}
        </div>
        <div className="text-muted-foreground pl-4">
          = <span className="text-success">{step.result}</span>
        </div>
        <div className="text-muted-foreground">
          3. Konversi: {step.result} → '<span className="text-success font-bold">{step.decrypted.toUpperCase()}</span>'
        </div>
      </div>
    </motion.div>
  );
}
