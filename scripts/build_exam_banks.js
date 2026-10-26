// Comprehensive Question Bank Builder for PNLE 500-Item Pre-Board
// Strictly satisfies the 18 Table of Specifications subtopics with 500 ZERO-REDUNDANCY, TRICKY, HARD clinical items.

const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../src/data/practices');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log('Building high-difficulty non-redundant question banks...');
