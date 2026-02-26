import fs from 'fs';
import { translate } from '@vitalets/google-translate-api';

async function main() {
    const en = JSON.parse(fs.readFileSync('./locales/en.json', 'utf-8'));
    const ta = {};

    const entries = Object.keys(en);
    for (let i = 0; i < entries.length; i++) {
        const text = entries[i];
        console.log(`Translating ${i + 1}/${entries.length}: ${text}`);
        try {
            const res = await translate(text, { to: 'ta' });
            ta[text] = res.text;
        } catch (e) {
            console.error('Error translating', text, e.message);
            ta[text] = text; // fallback to English
        }
        // minimal throttling
        await new Promise(r => setTimeout(r, 200));
    }

    fs.writeFileSync('./locales/ta.json', JSON.stringify(ta, null, 2));
    console.log('Done!');
}

main();
