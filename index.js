import * as readline from 'node:readline/promises';
import { userNameArgv } from './src/constants.js';
import { homedir } from 'os';
import { parseClArgs } from './src/utils/parseCL.js';

let currentPath = homedir();

console.log(`Welcome to the File Manager, ${userNameArgv}!`);
console.log(`You are currently in ${currentPath}`);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// const answer = await rl.question('What do you think of Node.js? ');
rl.on('line', (line) => {
  try {
    console.log(parseClArgs(line));
  } catch {}
});
rl.on('SIGINT', () => {
  console.log(`Thank you for using File Manager, ${userNameArgv}, goodbye!`);
  rl.close();
});

// console.log(`Thank you for your valuable feedback: ${answer}`);

// rl.close();
