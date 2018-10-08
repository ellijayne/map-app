console.log('hello again');

// let googleMap;
let myPlaces = [];


//////////// init() function initializes the map element using Google Maps API, sets up the map click action and then tries to load markers from the localStorage.

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 36.2048, lng: 138.2529},
    zoom: 6.8
  });




  map.markerList = [];
  map.addListener('click', addPlace);

  const placesFromLocalStorage = JSON.parse(localStorage.getItem('myPlaces'));
  if (Array.isArray(placesFromLocalStorage)) {
    myPlaces = placesFromLocalStorage; //if something was found
    renderMarkers();                   //in the local storage,
  }
                                //set it as current place list.


  //////////// addPlace() handles the map click — then adds new place to the list and invokes marker rendering.

  function addPlace(event) {
    myPlaces.push({
      position: event.latLng
    });

    localStorage.setItem('myPlaces', JSON.stringify(myPlaces)); //after marker is added, render it
    renderMarkers();                                            // and synchronize local storage
  }


  ////////// renderMarkers() iterates through the places in the array and after clearing the map, puts the markers on it.

  function renderMarkers() {
    map.markerList.forEach(m => m.setMap(null)); //remove all markers
    map.markerList = [];

    myPlaces.forEach((place) => {                     //add new markers
      const marker = new google.maps.Marker({         //basing on "myPlaces"
        position: place.position,                     //array elements
        map: map
      });

      map.markerList.push(marker);
    });
  }
}

initMap();
