const request = require('request')


const forecast = (lat,lng,callback)=>{
    const url = `https://api.darksky.net/forecast/b98bca9789d83b77a40d9ec3576c57c1/${lat},${lng}?units=si`
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service.',undefined)
        }else if(body.error){
            callback('Unable to find location.',undefined)
        }
        else{
            const currently = body.currently
            const degree = currently.temperature
            const rainChance = currently.precipProbability*100
            const dailySummary = body.daily.data[0].summary
            //console.log(`${dailySummary} It is currently ${degree} degrees out. There is a ${rainChance}% chance of rain`) 
            callback(undefined,{
                degree,
                rainChance,
                dailySummary,
            })
        }

    })
}
module.exports = forecast
