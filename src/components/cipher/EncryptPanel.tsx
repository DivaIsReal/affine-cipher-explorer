import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, Copy, Check } from 'lucide-react';
import { encrypt, validateKeys, gcd, ALPHABET_SIZE } from '@/lib/affineCipher';
import { KeyInput } from './KeyInput';
import { StepCard } from './StepCard';
import { FormulaBlock } from './Formula';
import { GCDVisualization } from './GCDVisualization';
import { EncryptCharacterStep } from './CharacterStep';
import { Button } from '@/components/ui/button';
import type { HistoryItem } from './HistoryPanel';

interface EncryptPanelProps {
  onEncrypt?: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
}

export function EncryptPanel({ onEncrypt }: EncryptPanelProps) {
  const [plaintext, setPlaintext] = useState('');
  const [a, setA] = useState(5);
  const [b, setB] = useState(8);
  const [result, setResult] = useState<ReturnType<typeof encrypt> | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const [copied, setCopied] = useState(false);

  const validation = validateKeys(a, b);
  const gcdResult = gcd(a, ALPHABET_SIZE);

  const handleEncrypt = () => {
    if (!validation.valid || !plaintext.trim()) return;
    const encryptResult = encrypt(plaintext, a, b);
    setResult(encryptResult);
    setShowSteps(true);
    
    // Add to history
    onEncrypt?.({
      type: 'encrypt',
      input: plaintext,
      output: encryptResult.ciphertext,
      keyA: a,
      keyB: b,
    });
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.ciphertext);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <FormulaBlock>
        <span className="text-lg">E(x) = (</span>
        <span className="text-primary font-bold">a</span>
        <span className="text-lg">×x + </span>
        <span className="text-primary font-bold">b</span>
        <span className="text-lg">) mod 26</span>
      </FormulaBlock>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Plaintext</label>
            <textarea
              value={plaintext}
              onChange={(e) => setPlaintext(e.target.value)}
              placeholder="Masukkan teks yang akan dienkripsi..."
              className="w-full h-32 bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-all duration-200 hover:border-primary/50"
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
            onClick={handleEncrypt}
            disabled={!validation.valid || !plaintext.trim()}
            className="w-full"
          >
            <Lock className="w-4 h-4 mr-2" />
            Enkripsi
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">Ciphertext</label>
                  <div className="relative">
                    <div className="w-full min-h-32 bg-card border border-primary/50 border-glow rounded-lg px-4 py-3 font-mono text-primary break-all">
                      {result.ciphertext}
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
                  <div className="text-sm text-success font-medium">✓ Enkripsi Berhasil!</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {result.steps.filter(s => s.isLetter).length} karakter dienkripsi
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
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
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
              </div>

              <h4 className="font-mono text-sm font-medium text-primary mb-3">
                Enkripsi Per Karakter
              </h4>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {result.steps.map((step, i) => (
                  <EncryptCharacterStep key={i} step={step} a={a} b={b} index={i} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
