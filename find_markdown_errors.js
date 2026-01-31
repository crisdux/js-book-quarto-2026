const fs = require('fs');

const content = fs.readFileSync('d:/www/quarto-js-book/quarto-js-book/glosario.qmd', 'utf8');
const lines = content.split('\n');

let inCodeBlock = false;
let startLine = -1;

lines.forEach((line, index) => {
    if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
            inCodeBlock = false;
        } else {
            inCodeBlock = true;
            startLine = index + 1;
        }
    }
    
    // If we see a header while in a code block, it's very likely an error
    if (inCodeBlock && line.trim().startsWith('###')) {
        console.log(`ERROR: Header found inside code block! Block started at line ${startLine}, header at line ${index + 1}: ${line.trim()}`);
    }
});

if (inCodeBlock) {
    console.log(`STILL OPEN: Block starting on line ${startLine} was never closed.`);
}
