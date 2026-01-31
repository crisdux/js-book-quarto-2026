const fs = require('fs');

const content = fs.readFileSync('d:/www/quarto-js-book/quarto-js-book/glosario.qmd', 'utf8');
const lines = content.split('\n');

lines.forEach((line, index) => {
    // Check for non-breaking spaces (U+00A0)
    if (line.includes('\u00A0')) {
        console.log(`Line ${index + 1}: Contains non-breaking spaces (U+00A0)`);
    }

    // Check for weird invisible characters or tabs if they might cause issues
    if (line.includes('\t')) {
        console.log(`Line ${index + 1}: Contains tabs`);
    }

    // Check for multiple opening backticks or triple backticks mid-line
    const backticks = (line.match(/```/g) || []).length;
    if (backticks > 1 && !line.trim().startsWith('```')) {
        console.log(`Line ${index + 1}: Multiple code block markers on one line?`);
    }
});
