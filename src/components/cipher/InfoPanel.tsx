import { motion } from 'framer-motion';
import { Info, Shield, AlertTriangle, BookOpen } from 'lucide-react';
import { VALID_A_VALUES } from '@/lib/affineCipher';
import { FormulaBlock } from './Formula';

export function InfoPanel() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
          Tentang <span className="text-gradient">Affine Cipher</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto font-sans">
          Affine Cipher adalah salah satu jenis cipher substitusi klasik yang menggunakan
          fungsi matematika linear untuk mengenkripsi dan mendekripsi pesan.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/20">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold">Rumus Dasar</h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-2">Enkripsi:</div>
              <FormulaBlock>
                E(x) = (a × x + b) mod 26
              </FormulaBlock>
            </div>

            <div>
              <div className="text-sm font-medium text-muted-foreground mb-2">Dekripsi:</div>
              <FormulaBlock>
                D(y) = a⁻¹ × (y - b) mod 26
              </FormulaBlock>
            </div>

            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>x</strong> = posisi huruf plaintext (A=0, B=1, ..., Z=25)</p>
              <p><strong>y</strong> = posisi huruf ciphertext</p>
              <p><strong>a</strong> = kunci perkalian (slope/gradien)</p>
              <p><strong>b</strong> = kunci penambahan (shift)</p>
              <p><strong>a⁻¹</strong> = modular inverse dari a</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/20">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold">Syarat Penting</h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-primary mb-2">Kunci A</div>
              <p className="text-sm text-muted-foreground mb-2">
                Kunci 'a' <strong>HARUS</strong> coprime dengan 26 (GCD(a, 26) = 1)
              </p>
              <div className="flex flex-wrap gap-2">
                {VALID_A_VALUES.map((val) => (
                  <span
                    key={val}
                    className="px-2 py-1 bg-primary/20 text-primary font-mono text-sm rounded"
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-primary mb-2">Kunci B</div>
              <p className="text-sm text-muted-foreground">
                Kunci 'b' bisa nilai <strong>0 sampai 25</strong>
              </p>
            </div>

            <div className="p-3 rounded-lg bg-muted/50">
              <div className="text-sm text-muted-foreground">
                Total kombinasi kunci: <span className="text-primary font-mono font-bold">312</span>
                <span className="text-xs ml-1">(12 × 26)</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-xl bg-destructive/10 border border-destructive/30"
      >
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-destructive/20">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-destructive mb-2">
              Peringatan Keamanan
            </h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                Affine Cipher adalah cipher klasik yang <strong>TIDAK AMAN</strong> untuk
                penggunaan modern.
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Hanya ada 312 kombinasi kunci (sangat mudah di-brute force)</li>
                <li>Rentan terhadap frequency analysis</li>
                <li>Tidak cocok untuk data sensitif atau komunikasi rahasia</li>
              </ul>
              <p className="text-destructive font-medium">
                Gunakan hanya untuk keperluan edukasi dan pembelajaran kriptografi!
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="p-6 rounded-xl bg-card border border-border"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/20">
            <Info className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-xl font-semibold">Tabel Konversi (0-Based System)</h3>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Dalam Affine Cipher, setiap huruf dikonversi ke angka menggunakan sistem berbasis 0:
        </p>

        <div className="overflow-x-auto">
          <div className="grid grid-cols-13 gap-1 min-w-fit">
            {/* First row: A-M */}
            {Array.from({ length: 13 }, (_, i) => (
              <div
                key={`letter-${i}`}
                className="flex flex-col items-center p-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
              >
                <span className="font-mono font-bold text-primary text-lg">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {i}
                </span>
              </div>
            ))}
            {/* Second row: N-Z */}
            {Array.from({ length: 13 }, (_, i) => (
              <div
                key={`letter-${i + 13}`}
                className="flex flex-col items-center p-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
              >
                <span className="font-mono font-bold text-primary text-lg">
                  {String.fromCharCode(65 + i + 13)}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {i + 13}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground">
            <strong>Catatan:</strong> Sistem ini disebut "0-based indexing" karena dimulai dari 0, bukan 1. 
            Modulo 26 digunakan karena ada 26 huruf dalam alfabet (0-25).
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-xl bg-card border border-border"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/20">
            <Info className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-xl font-semibold">Konsep Penting</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-mono text-sm font-medium text-primary mb-2">
              GCD (Greatest Common Divisor)
            </h4>
            <p className="text-sm text-muted-foreground">
              GCD atau FPB adalah bilangan bulat positif terbesar yang habis membagi dua bilangan.
              Untuk Affine Cipher, kita memastikan GCD(a, 26) = 1 agar cipher dapat didekripsi.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-sm font-medium text-primary mb-2">
              Coprime (Relatif Prima)
            </h4>
            <p className="text-sm text-muted-foreground">
              Dua bilangan dikatakan coprime jika GCD-nya adalah 1. Ini berarti keduanya tidak
              memiliki faktor prima bersama selain 1.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-sm font-medium text-primary mb-2">
              Modular Inverse
            </h4>
            <p className="text-sm text-muted-foreground">
              Modular inverse dari a mod m adalah bilangan a⁻¹ dimana (a × a⁻¹) mod m = 1.
              Ini digunakan dalam proses dekripsi untuk "membalik" operasi perkalian.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-sm font-medium text-primary mb-2">
              Euclidean Algorithm
            </h4>
            <p className="text-sm text-muted-foreground">
              Algoritma efisien untuk menghitung GCD dari dua bilangan. Bekerja dengan membagi
              bilangan yang lebih besar dengan yang lebih kecil secara berulang.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
