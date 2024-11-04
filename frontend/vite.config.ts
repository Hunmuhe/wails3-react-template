import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages';
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Pages({
      // 这里可以配置插件选项
      // 例如：扩展名、目录等
      extensions: ['tsx', 'ts'], // 根据需要添加
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
