import terser from "@rollup/plugin-terser";
import sourcemaps from "rollup-plugin-sourcemaps";
import json from "@rollup/plugin-json";
export default {
  input: "src/JS/app.js",
  output: {
    file: "public/JS/bundle.js",
    format: "cjs",
    sourcemap: true,
  },
  plugins: [terser(), sourcemaps(), json()],
};
