// the base layers
var baseMaps = {
	//OSM
	"OSM" : L.tileLayer(
		'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
		{
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}
	),
};
// the overlay layers
var overlayMaps = {
	// testone
	"testone" : L.tileLayer.wms(
		"http://map.mringelborn.com:8080/geoserver/wms", 
		{
			layers: 'test:testone',
			format: 'image/png',
			transparent: true,
			version: '1.1.0',
			opacity: 0.5,
		}
	),
}	
var map = L.map(
	'map', 
	{
		center: {
			lat: 65.61406803735737, 
			lng: 22.17461585998535
		},
		zoom: 5,
		maxZoom: 15,
		layers: [
			baseMaps["OSM"],
			overlayMaps["testone"]
		],
	}
);

L.control.layers(baseMaps, overlayMaps).addTo(map);

// Marker & Popupt for visualization of geolocation
var locationMarker = L.marker().bindPopup('This is you!');

// Clicking the locate/stop locating button
function locate(btn) {
	if(btn.textContent=='Locate'){
		// http://leafletjs.com/reference.html#map-locate-options
		map.locate({
			watch:true,
			maximumAge:2000,
			enableHighAccuracy:true,
			setView:true
		});
		btn.textContent = 'Stop locating';
	} else {
		map.stopLocate();
		map.removeLayer(locationMarker);
		btn.textContent='Locate'
	}
}
// when the geolocation was found
// http://leafletjs.com/reference.html#location-event
map.on('locationfound',function(ev){ 
	locationMarker.setLatLng(ev.latlng).addTo(map);
});	   

// if geolocation could not be found
// http://leafletjs.com/reference.html#location-event
map.on('locationerror',function(ev){
	btn.textContent = "does not work: "+ev.message;
});