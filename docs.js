var path = require('path');

console.log("__dirname", __dirname);
var FIBJS_PATH = path.join(__dirname, `../fibos/fibjs`);

var parser = require(path.join(FIBJS_PATH, 'tools/util/parser'));
var gen_docs = require(path.join(FIBJS_PATH, 'tools/util/gen_docs'));

var idlLang = process.env.FIBJS_IDL_LANG || 'zh-cn';
var fibjs_idlFolder = path.join(FIBJS_PATH, `idl/${idlLang}`);
var idlFolder = path.join(__dirname, `../fibos/idl/${idlLang}`);

var docsFolder = path.join(__dirname, 'docs/manual/');


var defs = parser(fibjs_idlFolder);
defs = parser(idlFolder, defs);

gen_docs(defs, docsFolder);

process.chdir(path.join(__dirname, ''));
process.run('npm', ['run', 'build']);
