const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: [
      "src/background.js",
      "src/tracker_inject.js",
      "src/stats_inject.js"
    ],
    bundle: true,
    minify: false,
    target: ["chrome102", "firefox102"],
    outdir: "build"
  })
  .catch(() => process.exit(1));
