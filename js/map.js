(function(window, google){
	//map options
	var  options = { 
       center: {
          lat: -37.4713,
          lng: 144.7852
        },
       zoom: 7,
      disableDefaultUI: false
   }, 
  element = document.getElementById('map-canvas'),

  //map 
  map= new google.maps.Map(element, options); 

  var marker1 = new google.maps.Marker({
      position:{
         lat: -37.4713,
         lng: 144.7852
      },
      map: map
   });

   /*
  var marker2 = new google.maps.Marker({
      position:{
         lat: -37.4713,
         lng: 145.7852
      },
      map: map
   });

   */
// POLYGON

        // Define the LatLng coordinates for the polygon.
        var DateOfBurn =10;
        var chgColorBODate ;
        if (DateOfBurn >10) { chgColorBODate= '#00FF00'; } else { chgColorBODate= '#00FF00';}
        var triangleCoords = [
            {lat: -36.774, lng: 142.190},
            {lat: -35.774, lng: 140.190},
            {lat: -34.774, lng: 141.190}
        ];

		/*
        // Construct the polygon.
        var bermudaTriangle = new google.maps.Polygon({
          paths: triangleCoords,
          strokeColor: chgColorBODate,
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: chgColorBODate,
          fillOpacity: 0.35
        });
        bermudaTriangle.setMap(map);
		*/

// Polygon 2 +++++++++++++++++++++

 // Define the LatLng coordinates for the polygon.
        var triangleCoords1 = [
            {lat: -36.111, lng: 140.190},
            {lat: -35.222, lng: 143.190},
            {lat: -33.774, lng: 144.190}
        ];

        // Construct the polygon.
        var bermudaTriangle1 = new google.maps.Polygon({
          paths: triangleCoords1,
          strokeColor: 'chgColorBODate',
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: chgColorBODate,
          fillOpacity: 0.35
        });
        bermudaTriangle1.setMap(map);

		
		var center;
		function calculateCenter() {
			center = new google.maps.LatLng(-37.4713,144.7852);
		}
		google.maps.event.addDomListener(map, 'idle', function() {
			calculateCenter();
		});
		google.maps.event.addDomListener(window, 'resize', function() {
			var height = window.innerHeight ;
			/* If it's a tablet/mobile then deduct the logo and utility bar height from the total height to resize the map's height based on that*/
			if (height <=818) height = height-80 + "px"; 
			else  height = height+ "px";
			document.getElementById('map-canvas').style.height = height; /* Change the height of the map then reload it*/
			map.setCenter(center);
		});
		/* Resize the map-canvas div based on the device's height when the page loads */
		window.onload = function(){
			var height = window.innerHeight ;
			/* If it's a tablet/mobile then deduct the logo and utility bar height from the total height to resize the map's height based on that*/
			if (height <=818) height = height-80 + "px"; 
			else  height = height-50	+ "px";
			document.getElementById('map-canvas').style.height = height; /* Change the height of the map then reload it*/
			map.setCenter(center);
		}				
}(window, google) );



