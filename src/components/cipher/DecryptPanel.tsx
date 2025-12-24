import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Unlock, ArrowRight, Copy, Check } from 'lucide-react';
import { decrypt, validateKeys, gcd, ALPHABET_SIZE } from '@/lib/affineCipher';
import { KeyInput } from './KeyInput';
import { StepCard } from './StepCard';
import { FormulaBlock } from './Formula';
import { GCDVisualization } from './GCDVisualization';
import { ModInverseVisualization } from './ModInverseVisualization';
import { DecryptCharacterStep } from './CharacterStep';
import { Button } from '@/components/ui/button';
import type { HistoryItem } from './HistoryPanel';

interface DecryptPanelProps {
  onDecrypt?: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
}

export function DecryptPanel({ onDecrypt }: DecryptPanelProps) {
  const [ciphertext, setCiphertext] = useState('');
  const [a, setA] = useState(5);
  const [b, setB] = useState(8);
  const [result, setResult] = useState<ReturnType<typeof decrypt> | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const [copied, setCopied] = useState(false);

  const validation = validateKeys(a, b);
  const gcdResult = gcd(a, ALPHABET_SIZE);

  const handleDecrypt = () => {
    if (!validation.valid || !ciphertext.trim()) return;
    const decryptResult = decrypt(ciphertext, a, b);
    setResult(decryptResult);
    setShowSteps(true);
    
    // Add to history
    if (decryptResult.plaintext) {
      onDecrypt?.({
        type: 'decrypt',
        input: ciphertext,
        output: decryptResult.plaintext,
        keyA: a,
        keyB: b,
      });
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.plaintext);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <FormulaBlock>
        <span className="text-lg">D(y) = </span>
        <span className="text-success font-bold">a⁻¹</span>
        <span className="text-lg"> × (y - </span>
        <span className="text-success font-bold">b</span>
        <span className="text-lg">) mod 26</span>
      </FormulaBlock>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Ciphertext</label>
            <textarea
              value={ciphertext}
              onChange={(e) => setCiphertext(e.target.value)}
              placeholder="Masukkan teks yang akan didekripsi..."
              className="w-full h-32 bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono transition-all duration-200 hover:border-primary/50"
            />
          </div>
          
          <KeyInput
            a={a}
            b={b}
            onAChange={setA}
            onBChange={setB}
            aValid={validation.aValid}
            bValid={validation.bValid}
          />

          <Button
            onClick={handleDecrypt}
            disabled={!validation.valid || !ciphertext.trim()}
            variant="secondary"
            className="w-full bg-success/20 hover:bg-success/30 text-success border-success/50"
          >
            <Unlock className="w-4 h-4 mr-2" />
            Dekripsi
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {result && result.plaintext && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">Plaintext</label>
                  <div className="relative">
                    <div className="w-full min-h-32 bg-card border border-success/50 border-glow-success rounded-lg px-4 py-3 text-success break-all">
                      {result.plaintext}
                    </div>
                    <button
                      onClick={handleCopy}
                      className="absolute top-2 right-2 p-2 bg-secondary rounded-md hover:bg-muted transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-success" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-success/10 border border-success/30">
                  <div className="text-sm text-success font-medium">✓ Dekripsi Berhasil!</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Modular inverse a⁻¹ = {result.aInverse}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showSteps && result && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 overflow-hidden"
          >
            <div className="border-t border-border pt-6">
              <h3 className="font-display text-xl font-semibold mb-4">Proses Step-by-Step</h3>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <StepCard title="Validasi Kunci A" index={0} status={validation.aValid ? 'success' : 'error'}>
                  <GCDVisualization
                    a={a}
                    m={ALPHABET_SIZE}
                    steps={gcdResult.steps}
                    result={gcdResult.result}
                  />
                </StepCard>

                <StepCard title="Validasi Kunci B" index={1} status={validation.bValid ? 'success' : 'error'}>
                  <div className="font-mono text-sm">
                    <div className="text-muted-foreground">Syarat: 0 ≤ b &lt; 26</div>
                    <div className="text-muted-foreground mt-1">Nilai b = {b}</div>
                    <div className={`mt-2 ${validation.bValid ? 'text-success' : 'text-destructive'}`}>
                      {validation.bValid ? '✓' : '✗'} {validation.bValid ? 'Valid' : 'Tidak valid'}
                    </div>
                  </div>
                </StepCard>

                <StepCard title="Modular Inverse" index={2} status={result.aInverse ? 'success' : 'error'}>
                  <ModInverseVisualization
                    a={a}
                    steps={result.modInverseSteps}
                    inverse={result.aInverse}
                  />
                </StepCard>
              </div>

              {result.plaintext && (
                <>
                  <h4 className="font-mono text-sm font-medium text-success mb-3">
                    Dekripsi Per Karakter
                  </h4>
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {result.steps.map((step, i) => (
                      <DecryptCharacterStep 
                        key={i} 
                        step={step} 
                        aInverse={result.aInverse!} 
                        b={b} 
                        index={i} 
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
