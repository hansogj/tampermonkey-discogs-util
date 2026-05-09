const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '../');
const packageJsonPath = path.join(projectRoot, 'package.json');
const bannerJsPath = path.join(__dirname, 'banner.js');
const distDir = path.join(projectRoot, 'dist');
const jsFilePath = path.join(distDir, 'discogs-util.user.js');

try {
  // 1. Read current version from package.json (already bumped by bump-version.js)
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const version = packageJson.version;

  // 2. Read banner.js content
  let bannerContent = fs.readFileSync(bannerJsPath, 'utf8');

  // 3. Replace placeholders
  bannerContent = bannerContent.replace('{VERSION_PLACEHOLDER}', version);
  bannerContent = bannerContent.replace('{NAME_SUFFIX}', process.env.NAME_SUFFIX || '');

  // 4. Read Vite's generated JS content
  const viteJsContent = fs.readFileSync(jsFilePath, 'utf8');

  // 5. Concatenate banner + Vite's output
  const finalJsContent = bannerContent + '\n' + viteJsContent;

  // 6. Write to dist/index.js
  fs.writeFileSync(jsFilePath, finalJsContent, 'utf8');

  console.log(`Successfully prepended banner with version ${version} to ${jsFilePath}`);
} catch (error) {
  console.error('Error in prepend-banner.js:', error);
  process.exit(1);
}
