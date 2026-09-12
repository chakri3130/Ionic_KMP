import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, '..');
const argumentsByName = Object.fromEntries(
  process.argv.slice(2).map((argument) => {
    const [name, value] = argument.replace(/^--/, '').split('=');
    return [name, value];
  }),
);
const tenantKey = argumentsByName.tenant;
const platform = argumentsByName.platform;
const tenantsPath = resolve(projectRoot, 'tenants', 'tenants.json');
const tenants = JSON.parse(readFileSync(tenantsPath, 'utf8'));
const tenant = tenants[tenantKey];

if (!tenant) {
  throw new Error(`Unknown tenant "${tenantKey}". Allowed values: ${Object.keys(tenants).join(', ')}.`);
}

if (platform && !['android', 'ios'].includes(platform)) {
  throw new Error('The platform must be android or ios.');
}

execFileSync('npx', ['ng', 'build', `--configuration=${tenantKey}`], {
  cwd: projectRoot,
  stdio: 'inherit',
});

const webBuildDirectory = resolve(projectRoot, 'dist', tenantKey);
const cordovaWebDirectory = resolve(projectRoot, 'www');
if (!existsSync(webBuildDirectory)) {
  throw new Error(`Angular build output was not found: ${webBuildDirectory}`);
}

rmSync(cordovaWebDirectory, { recursive: true, force: true });
mkdirSync(cordovaWebDirectory, { recursive: true });
cpSync(webBuildDirectory, cordovaWebDirectory, { recursive: true });

const configPath = resolve(projectRoot, 'config.xml');
let configXml = readFileSync(configPath, 'utf8');
configXml = configXml.replace(/<widget id="[^"]+"/, `<widget id="${tenant.bundleId}"`);
configXml = configXml.replace(/<name>.*?<\/name>/s, `<name>${tenant.displayName}</name>`);
writeFileSync(configPath, configXml);

console.log(`Prepared ${tenant.appName} (${tenant.bundleId}) for ${platform ?? 'native'} build.`);
