var fs			= require('fs');
var debugMgr	= require('debug');
var nopt		= require('nopt');
var knownOpts = {
	'mconfig-cwd': [String, null],
	'mconfig-debug': Boolean
};
var parsed = nopt(knownOpts, {}, process.argv, 2);

if (parsed['mconfig-debug']) {
	debugMgr.enable('mconfig:*');
}

var debug	= debugMgr('mconfig:node');
var mconfig	= require('./main');


mconfig.read = function(filename) {
	var pkg = exports.cwd+'/'+filename;
	if (fs.existsSync(pkg)) {
		return require(pkg);
	} else {
		debug('pkg not exists %s', pkg);
		return {};
	}
};
mconfig.debug = debugMgr('mconfig:main');

// set cwd
exports.cwd = parsed['mconfig-cwd'] ? require('path').resolve(process.cwd(), parsed['mconfig-cwd']) : process.env.NODE_CONFIG_DIR || process.cwd() + '/config';
debug('cwd %s', exports.cwd);

module.exports = mconfig;
