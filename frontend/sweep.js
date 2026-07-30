const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src');

function walkDir(d, callback) {
  fs.readdirSync(d).forEach(f => {
    let dirPath = path.join(d, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else if (dirPath.endsWith('.jsx') || dirPath.endsWith('.js')) {
      callback(path.join(d, f));
    }
  });
}

walkDir(dir, function(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  // 1. Plus Jakarta Sans inline styles
  content = content.replace(/style=\{\{\s*fontFamily:\s*'"Plus Jakarta Sans", sans-serif'\s*\}\}/g, '');
  content = content.replace(/style=\{\{\s*fontFamily:\s*'Plus Jakarta Sans, sans-serif'\s*\}\}/g, '');
  
  // Clean up any empty style={{}} that might result
  content = content.replace(/style=\{\{\s*\}\}/g, '');

  // 2. Indigo -> Primary mappings
  // Soft backgrounds/borders
  content = content.replace(/(bg|border|ring|hover:bg|from|to|via)-indigo-(50|100)/g, '$1-primary-soft');
  content = content.replace(/text-indigo-(100|200)/g, 'text-primary-soft');
  
  // Strong texts/bgs
  content = content.replace(/(bg|border|ring|hover:bg|from|to|via)-indigo-(700|800|900|950)/g, '$1-primary-strong');
  content = content.replace(/text-indigo-(700|800|900|950)/g, 'text-primary-strong');
  
  // Normal/Default mappings for the rest (300, 400, 500, 600)
  content = content.replace(/(bg|border|ring|hover:bg|from|to|via)-indigo-[3-6]00(\/\d+)?/g, '$1-primary');
  content = content.replace(/text-indigo-[3-6]00(\/\d+)?/g, 'text-primary');

  // Replace primary-* if they were used in the old way
  content = content.replace(/(bg|border|ring|hover:bg|text|from|to)-primary-50\b/g, '$1-primary-soft');
  content = content.replace(/(bg|border|ring|hover:bg|text|from|to)-primary-(100|200)\b/g, '$1-primary-soft');
  content = content.replace(/(bg|border|ring|hover:bg|text|from|to)-primary-(700|800|900)\b/g, '$1-primary-strong');
  content = content.replace(/(bg|border|ring|hover:bg|text|from|to)-primary-(300|400|500|600)\b/g, '$1-primary');

  // Colored shadows removal (map to shadow-md or remove)
  content = content.replace(/shadow-indigo-[a-z0-9\/]+/g, 'shadow-md-token');
  content = content.replace(/shadow-purple-[a-z0-9\/]+/g, 'shadow-md-token');

  // 3. Shape / Borders
  content = content.replace(/rounded-2xl/g, 'rounded-lg');
  content = content.replace(/rounded-3xl/g, 'rounded-lg');
  
  // 4. Glass / Surfaces
  content = content.replace(/\bbackdrop-blur-(sm|md|lg|xl)\b/g, '');
  content = content.replace(/\bbackdrop-blur\b/g, '');
  content = content.replace(/\bglass-card\b/g, 'card');
  content = content.replace(/\bbg-white\/60\b/g, 'bg-surface');
  content = content.replace(/\bbg-white\/5\b/g, 'bg-surface');
  
  // 5. Old gradients
  content = content.replace(/\bgradient-bg\b/g, 'bg-primary');
  content = content.replace(/\bgradient-bg-hover\b/g, 'hover:bg-primary-strong');
  content = content.replace(/\bgradient-text\b/g, 'text-primary');

  // Cleanup multiple spaces in class names
  content = content.replace(/className="([^"]*)"/g, (match, classes) => {
    return `className="${classes.replace(/\s+/g, ' ').trim()}"`;
  });
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${filePath}`);
  }
});
