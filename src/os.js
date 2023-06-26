import * as os from 'os';

export const osModule = (options) => {
  try {
    switch (options) {
      case '--EOL':
        getEOL();
        break;
      case '--cpus':
        getCPUS();
        break;
      case '--homedir':
        getHomeDir();
        break;
      case '--username':
        getOSUsername();
        break;
      case '--architecture':
        getOSArchitecture();
        break;

      default:
        console.log('wrong arg in OS');
    }
  } catch (err) {
    console.log('os err', err);
  }
};

function getEOL() {
  console.log(JSON.stringify(os.EOL));
}

function getCPUS() {
  const cores = os.cpus();
  const coresInfo = cores.map((el) => {
    return { model: el.model, speed: `${el.speed / 1000}GHz` };
  });
  console.log(`Overall amount of CPUS: ${cores.length}`);
  console.table(coresInfo);
}

function getHomeDir() {
  console.log(`Home directory is: ${os.homedir()}`);
}

function getOSUsername() {
  console.log(`OS user name is: ${os.userInfo().username}`);
}

function getOSArchitecture() {
  console.log(`OS architecture is: ${os.arch()}`);
}
