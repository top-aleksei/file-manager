import * as readline from 'node:readline/promises';
import { userNameArgv } from './src/constants.js';
import { homedir } from 'os';
import { parseClArgs } from './src/utils/parseCL.js';
import { runCommand } from './src/actions.js';

let currentPath = homedir();

console.log(`Welcome to the File Manager, ${userNameArgv}!`);
console.log(`You are currently in ${currentPath}`);
process.chdir(currentPath);
// console.log(process.cwd());

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.on('line', (line) => {
  try {
    runCommand(parseClArgs(line));
  } catch {}
});
rl.on('SIGINT', () => {
  console.log(`Thank you for using File Manager, ${userNameArgv}, goodbye!`);
  rl.close();
});
