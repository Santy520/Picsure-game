//Required for Foundation Framework functionality to work
$(document).foundation();

let userName ='';

//Sets timer closes game elements upon completion
function timer(){
    var timeLeft = 25;
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

//Requires page load to be complete prior to game function
$(document).ready(function(){
    
    //Retrieves the Username and initiaties the game when form is submitted
    $('.formEl').on('submit', function(e){
        e.preventDefault();
        e.stopPropagation();
        userName = $('#userName').val();
        console.log(userName);
        startGame(userName);
    }
)
});

//Starts the game and is intialized on player name 'submit'
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
   //Randomizes possible locations into a new array                  
   shuffleArray(locations);
   playGame(locations, index, score, userName);
}


//Game logic, API intializers and sets localStorage for userNames and scores
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

        console.log('Current Location: ' + array[j]);
        console.log('Current Index: ' + j);
        //Retrieves random image and corresponding weather clues from APIs

        fetchImage(array[j]);
        fetchClues(array[j]);
        //Removes event listner from answer dropdown to prevent duplication
        $('select option:contains("Select a City")').prop('selected',true);

       function onSelect(){
        let choice = $('#answers').val();

        //Bring in answer choice from answer dropdown
        console.log('Choice: ' + choice);
        if (array[j] === choice){
            score++;
            localStorage.setItem(userName, score);
            console.log('Correct! ' + 'Index: ' + j + ' Score: ' + score);
        }
        else {
            console.log('Incorrect!');
            localStorage.setItem(userName, score);
        }
        j++;
        $('#answers').off('change', onSelect);
        return playGame(array, j, score, userName);
       }
       //Event listener for the answer dropdown
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

//Converts temp in Openweather API from Kelvin to Fahrenheit for display
function convertTemp(temp){
    let fahrenheit = (temp - 273.15)*1.8 + 32;
    return fahrenheit;
}

//Open Weather API retrieves context clues for current location
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

//Unsplash API retrieves a single random image from the specified city
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

//Clears highscores that are printed
function resetHighscores(){
    localStorage.clear();
    $('li').remove();
    return;
}

//Listener on reset scores button
$('#resetScores').on('click', resetHighscores);

//Reinitializes the game to allow user to play again
function goBack(){
    $('#highscores').css('display', 'none');
    $('#playButtonContainer').css('display', '');
    return;
}

//Event listner on goBack button 
$('#goBack').on('click', goBack);

//Prints the scores from localStorage. Usernames are saved as keys and their values are their score
function printHighscores(){
    $('#highscores').css('display', '');
    $('li').remove();
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
            scoreli.textContent = name + ' = ' + highScore + ' ';
            $('#highscore').css('list-style-type', 'none');
            $('#highscore').append(scoreli);
        }
    }
    return;
}