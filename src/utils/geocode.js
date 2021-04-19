const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2lyZHVhMDEiLCJhIjoiY2tuYWVvMHVlMWg2djJxbWx2aXZtd3c3OSJ9.c-bpcGd-EIglpE5D5aKs4Q&limit=1'
    
    request({url, json: true}, (err, { body }) => {
        if(err) {
           callback('Unable to connect to location services!', undefined) 
        } else if (body.features.length === 0) {
            callback('Location not found. Try another search.')
        } else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const location = body.features[0].place_name

            const data = {
                latitude,
                longitude,
                location
            }
            
            callback(undefined, data)
        }
    })
}

module.exports = geocode;