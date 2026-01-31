const fs = require('fs');
const content = fs.readFileSync('d:/www/quarto-js-book/quarto-js-book/glosario.qmd', 'utf8');
const lines = content.split('\n');

lines.forEach((line, index) => {
    if (line.length > 500) {
        console.log(`Line ${index + 1} is very long (${line.length} chars)`);
    }
});
