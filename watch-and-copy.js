const { spawn } = require("child_process");
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

// Run the Parcel watch command
const parcelProcess = spawn("parcel", [
  "watch",
  "src/scss/**/*.scss",
  "src/js/**/*.js",
  "--dist-dir",
  "dist",
]);

parcelProcess.stdout.on("data", (data) => {
  console.log(`Parcel: ${data}`);
  if (data.includes("Built in")) {
    moveFilesToRoot(distDir, assetsDir);
    console.log("Files copied to assets.");
  }
});

parcelProcess.stderr.on("data", (data) => {
  console.error(`Parcel error: ${data}`);
});

parcelProcess.on("close", (code) => {
  console.log(`Parcel process exited with code ${code}`);
});
