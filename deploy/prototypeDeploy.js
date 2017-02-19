'use strict';

const BbPromise = require('bluebird');
const createFunctions = require('./lib/createFunctions');

class PrototypeDeploy {
  constructor (serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.provider = this.serverless.getProvider('prototype');

    Object.assign(
      this,
      createFunctions
    );

    this.hooks = {
      'deploy:deploy': () => BbPromise.bind(this)
        .then(this.createFunctions)
        .then(() => this.serverless.cli.log('Successfully deployed functions'))
    };
  }
}

module.exports = PrototypeDeploy;
