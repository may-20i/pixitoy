import {defineConfig} from 'vite'
export default defineConfig({
  base: process.env.BUILD_ENV === "PAGES" ? "/pixitoy/" : "/",
})