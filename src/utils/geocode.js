const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoienlsbGN6IiwiYSI6ImNrZGt6a2p0aTA1OXMydGtiemhsbW1ndHYifQ.M8_OdTpQ8iPGD1UiOhWc3w'
    request({url, json: true}, (error,response) => {
        const {features} = response.body
        if(error){
            callback('Unable to connect to location service', undefined)
        }
        else if (!features){
            callback('Unable to find location, try another search', undefined)
        }
        else {
            callback(undefined, {longitude: features[0].geometry.coordinates[0],
            latitude: features[0].geometry.coordinates[1],
            location: features[0].place_name})
        }
    })
}

module.exports = geocode