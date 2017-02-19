'use strict';

const BbPromise = require('bluebird');

module.exports = {
  createFunctions () {
    const createFunctionPromises = [];

    this.serverless.service.getAllFunctions().forEach((functionName) => {
      const functionObject = serverless.service.getFunction(functionName);

      createFunctionPromises.push(this.provider.generateZipString(functionName, functionObject.handler)
        .then(zipString => this.provider.uploadFunction(functionName, zipString, functionObject)));
    });

    return BbPromise.all(createFunctionPromises);
  }
};
