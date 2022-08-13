const esbuild = require("esbuild");
const sveltePlugin = require("esbuild-svelte");
const sveltePreprocess = require("svelte-preprocess");

esbuild
  .build({
    entryPoints: [
      "src/background.js",
      "src/vn/tracker_inject.ts",
      "src/mokuro/mokuro_inject.ts",
      "src/stats_inject.js"
    ],
    mainFields: ["svelte", "browser", "module", "main"],
    bundle: true,
    minify: false,
    target: ["chrome102", "firefox102"],
    outdir: "build",
    plugins: [sveltePlugin({"preprocess": sveltePreprocess({postcss: true})})]
  })
  .catch(() => process.exit(1));
