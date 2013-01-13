var fs = require('fs');

// csv(array_of_arrays) --> csv string
exports.csv = (function(delimiter) {
    reFormat = new RegExp("[\"" + delimiter + "\n]");

    // Return each row as a comma-separated list of (possibly quoted) values
    function formatRow(row) {
        return row.map(formatValue).join(delimiter);
    }

    // If a cell has quotes or commas in it, return it "quoted", else return as-is
    function formatValue(text) {
        return reFormat.test(text) ? "\"" + text.replace(/\"/g, "\"\"") + "\"" : text;
    }

    return function (rows) {
        return rows.map(formatRow).join("\n");
    };
})(',');

exports.write = function(filename, data) {
    var handle = fs.open(filename, 'a');
    handle.write(exports.csv(data));
    handle.write('\n');
    handle.close();
};
