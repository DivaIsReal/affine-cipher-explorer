import { VALID_A_VALUES, ALPHABET_SIZE, isCoprime } from '@/lib/affineCipher';
import { Check, X, AlertCircle } from 'lucide-react';

interface KeyInputProps {
  a: number;
  b: number;
  onAChange: (value: number) => void;
  onBChange: (value: number) => void;
  aValid: boolean;
  bValid: boolean;
}

export function KeyInput({ a, b, onAChange, onBChange, aValid, bValid }: KeyInputProps) {
  const getAValidationMessage = () => {
    if (a <= 0) return 'Nilai harus lebih dari 0';
    if (!isCoprime(a, ALPHABET_SIZE)) return `${a} tidak coprime dengan ${ALPHABET_SIZE} (GCD ≠ 1)`;
    return null;
  };

  const aErrorMessage = getAValidationMessage();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Kunci A <span className="text-muted-foreground">(harus coprime dengan 26)</span>
        </label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={a}
            onChange={(e) => onAChange(Number(e.target.value))}
            min={1}
            className="flex-1 bg-card border border-border rounded-lg px-4 py-2.5 font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            placeholder="Masukkan nilai a"
          />
          {aValid ? (
            <Check className="w-5 h-5 text-success flex-shrink-0" />
          ) : (
            <X className="w-5 h-5 text-destructive flex-shrink-0" />
          )}
        </div>
        {aErrorMessage && (
          <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {aErrorMessage}
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-1.5">
          Contoh nilai valid: {VALID_A_VALUES.slice(0, 6).join(', ')}...
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Kunci B <span className="text-muted-foreground">(0-25)</span>
        </label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={b}
            onChange={(e) => onBChange(Number(e.target.value))}
            min={0}
            max={ALPHABET_SIZE - 1}
            className="flex-1 bg-card border border-border rounded-lg px-4 py-2.5 font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            placeholder="Masukkan nilai b"
          />
          {bValid ? (
            <Check className="w-5 h-5 text-success flex-shrink-0" />
          ) : (
            <X className="w-5 h-5 text-destructive flex-shrink-0" />
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">
          Rentang: 0 sampai {ALPHABET_SIZE - 1}
        </p>
      </div>
    </div>
  );
}
