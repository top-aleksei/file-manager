import { readdir } from 'fs/promises';

export async function lsModule() {
  const list = await readdir(process.cwd(), { withFileTypes: true });
  const files = list
    .filter((el) => el.isFile())
    .sort((a, b) => a.name > b.name)
    .map((el) => {
      return { name: el.name, type: 'file' };
    });
  const folders = list
    .filter((el) => el.isDirectory())
    .sort((a, b) => a.name > b.name)
    .map((el) => {
      return { name: el.name, type: 'directory' };
    });
  console.table([...folders, ...files]);
}
