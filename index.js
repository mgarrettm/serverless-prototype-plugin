'use strict';

/*
NOTE: this plugin is used to add all the differnet provider related plugins at once.
This way only one plugin needs to be added to the service in order to get access to the
whole provider implementation.
*/

const PrototypeDeploy = require('./deploy/prototypeDeploy');
const PrototypeDeployFunction = require('./deploy/prototypeDeployFunction');
const PrototypeProvider = require('./provider/prototypeProvider');
const PrototypeRemove = require('./remove/prototypeRemove');


class PrototypeIndex {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.serverless.pluginManager.addPlugin(PrototypeProvider);
    this.serverless.pluginManager.addPlugin(PrototypeDeploy);
    this.serverless.pluginManager.addPlugin(PrototypeDeployFunction);
    this.serverless.pluginManager.addPlugin(PrototypeRemove);
  }
}

module.exports = PrototypeIndex;
