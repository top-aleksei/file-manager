import { access } from 'fs';
import { changePath, makeAbsolutePath, parsePath } from './utils/changePath.js';

export async function cdModule(options) {
  if (!options) {
    throw new Error('Invalid path in arguments');
  }
  try {
    const newPath = parsePath(options);
    const absolutePath = makeAbsolutePath(newPath);
    access(absolutePath, (err) => {
      if (err) {
        console.error(`"${absolutePath}" doesn't exist or you have no access`);
      } else {
        changePath(absolutePath);
      }
    });
  } catch (err) {
    console.log(err);
  }
}
