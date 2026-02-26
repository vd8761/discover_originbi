import { Project, SyntaxKind } from "ts-morph";
import * as fs from "fs";

const project = new Project({ tsConfigFilePath: "./tsconfig.json" });
const files = [
    ...project.getSourceFiles("components/sections/**/*.tsx"),
    ...project.getSourceFiles("components/layout/**/*.tsx"),
    ...project.getSourceFiles("components/ui/**/*.tsx"),
    ...project.getSourceFiles("app/**/*.tsx")
];

const stringsMap: Record<string, string> = {};

files.forEach(file => {
    const jsxTexts = file.getDescendantsOfKind(SyntaxKind.JsxText);
    for (const text of jsxTexts) {
        const val = text.getLiteralText().trim();
        // Ignore single non-alphabet chars, empty strings, pure numbers, or javascript things like {" "}
        if (val && /[a-zA-Z]/.test(val)) {
            const normalized = val.replace(/\s+/g, ' ');
            stringsMap[normalized] = "";
        }
    }
});

fs.writeFileSync("locales/en.json", JSON.stringify(stringsMap, null, 2));
console.log(`Extracted ${Object.keys(stringsMap).length} strings.`);
