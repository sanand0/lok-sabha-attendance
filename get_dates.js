// Scrapes http://164.100.47.132/Members_Attendance/datewise_status.aspx
// for the list of datewise-status URLs

var casper = require('casper').create({clientScripts: "jquery.min.js"});
var fs = require('fs');

var base_url = 'http://164.100.47.132/Members_Attendance/';
var date_links = [];

function get_all_links() {
  return jQuery('a').map(function() { return $(this).attr('href'); }).get();
}

casper.start(base_url + 'datewise_status.aspx', function() {
  this.evaluate(get_all_links).forEach(function(session_link) {
    casper.thenOpen(base_url + session_link, function() {
      console.log(session_link);
      date_links.push.apply(date_links, this.evaluate(get_all_links));
    });
  });
});

casper.then(function() {
    fs.write('date_links.txt', date_links.join('\n'), 'w');
});

casper.run();
