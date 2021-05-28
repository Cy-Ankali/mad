

	
// Erzeugen der Karte mit den Basemaps als Layer
var map = null;	
function startMap() {
 map = L.map('map', {
  layers:[streets, light, dark, satellite]
});

// Access Token für MapBox
L.mapbox.accessToken = 'pk.eyJ1IjoiYW5rYWxpIiwiYSI6ImNrb2NuOWZsbTNycngyd212c2dzOTlnZnAifQ.F2PGgpsFPzhX7xee7eK9qQ';
	
	
// Hinzufügen diverser Basemaps für die unterschiedliche Darstellung des Kartenhintergrunds. Möglichkeiten zur Erweiterung.
var streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=' + L.mapbox.accessToken, {
       attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',	   
       tileSize: 512,
       zoomOffset: -1
});
	
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
	
var baseMaps ={
	"Streets" : streets,
	"Light" : light,
	"Dark" : dark,
	"Satellite" : satellite
};
 
var myGeoJson = 'https://raw.githubusercontent.com/Cy-Ankali/mad/main/test1.geojson';

/*
https://lyzidiamond.com/posts/external-geojson-mapbox
https://docs.mapbox.com/mapbox.js/api/v3.3.1/l-mapbox-featurelayer/

mapbox.featureLayer erlaubt das importieren von GeoJSON-Datein mittels URL. Zusätzlich besitzt es eine eingebaute AJAX Funktionalität,
die es erlaubt Daten asynchron einzuladen und dem Layer hinzuzufügen.

*/	
var myLayer = L.mapbox.featureLayer()
  .loadURL(myGeoJson)
  .on('ready', function(data) {
	console.log(data);
    this.eachLayer(function(layer) {
//		console.log(layer);
		
		// Zoom auf den gesamten Bereich der Datenmenge
      	map.fitBounds(myLayer.getBounds());
		
		// Variablen für die Eigenschaften der GeoJSON-Objekte
		let title = layer.feature.properties.title;
		let desc = layer.feature.properties.description;
		let image = layer.feature.properties.image;
		
		// Erzeugen der Popups. Wenn ein Bild hinterlegt ist, dann wird es in dem Popup angezeigt, ansonsten nicht.
		if(typeof image !== "undefined"){ 
			layer.bindPopup(`<div><h1> ${title} <h1/> <br/> <h2> ${desc} <h2/> <br/> <img src="${image}" alt="${desc}"/><div/>`, {maxWidth:"500px",className:"customPopup"});

		}else if(typeof title !== "undefined" || typeof description !== "undefined"){
			layer.bindPopup(`<div><h1> ${title} <h1/> <br/> <h2> ${desc} <h2/> <br/>`, {maxWidth:"500px",className:"customPopup"});
		}
    });
  })
  .addTo(map);
	
// Kontrollschaltfläche für die unterschiedlichen Grundkarten. 
L.control.layers(baseMaps, null).addTo(map);
}