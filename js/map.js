
require([
	"esri/map", 
	"esri/dijit/BasemapGallery",
	"esri/layers/FeatureLayer",
	"esri/dijit/HomeButton",
	 
	"esri/dijit/Popup", 
	"esri/dijit/PopupTemplate",
	"esri/symbols/SimpleFillSymbol", 
	"esri/Color",
	"dojo/dom-class", 
	"dojo/dom-construct", 
    "dojox/charting/Chart", 
	"dojox/charting/themes/Dollar",

	 
	 
	"dojo/on", 
	"dojo/dom", 
	"dojo/domReady!"
	], 
	function(Map, BasemapGallery, FeatureLayer,HomeButton, Popup, PopupTemplate, 
	              SimpleFillSymbol, Color, domClass, domConstruct, Chart, theme, on, dom) {
					  
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
					  
					  
		// Create map
		var map = new Map("mapDiv",{ 
		  basemap: "hybrid",
		  center: [145.45,-37],
		  zoom: 7,
		  logo: false,
		  infoWindow: popup
		});
		
		
        var template = new PopupTemplate({
          title: "Safe Areas 2013",
          description: "Status: {BURN_STATUS} <br /> Burn name: {BURN_NAME}",
		  fieldInfos: [{ //define field infos so we can specify an alias
            fieldName: "Number_Ent",
            label: "Entrants"
          },{
            fieldName: "Number_Sta",
            label: "Starters"
          },{
            fieldName: "Number_Fin",
            label: "Finishers"
          }],
          mediaInfos:[{ //define the bar chart
            caption: "",
            type:"barchart",
            value:{
              theme: "Dollar",
              fields:["Number_Ent","Number_Sta","Number_Fin"]
            }
          }]
        });
		
		

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

		var within10DaysLayer = new FeatureLayer("http://nvt.dse.vic.gov.au/arcgis/rest/services/BusinessApps/burnplan_csdl/MapServer/3", {visible:false});
		map.addLayer(within10DaysLayer);
		
		var patrolLayer = new FeatureLayer("http://nvt.dse.vic.gov.au/arcgis/rest/services/BusinessApps/burnplan_csdl/MapServer/4", {visible:false});
		map.addLayer(patrolLayer);
		
		var safeLayer = new FeatureLayer("http://nvt.dse.vic.gov.au/arcgis/rest/services/BusinessApps/burnplan_csdl/MapServer/5", {
			//mode: FeatureLayer.MODE_ONDEMAND,
			outFields: ["*"],
			infoTemplate: template,
			visible:true} );
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
		
		$("#defaultMap").on("click", function(){
			//alert("default button clicked!");
			map.refresh();
		});

    });

// national-geographic, hybrid, topo, gray, dark-gray, oceans, osm


















