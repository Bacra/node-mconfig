/*!
 * MConfig - Module Config
 * https://github.com/Bacra/node-mconfig
 */
 
!(function () {

var exports;
var module = {};

function noop(){}

function extend(obj, copy) {
	for(var i in copy) {
		if (copy.hasOwnProperty(i) && !obj.hasOwnProperty(i)) {
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
function get(filename, param, defaults, argsLen) {
	var opts;
	try {
		opts = exports.read(filename);
	} catch(e) {
		exports.debug('read config err <%s>, %o', filename, e.stack || e.message);
	}

	if (defaults) {
		if (opts) {
			// protect the original data
			opts = exports.extend(exports.extend({}, opts), defaults);
		} else {
			opts = exports.extend({}, defaults);
		}
	}

	function _getone(param) {
		return param === null ? opts && exports.extend({}, opts) : (opts && opts[param]);
	}

	return argsLen < 2 ? _getone : _getone(param);
}

function merge(filename, param) {
	return get(filename, param, exports.default(null), arguments.length);
}

exports = module.exports = merge;
exports.read = function(filename) {
	return require(filename);
};
exports.default = function(param) {
	return get('.my_conf', param, null, 2);
};
exports.only = function(filename, param, defaults) {
	return get(filename, param, defaults, arguments.length);
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