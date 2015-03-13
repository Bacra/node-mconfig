var debug = require('debug')('mconfig');

function noop(){}

/**
 * return opts or get opts method
 * 
 * @param  {String}        filename  config filename
 * @param  {String/NULL}   param     param name
 * @return {Mix/Function}
 */
function get(filename, param) {
	try {
		var opts = exports.read(filename);

		if (arguments.length < 2) {
			return function(param) {
				return param === null ? opts : opts[param];
			};
		} else if (param === null) {
			return opts;
		} else {
			return opts[param];
		}

	} catch(e) {
		debug('read config err <%s>, %o', filename, e);
		if (arguments.length < 2) return noop;
	}
}

exports = module.exports = get;
exports.default = function(param) {
	return get('default', param);
};
exports.read = function(filename) {
	return require(exports.cwd+'/'+filename);
};

// set cwd
(function() {
	var argv = process.argv;
	for(var i = argv.length; i-- > 2;) {
		if (!argv[i].indexOf('--mconfig_cwd=')) {
			exports.cwd = argv[i].substr(14);
			return;
		}
	}

	exports.cwd = process.env.NODE_CONFIG_DIR || process.cwd() + '/config';
})();
