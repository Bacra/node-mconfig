MConfig  [![Build Status](https://travis-ci.org/Bacra/node-mconfig.svg?branch=master)](https://travis-ci.org/Bacra/node-mconfig)
==================

Simple to read config file for modules. Support mulit cwd.


## Installation

```
$ npm install mconfig
```

## Usage

```
$ mkdir config
$ vi config/.log.conf.js

module.exports = {
	LOG_PATH: '/log/error/',
	LOG_PATH2: '/log/warn/'
}


$ vi config/my.defaults.conf.js

module.exports = {
	"LOG_PATH3": "/log/nolog/"
}
```

Read config file by MConfig

```js
var mconfig = require('mconfig');
var config = mconfig('.log.conf.js');
console.log(config('LOG_PATH'));						// print '/log/error/'

console.log(mconfig('.log.conf.js', 'LOG_PATH2'));		// print '/log/warn/'

console.log(mconfig.defaults('LOG_PATH3'));				// print '/log/nolog/'
```

## Notice

MConfig reads configuration files in the `./config` directory for the running process.

This can be overridden by running application width `mconfig-dir` argv or setting the `$NODE_CONFIG_DIR` environment variable.

```
node app.js --mconfig-dir=/home/user/etc/node_config/ --no-mconfig-here
```

Of course, you can also set mconfig module `cwds` variable to change the directory.


## Difference from config
This is similar to [config](https://www.npmjs.com/package/config) but adds features.

Multiple profiles helps to reduce the inter-dependence. This is useful for function profile.

