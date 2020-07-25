const request = require('request');

const geocode = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaGFkbWFyY2FubyIsImEiOiJja2J6NmU4dWEwOWRuMndwc2k0MXg0bDVsIn0.l-etV1co6-U37uzS29jPKg&limit=1`
 
    request({url:url,json:true},(error,response)=>{
 
       if(error){
          callback('¡Ha sido imposible conectarnos con el servicio de Red!',undefined);
       }else if(response.body.features.length === 0){
          callback('¡No podemos encontrar esta ubicación!, ¡Prueba con otra!',undefined);
       }else{
          callback(undefined,{
             ubication : response.body.features[0].place_name,
             latitude : response.body.features[0].center[1],
             longitude : response.body.features[0].center[0],
          });
       }
 
    })
    
 };

 module.exports = geocode;