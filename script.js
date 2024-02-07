function timer(){
    var timeLeft = 60;
    var timerInterval = setInterval(function() {
      timeLeft--;
      $('#timerEl').text = "Seconds remaining: " + timeLeft;
  
      if(timeLeft == 0) {
        clearInterval(timerInterval);
       //Hide Game Container
       //Show Scoreboard
        return timeLeft = 0;
      }
  
    }, 1000);
}

//Start button event listener
$('#start-button').on('click', startGame());

function startGame(){
    timer();
    var index = 0;
    var score = 0;

    //For testing create image array for locations
    var locations = ['new_york','chicago','san_francisco', 'miami',
                    'los_angeles', 'detroit', 'philadelphia', 'dallas',
                    'boston', 'seattle'];
    shuffleArray(locations);
    playGame(locations, index, score);

}

//Uses shuffled location array to get clues from APIs
function playGame(array, i, score){
    
        let currentLocation = array[i];
        console.log(array);
        console.log(i);

        /** Set up dummy data to display */

        let apiKeyUnsplash = '6ZuknqkaIj1xSrnF1lxmK1vVqUMZyAtTAOR4kLUmdac';
        let queryUnsplash = 'https://api.unsplash.com/photos/random/?';
        let unsplashRequest = queryUnsplash + 'query=' + currentLocation + '&' + apiKeyUnsplash;

        fetch(unsplashRequest).then(function (response) {
        return response.json();
        }).then(function (data) {
            console.log(data);
            let currentImage = response.data.urls.small;
            console.log(currentImage);
        })


        //Get random photo from Unpslash using currentQuestion
        //Get corresponding facts using currentQuestion
        

         /** API CODE FOR WEATHER
        let apiKeyWeather = 'a34c2b8d2c8d04d52a0bced017c36070';
        let weatherRequest = 'https://api.openweathermap.org/data/2.5/weather?q=${currentLocation}&appid=${apiKeyWeather}';
    

        fetch(weatherRequest)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error))

        //Get random photo from Unpslash using currentQuestion
        //Get corresponding facts using currentQuestion
        */

        $('#answer-button').on('submit', function (){
            //Bring in answer choice from form
            let choice = $('').text;
            if (currentLocation === choice){
                //Display Correct Answer!
                score++;
                i++;
                //Set local storage for Score
                console.log('Correct! ' + 'Index: ' + i + ' Score: ' + score);
                playGame(array, i, score);
            }
            else {
                //Display InCorrect Answer!
                i++;
                //Set local storage for score
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
    let farenheit = (temp - 273.15)*1.8 + 32;
    return farenheit;
}

