const mexican = document.getElementById('mexican');
const asian = document.getElementById('asian');
const italian = document.getElementById('italian');
const indian = document.getElementById('indian');
const comfort = document.getElementById('comfort');
const closeMap = document.getElementById('close-map');

const mapContainer = document.querySelector('.map-container');

const bodyOpacity = document.querySelector('.body-opacity');

const mex = document.querySelector('.mex');
const ital = document.querySelector('.italian');
const asia = document.querySelector('.asian');
const indi = document.querySelector('.indian');
const burger = document.querySelector('.comfort');
const findNearBy = document.querySelectorAll('.btn');

// Dietary requirements 
const vegetarians = document.getElementById('vegetarian');
const glutenfree = document.getElementById('glutenFree');
const btnSearch = document.getElementById('search');


// Declare map
var map;

// event click on each images
mex.addEventListener('click', function(){
    mexican.setAttribute('style', 'display: inline;');
    ital.setAttribute("disabled", true);
    asia.setAttribute("disabled", true);
    indi.setAttribute("disabled", true);
    burger.setAttribute("disabled", true);
    // vegetarians.setAttribute("disabled", true);
    // glutenfree.setAttribute("disabled", true);
});

ital.addEventListener('click', function(){
    italian.setAttribute('style', 'display: inline;');
    mex.setAttribute("disabled", true);
    asia.setAttribute("disabled", true);
    indi.setAttribute("disabled", true);
    burger.setAttribute("disabled", true);
});

asia.addEventListener('click', function(){
    asian.setAttribute('style', 'display: inline;');
    mex.setAttribute("disabled", true);
    ital.setAttribute("disabled", true);
    indi.setAttribute("disabled", true);
    burger.setAttribute("disabled", true);
});

indi.addEventListener('click', function(){
    indian.setAttribute('style', 'display: inline;');
    mex.setAttribute("disabled", true);
    asia.setAttribute("disabled", true);
    ital.setAttribute("disabled", true);
    burger.setAttribute("disabled", true);
});

burger.addEventListener('click', function(){
    comfort.setAttribute('style', 'display: inline;');
    mex.setAttribute("disabled", true);
    asia.setAttribute("disabled", true);
    indi.setAttribute("disabled", true);
    ital.setAttribute("disabled", true);
});

function Opacity(){
  bodyOpacity.setAttribute('style', 'display: block; opacity: 0.5;');
}



// click on find a near by restaurants
mexican.addEventListener('click', function(){

  Opacity();
    mapContainer.style.display = "flex";
// find each restaurants based on on query in current location
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude},
        zoom: 12,
      });
      var request = {
        location: map.getCenter(),
        query: 'mexican',
        radius: 5000,
        types: ['restaurant', 'cafe', 'food']
      }
    
      var service = new google.maps.places.PlacesService(map);
    
      service.textSearch(request, callback);

});


asian.addEventListener('click', function(){

  Opacity();
    mapContainer.style.display = "flex";


    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude},
        zoom: 12,
      });
      var request = {
        location: map.getCenter(),
        query: 'chinese',
        radius: 5000,
        types: ['restaurant', 'cafe', 'food']
      }
    
      var service = new google.maps.places.PlacesService(map);
    
      service.textSearch(request, callback);

});

italian.addEventListener('click', function(){

  Opacity();
    mapContainer.style.display = "flex";

    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude},
        zoom: 12,
      });
      var request = {
        location: map.getCenter(),
        query: 'italian',
        radius: 5000,
        types: ['restaurant', 'cafe', 'food']
      }
    
      var service = new google.maps.places.PlacesService(map);
    
      service.textSearch(request, callback);

});

indian.addEventListener('click', function(){

  Opacity();

    mapContainer.style.display = "flex";

    map = new google.maps.Map(document.getElementById("map"), {

        center: { lat: latitude, lng: longitude},
        zoom: 12,
      });
      var request = {
        location: map.getCenter(),
        query: 'indian',
        radius: 5000,
        types: ['restaurant', 'cafe', 'food']
      }
    
      var service = new google.maps.places.PlacesService(map);
    
      service.textSearch(request, callback);

});

comfort.addEventListener('click', function(){

  Opacity();

    mapContainer.style.display = "flex";

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: latitude, lng: longitude},
        zoom: 12,
      });
      var request = {
        location: map.getCenter(),
        query: 'burgers',
        radius: 5000,
        types: ['restaurant', 'cafe', 'food']
      }
    
      var service = new google.maps.places.PlacesService(map);
    
      service.textSearch(request, callback);

});



// ----- Find current location ---------
function success(pos){
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
closeMap.addEventListener('click', function(){

    mapContainer.setAttribute("disabled", true);

    location.reload();

    findNearBy.forEach(element => {
      element.setAttribute("disabled", true);
    })
  });