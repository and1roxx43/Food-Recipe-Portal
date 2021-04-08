const mexican = document.getElementById('mexican');
const asian = document.getElementById('asian');
const italian = document.getElementById('italian');
const indian = document.getElementById('indian');
const comfort = document.getElementById('comfort');
const closeMap = document.getElementById('close-map');

const mapContainer = document.querySelector('.map-container');

const opacity = document.querySelector('.opacity');

const mex = document.querySelector('.mex');
const ital = document.querySelector('.italian');
const asia = document.querySelector('.asian');
const indi = document.querySelector('.indian');
const burger = document.querySelector('.comfort');
const findNearBy = document.querySelectorAll('.btn');


// Declare map
var map;

// event click on each images
mex.addEventListener('click', function(){
    mexican.setAttribute('style', 'display: inline;');
    ital.style.pointerEvents = 'none';
    asia.style.pointerEvents = 'none';
    indi.style.pointerEvents = 'none';
    burger.style.pointerEvents = 'none';
});

ital.addEventListener('click', function(){
    italian.setAttribute('style', 'display: inline;');
    mex.style.pointerEvents = 'none';
    asia.style.pointerEvents = 'none';
    indi.style.pointerEvents = 'none';
    burger.style.pointerEvents = 'none';
});

asia.addEventListener('click', function(){
    asian.setAttribute('style', 'display: inline;');
    mex.style.pointerEvents = 'none';
    ital.style.pointerEvents = 'none';
    indi.style.pointerEvents = 'none';
    burger.style.pointerEvents = 'none';
});

indi.addEventListener('click', function(){
    indian.setAttribute('style', 'display: inline;');
    mex.style.pointerEvents = 'none';
    asia.style.pointerEvents = 'none';
    ital.style.pointerEvents = 'none';
    burger.style.pointerEvents = 'none';
});

burger.addEventListener('click', function(){
    comfort.setAttribute('style', 'display: inline;');
    mex.style.pointerEvents = 'none';
    asia.style.pointerEvents = 'none';
    indi.style.pointerEvents = 'none';
    ital.style.pointerEvents = 'none';
});

function bodyOpacity(){
  
  mapContainer.style.opacity = '1';

  opacity.setAttribute('style', 'display: block; opacity: 0.5;');
}



// click on find a near by restaurants
mexican.addEventListener('click', function(){
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
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log(results.length);
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
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

    mapContainer.style.display = 'none';

    location.reload();

    for(var i = 0; i < findNearBy.length; i++){
        findNearBy[i].style.display = 'none';
    }
});