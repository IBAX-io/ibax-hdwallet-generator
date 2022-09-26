import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import fs from 'fs';

const optimizeDepsElementPlusIncludes = ['element-plus/es'];
fs.readdirSync('node_modules/element-plus/es/components').forEach((dirname) => {
  fs.access(
    `node_modules/element-plus/es/components/${dirname}/style/css.mjs`,
    (err) => {
      if (!err) {
        optimizeDepsElementPlusIncludes.push(
          `element-plus/es/components/${dirname}/style/css`
        );
      }
    }
  );
});
// https://vitejs.dev/config/
export default ({ mode, command }) => {
  console.log(mode, command);
  const boo = mode === 'dev';
  console.log(boo);
  const alias = {
    '@': path.resolve(__dirname, './src'),
    plugins: path.resolve(__dirname, './src/plugins'),
    components: path.resolve(__dirname, './src/components')
  };
  return defineConfig({
    optimizeDeps: {
      include: optimizeDepsElementPlusIncludes
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      alias
    },
    css: {
      devSourcemap: boo
    },
    clearScreen: false,
    // tauri expects a fixed port, fail if that port is not available
    server: {
      host: '0.0.0.0',
      port: 90,
      open: true,
      hmr: true,
      strictPort: true
    },
    // to make use of `TAURI_DEBUG` and other env variables
    // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
    envPrefix: ['VITE_', 'TAURI_'],
    build: {
      // Tauri supports es2021
      target: ['es2021', 'chrome100', 'safari13'],
      // don't minify for debug builds
      minify: !boo ? 'esbuild' : false,
      // produce sourcemaps for debug builds
      sourcemap: boo,
      assetsDir: 'static',
      chunkSizeWarningLimit: 1500,
      esbuild: {
        drop: ['console', 'debugger']
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }
          },
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
              ? chunkInfo.facadeModuleId.split('/')
              : [];
            const fileName =
              facadeModuleId[facadeModuleId.length - 2] || '[name]';
            return `js/${fileName}/[name].[hash].js`;
          }
        }
      }
    }
  });
};
