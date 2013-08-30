#!/usr/bin/env node
"use strict";

var watch = require('watch');
var render = require('./render');
var cwd = process.cwd();

var optimist = require('optimist')
	.usage('Compile .scss files with node-sass.\nUsage: $0 [options] <input.scss>')
	.options('output-style', {
		describe: 'CSS output style (nested|expanded|compact|compressed)',
		default: 'nested'
	})
	.options('source-comments', {
		describe: 'Include debug info in output (none|normal|map)',
		default: 'none'
	})
	.options('include-path', {
		describe: 'Path to look for @import-ed files',
		default: cwd
	})
	.options('watch', {
		describe: 'Watch this directory',
		alias: 'w'
	})
	.options('output', {
		describe: 'Output css file',
		alias: 'o'
	})
	.options('stdout', {
		describe: 'Print the resulting CSS to stdout'
	})
	.options('help', {
		describe: 'Print usage info',
		type: 'string',
		alias: 'help'
	})
	.check(function(argv){
		if (argv.help) return true;
		if (argv._.length < 1) return false;
	});

function throttle(fn, args){
	var timer;
	return function(){
		var self = this;
		clearTimeout(timer);
		setTimeout(function(){
			fn.call(self, args);
		});
	};
}

exports = module.exports = function(args){
	var argv = optimist.parse(args);

	if (argv.help){
		optimist.showHelp();
		process.exit(0);
		return;
	}

	if (argv.w){

		var watchDir = argv.w;
		if (!Array.isArray(watchDir)){
			watchDir = [watchDir];
		}

		var throttledRender = throttle(render, argv);

		watchDir.forEach(function(dir){
			watch.watchTree(dir, throttledRender);
		});

	} else {
		render(argv);
	}
};

exports.optimist = optimist;
