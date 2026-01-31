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
});

if (inCodeBlock) {
    console.log(`Unbalanced code block starting on line ${startLine}`);
} else {
    console.log('No unbalanced code blocks found using simple check.');
}
