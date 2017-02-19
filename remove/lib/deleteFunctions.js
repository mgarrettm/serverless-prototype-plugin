'use strict';

module.exports = {
  deleteResourceGroup () {
    return this.provider.deleteFunctions();
  }
};