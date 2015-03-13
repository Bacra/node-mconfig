var cDebug	= require('debug');
var debug	= cDebug('mconfig:node');
var mconfig	= require('./main');

mconfig.read = function(filename) {
	return require(exports.cwd+'/'+filename);
};
mconfig.debug = cDebug('mconfig:main');


// set cwd
(function() {
	var argv = process.argv;
	for(var i = argv.length; i-- > 2;) {
		if (!argv[i].indexOf('--mconfig_cwd=')) {
			exports.cwd = argv[i].substr(14);
			debug('cwd from argv %s', exports.cwd);
			return;
		}
	}

	exports.cwd = process.env.NODE_CONFIG_DIR || process.cwd() + '/config';
	debug('cwd %s', exports.cwd);
})();

module.exports = mconfig;
