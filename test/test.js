// require('debug').enable('*');

var assert = require('assert');
var mconfig = require('../');

// assert.equal(mconfig.cwd, __dirname + process.sed + 'config');
console.log('load log config');
var config = mconfig('log.conf.js');
assert.equal(config('LOG_PATH'), '/log/error/', 'read by step');

console.log('load log config');
assert.equal(mconfig('log.conf.js', 'LOG_PATH2'), '/log/warn/', 'read directly');
console.log('load defaults config');
assert.equal(mconfig.defaults('LOG_PATH3'), '/log/nolog/', 'read by default method');
assert.equal(config('LOG_PATH3'), '/log/nolog/', 'read default by merge method');

assert.doesNotThrow(function() {
	console.log('load no_this_confg');
	mconfig('no_this_confg.js');
}, 'file not exisits');

console.log('load no_this_confg');
assert.strictEqual(mconfig('no_this_config.js', 'param'), undefined, 'no value return undefined');
assert.strictEqual(config('param'), undefined, 'no value return undefined2');


// read all param
console.log('load log config');
assert.equal(mconfig('log.conf.js', null).LOG_PATH, '/log/error/', 'read all config by null param');
assert.equal(config(null).LOG_PATH, '/log/error/', 'read all config by null param2');

// only method
console.log('load log config');
var onlyConfig = mconfig.only('log.conf.js');
assert.equal(onlyConfig('LOG_PATH'), '/log/error/', 'only config');
assert.equal(onlyConfig('LOG_PATH3'), undefined, 'only config to read default');

// multi config
assert.equal(config('LOG_PATH5'), '/log/debug/', 'multi config');


// NODE_CONFIG_DIR
assert.equal(mconfig('log.conf.js', 'LOG_PATH6'), undefined, 'no use NODE_CONFIG_DIR');
delete require.cache[require.resolve('../')];
process.env.NODE_CONFIG_DIR = './test/config3';
mconfig = require('../');
assert.equal(mconfig('log.conf.js', 'LOG_PATH6'), '/log/debug/', 'use NODE_CONFIG_DIR');
