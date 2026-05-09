const fs = require('fs');
const path = require('path');

const packageJsonPath = path.resolve(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const [major, minor, patch] = packageJson.version.split('.').map(Number);
const isDevBuild = !!process.env.NAME_SUFFIX;
const version = isDevBuild ? `${major}.${minor}.${patch + 1}` : `${major}.${minor + 1}.0`;
packageJson.version = version;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');
console.log(`Bumped version to ${version}`);
