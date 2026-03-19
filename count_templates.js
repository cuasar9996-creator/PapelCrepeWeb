
const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\Gustavo\\Desktop\\Invitaciones 2026 2\\src\\data\\templates.ts', 'utf8');
const counts = {};
const matches = content.match(/categoryId:\s*'([^']+)'/g);
if (matches) {
    matches.forEach(match => {
        const id = match.match(/'([^']+)'/)[1];
        counts[id] = (counts[id] || 0) + 1;
    });
}
console.log(JSON.stringify(counts, null, 2));
