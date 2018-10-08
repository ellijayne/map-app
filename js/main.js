let googleMap;
let myPlaces = [];

function init() {
  googlemap = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0}, zoom: 3
  });

  googleMap.markerList = [];
  googleMap.addListener('click', addPlace);

  const placesFromLocalStorage = JSON.parse(localStorage.getItem('myPlaces'));
  if (Array.isArray(placesFromLocalStorage)) {
    myPlaces = placesFromLocalStorage; //if something was found
    renderMarkers();                   //in the local storage,
  }                                    //set it as current place list.
}

function addPlace(event) {
  myPlace.push({
    position: event.latLng
  });

  localStorage.setItem('myPlaces', JSON.stringify(myPlaces)); //after marker is added, render it
  renderMarkers();                                            // and synchronize local storage
}

function renderMarkers() {
  googleMap.markerList.forEach(m => m.setMap(null)); //remove all markers
  googleMap.markerList = [];

  myPlaces.forEach((place) => {                     //add new markers
    const marker = new google.maps.Marker({         //basing on "myPlaces"
      position: place.position,                     //array elements
      map: googleMap
    });

    googleMap.markerList.push(marker);
  });
}

init();
