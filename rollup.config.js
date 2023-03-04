import rollupTypescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "src/index.ts",
  plugins: [rollupTypescript()],
  output: [
    {
      file: "./dist/index.js",
      format: "esm",
    },
  ],
});
