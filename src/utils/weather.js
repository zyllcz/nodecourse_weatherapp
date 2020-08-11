const request = require('request')

const weather = (coordinates, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=c17503ba14bb842ae5c75519be34e2cd&units=m&query='+ coordinates.latitude +','+ coordinates.longitude+''
    request({url, json: true}, (error, response)=> {
        const {current, error:responseError} = response.body
        if (error){
            callback('Unable to connect to weather service', undefined)
        }
        else if (responseError){
            callback('Unable to obtain weather data, try another location', undefined)
        }
        else{
            callback(undefined, current.weather_descriptions[0] + ', it currently is ' + current.temperature + ' degrees out.' + 
            ' There is ' + current.precip  +'% chance of rain')
        }
    })
}

module.exports=weather