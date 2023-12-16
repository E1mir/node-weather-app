require('dotenv').config()
const {argv} = require('node:process');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const getWeatherInfo = (city) => {
  geocode(city, (error, geoData) => {
    if (!error) {
      forecast(geoData, (err, forecastData) => {
        if (!err) {
          console.log(forecastData)
        } else {
          console.error(`${err}`)
        }
      })
    } else {
      console.error(`${error}`)
    }
  })
}

const city = argv[2];

if (city) {
  getWeatherInfo(city)
} else {
  console.error("Please provide an address or city name.")
}

