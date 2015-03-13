require('debug').enable('*');

var assert = require('assert');
var mconfig = require('../index');

// assert.equal(mconfig.cwd, __dirname + process.sed + 'config');
var config = mconfig('.log.conf.js');
assert.equal(config('LOG_PATH'), '/log/error/', 'read by step');

assert.equal(mconfig('.log.conf.js', 'LOG_PATH2'), '/log/warn/', 'read directly');
assert.equal(mconfig.default('LOG_PATH3'), '/log/nolog/', 'read by default method');

assert.doesNotThrow(function() {
	mconfig('no_this_confg.js');
}, 'file not exisits');

assert.strictEqual(mconfig('no_this_config.js', 'param'), undefined, 'no value return undefined');
assert.strictEqual(config('param'), undefined, 'no value return undefined2');

assert.equal(mconfig('.log.conf.js', null).LOG_PATH, '/log/error/', 'read all config by null param');
assert.equal(config(null).LOG_PATH, '/log/error/', 'read all config by null param2');
