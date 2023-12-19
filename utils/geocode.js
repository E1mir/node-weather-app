const http = require('http');

const geocode = (address, callback) => {
  const apiKey = process.env.POSITIONSTACK_API_KEY;
  const apiUrl = `http://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${encodeURIComponent(address)}`;

  const req = http.get(apiUrl, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        if (!parsedData.error) {
          const geoData = parsedData.data;

          if (geoData.length) {
            const city = geoData.reduce((maxConfidenceCity, currentCity) => {
              return currentCity.confidence > maxConfidenceCity.confidence ? currentCity : maxConfidenceCity;
            }, {confidence: -1});

            const {latitude, longitude, name: location} = city;
            const cityData = {
              latitude,
              longitude,
              location,
            };
            callback(null, cityData);
          } else {
            callback('Unable to find location.', null);
          }
        } else {
          callback(parsedData.error.message, null)
        }
      } catch (error) {
        callback(`Error parsing response from Positionstack API. ${error.message}`, null);
      }
    });
  });

  req.on('error', (e) => {
    callback(`Unable to connect to the Positionstack API. ${e.message}`, null);
  });

  req.end();
};

module.exports = geocode;
