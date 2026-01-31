const fs = require('fs');

const content = fs.readFileSync('d:/www/quarto-js-book/quarto-js-book/glosario.qmd', 'utf8');
const lines = content.split('\n');

let inCodeBlock = false;
let startLine = -1;

lines.forEach((line, index) => {
    if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
            console.log(`Block closed on line ${index + 1}`);
            inCodeBlock = false;
        } else {
            console.log(`Block started on line ${index + 1}`);
            inCodeBlock = true;
            startLine = index + 1;
        }
    }
});

if (inCodeBlock) {
    console.log(`STILL OPEN: Block starting on line ${startLine} was never closed.`);
} else {
    console.log('All blocks are closed.');
}
