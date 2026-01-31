const fs = require('fs');

const content = fs.readFileSync('d:/www/quarto-js-book/quarto-js-book/glosario.qmd', 'utf8');
const lines = content.split('\n');

let totalBackticks = 0;
let totalStars = 0;
let totalOpenBrackets = 0;
let totalCloseBrackets = 0;
let totalOpenParens = 0;
let totalCloseParens = 0;

lines.forEach((line, index) => {
    // Count ``` (only at start of line for code blocks)
    if (line.trim().startsWith('```')) totalBackticks++;
    
    // Count **
    const stars = (line.match(/\*\*/g) || []).length;
    totalStars += stars;

    // Count [ and ]
    totalOpenBrackets += (line.match(/\[/g) || []).length;
    totalCloseBrackets += (line.match(/\]/g) || []).length;

    // Count ( and )
    totalOpenParens += (line.match(/\(/g) || []).length;
    totalCloseParens += (line.match(/\)/g) || []).length;
});

console.log(`Summary for glosario.qmd:`);
console.log(`Triple backticks (code blocks): ${totalBackticks} (Should be even)`);
console.log(`Double stars (bold): ${totalStars} (Should be even)`);
console.log(`Brackets: [ ${totalOpenBrackets}, ] ${totalCloseBrackets} (Should be equal)`);
console.log(`Parens: ( ${totalOpenParens}, ) ${totalCloseParens} (Should be equal)`);

if (totalBackticks % 2 !== 0) console.log('ERROR: Mismatched code blocks!');
if (totalStars % 2 !== 0) console.log('ERROR: Mismatched bold markers!');
if (totalOpenBrackets !== totalCloseBrackets) console.log('ERROR: Mismatched brackets!');
if (totalOpenParens !== totalCloseParens) console.log('ERROR: Mismatched parens!');
