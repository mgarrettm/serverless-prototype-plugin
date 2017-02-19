'use strict';

const BbPromise = require('bluebird');
const deleteFunctions = require('./lib/deleteFunctions');

class AzureRemove {
  constructor (serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.provider = this.serverless.getProvider('prototype');

    Object.assign(
      this,
      deleteFunctions
    );

    this.hooks = {
      'remove:remove': () => BbPromise.bind(this)
        .then(this.deleteFunctions)
        .then(() => this.serverless.cli.log('Functions successfully removed'))
    };
  }
}

module.exports = PrototypeRemove;
