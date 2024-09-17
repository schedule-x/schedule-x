// receive input for a version like 1.61.1, then:
// 1. iterate over all packages in /packages folder and
// 2. run npm dist-tag add @schedule-x/<pkgName>@<pkgVersion> latest
import { execSync } from 'child_process';
import { readdirSync } from 'fs';

const version = process.argv[2];
if (!version) {
  console.error('Please provide a version number');
  process.exit(1);
}

const packagesDir = './packages';
const packages = readdirSync(packagesDir);

packages.forEach((pkg) => {
  const pkgName = `@schedule-x/${pkg}`;
  const cmd = `npm dist-tag add ${pkgName}@${version} latest`;
  console.log(`Running: ${cmd}`);
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch(e) {
    console.error(e);
  }
})

console.log('Done!');
