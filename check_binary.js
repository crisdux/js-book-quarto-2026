const fs = require('fs');
const content = fs.readFileSync('d:/www/quarto-js-book/quarto-js-book/glosario.qmd', 'utf8');

for (let i = 0; i < content.length; i++) {
    const code = content.charCodeAt(i);
    // Allow standard ASCII, Spanish characters (á, é, í, ó, ú, ñ, etc)
    // Range 32-126 are standard ASCII printable.
    // 10 is \n, 13 is \r, 9 is \t.
    if (code < 32 && code !== 10 && code !== 13 && code !== 9) {
        console.log(`Found non-printable character ${code} at offset ${i}`);
    }
}
