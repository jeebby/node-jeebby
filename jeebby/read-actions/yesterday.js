const _ = require('./read-action');

module.exports = function(RED, node, msg, send, done) {
    _('/yesterday', node, msg, send, done);
}