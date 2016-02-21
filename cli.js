'use strict';

var _ = require('underscore');
var async = require('async');
var program = require('commander');

var sources = require('./sources');

/*
	For how-to-use information for the commander module:
	https://github.com/tj/commander.js
*/

// Define our program's first command.
program
	.command('traffic <subReddit> [moreSubReddits...]')
	.description('Get traffic data for one or more sub-reddits')
	.action(function(subReddit, moreSubReddits) {

		// This function will run when the command is used.

		var subReddits = [subReddit].concat(moreSubReddits);
		var results = {};

		async.each(subReddits, function(subRedditName, next) {

			sources.reddit.getSubRedditTraffic(subRedditName, function(error, traffic) {

				if (error) {
					return next(error);
				}

				results[subRedditName] = traffic;
				next();
			});

		}, function(error) {

			if (error) {
				console.error(error);
				return process.exit(1);
			}

			// Print the results to the console.
			console.log(JSON.stringify(results, null, '  '));
			process.exit(0);
		});
	});

// Have our program parse the CLI arguments:
program.parse(process.argv);

// If no arguments are given, show help.
if (_.isEmpty(program.args)) {
	return program.help();
}
