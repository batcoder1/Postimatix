require('util').inspect.defaultOptions.depth = null;
require('reflect-metadata');
require('dotenv').config();

require('ts-node').register();
require('./src/main');
