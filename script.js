$(document).foundation();

let userName ='';

//Listener to receive Username Input from HTML
$('formEl').on('submit', function(){
    userName = $('#userName').val();
    return userName;
})


//Sets timer to 60 seconds and closes game upon completion
function timer(){
    var timeLeft = 60;
    var timerInterval = setInterval(function() {
      timeLeft--;
      $('#timer').text("Seconds remaining: " + timeLeft);
  
      if(timeLeft == 0) {
        clearInterval(timerInterval);
        $('#game-container').css('display', 'none');
       //Show Scoreboard
        return timeLeft = 0;
      }
  
    }, 1000);
}



//Play-Button event listener
$(document).ready(function(){
    
    $('#play-button').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        startGame();
    }
)
});


function startGame(){
    
   $('#playButtonContainer').css('display', 'none');
   $('#game-container').css('display', '');
   console.log("StartGame initialized");
   timer();
   var index = 0;
   var score = 0;

   //For testing create image array for locations
   var locations = ['newyork','chicago','sanfrancisco', 'miami',
                   'losangeles', 'detroit', 'philadelphia', 'dallas',
                   'boston', 'seattle']; 
   shuffleArray(locations);
   playGame(locations, index, score);
}



  



//Uses shuffled location array to get clues from APIs
function playGame(array, i, score){
        let currentLocation = array[i];
        console.log(array);
        console.log(i);

        $('#answer-button').on('submit', function (e){
            e.preventDefault();
            e.stopPropagation();

            //Bring in answer choice from form
            let choice = $('#choice').val();
            if (currentLocation === choice){
                score++;
                i++;
                localStorage.setItem(userName, score);
                console.log('Correct! ' + 'Index: ' + i + ' Score: ' + score);
                playGame(array, i, score);
            }
            else {
                //Display InCorrect Answer!
                i++;
                localStorage.setItem(userName, score);
                playGame(array, i, score);
            }
        });     

}



//Shuffles items in the location array to randomize choices for current game. 
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function convertTemp(temp){
    let fahrenheit = (temp - 273.15)*1.8 + 32;
    return fahrenheit;
}

function fetchClues(city){
    let apiKeyWeather = 'a34c2b8d2c8d04d52a0bced017c36070';
    let weatherRequest = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKeyWeather;


    fetch(weatherRequest).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log("Current Weather: ", data);
        let currentTemp = Math.round(convertTemp(data.main.temp));
        let currentHumidity = data.main.humidity;
        $('#currentTemp').text('Temperature: ' + currentTemp + 'F');
        $('#currentHumidity').text('Humidity: ' + currentHumidity + '%');
    })
}

function fetchImage(city){

    let apiKeyUnsplash = '6ZuknqkaIj1xSrnF1lxmK1vVqUMZyAtTAOR4kLUmdac';
    let queryUnsplash = 'https://api.unsplash.com/photos/random/?';
    let unsplashRequest = queryUnsplash + 'query=' + city + '&client_id=' + apiKeyUnsplash;

    fetch(unsplashRequest).then(function (response) {
    return response.json();
    }).then(function (data) {
        console.log(data);
        let currentImage = data.urls.small;
        console.log(currentImage);
        $('#gameImage').prop("src", currentImage); 
    })
}

function resetHighscores (){
    localStorage.clear();
    $('#highScores').css('display', 'none');
}