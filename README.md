Lok Sabha attendance scraper
============================

Scrapes daily attendance from <http://164.100.47.132/members_attendance/mainscreen.aspx>

1. Download and install [PhantomJS v1.8](http://phantomjs.org/download.html) and [CasperJS v1.0](http://casperjs.org/)
2. Extract and add `casper\bin` and `phantomjs\bin` to your `PATH` environment variable.
3. Clone this repository and run the following:

        casperjs get_dates.js
        casperjs get_attendance.js
        python convert.py

This will give you an attendance-lok-sabha.csv that has the final output.
