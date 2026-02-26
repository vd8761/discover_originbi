import { Project, SyntaxKind, Node } from "ts-morph";
import * as fs from "fs";

const project = new Project({ tsConfigFilePath: "./tsconfig.json" });

const files = [
    ...project.getSourceFiles("components/sections/**/*.tsx"),
    ...project.getSourceFiles("components/layout/**/*.tsx"),
    ...project.getSourceFiles("components/ui/**/*.tsx"),
    ...project.getSourceFiles("app/**/*.tsx")
];

let injectedCount = 0;

files.forEach(file => {
    let modified = false;

    // Collect texts to modify
    const jsxTexts = file.getDescendantsOfKind(SyntaxKind.JsxText);
    const validTexts = jsxTexts.filter(text => {
        const val = text.getLiteralText().trim();
        return val && /[a-zA-Z]/.test(val);
    });

    if (validTexts.length > 0) {
        // Add import
        if (!file.getImportDeclaration(dec => dec.getModuleSpecifierValue() === "@/contexts/LanguageContext")) {
            file.addImportDeclaration({
                namedImports: ["T"],
                moduleSpecifier: "@/contexts/LanguageContext"
            });
            modified = true;
        }

        // Replace texts from bottom to top so positions don't shift
        [...validTexts].reverse().forEach(text => {
            const val = text.getLiteralText().replace(/\s+/g, ' ');
            text.replaceWithText(`{/* @ts-ignore */} <T>${val}</T> `);
            modified = true;
        });
    }

    if (modified) {
        // format and save
        file.saveSync();
        injectedCount++;
    }
});

console.log(`Injected into ${injectedCount} files.`);
