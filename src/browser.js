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
