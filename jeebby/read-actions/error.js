module.exports = function(response, node, done) {
    let status = response.hasOwnProperty('code') ? response.code : RED._('jeebbyStorageRead.error_unknown');
    let payload = response.hasOwnProperty('message') ? response.message : RED._('jeebbyStorageRead.error_unknown');

    //node status is error
    node.status({fill:"red", shape:"ring", text:status});

    done({status: status, payload: payload});
}