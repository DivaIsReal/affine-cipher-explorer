import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface InteractiveTextProps {
  text: string;
  className?: string;
}

export function InteractiveText({ text, className = '' }: InteractiveTextProps) {
  return (
    <motion.span
      className={`inline-block cursor-pointer ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          whileHover={{ 
            y: -5, 
            color: 'hsl(38 92% 50%)',
            transition: { duration: 0.1 }
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function FloatingIcon() {
  return (
    <motion.div
      className="absolute -top-2 -right-2"
      animate={{
        y: [0, -5, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Sparkles className="w-4 h-4 text-primary" />
    </motion.div>
  );
}
