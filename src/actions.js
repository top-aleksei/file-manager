import { runCompress, runDecompress } from './brotli.js';
import { cdModule } from './cd.js';
import { runCat, runAdd, runRename, runCopy, runMove, runDelete } from './fs.js';
import { runHash } from './hash.js';
import { lsModule } from './ls.js';
import { osModule } from './os.js';
import { changePath } from './utils/changePath.js';

export async function runCommand({ command, options }) {
  try {
    switch (command) {
      case '.exit':
        process.exit();
      case 'os':
        osModule(options);
        break;
      case 'up':
        changePath('..');
        break;
      case 'cd':
        cdModule(options);
        break;
      case 'ls':
        lsModule();
        break;
      case 'cat':
        runCat(options);
        break;
      case 'add':
        await runAdd(options);
        break;
      case 'rn':
        await runRename(options);
        break;
      case 'cp':
        await runCopy(options);
        break;
      case 'mv':
        await runMove(options);
        break;
      case 'rm':
        await runDelete(options);
        break;
      case 'hash':
        await runHash(options);
        break;
      case 'compress':
        await runCompress(options);
        break;
      case 'decompress':
        await runDecompress(options);
        break;
      default:
        console.log('wrong command');
    }
  } catch (err) {
    console.log('Catch ERR', err);
  }
}
