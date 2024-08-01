const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "dist");
const assetsDir = path.join(__dirname, "assets");

// Function to move files from subdirectories to the root of the assets directory
function moveFilesToRoot(srcDir, destDir) {
  fs.readdirSync(srcDir).forEach((file) => {
    const fullPath = path.join(srcDir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      moveFilesToRoot(fullPath, destDir); // Recursively move files from subdirectories
    } else {
      const destPath = path.join(destDir, path.basename(fullPath));
      fs.copyFileSync(fullPath, destPath); // Copy the file to the assets root
    }
  });
}

// Ensure assets directory exists
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir);
}

// Run the Parcel build command
exec(
  "parcel build src/scss/**/*.scss src/js/**/*.js --dist-dir dist --log-level error",
  (err, stdout, stderr) => {
    if (err) {
      console.error(`Error during build: ${err.message}`);
      console.error(stderr);
      return;
    }

    console.log(stdout);

    // Execute the function to move files after build completes
    moveFilesToRoot(distDir, assetsDir);

    // Optionally, clean up the dist directory if needed
    fs.rmdirSync(distDir, { recursive: true });

    console.log("Build and file copy completed successfully.");
  },
);
