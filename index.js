import * as readline from 'node:readline/promises';
import { userNameArgv } from './src/constants.js';
import { homedir } from 'os';
import { parseClArgs } from './src/utils/parseCL.js';
import { runCommand } from './src/actions.js';
import { stdin as input, stdout as output, cwd } from 'node:process';

const init = () => {
  const currentPath = homedir();

  console.log(`Welcome to the File Manager, ${userNameArgv}!`);
  console.log(`You are currently in ${currentPath}`);
  process.chdir(currentPath);

  const rl = readline.createInterface({ input, output });

  rl.on('line', async (line) => {
    await runCommand(parseClArgs(line));
    console.log(`You are currently in ${cwd()}`);
  });

  rl.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${userNameArgv}, goodbye!`);
    rl.close();
  });
};

init();
