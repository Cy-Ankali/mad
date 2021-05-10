
L.mapbox.accessToken = 'pk.eyJ1IjoiYW5rYWxpIiwiYSI6ImNrb2NuOWZsbTNycngyd212c2dzOTlnZnAifQ.F2PGgpsFPzhX7xee7eK9qQ';
    

	
var light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=' + L.mapbox.accessToken, {
       attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',	   
       tileSize: 512,
       zoomOffset: -1
});
	
	
var dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=' + L.mapbox.accessToken, {
       attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',	   
       tileSize: 512,
       zoomOffset: -1
});
	
	
var satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=' + L.mapbox.accessToken, {
       attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',	   
       tileSize: 512,
       zoomOffset: -1
});
	
var streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=' + L.mapbox.accessToken, {
       attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',	   
       tileSize: 512,
       zoomOffset: -1
});	

	// Was hier ganz unten ist wird zuerst benutzt
	
var baseMaps ={
	"Light" : light,
	"Dark" : dark,
	"Satellite" : satellite,
	"Streets" : streets
};

var map = L.map('map', {
  layers:[light, dark, satellite,streets]
});
  
var myLayer = L.mapbox.featureLayer()
  .loadURL('https://raw.githubusercontent.com/Cy-Ankali/mad/main/test.geojson')
  .on('ready', function() {
    myLayer.eachLayer(function(layer) {
      map.fitBounds(myLayer.getBounds());
      layer.bindPopup(layer.features.properties.title);
	  
	  
    });
  }).addTo(map);
L.control.layers(baseMaps, null).addTo(map);
	