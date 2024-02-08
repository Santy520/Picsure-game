$(document).foundation();
/** 
function currentWeather(){
    var apiQuery = `https://api.openweathermap.org/data/2.5/weather?q=new york&appid=a34c2b8d2c8d04d52a0bced017c36070`
 
    fetch(apiQuery).then(function (response) {
     return response.json();
 }).then(function (data) {
     console.log("Current Weather: ", data);
 })
 }
 
 currentWeather();
 
 function unsplash(){
 let currentLocation ='new_york'
 let apiKeyUnsplash = '6ZuknqkaIj1xSrnF1lxmK1vVqUMZyAtTAOR4kLUmdac';
 let unsplashRequest = 'https://api.unsplash.com/photos/random/?query=las_vegas&client_id=6ZuknqkaIj1xSrnF1lxmK1vVqUMZyAtTAOR4kLUmdac';
 
         fetch(unsplashRequest)
         .then(function (response) {return response.json();})
         .then(function (data) {
             console.log("Data: " + data);
             let currentImage = data.urls.small;
             console.log("Current Image URL: " + currentImage);
             let image = '<img src=' + currentImage + '>';
             bodyEl.append(image);
         })
     }
 unsplash();
 */