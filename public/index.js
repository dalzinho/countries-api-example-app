var countries = null;
var scoreCount = 0;


var makeRequest = function(url, callback){
  // create a new XMLHttpRequest object.
  var request = new XMLHttpRequest();

  //set the type of request, and the URL.
  request.open("GET", url);

  // set the callback we want it to use when the request is complete.
  request.onload = callback;

  // send the request
  request.send();
};

var requestComplete = function(){
  console.log("request complete");
  if(this.status !== 200){ //'this' refers to the XMLHttpRequest object created above. status is its instance variable
    return;
}

  //grab the response text
  var jsonString = this.responseText; //  'responseText' is also an instance variable of the XMLHttpRequest object.
  countries = JSON.parse(jsonString);

  populateDropDown(countries);
};

// var populateList = function(countries){
//   var ul = document.querySelector('#country-list');
//   console.log(countries[0]);
//   countries.forEach(function(country){
//     var li = document.createElement('li');
//     li.innerText =  country.name + "   |   " + country.nativeName;
//     ul.appendChild(li);   
//   });
// }

// var clickButton = function(){
//   var url = "https://restcountries.eu/rest/v2";
//   makeRequest(url, requestComplete);
// }

var populateDropDown = function(countries){
  var select = document.querySelector('#country-selector');
  var counter = 0;
  countries.forEach(function(country){
    var option = document.createElement('option');
    option.setAttribute("value", counter);
    option.innerText = country.name;
    select.appendChild(option);
    counter++;
  }) 
};

// var getPossibleAnswers = function(){};

var getCountryFromSelector = function(){
  var selected = document.querySelector('#country-selector');
  console.log(selected.value);
  var country = countries[selected.value];
  console.log(country);
  return country;
}

var populateFacts = function(country){


  var countryFacts = document.querySelector('#country-facts');

  var flag = document.createElement('li');
  var flagImage = document.createElement('img');
  flagImage.setAttribute('src', country.flag);
  flagImage.setAttribute('width', 200);
  flag.appendChild(flagImage);
  countryFacts.appendChild(flag);

  var name = document.createElement('li');
  name.innerText = "Name: " + country.name;
  countryFacts.appendChild(name);

  var population = document.createElement('li');
  population.innerText = "Population: " + country.population.toLocaleString();
  countryFacts.appendChild(population);

  var capital = document.createElement('li');
  capital.innerText = "Capital: " + country.capital;
  countryFacts.appendChild(capital);


};

console.log(countries);  

var hoistFlag = function(){

  var answer = Math.floor(Math.random() * countries.length);
  console.log(countries[answer].name);
  var theFlag = document.querySelector('#the-flag');
  theFlag.setAttribute('src', countries[answer].flag);
  var correctCountry = countries[answer];

  var scoreDisplay = document.querySelector('#score');
  scoreDisplay.innerText = scoreCount;

  var answerDetails = "This is the flag of " + correctCountry.name + ".\n Its population is " + correctCountry.population + ".\n Its capital is " + correctCountry.capital + ".";
  var answerButton = document.querySelector('#submitUserResponse');
  answerButton.onclick = function(){
    var userResponse = document.querySelector('#what-the-monkey-thinks');
    console.log(userResponse.value);


    if(userResponse.value.toLowerCase() == countries[answer].name.toLowerCase()){
      alert('WELL DONE!\n' + answerDetails);
      scoreCount++;
    } else {
      alert('SORRY DUMBASS!\n' + answerDetails);
    }
    userResponse.value = "";


    hoistFlag()
  }

}

var app = function(){

  var url = "https://restcountries.eu/rest/v2";
  makeRequest(url, requestComplete);

  // todo: only allow one click
  var showDetails = document.getElementById('show-details');
  showDetails.onclick = function(){
    populateFacts(getCountryFromSelector());
  };

  var showAll = document.querySelector('#show-all');
  showAll.onclick = function(){
    countries.forEach(function(country){
      populateFacts(country);
    })
  }

  var quizModeButton = document.querySelector('#toggle-to-quiz');
  quizModeButton.onclick = function(){
    console.log('clicked')
    var quizMode = document.querySelector('#quiz-mode');
    quizMode.style.display = 'block';
    var studyMode = document.querySelector('#study-mode');
    studyMode.style.display = 'none';
    hoistFlag();

  }

  var studyModeButton = document.querySelector('#toggle-to_study');
  
  studyModeButton.onclick = function(){
    var quizMode = document.querySelector('#quiz-mode');
    quizMode.style.display = 'none';
    var studyMode = document.querySelector('#study-mode');
    studyMode.style.display = 'block';
  }


}

window.onload = app;