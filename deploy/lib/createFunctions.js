'use strict';

const BbPromise = require('bluebird');

module.exports = {
  createFunctions () {
    const createFunctionPromises = [];

    this.serverless.service.getAllFunctions().forEach((functionName) => {
      const functionObject = this.serverless.service.getFunction(functionName);

      createFunctionPromises.push(this.provider.generateZipString(functionName, functionObject.handler)
        .then(zipString => this.provider.uploadFunction(functionName, zipString, functionObject))
        .then(functionObject => this.provider.saveFunctionId(functionName, functionObject.id)));
    });

    return BbPromise.all(createFunctionPromises);
  }
};
