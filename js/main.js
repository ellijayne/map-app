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
    myPlaces = placesFromLocalStorage;
    renderMarkers();
  }
}

function addPlace(event) {
  myPlace.push({
    position: event.latLng
  });

  localStorage.setItem('myPlaces', JSON.stringify(myPlaces));
  renderMarkers();
}

function renderMarkers() {
  googleMap.markerList.forEach(m => m.setMap(null));
  googleMap.markerList = [];

  myPlaces.forEach((place) => {
    const marker = new google.maps.Marker({
      position: place.position,
      map: googleMap
    });

    googleMap.markerList.push(marker);
  });
}

init();
