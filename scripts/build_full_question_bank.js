// scripts/build_full_question_bank.js
// Generates exactly 500 DISTINCT, TRICKY, NON-REDUNDANT board-level questions strictly aligned to the 18 TOS Subtopics.

const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../src/data/practices');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log('Script started...');
