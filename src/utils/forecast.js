const request = require('request');


const forecast = ({latitude,longitude}={} ,callback)=>{
   
    const url = `http://api.weatherstack.com/current?access_key=3d7087843a4954f5cbe41b18871958e1&query=${latitude},${longitude}`;
 
    request({url:url,json:true},(error,response)=>{
       if(error){
          callback('¡Ha sido imposible conectar con el servicio Red!',undefined);
       }else if(response.body.error){
          callback('¡No podemos encontrar esta ubicación!, ¡Prueba con otra!',undefined);
       }else{
          callback(undefined,{
             location_name: response.body.location.name,
             location_country: response.body.location.country,
             weatherDescription: response.body.current.weather_descriptions[0],
             temperature: response.body.current.temperature,
             feelsTemp: response.body.current.feelslike,
             _humidity: `Actually is humidity ${response.body.current.humidity}%`,
             forecast: `Actually the weather is ${response.body.current.weather_descriptions[0]} with temperatures arround of ${response.body.current.temperature}°C and feelslike of ${response.body.current.feelslike}°C`
          });
       }
    })
 
}

 module.exports = forecast;