const _ = require('./read-action');

module.exports = function(RED, node, msg, send, done) {
    const url = `/from/${node.dateFrom}/to/${node.dateTo}`;
    _(url, node, msg, send, done);
}