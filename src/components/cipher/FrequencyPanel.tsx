import { useState, useMemo } from 'react';
import { BarChart3 } from 'lucide-react';
import { frequencyAnalysis } from '@/lib/affineCipher';
import { FrequencyChart } from './FrequencyChart';

export function FrequencyPanel() {
  const [text, setText] = useState('');

  const analysis = useMemo(() => frequencyAnalysis(text), [text]);
  const totalLetters = text.replace(/[^a-zA-Z]/g, '').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <BarChart3 className="w-6 h-6 text-primary" />
        <h3 className="font-display text-xl font-semibold">Analisis Frekuensi Huruf</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Teks untuk Dianalisis</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Masukkan teks untuk menganalisis frekuensi huruf..."
            className="w-full h-64 bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-all duration-200 hover:border-primary/50"
          />
          
          <div className="mt-3 p-3 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground">
              Total huruf: <span className="text-primary font-mono">{totalLetters}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Karakter non-huruf diabaikan dalam analisis
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Distribusi Frekuensi</label>
          <div className="bg-card border border-border rounded-lg p-4 max-h-80 overflow-y-auto">
            <FrequencyChart data={analysis} />
          </div>
          
          <div className="mt-3 p-3 bg-muted/50 rounded-lg">
            <div className="text-xs text-muted-foreground">
              <strong>Tips:</strong> Dalam bahasa Inggris, huruf paling sering adalah E, T, A, O, I, N.
              Analisis ini berguna untuk memecahkan cipher tanpa kunci (cryptanalysis).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
