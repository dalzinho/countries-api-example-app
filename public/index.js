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
  var countries = JSON.parse(jsonString);

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
  countries.forEach(function(country){
    var option = document.createElement('option');
    option.innerText = country.name;
    select.appendChild(option);
  }) 
};

var app = function(){
  var url = "https://restcountries.eu/rest/v2";
    makeRequest(url, requestComplete);
}

window.onload = app;