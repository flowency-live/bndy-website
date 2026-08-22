import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const source = resolve('dist/brassbands.html');
const target = resolve('dist/brassbands/index.html');

await mkdir(dirname(target), { recursive: true });
await copyFile(source, target);
console.log(`Created trailing-slash route: ${target}`);
