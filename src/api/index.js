const axios = require('axios');
const {api: {host}} = require('../config/options.json');

const methods = {
	getMeteo: async (act, sensor) => await axios.get(`${host}/meteo`, {
		params: {
			act,
			sensor
		}
	})
};

module.exports = methods;