const getUserNameFromArgs = () => {
  const args = process.argv.slice(2);
  const nameArg = args.find((el) => el.startsWith('--username='));
  return nameArg ? nameArg.split('=')[1] : 'Guest';
};

export const userNameArgv = getUserNameFromArgs();
