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
            const windChill = body.current.feelslike;
            
            const data = `${weatherDescription} with a current temp of ${temp}. Feels like ${windChill}.`
           
            callback(undefined, data)
        }
    })
}

module.exports = forecast