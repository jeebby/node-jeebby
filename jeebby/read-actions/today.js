const _ = require('./read-action');

module.exports = function(node, msg, send, done) {
    _('/today', node, msg, send, done);
}