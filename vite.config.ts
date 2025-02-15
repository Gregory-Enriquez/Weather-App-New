import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { UserConfig as VitestUserConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts', // Archivo de configuración de pruebas
    coverage: {
      provider: 'istanbul', // Usa Istanbul para el reporte de cobertura
      reporter: ['text', 'json', 'html'], // Formatos de reporte
      include: ['src/**/*.{ts,tsx}'], // Incluye solo archivos TypeScript/TSX
      exclude: ['src/**/*.test.{ts,tsx}', 'src/main.tsx'], // Excluye archivos de prueba y el punto de entrada
    },
  },
} as VitestUserConfig);