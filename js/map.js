/* global flag for setting all layers on/off */
/* allLayersOnOff = 0  means layers off by default */
 var allLayersOnOff = 0;
 
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
	
	"esri/tasks/PrintTask",  
    "esri/tasks/PrintTemplate",  
    "esri/tasks/PrintParameters",  
	
	"dojo/on", 
	"dojo/dom", 
	"dojo/domReady!"
	], 
	function(Map, Popup, PopupTemplate, BasemapGallery, FeatureLayer, SimpleFillSymbol, 
			Color, domClass, domConstruct, HomeButton, SimpleRenderer, 
			PictureMarkerSymbol, Search, PrintTask, PrintTemplate, PrintParameters, on, dom ) {

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
          title: "Burn Details",
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
           map: map
        }, "srch-term");
        search.startup();		
		
		/* Home button */
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
		

		// Listens to the basemap selection and set the title
		on(basemapGallery, "onSelectionChange", function() {
		  dom.byId("userMessage").innerHTML = basemapGallery.getSelected().title;
		});
		
		
		/* Basemap - First button - streets */
		$('#streets').click(function(){
			 map.setBasemap("streets");
		});
		/* Basemap - Second button - gray */
		$('#gray').click(function(){
			 map.setBasemap("gray");
		});
		/* Basemap - Third button - national geographic */
		$('#national_geographic').click(function(){
			 map.setBasemap("national-geographic");
		});
		/* Basemap - Forth button - hybrid */
		$('#hybrid').click(function(){
			 map.setBasemap("hybrid");
			 //alert({BURN_STATUS} );
		});
	
		// Adding layers to the map
		
		// InProgress layer
		var inProgressLayer = new FeatureLayer("http://nvt.dse.vic.gov.au/arcgis/rest/services/BusinessApps/burnplan_csdl/MapServer/1", {visible:false});
		map.addLayer(inProgressLayer);

		var nxt24Layer = new FeatureLayer("http://nvt.dse.vic.gov.au/arcgis/rest/services/BusinessApps/burnplan_csdl/MapServer/2", {
		outFields: ["*"],
		infoTemplate: template,
		visible:false});
		
		map.addLayer(nxt24Layer);

		// Next 10 days layer
		var within10DaysLayer = new FeatureLayer("http://nvt.dse.vic.gov.au/arcgis/rest/services/BusinessApps/burnplan_csdl/MapServer/3", {
		outFields: ["*"],
		infoTemplate: template,
		visible:false});
		
		within10DaysLayer.setRenderer(nxt10Renderer); 
		map.addLayer(within10DaysLayer);
		
		// Patrol layer
		var patrolLayer = new FeatureLayer("http://nvt.dse.vic.gov.au/arcgis/rest/services/BusinessApps/burnplan_csdl/MapServer/4", {visible:false});
		map.addLayer(patrolLayer);
		
		
		// Safe layer
		var safeLayer = new FeatureLayer("http://nvt.dse.vic.gov.au/arcgis/rest/services/BusinessApps/burnplan_csdl/MapServer/5", {
			outFields: ["*"],
			infoTemplate: template,
			visible:true} );
		safeLayer.setRenderer(SafeRenderer);
		map.addLayer(safeLayer);

		// Burn boundary layer
		var burnBoundaryLayer = new FeatureLayer("http://nvt.dse.vic.gov.au/arcgis/rest/services/BusinessApps/burnplan_csdl/MapServer/6", {visible:false});
		map.addLayer(burnBoundaryLayer);

		// Fire districts layer
		var fireDistrictsLayer = new FeatureLayer("http://nvt.dse.vic.gov.au/arcgis/rest/services/BusinessApps/burnplan_csdl/MapServer/7", {visible:false});
		map.addLayer(fireDistrictsLayer);

		// Public Safety zones layer
		var publicSafetyZoneLayer = new FeatureLayer("http://nvt.dse.vic.gov.au/arcgis/rest/services/BusinessApps/burnplan_csdl/MapServer/8", {visible:false});
		map.addLayer(publicSafetyZoneLayer);
		
		// Fire History last 5 years layer
		var last5yearsFireHistoryLayer = new FeatureLayer("http://nvt.dse.vic.gov.au/arcgis/rest/services/BusinessApps/burnplan_csdl/MapServer/9", {visible:false});
		map.addLayer(last5yearsFireHistoryLayer);
		
		
		// Turn all layers on/off - Select all button
		$("#selectAll").on("click", function(){
			if (allLayersOnOff == 0){
				// checkboxes on
				
				
				$("#last5yearsFireHistory").trigger("click");
				$( "#past-burns" ).trigger("click");
				$( "#bushfire" ).trigger("click");
				
				$( "#inProgress" ).trigger("click");
				$( "#nxt24" ).trigger("click");
				$( "#w10Days" ).trigger("click");
				$( "#patrol" ).trigger("click");
				$( "#burnBoundary" ).trigger("click");
				$( "#depiFireDes" ).trigger("click");
				$( "#publicSafetyZone" ).trigger("click"); // the red lines on the map
				
				$( "#burns16_17" ).trigger("click");
				$( "#burns17_18" ).trigger("click");
				$( "#burns18_19" ).trigger("click");
				// layers on
				//past-burnsLayer.show();
				//bushfireLayer.show();
				
				last5yearsFireHistoryLayer.show();
				inProgressLayer.show();
				nxt24Layer.show();
				within10DaysLayer.show();
				patrolLayer.show();
				burnBoundaryLayer.show();
				fireDistrictsLayer.show();
				publicSafetyZoneLayer.show();
				
				//burns16_17Layer.show();
				//burns17_18Layer.show();
				//burns18_19Layer.show();
				allLayersOnOff = 1;
			} else if (allLayersOnOff == 1){
				// checkboxes on
				$("#last5yearsFireHistory").trigger("click");
				$("#past-burns").trigger("click");
				$( "#bushfire" ).trigger("click");
				
				$( "#inProgress" ).trigger("click");
				$( "#nxt24" ).trigger("click");
				$( "#w10Days" ).trigger("click");
				$( "#patrol" ).trigger("click");
				$( "#burnBoundary" ).trigger("click");
				$( "#depiFireDes" ).trigger("click");
				$( "#publicSafetyZone" ).trigger("click");
				
				$( "#burns16_17" ).trigger("click");
				$( "#burns17_18" ).trigger("click");
				$( "#burns18_19" ).trigger("click");
				// layers on
				//past-burnsLayer.hide();
				//bushfireLayer.hide();
				
				last5yearsFireHistoryLayer.hide();
				inProgressLayer.hide();
				nxt24Layer.hide();
				within10DaysLayer.hide();
				patrolLayer.hide();
				burnBoundaryLayer.hide();
				fireDistrictsLayer.hide();
				publicSafetyZoneLayer.hide();
				
				//burns16_17Layer.hide();
				//burns17_18Layer.hide();
				//burns18_19Layer.hide();
				allLayersOnOff = 0;
			}

		});

		
		// Show/hide layers when checkboxes are clicked
		$("#last5yearsFireHistory").on("click", function(){
			if(last5yearsFireHistory.checked) {
				last5yearsFireHistoryLayer.show();
			} else {
				 inProgressLayerLayer.hide();
			}
		});
		
		$("#inProgress").on("click", function(){
			if(inProgress.checked) {
				inProgressLayer.show();
			} else {
				 inProgressLayer.hide();
			}
		});

		$("#nxt24").on("click", function(){
			if(nxt24.checked) {
				nxt24Layer.show();
			} else {
				nxt24Layer.hide();
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
		
		// Set the safe layer checkbox ticked by default
		$( "#safe" ).attr( "checked", true );

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

		//$( "#depiFireDes" ).attr( "checked", true );
		
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
		
		/* Social media share buttons */
		
		
		$(".socMedShare").on("click", function(){

			$('#spinningWheel').css("display", "inline");	
			$('#spinningWheel').css("position", "absolute");	
			$('#spinningWheel').css("top", "50%");	
			$('#spinningWheel').css("left", "50%");
			$('#spinningWheel').css("z-index", 10000);

			var template = new PrintTemplate();  
			template.exportOptions = {  
			  width: 500,  
			  height: 400,  
			  dpi: 96  
			};  
			template.format = "JPG";  
			template.layout = "MAP_ONLY";  
			template.preserveScale = false;  
			var params = new PrintParameters();  
			params.map = map;  
			params.template = template;  
			var printTask = new PrintTask("http://maps.decaturil.gov/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");  

			var doc1 = "<!DOCTYPE html><html><head>";
			var styleTag  = "<style> body{ background-color:#005135;} #mapImg{ width:590px; height: 500px;}"
			    styleTag += " .left{ float:left; width:33%; } "
				styleTag += " .cenPad{ text-align: center; padding-top:10px;} ";
				styleTag += " .SocIcon{width: 30px; height: 30px;} <\/style>"
			
			printTask.execute(params, function (imagePath) {  
			snapshot = imagePath.url;
			 
			var fbPopup = "<script> function fbPopup(){ window.open('https://www.facebook.com/sharer/sharer.php?u=" + snapshot+ "','','menubar=no, toolbar=no, resizable=yes, scrollbars=yes, height=600,width=600');} ";
			var twPopup = " function twPopup(){ window.open('http://twitter.com/share?url=" + snapshot+ "','Share the map snapshot','menubar=no, toolbar=no, resizable=yes, scrollbars=yes, height=600,width=600');} ";
			var gPopup = " function gPopup(){ window.open('https://plus.google.com/share?url=" + snapshot+ "','','menubar=no, toolbar=no, resizable=yes, scrollbars=yes, height=600,width=600');} ";
			var doc2 = "<\/script></head> <body> <div> ";
			var mapImgDIV = "<div><img src='" + snapshot + "' id='mapImg'> </div>";
			var fbDIV = " <div class='cenPad'> <div> <a class='left' href='#' onclick='fbPopup()'> <img src = 'images/facebook.png' class='SocIcon' alt='facebook'></a> </div>";
			var twDIV = "<div> <a class='left' href='#' onclick='twPopup()'> <img src = 'images/twitter.png' class='SocIcon' alt='twitter'></a> </div>";
			var gDIV = "<div>  <a class='left' href='#' onclick='gPopup()'> <img src = 'images/googlePlus.png' class='SocIcon' alt='Gplus'></a> </div> </div>";
			var closeBtn = "<div style='text-align: center;'> <button  onclick='window.close()'> Close </button> </div>";
			var doc3 = "</div>  </body> </html>";
			var docWhole = doc1+styleTag+fbPopup+twPopup+gPopup+doc2+mapImgDIV+ fbDIV + twDIV + gDIV  + closeBtn + doc3;
			
			var top = ( $(window).height() / 2 - 250 );
			var left = ($(window).width() / 2 - 250);
			
			$('#spinningWheel').css("display", "none");	
			var options  = 'menubar=no, toolbar=no, resizable=yes, location=no,status=no, directories=0';
			    options += ',titlebar=no, scrollbars=yes,  left=' + left + ', top='+ top;// + ',screenX=' 
				options += ',height=600, width=600';
			console.log(options);
			var showImg = window.open(snapshot,'',options);
												
			showImg.document.write(docWhole);

			}, function (err){  
				console.log(err);  
			  });  
					
		});
		



		
    });

// national-geographic, hybrid, topo, gray, dark-gray, oceans, osm


















