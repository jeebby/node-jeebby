const axios = require('axios');

module.exports = function(RED) {
    function JeebbyStorageWrite(config) {
        RED.nodes.createNode(this,config);
        const token = this.context().global.jeebby.token;
        const baseUrl = this.context().global.jeebby.baseUrl;
        const teamId = this.context().global.jeebby.teamId; //setted up in /data/settings.js # functionGlobalContext 
        const flowId = RED.util.getSetting(this, 'FLOW_ID');
        const field = config.field;
        
        var node = this;
        node.on('input', function(msg, send, done) {
            const url = `${baseUrl}/api/storage/team/${teamId}/flow/${flowId}/field/${field}`;
            const value = msg.payload;

            if(value === void 0) {
                node.status({fill:"red", shape:"ring", text: RED._('jeebbyStorageWrite.invalidPayload')});
                node.send([msg]);
                return;
            }

            axios.interceptors.request.use(function (config) {
                if(node.id === config.env.node_id) {
                    node.status({fill:"yellow",shape:"dot",text:RED._('jeebbyStorageWrite.pending')});
                }
                return config;
              }, function (error) {
                return Promise.reject(error);
              }
            );
        
            axios.interceptors.response.use(function (response) {
                    if(node.id === response.config.env.node_id) {
                        node.status({fill:"yellow",shape:"dot",text:RED._('jeebbyStorageWrite.processing')});
                    }
                    return response;
                }, function (error) {
                    return Promise.reject(error);
                }
            );

            axios.postForm(url, {
                'value': value
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
                node.status({fill:"green",shape:"dot",text:`Last value: ${value}`});
                done();
            })
            .catch(function(error) {
                const status = error.hasOwnProperty('message') ? error.message : RED._('jeebbyStorageWrite.error_unknown');
                node.status({fill:"red", shape:"ring", text:status});
                done(error);
            });
        });
    }
	
    RED.nodes.registerType("jeebby-storage-write",JeebbyStorageWrite);
}