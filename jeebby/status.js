module.exports = function(RED) {
    function JeebbyStatus(config) {
        RED.nodes.createNode(this,config);

        const nodeContext = this.context();
        console.log(nodeContext);
        console.log(RED);

    //     var flowContext = this.context().flow;

    // var globalContext = this.context().global;
    //     this.name = config.name;
    //     this.id = config.id;
    }
	
    RED.nodes.registerType("status",JeebbyStatus);
}