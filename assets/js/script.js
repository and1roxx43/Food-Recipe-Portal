var mexican = document.getElementById('mexican');
var asian = document.getElementById('asian');
var italian = document.getElementById('italian');
var indian = document.getElementById('indian');
var comfort = document.getElementById('comfort');
var closeMap = document.getElementById('close-map');

var mapContainer = document.querySelector('.map-container');

var bodyOpacity = document.querySelector('.body-opacity');

var mex = document.querySelector('.mex');
var ital = document.querySelector('.italian');
var asia = document.querySelector('.asian');
var indi = document.querySelector('.indian');
var burger = document.querySelector('.comfort');
var findNearBy = document.querySelectorAll('.btn');

// Dietary requirements 
var vegetarians = document.getElementById('vegetarian');
var glutenfree = document.getElementById('glutenFree');
var btnSearch = document.getElementById('search');


// Map place title header
var place = document.createElement('p');
var titleHeaderEl = document.getElementById('title')

var recipeSection = document.querySelector('.recipe-section');

//Recipe API key 

const foodAPIKey = 'b47e1f118d968da542dbeb7d4ae8095f';
const recipeAppId = '15a53fca';

// Declare map
var map;

var cuisineSelected = '';
	
//Declare video variables
var mexicanVids = document.getElementById('mexicanVid')
var italianVids = document.getElementById('italianVid')
var asianVids = document.getElementById('asianVid')
var indianVids = document.getElementById('indianVid')
var comfortFoodVids = document.getElementById('comfortFoodVid')

// event click on each images
mex.addEventListener('click', function() {
    mexican.setAttribute('style', 'display: inline;');
    cuisineSelected = "mexican";
    localStorage.setItem("cuisine-type", "Mexican");
    toggleMapLink();
});

ital.addEventListener('click', function() {
    italian.setAttribute('style', 'display: inline;');
    cuisineSelected = "italian";
    localStorage.setItem("cuisine-type", "Italian");
    toggleMapLink();
});

asia.addEventListener('click', function() {
    asian.setAttribute('style', 'display: inline;');
    cuisineSelected = "asian";
    localStorage.setItem("cuisine-type", "Asian");
    toggleMapLink();
});

indi.addEventListener('click', function() {
    indian.setAttribute('style', 'display: inline;');
    cuisineSelected = "indian";
    localStorage.setItem("cuisine-type", "Indian");
    toggleMapLink();
});

burger.addEventListener('click', function() {
    comfort.setAttribute('style', 'display: inline;');
    cuisineSelected = "american";
    localStorage.setItem("cuisine-type", "Comfort food");
    toggleMapLink();
});

/**
 * change opacity of the body
 */
function Opacity() {
    bodyOpacity.setAttribute('style', 'display: block; opacity: 0.5;');
}

/**
 *  hide or show the maps link 
 */
function toggleMapLink() {
    var arr = [italian, mexican, comfort, indian, asian];
    arr.forEach(function(item) {
        if (item.id.toUpperCase() === cuisineSelected.toUpperCase()) {
            item.setAttribute('style', 'display: inline;');
        } else if (cuisineSelected.toUpperCase() === "AMERICAN") {
            comfort.setAttribute('style', 'display: inline;');
        } else {
            item.setAttribute('style', 'display: none;');
        }
    });
}

/**
 * Function to set and call google map api
 */
function googleMapCall() {
    // find each restaurants based on on query in current location
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: latitude,
            lng: longitude
        },
        zoom: 12,
    });
    var request = {
        location: map.getCenter(),
        query: cuisineSelected,
        radius: 5000,
        types: ['restaurant', 'cafe', 'food']
    }

    var service = new google.maps.places.PlacesService(map);

    service.textSearch(request, callback);

    place.textContent = localStorage.getItem("cuisine-type") + " Restaurants near by...";
    titleHeaderEl.append(place);
}

// click on find a near by restaurants
mexican.addEventListener('click', function() {
    Opacity();
    mapContainer.style.display = "flex";
    googleMapCall();
});


asian.addEventListener('click', function() {
    Opacity();
    mapContainer.style.display = "flex";
    googleMapCall();
});

