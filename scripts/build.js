const proc = require('child_process');
const fs = require('fs');
const path = require('path');

// credit to gebsl

const moveFile = (from, to, filename) => {
  from = from.split('/');
  to = to.split('/');

  if (filename) {
    from.push(filename);
    to.push(filename);
  }

  fs.renameSync(path.resolve(...from), path.resolve(...to));
};

console.log('Building browser version...');

// running browser build
proc.execSync('yarn build:browser');

// copying into temporary folder
// so it doesn't get overwritten by next build step
moveFile('dist', 'dist-browser');

console.log('Building node version...');

// running node build
proc.execSync('yarn build:node');

// create temporary folder 'dist-node' where we move our built node files
fs.mkdirSync(path.resolve('dist-node'));

console.log('Creating common types...');
moveFile('dist', 'dist-node', 'index.cjs.development.js');
moveFile('dist', 'dist-node', 'index.cjs.development.js.map');
moveFile('dist', 'dist-node', 'index.cjs.production.min.js');
moveFile('dist', 'dist-node', 'index.cjs.production.min.js.map');
moveFile('dist', 'dist-node', 'index.js');

// finally we delete the folder with all node-typings
fs.rmSync(path.resolve('dist'), { recursive: true });
// now we can move 'dist-node' to 'dist/node' again
fs.mkdirSync(path.resolve('dist'));
moveFile('dist-node', 'dist/node');

// for our browser version, we create a new folder
fs.mkdirSync(path.resolve('dist', 'browser'));
// moving the important files into 'dist/browser' folder
moveFile('dist-browser', 'dist/browser', 'index.js');
moveFile('dist-browser', 'dist/browser', 'index.js.map');

// typings remain in the temporary folder
// therefore we move and rename it to 'dist/types'
moveFile('dist-browser', 'dist/types');

// now what's left is copying a template typings file into our subfolders
// that's responsible for linking to folder 'dist/types'
fs.copyFileSync(
  path.resolve('templates', 'index.d.ts'),
  path.resolve('dist', 'browser', 'index.d.ts')
);
fs.copyFileSync(
  path.resolve('templates', 'index.d.ts'),
  path.resolve('dist', 'node', 'index.d.ts')
);

var data = fs
  .readFileSync(path.resolve('dist', 'browser', 'index.js'))
  .toString()
  .split('\n');
const dataToBeSearched = data.slice(0, 12);
const match = dataToBeSearched
  .join('\n')
  .match(/import { Buffer as (Buffer\$\d) } from 'buffer\/'/);
data.splice(12, 0, `window.Buffer = ${match[1]}`);
var text = data.join('\n');

fs.writeFile(path.resolve('dist', 'browser', 'index.js'), text, function(err) {
  if (err) return console.log(err);
});

console.log('Build finished!');
