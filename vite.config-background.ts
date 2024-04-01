import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  const isBuild = command === "build";
  return {
    base: "./",

    build: {
      outDir: isBuild ? "./dist" : "dist",
      emptyOutDir: false,
      assetsDir: ".",
      sourcemap: false,
      target: "esNext",
      rollupOptions: {
        input: {
          background: "src/background.ts",
        },
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
