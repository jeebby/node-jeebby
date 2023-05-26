const axios = require('axios');

module.exports = function(RED) {
    function JeebbyStatus(config) {
        RED.nodes.createNode(this,config);
        const token = this.context().global.jeebby.token;
        const baseUrl = this.context().global.jeebby.baseUrl;
        const teamId = this.context().global.jeebby.teamId; //setted up in /data/settings.js # functionGlobalContext 
        const flowId = RED.util.getSetting(this, 'FLOW_ID');
        const status = config.status;
        
        var node = this;
        node.on('input', function(msg, send, done) {
            const url = `${baseUrl}/api/status/team/${teamId}/flow/${flowId}`;
            const message = msg.payload;

            if(status === void 0 || message === void 0) {
                node.status({fill:"red", shape:"ring", text: RED._('jeebbyStatus.invalidPayload')});
                node.send([msg]);
                return;
            }

            axios.interceptors.request.use(function (config) {
                if(node.id === config.env.node_id) {
                    node.status({fill:"yellow",shape:"dot",text:RED._('jeebbyStatus.pending')});
                }
                return config;
              }, function (error) {
                return Promise.reject(error);
              }
            );
        
            axios.interceptors.response.use(function (response) {
                    if(node.id === response.config.env.node_id) {
                        node.status({fill:"yellow",shape:"dot",text:RED._('jeebbyStatus.processing')});
                    }
                    return response;
                }, function (error) {
                    return Promise.reject(error);
                }
            );

            axios.postForm(url, {
                'status': status,
                'message': message
            }, {
                headers: {
                    "User-Agent": "node-red",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${token}`
                },
                env: {
                    node_id: node.id
                }
            }).then(function(response) {
                node.status({fill:"green",shape:"dot",text:`Status: ${message}`});
                done();
            })
            .catch(function(error) {
                const status = error.hasOwnProperty('message') ? error.message : RED._('jeebbyStatus.error_unknown');
                node.status({fill:"red", shape:"ring", text:status});
                done(error);
            });
        });
    }
	
    RED.nodes.registerType("jeebby-status",JeebbyStatus);
}