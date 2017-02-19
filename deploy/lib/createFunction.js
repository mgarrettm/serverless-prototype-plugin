'use strict';

module.exports = {
  createFunction () {
    const functionName = this.options.function;

    const functionObject = serverless.service.getFunction(functionName);

    return this.provider.generateZipString(functionName, functionObject.handler)
      .then(zipString => this.provider.uploadFunction(functionName, zipString, functionObject));
  }
};
