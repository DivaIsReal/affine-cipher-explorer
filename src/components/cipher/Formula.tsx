interface FormulaProps {
  children: React.ReactNode;
  highlight?: boolean;
}

export function Formula({ children, highlight = false }: FormulaProps) {
  return (
    <span
      className={`font-mono px-2 py-1 rounded ${
        highlight
          ? 'bg-primary/20 text-primary'
          : 'bg-muted text-foreground'
      }`}
    >
      {children}
    </span>
  );
}

export function FormulaBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-center py-4 px-6 bg-muted/50 rounded-lg border border-border my-4">
      {children}
    </div>
  );
}
