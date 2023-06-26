import { cdModule } from './cd.js';
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
      default:
        console.log('wrong command');
      // throw new Error();
    }
  } catch (err) {
    console.log('Catch ERR', err);
  }
}
