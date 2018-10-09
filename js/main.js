console.log('hello again');

  // let googleMap;
let myPlaces = [];


  //////////// init() function initializes the map element using Google Maps API, sets up the map click action and then tries to load markers from the localStorage.

let map;


  initMap = function() {
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
      document.getElementById('favPlacesList').textContent('<p>' + 'hey ' + place.name + 'Place ID: ' + place.place_id + '<br>' + place.formatted_address + '</p>')
      console.log('hellooooo')

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

  //commented out code below was ensureing that the window was loaded and the initMap had a 1500ms delay before being called which gave the script time to load the actual defining functions... but because we took out the callback in the script tags on the HTML page we ensured everything would be loaded before anything was called so there is no need for them anymore

// window.onload = function() {
//   setTimeout(initMap,1500)
     initMap();
  //}
