export function parseClArgs(line) {
  const args = line.trim().split(' ');
  const command = args[0];
  const options = args[1] ? args.slice(1).join(' ') : null;
  return { command, options };
}
