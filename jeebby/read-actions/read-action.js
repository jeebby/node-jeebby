const axios = require('axios');
const error = require('./error');

module.exports = function(path, node, msg, send, done) {
    axios.interceptors.request.use(function (config) {
        if(node.id === config.env.node_id) {
            node.status({fill:"blue",shape:"dot",text: RED._('jeebbyStorageRead.pending')});
        }
        return config;
      }, function (error) {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(function (response) {
            if(node.id === response.config.env.node_id) {
                node.status({fill:"yellow",shape:"dot",text: RED._('jeebbyStorageRead.processing')});
            }
            return response;
        }, function (error) {
            return Promise.reject(error);
        }
    );

    let url = `${node.baseUrl}/api/storage/team/${node.teamId}/flow/${node.flowId}/field/${node.field}/${path}`;
    if(node.aggregation != '') {
        url += `/${node.aggregation}`;
    }

    axios.get(url, {
        headers: {
            "User-Agent": "node-red",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${node.token}`
        },
        env: {
            node_id: node.id
        }
    })
    .then(function(response) {
        node.status({fill:"green",shape:"dot",text:''});
        send({payload: response.data});
        done();
    })
    .catch(function(response) {
        error(response, node, done);
    });
}