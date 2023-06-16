const last = require('./read-actions/last');
const today = require('./read-actions/today');
const yesterday = require('./read-actions/yesterday');
const yesterdayToday = require('./read-actions/yesterday-today');
const betweenDates = require('./read-actions/between-dates');

module.exports = function(RED) {
    function JeebbyStorageRead(config) {
        RED.nodes.createNode(this,config);
        this.token = this.context().global.jeebby.token;
        this.baseUrl = this.context().global.jeebby.baseUrl;
        this.teamId = this.context().global.jeebby.teamId; //setted up in /data/settings.js # functionGlobalContext 
        this.flowId = RED.util.getSetting(this, 'FLOW_ID');
        this.field = config.field;
        this.aggregation = config.aggregation;
        this.dateTo = config.dateTo;
        this.dateFrom = config.dateFrom;
        
        var node = this;
        node.on('input', function(msg, send, done) {
            if(node.action === 'last') {
                last(node, msg, send, done);
            } else if(node.action === 'today') {
                today(node, msg, send, done);
            } else if(node.action === 'yesterdag') {
                yesterday(node, msg, send, done);
            } else if(node.action === 'yesterday-today') {
                yesterdayToday(node, msg, send, done);
            }else if(node.action === 'betweenDates') {
                betweenDates(node, msg, send, done);
            }
        });
    }
	
    RED.nodes.registerType("jeebby-storage-read",JeebbyStorageRead);
}