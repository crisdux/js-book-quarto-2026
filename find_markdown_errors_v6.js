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
    if (line.trim().startsWith('```')) totalBackticks++;
    const stars = (line.match(/\*\*/g) || []).length;
    totalStars += stars;
    totalOpenBrackets += (line.match(/\[/g) || []).length;
    totalCloseBrackets += (line.match(/\]/g) || []).length;
    totalOpenParens += (line.match(/\(/g) || []).length;
    totalCloseParens += (line.match(/\)/g) || []).length;
});

let report = `Summary for glosario.qmd:\n`;
report += `Triple backticks (code blocks): ${totalBackticks}\n`;
report += `Double stars (bold): ${totalStars}\n`;
report += `Brackets: [ ${totalOpenBrackets}, ] ${totalCloseBrackets}\n`;
report += `Parens: ( ${totalOpenParens}, ) ${totalCloseParens}\n`;

if (totalBackticks % 2 !== 0) report += 'ERROR: Mismatched code blocks!\n';
if (totalStars % 2 !== 0) report += 'ERROR: Mismatched bold markers!\n';
if (totalOpenBrackets !== totalCloseBrackets) report += 'ERROR: Mismatched brackets!\n';
if (totalOpenParens !== totalCloseParens) report += 'ERROR: Mismatched parens!\n';

fs.writeFileSync('d:/www/quarto-js-book/quarto-js-book/audit_results.txt', report);
