import fs from 'fs';
import { translate } from '@vitalets/google-translate-api';

const missing = [
    "Full Name",
    "E.g. John Doe",
    "Email Address",
    "name@example.com",
    "Mobile Number",
    "Password",
    "Min 8 chars",
    "School Level",
    "Select Grade",
    "Stream",
    "Select Stream",
    "Current Level",
    "1 or 2",
    "Select",
    "Male",
    "Female",
    "Other",
    "Science",
    "Commerce",
    "Humanities",
    "Register and Pay",
    "Processing...",
    "Search country...",
    "Student Board",
    "The Science of You",
    "Unlock the data behind your daily decisions.",
    "Beyond Academics",
    "Success is more than just grades.",
    "Future Ready",
    "Prepare for careers that don't exist yet.",
    "Relationship Dynamics",
    "Master the art of connecting with others.",
    "Bridging the gap between generations with shared understanding.",
    "Learning strategies that match your natural cognitive style.",
    "Fill the Registration Form",
    "Name, Email, Age, Education, etc.",
    "Make Payment",
    "via UPI, Card, or NetBanking",
    "Receive Confirmation Email",
    "with instructions",
    "Login and Start Assessment",
    "Access your dashboard to begin the test",
    "Finish Test & Receive Report",
    "Instant digital results",
    "Choose the right path in your career",
    "Get expert guidance and clarity",
    "Language"
];

async function main() {
    const taPath = './locales/ta.json';
    const ta = JSON.parse(fs.readFileSync(taPath, 'utf-8'));
    let changed = false;

    for (const text of missing) {
        if (ta[text]) continue;
        console.log(`Translating: ${text}...`);
        try {
            const res = await translate(text, { to: 'ta' });
            ta[text] = res.text;
            changed = true;
        } catch (e) {
            console.error('Error translating', text, e.message);
            ta[text] = text;
        }
        await new Promise(r => setTimeout(r, 200));
    }

    if (changed) {
        fs.writeFileSync(taPath, JSON.stringify(ta, null, 2));
        console.log('Saved translations.');
    } else {
        console.log('No missing strings found.');
    }
}
main();
