import { isAbsolute, join, resolve } from 'path';

export function changePath(newPath) {
  try {
    process.chdir(newPath);
  } catch {
    console.error(`"${newPath}" is not a folder or you have no access`);
  }
  console.log(`You are currently in ${process.cwd()}`);
}

export function parsePath(newPath) {
  if (!newPath) {
    throw new Error('invalid arguments');
  }
  if (newPath.startsWith(`"`) && newPath.length > 2) {
    const pathEnd = newPath.indexOf(`"`, 1);
    if (pathEnd != -1) {
      return { argPath: newPath.slice(1, pathEnd), argRest: newPath.slice(pathEnd) };
    } else {
      throw new Error('Invalid path');
    }
  } else {
    // return newPath.split(' ')[0];
    return {
      argPath: newPath.split(' ')[0],
      argRest: newPath.split(' ').slice(1).join(' ').trim(),
    };
  }
}

export function makeAbsolutePath(newPath) {
  return isAbsolute(newPath) ? resolve(newPath) : join(process.cwd(), newPath);
}
