import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Lock, Unlock, Trash2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export interface HistoryItem {
  id: string;
  type: 'encrypt' | 'decrypt';
  input: string;
  output: string;
  keyA: number;
  keyB: number;
  timestamp: Date;
}

interface HistoryPanelProps {
  history: HistoryItem[];
  onClear: () => void;
  onDelete: (id: string) => void;
}

export function HistoryPanel({ history, onClear, onDelete }: HistoryPanelProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
          <span className="text-gradient">History</span> Operasi
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto font-sans">
          Riwayat enkripsi dan dekripsi yang telah dilakukan selama sesi ini.
        </p>
      </motion.div>

      {history.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-12 rounded-xl bg-card border border-border text-center"
        >
          <Clock className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            Belum ada riwayat
          </h3>
          <p className="text-sm text-muted-foreground/70">
            Lakukan enkripsi atau dekripsi untuk melihat riwayat di sini.
          </p>
        </motion.div>
      ) : (
        <>
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClear}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm font-medium"
            >
              <Trash2 className="w-4 h-4" />
              Hapus Semua
            </motion.button>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {history.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          item.type === 'encrypt'
                            ? 'bg-primary/20 text-primary'
                            : 'bg-success/20 text-success'
                        }`}
                      >
                        {item.type === 'encrypt' ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <Unlock className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <span className="font-medium text-sm">
                          {item.type === 'encrypt' ? 'Enkripsi' : 'Dekripsi'}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {formatTime(item.timestamp)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-primary/10 font-mono text-xs text-primary">
                        a={item.keyA}, b={item.keyB}
                      </span>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="text-xs text-muted-foreground mb-1">
                        {item.type === 'encrypt' ? 'Plaintext' : 'Ciphertext'}
                      </div>
                      <div className="font-mono text-sm break-all">
                        {item.input.length > 50
                          ? `${item.input.substring(0, 50)}...`
                          : item.input}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-primary/10 relative group">
                      <div className="text-xs text-primary mb-1">
                        {item.type === 'encrypt' ? 'Ciphertext' : 'Plaintext'}
                      </div>
                      <div className="font-mono text-sm break-all pr-8">
                        {item.output.length > 50
                          ? `${item.output.substring(0, 50)}...`
                          : item.output}
                      </div>
                      <button
                        onClick={() => copyToClipboard(item.output, item.id)}
                        className="absolute top-3 right-3 p-1.5 rounded-lg bg-background/50 hover:bg-background text-muted-foreground hover:text-primary transition-all opacity-0 group-hover:opacity-100"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3.5 h-3.5 text-success" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-muted-foreground"
          >
            Total: <span className="font-mono text-primary">{history.length}</span> operasi
          </motion.div>
        </>
      )}
    </div>
  );
}
