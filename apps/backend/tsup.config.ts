import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  target: 'node18',
  format: ['esm'],
  sourcemap: true,
  dts: false,
  clean: true,
  // Node.jsビルトインモジュールを外部依存として扱う
  external: [
    'fs',
    'path',
    'crypto',
    'os',
    'util',
    'stream',
    'events',
    'buffer',
    'url',
    'querystring',
    'http',
    'https',
    'net',
    'tls',
    'zlib',
  ],
  // 依存関係をバンドルする（外部依存以外）
  noExternal: [/.*/],
  minify: false,
  // ESM/CJS互換性のための設定
  banner: {
    js: 'import { createRequire } from "module"; const require = createRequire(import.meta.url);',
  },
})
