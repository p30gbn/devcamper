const nodeGeocoder = require("node-geocoder");

let options = {
  provider: process.env.GEOCODER_PROVIDER,
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};
const geocoder = nodeGeocoder(options);

module.exports = geocoder;
