'use strict';

module.exports = {
  deleteFunctions () {
    const deleteFunctionPromises = [];

    this.serverless.service.getAllFunctions().forEach((functionName) => {
      const functionObject = this.serverless.service.getFunction(functionName);

      deleteFunctionPromises.push(this.provider.deleteFunction(functionObject.id));
    });

    return BbPromise.all(deleteFunctionPromises);
  }
};