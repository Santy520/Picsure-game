$(document).foundation();

let userName ='';

//Sets timer to 60 seconds and closes game upon completion
function timer(){
    var timeLeft = 60;
    var timerInterval = setInterval(function() {
      timeLeft--;
      $('#timer').text("Seconds remaining: " + timeLeft);
  
      if(timeLeft == 0) {
        clearInterval(timerInterval);
        $('#game-container').css('display', 'none');
        return printHighscores();
      }
  
    }, 1000);
}

//Play-Button event listener
$(document).ready(function(){
    
    // $('#play-button').on('click', function(e){
    $('.formEl').on('submit', function(e){
        e.preventDefault();
        e.stopPropagation();
        userName = $('#userName').val();
        console.log(userName);
        startGame(userName);
    }
)
});

function startGame(userName){
   $('#playButtonContainer').css('display', 'none');
   $('#game-container').css('display', '');
   console.log("StartGame initialized");
   timer();
   var index = 0;
   var score = 0;
   var locations = ['new york','chicago','san francisco', 'miami',
                     'los angeles', 'detroit', 'philadelphia', 'dallas',
                     'boston', 'seattle']; 
   shuffleArray(locations);
   playGame(locations, index, score, userName);
}


//Uses shuffled location array to get clues from APIs
function playGame(locations, index, score, userName){
    let array = locations;
    let j = index;
    $('#default').prop('selected');
    localStorage.setItem(userName, score);
    console.log(userName + ": " + localStorage.getItem(userName));
    $('#currentScore').text('Score: ' + score);
    if(j == array.length){
        j=0;
    }

        //let currentLocation = array[i];
        console.log('Current Location: ' + array[j]);
        //Retrieves random image and corresponding weather clues from APIs
        console.log('Current Index: ' + j);
        //fetchImage(array[i]);
        //fetchClues(array[i]);

       function onSelect(){
        let choice = $('#answers').val();

        //Bring in answer choice from form
        console.log('Choice: ' + choice);
        if (array[j] === choice){
            score++;
            localStorage.setItem(userName, score);
            console.log('Correct! ' + 'Index: ' + j + ' Score: ' + score);
        }
        else {
            //Display InCorrect Answer!
            console.log('Incorrect!');
            localStorage.setItem(userName, score);
        }
        j++;
        $('#answers').off('change', onSelect);
        return playGame(array, j, score, userName);
       }
       
        // $('#answer-button').on('submit', function (e){
        $('#answers').on('change', onSelect);
      
    
            
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
    return;
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
    return;
}

function resetHighscores(){
    localStorage.clear();
    $('#highScores').css('display', 'none');
    return;
}

$('#resetScores').on('click', resetHighscores());

function goBack(){
    $('#highScores').css('display', 'none');
    $('#playButtonContainer').css('display', '');
    return;
}

$('#goBack').on('click', goBack());

function printHighscores(){
    $('#highscores').css('display', '');
    if(localStorage.length === null){
        return;
    }
    else{
        for (let i = 0; i<localStorage.length; i++) {
            let name = localStorage.key(i);
            console.log('Storage Key:'+ '['+ i + '] ' + name)
            let highScore = localStorage.getItem(localStorage.key(i));
            console.log('Key Value:'+ '['+ i + '] ' + highScore);
            let scoreli = document.createElement("li");
            scoreli.textContent = 'Username: ' + name + ' Score: ' + highScore + ' ';
            $('#highscore').append(scoreli);
        }
    }
    return;
}