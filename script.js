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

        /** API CODE
        let apiKey = '';
        let perPage = '&per_page=5';
        let baseURL = 'https://api.unsplash.com/photos/random/?';
        let unsplashRequest = baseURL + 'query=' + currentLocation + '&' + apiKey + '&' + perPage;

        fetch(unsplashRequest)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error))

        //fetch random facts from API
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

