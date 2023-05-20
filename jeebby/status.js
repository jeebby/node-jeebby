module.exports = function(RED) {
    function JeebbyStatus(config) {
        RED.nodes.createNode(this,config);
        const teamId = this.context().global.jeebby.teamId; //staat in /data/settings.js # functionGlobalContext 
        console.log('TeamId: ' + teamId);
    }
	
    RED.nodes.registerType("jeebby-status",JeebbyStatus);
}