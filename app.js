//get info from API about Toronto
//after I get info, display category, question, and value

  //insert all properties randomly into grid
    //wrap category into p with a class of category and put it inside div with a class of qSide
    //wrap question into p with a class of question and put it inside div with a class of qSide
    //wrap value into p with a class of ballaBills and put it inside div with a class of unmoved

//after question is displayed, on click, display answer
  //wrap answer in p with a class of answer put it inside div with a class of aSlide

//on click of aSlide.yes, add value to bank

//on click of aSlide.no, subtract from bank
var overlayshown = false;


$( document ).ready(function(){

     $('button.close').on('click', function(){
          $(".overlay").css("display", "none");
          overlayshown = true;

      $('button').on('click', function(){
        $(this).css("background-color", "#140147")

      });
}); 
});



var app = {};

app.total = 0;

app.getQuest = function () { 

  $.ajax({
    type: 'GET',
    dataType: 'jsonp',
    format: 'jsonp',
    url: 'http://wolfewylie.com/cgi-bin/jeopardy.py',
    data: {
      question: 'Toronto' //or any other keyword
    },
    success: function (data) {
      app.displayQ(data); //data= what comes back from API

    }, //End Success Function
  }); //end of ajax
}; //end of app.getQuest

app.displayQ = function (jeopardyData) {

  // Randomly sorts an array. Cool.
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  var shuffled = shuffle(jeopardyData);
  

  $.each(shuffled, function(index, cupcake) {

      var $category = '<h3>' + 'Category: ' + cupcake.category + '</h3>';
      var $question = '<p>' + cupcake.question + '</p>';
      var $value = '<p class="value">' + cupcake.dollars + '</p>';
      var $answer = '<p class="answer ">' + cupcake.answer + '</p>' + '<p> Did you get it right?</p>' + '<button class="yes fa fa-check">' + '</button>' + '<button class="no fa fa-times">' + '</button>';
      // var $box = $('<button>').addClass('front').append($category, $question, $value); //this collects everything in one place
      var $boxFront = $('<div>').addClass('front').append($category, $question, $value);
      var $boxBack = $('<div>').addClass('back').append($category, $answer, $value);
      var $flipper = $('<div>').addClass('flipper').append($boxFront, $boxBack);
      $('.grid').append($flipper);
      // var $question
      // var $dollars
      if (index == 20){
        return false;
      }
    
    //if index = 24, return false
  });
}



app.addToBank = function (){

  $('.grid').on('click', '.back button.yes', function(){

    $('button').addClass('flash');
    var ballars = $(this).siblings('.value').text();
    if (ballars !== 'None') {
      var dammitWill = parseFloat(ballars.replace(/\$|,/g, ''));
      app.total += dammitWill;
      $('.total').text('$' + app.total);
      console.log ("WOOOOOOO");
      app.displayText();
    }
 });

  $('.grid').on('click', '.back button.no', function(){
      $('button').addClass('flash');
      var ballars = $(this).siblings('.value').text();
      if (ballars !== 'None') {
        var dammitWill = parseFloat(ballars.replace(/\$|,/g, ''));
        app.total -= dammitWill;
        $('.total').text('$' + app.total);
        console.log ("BOOOOOOO");
        app.displayText()
        }
  });
}

app.displayText = function (){
  console.log(app.total);
  if (app.total === 0){
    console.log(app.total)
    $('.message').html('<p>Either you\'re not playing or you\'re really bad. Get your stuff together and click something. Do you even live here?</p>');
  }

  else if (app.total <= 3000 && app.total >= 0){
    console.log(app.total);
    $('.message').html('<p>Okay, you answered at least one question right. Whoooopeee. Did you Google the answer? You totally Googled the answer, didn\'t you. </p>');
  }

  else if (app.total <= 8000 && app.total >=3001){
    $('.message').html('<p>You have over $3,000 and you think you\'re a hotshot? Well, you\'re not. You\'re not playing for real money. These are just numbers on the internet. You still have $12 in your bank account and an unsustainable brunch addiction. But be my guest, keep procrastinating on the real work you\'re supposed to be doing. </p>');
  }

  else if (app.total <= 10000 && app.total >= 8001){
    $('.message').html('<p>If you want to sit here and give yourself carpal tunnel while clicking the green checkmark just to make yourself feel better about your virtual money-making abilities, know I will not be responsible for your untimely demise brought on purely by playing too many video games. Rethink your life choices, go outside, call your mom, get a puppy. Leave my game alone. Right after you tell all your friends about it. </p>');
  }

  else if (app.total <= -3000 && app.total >= -5999){
    $('.message').html('<p>Give up now.</p>');
  }

  else if (app.total <= -6000 && app.total >= -19999){
    $('.message').html('<p>Dude, come on. You have Google right in front of you. It\'s ok to cheat. Click the checkmark a couple of times, get yourself out of this rut. You can do it. Taylor Swift believes in you.</p>');
  }

}


//if value of bank is 0<= display snarky easy message
//else if value of bank is $3,000 <= display snarky medium message
//else if value of bank $3,001>= display snarky get a life message

app.events = function() {
  $('.grid').on('click', '.flipper', function() {
    $(this).addClass('clicked');
  });
};

//actual app:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
app.init = function(){
  //code to kick off app goes here
  app.events();
  app.getQuest();
  app.addToBank();
  app.displayText();
};


//if all objects in grid get a class of aSide, make it rain racoons ============ HOW DO I DO THIS?!?!??!?! ================================================================================ THIS IS EXTRA, I GUESS

$(function() {
  app.init();
});

