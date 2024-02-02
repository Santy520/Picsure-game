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