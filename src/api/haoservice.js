const has = require('lodash/has');
const Base = require('./base');

const API = 'http://api.haoservice.com/api/getlbs';

/* eslint-disable class-methods-use-this */
class HaoService extends Base {
  constructor(options) {
    super(options);
    if (options) {
      this.key = options.key;
      this.system = options.system;
    }
  }

  getRequestSettings({
    cellId,
    locationAreaCode,
    mobileCountryCode,
    mobileNetworkCode,
  }) {
    return {
      uri: API,
      qs: {
        oid: this.oid,
        mcc: mobileNetworkCode,
        mnc: mobileCountryCode,
        lac: locationAreaCode,
        cell_id: cellId,
        key: this.key,
        type: this.system || 2,
        output: 'json',
      },
      json: true,
    };
  }

  validate(body) {
    return body.ErrCode === '0';
  }

  parseLocation(body) {
    return {
      longitude: body.location.longitude,
      latitude: body.location.latitude,
      accuracy: body.location.accuracy,
      address: body.location.addressDescription,
    };
  }

  parseError(body) {
    return has(body, 'ErrCode') ? body.ErrCode : body;
  }
}

module.exports = HaoService;
