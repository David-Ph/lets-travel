let platform = new H.service.Platform({
  'apikey': '2OBRib6w7bSzDUxa-I09Av6Is2s-iz6HhMIzTamTyqE'
});

function landmarkGeocode() {
	let title = document.querySelector('h1').textContent;
  var geocoder = platform.getSearchService(),
      landmarkGeocodingParameters = {
        q: title,
        at: '0,0',
        limit: 1
      };

  geocoder.discover(
    landmarkGeocodingParameters,
    showMap,
    (e) => {
    	console.log(e);
    }
  );
}

function showMap(result){
	var locations = result.items[0];
	console.log(locations);
	let defaultLayers = platform.createDefaultLayers();
	let map = new H.Map(
	    document.querySelector('.map'),
	    defaultLayers.vector.normal.map,
	    {
	      zoom: 20,
	      center: { lat: locations.position.lat, lng: locations.position.lng }
	    });

	let marker = new H.map.Marker({lat: locations.position.lat, lng: locations.position.lng});
	map.addObject(marker);

	let mapEvents = new H.mapevents.MapEvents(map);
	let behavior = new H.mapevents.Behavior(mapEvents);

	let ui = H.ui.UI.createDefault(map, defaultLayers);
}

landmarkGeocode();