var path		= require('path');
var debugMgr	= require('debug');
var nopt		= require('nopt');

var knownOpts = {
	'mconfig-cwd': [String, Array],
	'mconfig-dir': [String, Array],
	'mconfig-process': Boolean,
	'mconfig-debug': Boolean
};
var parsed = nopt(knownOpts, {}, process.argv, 2);

var debug	= debugMgr('mconfig:node');
var mconfig	= require('./main');

// support mulit cwd
// first cwd is main config dir
var cwds = parsed['mconfig-dir'] || parsed['mconfig-cwd'];
cwds || (cwds = []);

if (parsed['mconfig-process'] !== false) {
	cwds.push(process.cwd() + '/config');
}

if (process.env.NODE_CONFIG_DIR) {
	cwds = cwds.concat(process.env.NODE_CONFIG_DIR.split(path.delimiter));
}
if (cwds.length) {
	cwds = cwds.map(function(val) {
			if (!val.trim) return;
			val = val.trim();
			if (!val) return;
			return path.resolve(process.cwd(), val);
		})
		.filter(function(val) {return !!val});
}

debug('cwd %d:%s', cwds.length, cwds);


mconfig.read = function(filename) {
	var options = {};

	for(var i = cwds.length; i--;) {
		var pkg = cwds[i]+'/'+filename;
		try {
			require.resolve(pkg);
		} catch(err) {
			continue;
		}

		var opts = require(pkg);
		if (opts) {
			debug('read pkg %s', pkg);
			mconfig.extend(options, opts);
		}
	}

	return options;
};
mconfig.debug = debugMgr('mconfig:main');

module.exports = mconfig;
