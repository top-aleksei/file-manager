import { access } from 'fs/promises';
import { changePath, makeAbsolutePath, parsePath } from './utils/changePath.js';

export async function cdModule(options) {
  if (!options) {
    console.error('Invalid path in arguments');
    return;
  }

  let absolutePath;
  try {
    const newPath = parsePath(options);
    absolutePath = makeAbsolutePath(newPath.argPath);
    await access(absolutePath);
    changePath(absolutePath);
  } catch {
    console.error(`"${absolutePath}" doesn't exist or you have no access`);
  }
}
