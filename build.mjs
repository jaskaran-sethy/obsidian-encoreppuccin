// Builds the released theme.css from src/theme.css.
// The licence notices (/*! ... */) and the Style Settings blocks (/* @settings ... */)
// are kept verbatim at the top; everything else is minified.
import { readFileSync, writeFileSync } from "node:fs";
import { transform } from "lightningcss";

const source = readFileSync("src/theme.css", "utf8");
const kept = /\/\*(?:!|\s*@settings)[\s\S]*?\*\//g;

const comments = source.match(kept) ?? [];
const { code } = transform({
  filename: "theme.css",
  code: Buffer.from(source.replace(kept, "")),
  minify: true,
});

writeFileSync("theme.css", comments.join("\n") + "\n" + code.toString());
