'use strict';

module.exports = {
  createFunction () {
    const functionName = this.options.function;

    const functionObject = this.serverless.service.getFunction(functionName);

    return this.provider.generateZipString(functionName, functionObject.handler)
      .then(zipString => this.provider.uploadFunction(functionName, zipString, functionObject))
      .then(functionObject => this.provider.saveFunctionId(functionName, functionObject.functionId));
  }
};
