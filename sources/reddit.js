'use strict';

var cheerio = require('cheerio');
var moment = require('moment');
var request = require('request');

module.exports = {

	getSubRedditTraffic: function(subRedditName, cb) {

		request({
			method: 'GET',
			url: 'https://www.reddit.com/r/' + subRedditName + '/about/traffic/'
		}, function(error, response, data) {

			if (error) {
				return cb(error);
			}

			var status = response.statusCode;

			if (status >= 300) {
				// Some HTTP error occurred.
				var error = new Error(response.statusMessage);
				error.code = 'HTTP_' + status;
				return cb(error);
			}

			// Response data is HTML.
			// Parse for useful traffic data.

			var traffic = {
				monthly: {},
				daily: {}
			};

			var $ = cheerio.load(data);

			$('#traffic-month tbody tr').each(function(index, tr) {

				var timestamp = parseInt($('th', tr).eq(0).attr('data-value'));// Milliseconds
				var numUniqueVisitors = parseInt($('td', tr).eq(0).attr('data-value'));
				var numPageViews = parseInt($('td', tr).eq(1).attr('data-value'));
				var month = moment(timestamp).format('YYYY/MM');

				traffic.monthly[month] = {
					uniques: numUniqueVisitors,
					pageViews: numPageViews
				};
			});

			$('#traffic-day tbody tr').each(function(index, tr) {

				var timestamp = parseInt($('th', tr).eq(0).attr('data-value'));// Milliseconds
				var numUniqueVisitors = parseInt($('td', tr).eq(0).attr('data-value'));
				var numPageViews = parseInt($('td', tr).eq(1).attr('data-value'));
				var numSubscriptions = parseInt($('td', tr).eq(2).attr('data-value'));
				var date = moment(timestamp);
				var day = date.format('YYYY/MM/DD');

				traffic.daily[day] = {
					uniques: numUniqueVisitors,
					pageViews: numPageViews,
					subscriptions: numSubscriptions
				};
			});

			cb(null, traffic);
		});
	}
};