italian.addEventListener('click', function() {
    Opacity();
    mapContainer.style.display = "flex";
    googleMapCall();
});

indian.addEventListener('click', function() {
    Opacity();
    mapContainer.style.display = "flex";
    googleMapCall();
});

comfort.addEventListener('click', function() {
    Opacity();
    mapContainer.style.display = "flex";
    googleMapCall();
});



// ----- Find current location ---------
function success(pos) {
    var crd = pos.coords;
    latitude = crd.latitude;
    console.log(latitude);
    longitude = crd.longitude;
    console.log(longitude);

}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error);


// If status is ok, markers are placed in each location 

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results.length);

        results.forEach(element => {
            createMarker(element);
        });
    }
}


// Place markers based on location
function createMarker(place) {

    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        label: place.name

    })

}

// Close map event
closeMap.addEventListener('click', function() {
    mapContainer.setAttribute("disabled", true);
    location.reload();
    findNearBy.forEach(element => {
        element.setAttribute("disabled", true);
    })
});

//adding button evenet listener
btnSearch.addEventListener('click', function() {
    recipeApiCall();
});

/**  Recipe api call */
var recipeApiCall = function() {
    var query = "";
    if (vegetarians.checked)
        query += "vegetarian";
    if (glutenfree.checked)
        query += "gluten-free";

    var apiUrl = "";
    if (query.trim())
        apiUrl = 'https://api.edamam.com/search?q=vegetarian,gluten-free&app_id=' + recipeAppId + '&app_key=' + foodAPIKey + '&from=0&to=5&cuisineType=' + cuisineSelected;
    else
        apiUrl = 'https://api.edamam.com/search?q=' + cuisineSelected + '&app_id=' + recipeAppId + '&app_key=' + foodAPIKey + '&from=0&to=5&cuisineType=' + cuisineSelected;

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    displayRecipeSection(data);
                });
            } else {
                alert('Error fetching recipes: ' + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to fetch the weather details.');
        });
}

/**
 * display recipe section dynamically
 * @param {*} data 
 */
function displayRecipeSection(data) {
    if (data.hits) {
        var count = 0;
        recipeSection.innerHTML = "";

        var recipeHeading = document.createElement('div');
        recipeHeading.innerHTML = cuisineSelected == "american" ? "Comfort Food".toUpperCase() : cuisineSelected.toUpperCase() + " RECIPES";
        recipeHeading.id = 'recipe-section-heading';
        recipeSection.appendChild(recipeHeading);

        data.hits.forEach(function(recipe) {
            console.log(recipe);
            var recipeContainer = document.createElement('div');
            recipeContainer.id = "recipe-" + count;
            recipeContainer.setAttribute("class", 'recipe-container');

            //adding image to recipe
            var recipeImg = document.createElement('img');
            recipeImg.setAttribute("src", recipe.recipe.image);
            recipeImg.setAttribute("class", "recipe-img");
            recipeContainer.appendChild(recipeImg);
            //adding link 
            var recipeLink = document.createElement('a');
            recipeLink.setAttribute("href", recipe.recipe.url);
            recipeLink.setAttribute("class", "recipe-link");

            recipeLink.innerHTML = recipe.recipe.label;
            recipeContainer.appendChild(recipeLink);
            recipeSection.appendChild(recipeContainer);
        });
    }
}

/**
 * function show youtube videos
 */
function showVideos(){
    mexicanVids.style.display = "none";
    italianVids.style.display = "none";
    asianVids.style.display = "none";
    indianVids.style.display = "none";
    comfortFoodVids.style.display = "none";
      if (cuisineSelected == "mexican"){
        mexicanVids.style.display = "block";
      }
      else if (cuisineSelected == "italian"){
        italianVids.style.display = "block";
      }
      else if (cuisineSelected == "asian"){
        asianVids.style.display = "block";
      }
      else if (cuisineSelected == "indian"){
        indianVids.style.display = "block";
      }
      else if (cuisineSelected == "american"){
        comfortFoodVids.style.display = "block";
      }
    }