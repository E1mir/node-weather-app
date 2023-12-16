const http = require('http');

const forecast = ({latitude, longitude} = {}, callback) => {
  const weatherApiKey = process.env.WEATHERSTACK_API_KEY;
  const weatherApiUrl = `http://api.weatherstack.com/current?access_key=${weatherApiKey}&query=${latitude},${longitude}`;

  const req = http.get(weatherApiUrl, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        if (!parsedData.error) {
          const {weather_descriptions, temperature, feelslike} = parsedData.current;
          const message = `${weather_descriptions[0]}. It's currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`;
          callback(null, message);
        } else {
          throw new Error(parsedData.error.info);
        }
      } catch (error) {
        callback(`Error parsing response from Weatherstack API. ${error.message}`, null);
      }
    });
  });

  req.on('error', (e) => {
    callback(`Unable to connect to the Weatherstack API. ${e.message}`, null);
  });

  req.end();
};

module.exports = forecast;
