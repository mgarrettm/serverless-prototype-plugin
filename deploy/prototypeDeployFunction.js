'use strict';

const BbPromise = require('bluebird');
const createFunction = require('./lib/createFunction');

class PrototypeDeployFunction {
  constructor (serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.provider = this.serverless.getProvider('prototype');

    Object.assign(
      this,
      createFunction
    );

    this.hooks = {
      'deploy:function:deploy': () => BbPromise.bind(this)
        .then(this.createFunction)
        .then(() => this.serverless.cli.log('Successfully deployed function'))
    };
  }
}

module.exports = PrototypeDeployFunction;
