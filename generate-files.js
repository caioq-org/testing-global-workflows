#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Configuration options
const config = {
  outputDir: "./generated-files",
  fileCount: 100,
  filePrefix: "file",
  fileExtension: ".txt",
  includeTimestamp: true,
  includeRandomData: true,
  includeMetadata: true,
};

// Parse command line arguments
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i += 2) {
  const flag = args[i];
  const value = args[i + 1];

  switch (flag) {
    case "--dir":
      config.outputDir = value;
      break;
    case "--count":
      config.fileCount = parseInt(value);
      break;
    case "--prefix":
      config.filePrefix = value;
      break;
    case "--ext":
      config.fileExtension = value;
      break;
    case "--no-timestamp":
      config.includeTimestamp = false;
      break;
    case "--no-random":
      config.includeRandomData = false;
      break;
    case "--no-metadata":
      config.includeMetadata = false;
      break;
    case "--help":
      showHelp();
      process.exit(0);
      break;
  }
}

function showHelp() {
  console.log(`
Usage: node generate-files.js [options]

Options:
  --dir <directory>     Output directory (default: ./generated-files)
  --count <number>      Number of files to generate (default: 100)
  --prefix <string>     File name prefix (default: file)
  --ext <extension>     File extension (default: .txt)
  --no-timestamp        Don't include timestamps
  --no-random           Don't include random data
  --no-metadata         Don't include metadata
  --help                Show this help message

Examples:
  node generate-files.js
  node generate-files.js --count 50 --prefix "data" --ext ".json"
  node generate-files.js --dir "./my-files" --count 200
`);
}

function generateFileContent(fileNumber) {
  let content = `This is ${config.filePrefix} number ${fileNumber}\n`;

  if (config.includeTimestamp) {
    content += `Generated on: ${new Date().toISOString()}\n`;
  }

  if (config.includeMetadata) {
    content += `File ID: ${config.filePrefix.toUpperCase()}-${fileNumber.toString().padStart(3, "0")}\n`;
    content += `Status: ACTIVE\n`;
    content += `Version: 1.0.${fileNumber}\n`;
  }

  if (config.includeRandomData) {
    content += `Random data: ${Math.random().toString(36).substring(2, 15)}\n`;
  }

  if (config.includeTimestamp) {
    content += `Last modified: ${new Date().toISOString()}\n`;
  }

  content += `End of ${config.filePrefix} ${fileNumber}\n`;

  return content;
}

function generateFiles() {
  // Create the output directory if it doesn't exist
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
    console.log(`Created directory: ${config.outputDir}`);
  }

  console.log(`Generating ${config.fileCount} files in ${config.outputDir}/`);
  console.log(`File format: ${config.filePrefix}-XXX${config.fileExtension}\n`);

  const startTime = Date.now();
  let successCount = 0;
  let errorCount = 0;

  // Generate files
  for (let i = 1; i <= config.fileCount; i++) {
    const filename = `${config.filePrefix}-${i.toString().padStart(3, "0")}${config.fileExtension}`;
    const filePath = path.join(config.outputDir, filename);

    try {
      const content = generateFileContent(i);
      fs.writeFileSync(filePath, content);
      console.log(`✓ Created ${filename}`);
      successCount++;
    } catch (error) {
      console.error(`✗ Error creating ${filename}:`, error.message);
      errorCount++;
    }
  }

  const endTime = Date.now();
  const duration = endTime - startTime;

  console.log(`\n=== Generation Complete ===`);
  console.log(`Successfully created: ${successCount} files`);
  if (errorCount > 0) {
    console.log(`Errors encountered: ${errorCount} files`);
  }
  console.log(`Total time: ${duration}ms`);
  console.log(`Output directory: ${config.outputDir}/`);
}

// Run the script
if (require.main === module) {
  generateFiles();
}

module.exports = { generateFiles, config };
