var fs			= require('fs');
var debugMgr	= require('debug');
var nopt		= require('nopt');

var knownOpts = {
	'mconfig-cwd': [String, Array],
	'mconfig-debug': Boolean
};
var parsed = nopt(knownOpts, {}, process.argv, 2);

if (parsed['mconfig-debug']) {
	debugMgr.enable('mconfig:*');
}

var debug	= debugMgr('mconfig:node');
var mconfig	= require('./main');
var cwds	= parsed['mconfig-cwd'];
cwds || (cwds = []);
// support mulit cwd
// first cwd is main config dir
if (process.env.NODE_CONFIG_DIR) cwds.push(process.env.NODE_CONFIG_DIR);
if (cwds.length) {
	var path = require('path');
	cwds = cwds.map(function(val) {
		return path.resolve(process.cwd(), val);
	});
} else {
	cwds = [process.cwd() + '/config'];
}
debug('cwd %d:%s', cwds.length, cwds);


mconfig.read = function(filename) {
	var options = {};

	for(var i = cwds.length; i--;) {
		var pkg = cwds[i]+'/'+filename;
		if (fs.existsSync(pkg)) {
			var opts = require(pkg);
			if (opts) {
				debug('read pkg %s', pkg);
				mconfig.extend(options, opts);
			}
		}
	}

	return options;
};
mconfig.debug = debugMgr('mconfig:main');

module.exports = mconfig;
