const fs = require("fs");

// Generate a large file with approximately 100k characters
const targetSize = 100000; // 100k characters
const baseContent = `This is a test line for webhook payload testing. `;
const repeatedContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. `;

let content = "";
let currentSize = 0;

// Add base content
content += baseContent;
currentSize += baseContent.length;

// Add repeated content until we reach target size
while (currentSize < targetSize) {
  content += repeatedContent;
  currentSize += repeatedContent.length;
}

// Add a final line with the actual size
content += `\n\nFile size: ${currentSize} characters\nGenerated for webhook payload testing on ${new Date().toISOString()}`;

// Write to file
fs.writeFileSync("large-test-file.txt", content, "utf8");

console.log(`Generated large test file with ${currentSize} characters`);
console.log("File saved as: large-test-file.txt");
console.log(`File size: ${(Buffer.byteLength(content, "utf8") / 1024).toFixed(2)} KB`);
