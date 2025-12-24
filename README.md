# Affine Cipher Explorer

Tool interaktif untuk enkripsi dan dekripsi pesan menggunakan Affine Cipher dengan visualisasi step-by-step yang lengkap.

## Features

- 🔐 Enkripsi dan dekripsi dengan Affine Cipher
- 📊 Visualisasi proses enkripsi/dekripsi step-by-step
- 📈 Analisis frekuensi karakter
- 🎨 Dark mode support
- 📱 Responsive design
- 📜 History tracking
- 🔢 Visualisasi GCD dan Modular Inverse

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Framer Motion for animations
- Recharts for data visualization

## Installation & Setup

Requirements: Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```sh
# Clone repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd affine-cipher-explorer

# Install dependencies
npm install

# Start development server
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## How It Works

Affine Cipher menggunakan formula matematika:

**Enkripsi:** `E(x) = (ax + b) mod 26`

**Dekripsi:** `D(y) = a⁻¹(y - b) mod 26`

Dimana:
- `a` dan `b` adalah kunci enkripsi
- `x` adalah posisi karakter plaintext (0-25)
- `y` adalah posisi karakter ciphertext (0-25)
- `a⁻¹` adalah modular multiplicative inverse dari `a` mod 26

## Author

Diva Ahmad

