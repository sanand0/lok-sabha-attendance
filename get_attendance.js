var casper = require('casper').create({clientScripts: "jquery.min.js"});
var fs = require('fs');
var write = require('./csv').write;

var base_url = 'http://164.100.47.132/Members_Attendance/';

// Get attendance records on a given page
function scrape() {
  return jQuery('#DataGrid1 tr')
    .slice(2, -1)
    .map(function() {
      return [
        $('td', this).map(function() {
          return $(this).text().replace(/^ */, '').replace(/ *$/, '');
        }).get()
      ];
    }).get();
}

// Append date to each row
function add(date, data) {
  return data.map(function(row) { var r = [date]; r.push.apply(r, row); return r; });
}

casper.start();

var date_links = fs.read('date_links.txt').split(/\n/);
date_links.forEach(function(date_link, date_index) {
  casper.thenOpen(base_url + date_link, function() {
    var date = date_link.split(/\=/).pop();
    write('attendance.csv', add(date, this.evaluate(scrape)));

    var page_labels = this.evaluate(function () {
      return jQuery('#DataGrid1 td:first() a').map(function() { return $(this).text(); }).get();
    });

    page_labels.forEach(function(page_label, index) {
      casper.then(function() {
        console.log('Day ' + date_index + '/' + date_links.length + ': Page ' + index + '/' + page_labels.length);
        this.clickLabel(page_label, 'a');
        this.then(function() {
          write('attendance.csv', add(date, this.evaluate(scrape)));
        });
        this.back();
      });
    });
  });
});

casper.run();
