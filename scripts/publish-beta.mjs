// Script to publish all packages with beta tag
// Iterates over all packages in /packages folder and runs npm publish --tag beta
import { execSync } from 'child_process';
import { readdirSync } from 'fs';
import { join } from 'path';

const packagesDir = './packages';
const packages = readdirSync(packagesDir);

console.log('Publishing all packages with beta tag...\n');

packages.forEach((pkg) => {
  const pkgPath = join(packagesDir, pkg);
  const pkgName = `@schedule-x/${pkg}`;
  
  console.log(`Publishing ${pkgName}...`);
  
  try {
    // Change to package directory
    process.chdir(pkgPath);
    
    // Run npm publish --tag beta
    const cmd = 'npm publish --tag beta';
    console.log(`dry Running: ${cmd} in ${pkgPath}`);
    // execSync(cmd, { stdio: 'inherit' });
    
    //console.log(`✅ Successfully published ${pkgName}\n`);
  } catch(e) {
    console.error(`❌ Failed to publish ${pkgName}:`, e.message);
  } finally {
    // Change back to root directory
    process.chdir('../../');
  }
});

console.log('Done publishing all packages with beta tag!'); 