import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import viteCompression from 'vite-plugin-compression'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    viteCompression({ algorithm: 'gzip', ext: '.gz' }),
    viteImagemin({
      gifsicle: { optimizationLevel: 7, interlaced: false },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 70 },
      pngquant: { quality: [0.65, 0.8], speed: 4 },
      svgo: {
        plugins: [
          { name: 'removeViewBox' },
          { name: 'removeEmptyAttrs', active: false },
        ],
      },
      webp: { quality: 70 },
    }),
  ],
  build: {
    target: 'esnext',
    sourcemap: false,
    assetsDir: 'assets',
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
        pure_funcs: ['console.log', 'console.debug'],
      },
      format: { comments: false },
    },
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue'],
          vendor: ['vue-router', 'papaparse'],
        },
      },
    },
  },
})
