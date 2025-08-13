const fs = require('fs');
const path = require('path');

const manyFilesDir = './many-files';

// Create the directory if it doesn't exist
if (!fs.existsSync(manyFilesDir)) {
  fs.mkdirSync(manyFilesDir);
  console.log(`Created directory: ${manyFilesDir}`);
}

// Generate 100 files with different content
for (let i = 1; i <= 100; i++) {
  const filename = `file-${i.toString().padStart(3, '0')}.txt`;
  const filePath = path.join(manyFilesDir, filename);
  
  // Create unique content for each file
  const content = `This is file number ${i}
Generated on: ${new Date().toISOString()}
File ID: FILE-${i.toString().padStart(3, '0')}
Random data: ${Math.random().toString(36).substring(2, 15)}
Status: ACTIVE
Version: 1.0.${i}
Last modified: ${new Date().toISOString()}
End of file ${i}
`;
  
  fs.writeFileSync(filePath, content);
  console.log(`✓ Created ${filename}`);
}

console.log(`\nSuccessfully created 100 files in ${manyFilesDir}/`);
