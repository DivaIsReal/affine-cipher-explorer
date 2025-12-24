import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, BarChart3, Info, Shield, Sparkles, History } from 'lucide-react';
import { EncryptPanel } from '@/components/cipher/EncryptPanel';
import { DecryptPanel } from '@/components/cipher/DecryptPanel';
import { FrequencyPanel } from '@/components/cipher/FrequencyPanel';
import { InfoPanel } from '@/components/cipher/InfoPanel';
import { HistoryPanel, HistoryItem } from '@/components/cipher/HistoryPanel';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Watermark } from '@/components/Watermark';

type Tab = 'encrypt' | 'decrypt' | 'frequency' | 'info' | 'history';

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'encrypt', label: 'Enkripsi', icon: <Lock className="w-4 h-4" /> },
  { id: 'decrypt', label: 'Dekripsi', icon: <Unlock className="w-4 h-4" /> },
  { id: 'frequency', label: 'Analisis', icon: <BarChart3 className="w-4 h-4" /> },
  { id: 'history', label: 'History', icon: <History className="w-4 h-4" /> },
  { id: 'info', label: 'Info', icon: <Info className="w-4 h-4" /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>('encrypt');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const addToHistory = useCallback((item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    setHistory((prev) => [newItem, ...prev]);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const deleteHistoryItem = useCallback((id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Watermark */}
      <Watermark />

      {/* Hero Section */}
      <header className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[100px] rounded-full" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
        
        <div className="container relative py-12 md:py-16">
          {/* Theme Toggle */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6">
            <ThemeToggle />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <motion.div 
                className="relative p-3 rounded-xl bg-primary/20 border border-primary/30"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Shield className="w-8 h-8 text-primary" />
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 tracking-tight"
            >
              <motion.span 
                className="text-gradient inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Affine
              </motion.span>{' '}
              Cipher
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-muted-foreground text-lg max-w-xl mx-auto font-sans"
            >
              Enkripsi dan dekripsi pesan dengan cipher substitusi klasik.
              Lengkap dengan visualisasi step-by-step.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center gap-4 mt-6"
            >
              <motion.div 
                className="px-4 py-2 rounded-full bg-card border border-border font-mono text-sm interactive-card"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                E(x) = (ax + b) mod 26
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border transition-colors duration-300">
        <div className="container">
          <div className="flex items-center gap-1 py-2 overflow-x-auto">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {tab.icon}
                {tab.label}
                {tab.id === 'history' && history.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-primary/20 text-primary font-mono">
                    {history.length}
                  </span>
                )}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/30"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container py-8 md:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'encrypt' && <EncryptPanel onEncrypt={addToHistory} />}
            {activeTab === 'decrypt' && <DecryptPanel onDecrypt={addToHistory} />}
            {activeTab === 'frequency' && <FrequencyPanel />}
            {activeTab === 'history' && (
              <HistoryPanel
                history={history}
                onClear={clearHistory}
                onDelete={deleteHistoryItem}
              />
            )}
            {activeTab === 'info' && <InfoPanel />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 transition-colors duration-300">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-sm text-muted-foreground"
          >
            <p>
              Dibuat untuk keperluan edukasi kriptografi.{' '}
              <span className="text-destructive">Jangan gunakan untuk data sensitif!</span>
            </p>
            <p className="mt-2 text-xs">
              © 2024 Affine Cipher Tool •{' '}
              <span className="text-primary font-medium">by Diva Ahmad</span>
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}