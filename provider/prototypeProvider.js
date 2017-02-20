'use strict';

const BbPromise = require('bluebird');
const fs = require('fs');
const JSZip = require('jszip');
const path = require('path');
const request = require('request');

class PrototypeProvider {
  static getProviderName () {
    return this.providerName;
  }

  constructor (serverless) {
    this.serverless = serverless;
    this.provider = this;
    this.providerName = 'prototype';
    this.serverless.setProvider(this.providerName, this);

    this.serviceBaseUri = process.env['prototypeServiceBaseUri'];
  }

  generateZipString(functionName, handlerPath) {
    return new BbPromise((resolve, reject) => {
      this.serverless.cli.log(`Packaging function: ${functionName}`);
      const absoluteHandlerPath = path.join(this.serverless.config.servicePath, handlerPath);
      const handlerData = fs.readFileSync(absoluteHandlerPath);

      const zip = new JSZip();

      zip.file('index.js', handlerData);

      zip.generateAsync({ type: 'base64' })
        .then(zipBase64String => {
          resolve(zipBase64String);
        });
    });
  }

  uploadFunction(functionName, zipString, functionObject) {
    return new BbPromise((resolve, reject) => {
      this.serverless.cli.log(`Uploading function: ${functionName}`);

      const options = {
        'url': this.serviceBaseUri + 'functions',
        'headers': {
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
          displayName: functionName,
          memorySize: functionObject.memorySize,
          zipFile: zipString
        }, null, 4)
      };

      request.post(options, (err, res, body) => {
        if (err || res.statusCode != 201) {
          reject(err);
        } else {
          let functionObject = JSON.parse(body);
          this.serverless.cli.log(`${functionName} endpoint: POST ${this.serviceBaseUri}functions/${functionObject.Id}/invoke`)
          resolve();
        }
      });
    });
  }

  deleteFunctions() {
    return new BbPromise((resolve, reject) => {
      request.delete(this.serviceBaseUri + 'functions', (err, res) => {
        if (err || res.statusCode != 204) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = PrototypeProvider;
