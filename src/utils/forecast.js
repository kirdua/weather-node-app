const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=864972e7ed8e79d1ba4e35ebc19836cc&query=${lat},${long}&units=f`
    
    request({ url, json: true }, (err, { body }) => {
             
        if(err) {
            callback('Unable to connect to weather service!')
        } else if(body.error) {
            callback('Unable to find location!')
        } else {
            const weatherDescription = body.current.weather_descriptions[0];
            const temp = body.current.temperature;
            const humidity = body.current.humidity;
            const windChill = body.current.feelslike;
            const windSpeed = body.current.wind_speed;
            const windDirection = body.current.wind_dir;
            
            const data = `${weatherDescription} with a current temp of ${temp}. Feels like ${windChill} width a humidity of ${humidity}%. 
            Wind is currently coming from the ${windDirection} at ${windSpeed}mph.`
           
            callback(undefined, data)
        }
    })
}

module.exports = forecast