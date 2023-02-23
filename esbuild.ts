const esbuild = require("esbuild");
const sveltePlugin = require("esbuild-svelte");
const sveltePreprocess = require("svelte-preprocess");
const fs = require("fs");

const build_v2_dir = "build-v2";
const build_v3_dir = "build-v3";

// Make sure build directories exist
if (!fs.existsSync(build_v3_dir)){
  fs.mkdirSync(build_v3_dir);
}

if (!fs.existsSync(build_v2_dir)){
  fs.mkdirSync(build_v2_dir);
}

// Copy assets and manifests
fs.copyFileSync("manifest-v3.json", `${build_v3_dir}/manifest.json`);
fs.cpSync("docs", `${build_v3_dir}/docs/`, { recursive: true });
fs.cpSync("fonts", `${build_v3_dir}/fonts/`, { recursive: true });

fs.copyFileSync("manifest-v2.json", `${build_v2_dir}/manifest.json`);
fs.cpSync("docs", `${build_v2_dir}/docs/`, { recursive: true });
fs.cpSync("fonts", `${build_v2_dir}/fonts/`, { recursive: true });

const options = {
  entryPoints: [
    "src/background.js",
    "src/vn/tracker_inject.ts",
    "src/mokuro/mokuro_inject.ts",
    "src/ttu/ttu_inject.ts",
    "src/stats/stats_inject.ts",
    "src/fonts.ts"
  ],
  mainFields: ["svelte", "browser", "module", "main"],
  bundle: true,
  minify: false,
  target: ["chrome102", "firefox102"],
  plugins: [sveltePlugin({"preprocess": sveltePreprocess({postcss: true})})]
};

// Build for Manifest v2 and v3 separately
esbuild
  .build({ ...options, watch: true, outdir: build_v3_dir })
  .catch(() => process.exit(1));

esbuild
  .build({ ...options, watch: true, outdir: build_v2_dir })
  .catch(() => process.exit(1));
  