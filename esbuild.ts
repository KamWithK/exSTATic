const esbuild = require("esbuild");
const sveltePlugin = require("esbuild-svelte");
const sveltePreprocess = require("svelte-preprocess");
const fs = require("fs");

// NOTE: Chrome and Firefox Manifest V3 implementations differ
// So two seperate builds are still required

// Builds directories
const build_chrome_dir = "build-chrome";
const build_firefox_dir = "build-firefox";

// Make sure build directories exist
if (!fs.existsSync(build_chrome_dir)){
  fs.mkdirSync(build_chrome_dir);
}
if (!fs.existsSync(build_firefox_dir)){
  fs.mkdirSync(build_firefox_dir);
}

// Copy assets and manifests
fs.copyFileSync("manifest-chrome.json", `${build_chrome_dir}/manifest.json`);
fs.cpSync("docs", `${build_chrome_dir}/docs/`, { recursive: true });
fs.cpSync("fonts", `${build_chrome_dir}/fonts/`, { recursive: true });
fs.copyFileSync("manifest-firefox.json", `${build_firefox_dir}/manifest.json`);
fs.cpSync("docs", `${build_firefox_dir}/docs/`, { recursive: true });
fs.cpSync("fonts", `${build_firefox_dir}/fonts/`, { recursive: true });

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
  target: ["chrome118", "firefox118"],
  plugins: [sveltePlugin({"preprocess": sveltePreprocess({postcss: true})})]
};

esbuild
  .build({ ...options, watch: true, outdir: build_chrome_dir })
  .catch(() => process.exit(1));

esbuild
  .build({ ...options, watch: true, outdir: build_firefox_dir })
  .catch(() => process.exit(1));
