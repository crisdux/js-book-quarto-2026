const fs = require('fs');

const content = fs.readFileSync('d:/www/quarto-js-book/quarto-js-book/glosario.qmd', 'utf8');
const lines = content.split('\n');

let inCodeBlock = false;
let startLine = -1;
let errors = [];

lines.forEach((line, index) => {
    if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
            inCodeBlock = false;
        } else {
            inCodeBlock = true;
            startLine = index + 1;
        }
    }
    
    if (inCodeBlock && line.trim().startsWith('###')) {
        errors.push(`ERROR: Header found inside code block! Block started at line ${startLine}, header at line ${index + 1}: ${line.trim()}`);
    }
});

if (inCodeBlock) {
    errors.push(`STILL OPEN: Block starting on line ${startLine} was never closed.`);
}

if (errors.length === 0) {
    errors.push('No errors found.');
}

fs.writeFileSync('d:/www/quarto-js-book/quarto-js-book/errors_report.txt', errors.join('\n'), 'utf8');
console.log(`Found ${errors.length} errors.`);
