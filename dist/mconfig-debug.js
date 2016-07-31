/*!
 * MConfig - Module Config
 * https://github.com/Bacra/node-mconfig
 */
 
!(function () {

var exports;
var module = {};

function noop(){}

function extend(obj, copy) {
	if (!copy || !obj) return obj;

	for(var i in copy) {
		if (copy.hasOwnProperty(i)) {
			obj[i] = copy[i];
		}
	}

	return obj;
}

/**
 * return opts or get opts method
 * 
 * @param  {String}        filename  config filename
 * @param  {String/NULL}   param     param name
 * @param  {Object}        defaults  default value
 * @param  {Number}        argsLen   method arguments length
 * @return {Mix/Function}
 */
function _get(filename, param, defaults, argsLen) {
	var opts = exports.extend({}, defaults);
	var extOpts = exports.read(filename);
	if (extOpts) exports.extend(opts, extOpts);

	function _getone(param) {
		return param === null ? opts : (opts && opts[param]);
	}

	return argsLen < 2 ? _getone : _getone(param);
}

function merge(filename, param) {
	return _get(filename, param, exports.defaults(null), arguments.length);
}

exports = module.exports = merge;
exports.read = function(filename) {
	return require(filename);
};
exports.defaults = function(param) {
	return _get('my.defaults.conf.js', param, null, 2);
};
exports.only = function(filename, param, defaults) {
	return _get(filename, param, defaults, arguments.length);
};

exports.debug = noop;
exports.merge = merge;
exports.extend = extend;

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
var extnameReg = /\.(js|node|json)$/i;
exports.normalize = function(filename) {
	return (''+filename).replace(extnameReg, '');
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