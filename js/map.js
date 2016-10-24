
require([
	"esri/map", 
	
	"esri/dijit/Popup", 
	"esri/dijit/PopupTemplate",
	
	"esri/dijit/BasemapGallery",
	"esri/layers/FeatureLayer",
	"esri/symbols/SimpleFillSymbol", 
	"esri/Color",
	"dojo/dom-class", 
	"dojo/dom-construct", 
	"esri/dijit/HomeButton",
	"esri/renderers/SimpleRenderer",
	"esri/symbols/PictureMarkerSymbol" ,
	
	"esri/dijit/Search",
	
	"dojo/on", 
	"dojo/dom", 
	"dojo/domReady!"
	], 
	function(Map, Popup, PopupTemplate, BasemapGallery, FeatureLayer, SimpleFillSymbol, 
			Color, domClass, domConstruct, HomeButton, SimpleRenderer, 
			PictureMarkerSymbol, Search, on, dom ) {

        //The popup is the default info window so you only need to create the popup and 
        //assign it to the map if you want to change default properties. Here we are 
        //noting that the specified title content should display in the header bar 
        //and providing our own selection symbol for polygons.
        var fill = new SimpleFillSymbol("solid", null, new Color("#A4CE67"));
        var popup = new Popup({
            fillSymbol: fill,
            titleInBody: false
        }, domConstruct.create("div"));
        //Add the dark theme which is customized further in the <style> tag at the top of this page
        domClass.add(popup.domNode, "dark");

        var template = new PopupTemplate({
          title: "Safe Areas 2013",
          description: 
		  "Status: {BURN_STATUS} <br /> Burn name: {BURN_NAME}"
        }); 
		
		/* Set markers for different layers */
		
		/* Safe icon marker*/
		var Safemarker = new PictureMarkerSymbol('http://adkasel.com/map-test-esri/images/icons/safe.png', 30, 30);
		var SafeRenderer = new SimpleRenderer(Safemarker);
		
		/* Next 10 days icon marker*/
		var nxt10Marker = new PictureMarkerSymbol('http://adkasel.com/map-test-esri/images/icons/10day.png', 30, 30);
		var nxt10Renderer = new SimpleRenderer(nxt10Marker);
		
	
		// Create map
		var map = new Map("mapDiv",{ 
		  basemap: "gray",
		  center: [145.45,-37],
		  zoom: 7,
		  logo: false,
		  infoWindow: popup
		});

		/* Search option*/
        var search = new Search({
           map: map,
           
        }, "srch-term");
        search.startup();		
		
		var home = new HomeButton({
			map: map
		  }, "defaultMap");
		 home.startup();		
		
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
		$('#gray').click(function(){
			 map.setBasemap("gray");
		});
		/* Basemap - Third button - Imagery */
		$('#national_geographic').click(function(){
			 map.setBasemap("national-geographic");
		});
		/* Basemap - Forth button - Imagery */
		$('#hybrid').click(function(){
			 map.setBasemap("hybrid");
		});

		var inProgressLayer = new FeatureLayer("http://nvt.dse.vic.gov.au/arcgis/rest/services/BusinessApps/burnplan_csdl/MapServer/1", {visible:false});
		map.addLayer(inProgressLayer);

		var nxt24Layer = new FeatureLayer("http://nvt.dse.vic.gov.au/arcgis/rest/services/BusinessApps/burnplan_csdl/MapServer/2", {visible:false});
		map.addLayer(nxt24Layer);

		var within10DaysLayer = new FeatureLayer("http://nvt.dse.vic.gov.au/arcgis/rest/services/BusinessApps/burnplan_csdl/MapServer/3", {
		outFields: ["*"],
		infoTemplate: template,
		visible:false});
		
		within10DaysLayer.setRenderer(nxt10Renderer); 
		map.addLayer(within10DaysLayer);
		
		var patrolLayer = new FeatureLayer("http://nvt.dse.vic.gov.au/arcgis/rest/services/BusinessApps/burnplan_csdl/MapServer/4", {visible:false});
		map.addLayer(patrolLayer);
		
		var safeLayer = new FeatureLayer("http://nvt.dse.vic.gov.au/arcgis/rest/services/BusinessApps/burnplan_csdl/MapServer/5", {
			outFields: ["*"],
			infoTemplate: template,
			visible:true} );
		safeLayer.setRenderer(SafeRenderer);
		map.addLayer(safeLayer);

		var burnBoundaryLayer = new FeatureLayer("http://nvt.dse.vic.gov.au/arcgis/rest/services/BusinessApps/burnplan_csdl/MapServer/6", {visible:false});
		map.addLayer(burnBoundaryLayer);

		var fireDistrictsLayer = new FeatureLayer("http://nvt.dse.vic.gov.au/arcgis/rest/services/BusinessApps/burnplan_csdl/MapServer/7", {visible:false});
		map.addLayer(fireDistrictsLayer);

		var publicSafetyZoneLayer = new FeatureLayer("http://nvt.dse.vic.gov.au/arcgis/rest/services/BusinessApps/burnplan_csdl/MapServer/8", {visible:false});
		map.addLayer(publicSafetyZoneLayer);
		
		$("#inProgress").on("click", function(){
			if(inProgress.checked) {
				inProgressLayer.show();
			} else {
				 inProgressLayer.hide();
			}
		});

		$("#nxt24").on("click", function(){
			if(nxt24.checked) {
				nxt24LayerLayer.show();
			} else {
				 nxt24LayerLayer.hide();
			}
		});
		
		$("#w10Days").on("click", function(){
			if(w10Days.checked) {
				within10DaysLayer.show();
			} else {
				 within10DaysLayer.hide();
			}
		});
		
		$("#patrol").on("click", function(){
			if(patrol.checked) {
				patrolLayer.show();
			} else {
				 patrolLayer.hide();
			}
		});
		
		$("#safe").on("click", function(){
			if(safe.checked) {
				safeLayer.show();
			} else {
				 safeLayer.hide();
			}
		});

		$("#burnBoundary").on("click", function(){
			if(burnBoundary.checked) {
				burnBoundaryLayer.show();
			} else {
				 burnBoundaryLayer.hide();
			}
		});

		$("#depiFireDes").on("click", function(){
			if(depiFireDes.checked) {
				fireDistrictsLayer.show();
			} else {
				 fireDistrictsLayer.hide();
			}
		});
		
		$("#publicSafetyZone").on("click", function(){
			if(publicSafetyZone.checked) {
				publicSafetyZoneLayer.show();
			} else {
				 publicSafetyZoneLayer.hide();
			}
		});

		
		
    });

// national-geographic, hybrid, topo, gray, dark-gray, oceans, osm


















