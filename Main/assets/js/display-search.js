var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');

function getParams() {
  // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
  var searchParamsArr = document.location.search.split('=');

  // Get the query and format values
  var query = searchParamsArr[0].split('=').pop();
  var format= searchParamsArr[1].split('=').pop();
  console.log(query, " query inside of get params line 12")
  console.log(format, " format inside of get params line 13")

  searchApi(format);
}

function printResults(resultObj) {
  console.log(resultObj);

  // set up `<div>` to hold result content
  var resultCard = document.createElement('div');
  resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

  var resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  var titleEl = document.createElement('h3');
  titleEl.textContent = resultObj.dt_txt;

  
 var iconEl = document.createElement('img');
iconEl.src='https://openweathermap.org/img/wn/' + resultObj.weather[0].icon +'@2x.png';
titleEl.appendChild(iconEl);

  console.log(iconEl.innerHTML, 'line 37');
  var bodyContentEl = document.createElement('p');
  bodyContentEl.innerHTML =
    '<strong>Temp:</strong> ' + resultObj.main.temp + '<br/>';

  if (resultObj.main.humidity) {
    bodyContentEl.innerHTML +=
      '<strong> Humidity:</strong> ' + resultObj.main.humidity + '%<br/>';
  } else {
    bodyContentEl.innerHTML +=
      '<strong> Humidity:</strong> No humidity for this entry.';
  }

  if (resultObj.wind.speed) {
    bodyContentEl.innerHTML +=
      '<strong> Wind Speed:</strong> ' + resultObj.wind.speed+ ' mph';
  } else {
    bodyContentEl.innerHTML +=
      '<strong> Wind Speed:</strong>  No wind speed for this entry.';
  }


  resultBody.append(titleEl, bodyContentEl);

  resultContentEl.append(resultCard);
}

function searchApi(format) {
  var locQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+format+
  '&appid=84aed0b07a62e54e52d255bf71c6304e&units=imperial';

console.log(locQueryUrl, 'locquery line 66')

  fetch(locQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (locRes) {
      // write query to page so user knows what they are viewing
      console.log(format, "format line 79");
      resultTextEl.textContent = locRes.city.name;

      console.log(locRes);

      if (locRes.results == 0) {
        console.log('No results found!');
        resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
      } else {
        console.log('line 87 locres.x.x', locRes.city.name)
        resultContentEl.textContent = '';
        for (var i = 0; i < 40; i++) {
          if((i== 0)||(i==8) ||(i==16) ||(i==24)||(i==32)){
            console.log(locRes.list[i], "line 90");
          printResults(locRes.list[i]);
        }}
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;
  
  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  searchApi(searchInputVal);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

getParams();
