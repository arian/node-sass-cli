"use strict";

var sass = require('node-sass');
var colors = require('colors');
var fs = require('fs');
var path = require('path');

var cwd = process.cwd();

function render(options){

	var inFile = options._[0];
	var outFile = options.o;

	// make sure it's an array
	var includePaths = options['include-path'];
	if (!Array.isArray(includePaths)){
		includePaths = [includePaths];
	}

	// if it's an array, make it a string
	var outputStyle = options['output-style'];
	if (Array.isArray(outputStyle)){
		outputStyle = outputStyle[0];
	}

	// if it's an array, make it a string
	var sourceComments = options['source-comments'];
	if (Array.isArray(sourceComments)){
		sourceComments = sourceComments[0];
	}

	sass.render({
		file: inFile,
		includePaths: includePaths,
		outputStyle: outputStyle,
		sourceComments: sourceComments,
		success: function(css){

			console.warn('Rendering Complete, saving .css file...'.green);

			if (!outFile){
				outFile = path.join(cwd, path.basename(inFile, '.scss') + '.css');
			}

			fs.writeFile(outFile, css, function(err) {
				if (err) return console.error(('Error: ' + err).red);
				console.warn(('Wrote CSS to ' + outFile).green);
			});

			if (options.stdout){
				console.log(css);
			}
		},
		error: function(error) {
			console.error(error);
		}
	});
}

module.exports = render;
