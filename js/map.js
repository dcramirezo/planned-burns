
require([
	"esri/map", 
	"esri/dijit/BasemapGallery",
	"esri/layers/FeatureLayer",
	"dojo/on", 
	"dojo/dom", 
	"dojo/domReady!"
	], 
	function(Map, BasemapGallery, FeatureLayer, on, dom) {
		// Create map
		var map = new Map("mapDiv",{ 
		  basemap: "national-geographic",
		  center: [145.45,-37],
		  zoom: 7
		});

	//"esri/layers/FeatureLayer",
	//"esri/views/MapView",


		// Create and add the maps from ArcGIS.com 
		var basemapGallery = new BasemapGallery({
		  showArcGISBasemaps: true,
		  map: map
		}, "basemapGallery");
		basemapGallery.startup();
		

		// Listen to the basemap selection and set the title
		on(basemapGallery, "onSelectionChange", function() {
		  dom.byId("userMessage").innerHTML = basemapGallery.getSelected().title;
		});
		
		
		/* Basemap - First button - Imagery */
		$('#streets').click(function(){
			 map.setBasemap("streets");
		});
		/* Basemap - Second button - Imagery */
		$('#imagery').click(function(){
			 map.setBasemap("hybrid");
		});
		/* Basemap - Third button - Imagery */
		$('#national_geographic').click(function(){
			 map.setBasemap("national-geographic");
		});
		/* Basemap - Forth button - Imagery */
		$('#topo').click(function(){
			 map.setBasemap("topo");
		});

	 // var featureLayer1 = new FeatureLayer({
		//url: "http://nvt.dse.vic.gov.au/arcgis/rest/services/BusinessApps/burnplan_csdl/MapServer/3"
	  //});
	  var featureLayer2 = new FeatureLayer({
		url: "http://nvt.dse.vic.gov.au/arcgis/rest/services/BusinessApps/burnplan_csdl/MapServer/5"
	  });
	 // map.add(featureLayer1);	  
	  map.add(featureLayer2);	  
		

    });

// national-geographic, hybrid, topo, gray, dark-gray, oceans, osm


















