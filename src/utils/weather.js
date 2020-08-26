const request = require('request')
const dotenv = require ('dotenv')
dotenv.config()

const weather = (coordinates, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key='+ process.env.weatherAccessToken+'&units=m&query='+ coordinates.latitude +','+ coordinates.longitude+''
    request({url, json: true}, (error, response)=> {
        const {current, error:responseError} = response.body
        if (error){
            callback('Unable to connect to weather service', undefined)
        }
        else if (responseError){
            callback('Unable to obtain weather data, try another location', undefined)
        }
        else{
            callback(undefined, {description: current.weather_descriptions[0] + ', it currently is ' + current.temperature + ' degrees, and feels like '+ current.feelslike + ' degrees with humidity ' + current.humidity+ '%.' + 
            ' There is ' + current.precip  +'% chance of rain.', icon: current.weather_icons})
        }
    })
}

module.exports=weather