const fs = require('fs');

const content = fs.readFileSync('d:/www/quarto-js-book/quarto-js-book/glosario.qmd', 'utf8');
const lines = content.split('\n');

let inCodeBlock = false;
let startLine = 0;

lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
        // Toggle code block state
        if (!inCodeBlock) {
            inCodeBlock = true;
            startLine = index + 1;
        } else {
            // Check if it's a closing block (usually just ``` or ``` with no language)
            // But actually in MD any ``` triggers a toggle unless specified otherwise.
            inCodeBlock = false;
        }
    }
});

if (inCodeBlock) {
    console.log(`ERROR: Unclosed code block starting at line ${startLine}`);
} else {
    console.log('No unclosed code blocks found.');
}
