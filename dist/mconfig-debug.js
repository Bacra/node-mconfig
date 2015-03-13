/*!
 * MConfig - Module Config
 * https://github.com/Bacra/node-mconfig
 */
 
!(function () {

var exports;
var module = {};

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
		exports.debug('read config err <%s>, %o', filename, e);
		if (arguments.length < 2) return noop;
	}
}

exports = module.exports = get;
exports.default = function(param) {
	return get('default', param);
};
exports.read = function(filename) {
	return require(filename);
};
exports.debug = noop;

/**
 * save config data
 * @type {Object}
 */
exports.data = {};

/**
 * override for browser
 * 
 * @override
 */
exports.read = function(filename) {
	return exports.data[exports.normalize(filename)];
};

/**
 * normalize filename to data key
 * 
 * @param {String} filename
 */
exports.normalize = function(filename) {
	return (''+filename).replace(/\.(js|node|json)$/i, '');
};

exports.insert = function(filename, data) {
	exports.data[exports.normalize(filename)] = data;
};


// RequireJS && SeaJS
if (typeof define === 'function') {
	define(function() {
		return exports;
	});

} else {
	this.mconfig = exports;
}

})();