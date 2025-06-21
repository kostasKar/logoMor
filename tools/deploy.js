const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { JSDOM } = require("jsdom");

// Config
const htmlFile = "index.html";
const outputDir = "deploy";
const outputJs = path.join(outputDir, "logomorApp.js");
const outputMinJs = path.join(outputDir, "logomorApp.min.js");
const editorConfigJs = "js/editor/codeEditorConfiguration.js";
const editorConfigMinJs = path.join(outputDir, "codeEditorConfiguration.min.js");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Load and parse HTML
const html = fs.readFileSync(htmlFile, "utf8");
const dom = new JSDOM(html);
const document = dom.window.document;

// Collect local <script> tags to remove
const allScripts = [...document.querySelectorAll("script[src]")];
const localScripts = allScripts.filter(el => {
    const src = el.getAttribute("src");
    return !src.startsWith("http") &&
           !src.includes("seedrandom") &&
           !src.includes("codemirrorLogomor") &&
           !el.hasAttribute("defer");
});

// Collect file paths from those <script> tags
const localScriptPaths = localScripts.map(el => el.getAttribute("src"));

// Remove the local <script> tags from DOM
localScripts.forEach(el => el.remove());

// Concatenate JS files
fs.writeFileSync(outputJs, ""); // Clear existing
for (const src of localScriptPaths) {
    const code = fs.readFileSync(src, "utf8");
    fs.appendFileSync(outputJs, `// Source: ${src}\n${code}\n\n`);
}
console.log(`✅ Concatenated to: ${outputJs}`);

// Check if terser is installed
try {
    execSync("terser --version", { stdio: "ignore" });
} catch {
    console.error("❌ Terser is not installed. Run: npm install -g terser");
    process.exit(1);
}

// Minify
execSync(`terser ${outputJs} -c -m -o ${outputMinJs}`);
console.log(`✅ Minified: ${outputMinJs}`);

execSync(`terser ${editorConfigJs} -c -m -o ${editorConfigMinJs}`);
console.log(`✅ Minified: ${editorConfigMinJs}`);

