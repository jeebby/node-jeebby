const _ = require('./read-action');

module.exports = function(node, msg, send, done) {
    _('/last-value', node, msg, send, done);
}