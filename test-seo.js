const fs = require('fs');
const path = require('path');

function checkFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log('File does not exist:', filePath);
    return;
  }
  const html = fs.readFileSync(filePath, 'utf8');
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const desc = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  const ogTitle = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i);
  const ogDesc = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']*)["']/i);
  
  console.log('=== ' + filePath + ' ===');
  console.log('Title:         ', title ? title[1] : 'NOT FOUND');
  console.log('Description:   ', desc ? desc[1] : 'NOT FOUND');
  console.log('Canonical:     ', canonical ? canonical[1] : 'NOT FOUND');
  console.log('og:title:      ', ogTitle ? ogTitle[1] : 'NOT FOUND');
  console.log('og:description:', ogDesc ? ogDesc[1] : 'NOT FOUND');
}

// Check index.html
checkFile('index.html');

// Check build output
function findFiles(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir, { withFileTypes: true }).forEach(e => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) findFiles(p);
    else if (e.name === 'index.html' || e.name === 'page.html' || e.name === '(index).html') {
      checkFile(p);
    }
  });
}
findFiles('.next/server');
