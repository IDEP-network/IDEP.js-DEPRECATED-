// browserify by default only pulls in files that are hard coded in requires
// In order of last to first in this file, the default wordlist will be chosen
// based on what is present. (Bundles may remove wordlists they don't need)
const wordlists: { [index: string]: string[]; } = {};
let _default: string[] | undefined;
try {
  _default = require('./wordlists/english.json');
  wordlists.english = _default as string[];
  wordlists.EN = _default as string[];
} catch (err) { }

// Last one to overwrite wordlist gets to be default.
export { wordlists, _default };
