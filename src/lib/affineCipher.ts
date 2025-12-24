export interface GCDStep {
  a: number;
  b: number;
  quotient: number;
  remainder: number;
}

export interface EncryptionStep {
  index: number;
  original: string;
  x: number;
  ax: number;
  axPlusB: number;
  result: number;
  encrypted: string;
  isLetter: boolean;
}

export interface DecryptionStep {
  index: number;
  original: string;
  y: number;
  yMinusB: number;
  aInvTimesYMinusB: number;
  result: number;
  decrypted: string;
  isLetter: boolean;
}

export interface ModInverseStep {
  x: number;
  calculation: string;
  result: number;
  found: boolean;
}

export const ALPHABET_SIZE = 26;
export const VALID_A_VALUES = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];

export function gcd(a: number, b: number): { result: number; steps: GCDStep[] } {
  const steps: GCDStep[] = [];
  
  while (b !== 0) {
    const quotient = Math.floor(a / b);
    const remainder = a % b;
    steps.push({ a, b, quotient, remainder });
    a = b;
    b = remainder;
  }
  
  return { result: a, steps };
}

export function isCoprime(a: number, m: number): boolean {
  return gcd(a, m).result === 1;
}

export function modInverse(a: number, m: number): { inverse: number | null; steps: ModInverseStep[] } {
  const steps: ModInverseStep[] = [];
  
  if (!isCoprime(a, m)) {
    return { inverse: null, steps };
  }
  
  for (let x = 1; x < m; x++) {
    const result = (a * x) % m;
    const found = result === 1;
    steps.push({
      x,
      calculation: `(${a} × ${x}) mod ${m}`,
      result,
      found,
    });
    
    if (found) {
      return { inverse: x, steps };
    }
  }
  
  return { inverse: null, steps };
}

export function charToNum(char: string): number {
  return char.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
}

export function numToChar(num: number): string {
  return String.fromCharCode(num + 'A'.charCodeAt(0));
}

export function validateKeys(a: number, b: number): { valid: boolean; aValid: boolean; bValid: boolean } {
  const aValid = VALID_A_VALUES.includes(a);
  const bValid = b >= 0 && b < ALPHABET_SIZE;
  return { valid: aValid && bValid, aValid, bValid };
}

export function encrypt(plaintext: string, a: number, b: number): { ciphertext: string; steps: EncryptionStep[] } {
  const steps: EncryptionStep[] = [];
  let ciphertext = '';
  
  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext[i];
    
    if (/[a-zA-Z]/.test(char)) {
      const isUpper = char === char.toUpperCase();
      const x = charToNum(char);
      const ax = a * x;
      const axPlusB = ax + b;
      const result = axPlusB % ALPHABET_SIZE;
      let encrypted = numToChar(result);
      
      if (!isUpper) {
        encrypted = encrypted.toLowerCase();
      }
      
      ciphertext += encrypted;
      steps.push({
        index: i,
        original: char,
        x,
        ax,
        axPlusB,
        result,
        encrypted,
        isLetter: true,
      });
    } else {
      ciphertext += char;
      steps.push({
        index: i,
        original: char,
        x: 0,
        ax: 0,
        axPlusB: 0,
        result: 0,
        encrypted: char,
        isLetter: false,
      });
    }
  }
  
  return { ciphertext, steps };
}

export function decrypt(ciphertext: string, a: number, b: number): { plaintext: string; steps: DecryptionStep[]; aInverse: number | null; modInverseSteps: ModInverseStep[] } {
  const { inverse: aInverse, steps: modInverseSteps } = modInverse(a, ALPHABET_SIZE);
  const steps: DecryptionStep[] = [];
  let plaintext = '';
  
  if (aInverse === null) {
    return { plaintext: '', steps: [], aInverse: null, modInverseSteps };
  }
  
  for (let i = 0; i < ciphertext.length; i++) {
    const char = ciphertext[i];
    
    if (/[a-zA-Z]/.test(char)) {
      const isUpper = char === char.toUpperCase();
      const y = charToNum(char);
      const yMinusB = y - b;
      const aInvTimesYMinusB = aInverse * yMinusB;
      const result = ((aInvTimesYMinusB % ALPHABET_SIZE) + ALPHABET_SIZE) % ALPHABET_SIZE;
      let decrypted = numToChar(result);
      
      if (!isUpper) {
        decrypted = decrypted.toLowerCase();
      }
      
      plaintext += decrypted;
      steps.push({
        index: i,
        original: char,
        y,
        yMinusB,
        aInvTimesYMinusB,
        result,
        decrypted,
        isLetter: true,
      });
    } else {
      plaintext += char;
      steps.push({
        index: i,
        original: char,
        y: 0,
        yMinusB: 0,
        aInvTimesYMinusB: 0,
        result: 0,
        decrypted: char,
        isLetter: false,
      });
    }
  }
  
  return { plaintext, steps, aInverse, modInverseSteps };
}

export function frequencyAnalysis(text: string): Map<string, { count: number; percentage: number }> {
  const lettersOnly = text.toUpperCase().replace(/[^A-Z]/g, '');
  const total = lettersOnly.length;
  const counts = new Map<string, number>();
  
  for (const char of lettersOnly) {
    counts.set(char, (counts.get(char) || 0) + 1);
  }
  
  const result = new Map<string, { count: number; percentage: number }>();
  
  const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  
  for (const [char, count] of sorted) {
    result.set(char, {
      count,
      percentage: total > 0 ? (count / total) * 100 : 0,
    });
  }
  
  return result;
}
