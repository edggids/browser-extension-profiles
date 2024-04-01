import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig(({ command }) => {
  const isBuild = command === "build";
  return {
    base: "./",

    plugins: [svelte()],
    build: {
      outDir: isBuild ? "./dist" : "dist",
      emptyOutDir: false,
      assetsDir: ".",
      sourcemap: false,
      target: "esNext",
      rollupOptions: {
        output: {
          manualChunks: undefined,
          entryFileNames: "[name].js",
          chunkFileNames: "[name].js",
          assetFileNames: "[name].[ext]",
          format: "es",
          exports: "named",
        },
      },
    },
  };
});
