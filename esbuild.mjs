import esbuild from "esbuild";
import sveltePlugin from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";
import fs from "fs";

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
    "src/settings/settings_inject.ts",
    "src/fonts.ts"
  ],
  mainFields: ["svelte", "browser", "module", "main"],
  bundle: true,
  minify: false,
  target: ["chrome118", "firefox118"],
  plugins: [sveltePlugin({"preprocess": sveltePreprocess({postcss: true})})]
};

const context_chrome = await esbuild.context({ ...options, outdir: build_chrome_dir })
const context_firefox = await esbuild.context({ ...options, outdir: build_firefox_dir })

await Promise.all([context_chrome.watch(), context_firefox.watch()])
// await Promise.all([context_chrome.dispose(), context_firefox.dispose()])
