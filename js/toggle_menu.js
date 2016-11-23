/* global flag for listBtn-m text value to find it is List or Map*/
/* Map = 0  and List = 1 */
var flagForListMapBtn = 0;

/* Controls the arrow glyphicons of the accardon panels to up and down*/
$(document).ready(function (){
	$('.collapse').on	('shown.bs.collapse', function(){	
		$(this).parent().find('.glyphicon-menu-down').removeClass('glyphicon-menu-down').addClass('glyphicon-menu-up');	
	}).on('hidden.bs.collapse', function() {
		$(this).parent().find('.glyphicon-menu-up').removeClass('glyphicon-menu-up').addClass('glyphicon-menu-down');	
	});

	/* Make the table's row in side bar click able*/	
	$(".clickable-row").click(function() {
		window.document.location = $(this).data("href");
    });
	
	console.log(flagForListMapBtn);
});

/* On window resize event */
$( window ).resize(function() {
	if ($(document).width() < 990) {
		
		if(flagForListMapBtn == 1){          // if listBtn.text = "List"
			$('#listOfBurns').css("display", "inline");
			$('#mapSection').css("display", "none");
			$('#sideBar').css("display", "none");
			
			$("#listBtn").text("Map");
			
			//$('#listOfBurns').css("display", "none");
			//flagForListMapBtn = 0;
			
		} else if(flagForListMapBtn == 0){    // if listBtn.text = "Map"
			$('#listOfBurns').css("display", "none");
			$('#mapSection').css("display", "inline");
			$('#sideBar').css("display", "none");
			
			$("#listBtn").text("List");
			
			//$('#listOfBurns').css("display", "none");
			//flagForListMapBtn = 1;
		}
	} else{
		if(flagForListMapBtn == 1){          // if listBtn.text = "List"
			$('#listOfBurns').css("display", "inline");
			$('#mapSection').css("display", "none");
			$('#sideBar').css("display", "none");
			
			$("#listBtn").text("Map");
			
			//$('#listOfBurns').css("display", "none");
			//flagForListMapBtn = 0;
			
		} else if(flagForListMapBtn == 0){    // if listBtn.text = "Map"
			$('#listOfBurns').css("display", "none");
			$('#mapSection').css("display", "inline");
			$('#sideBar').css("display", "inline");
			
			$("#listBtn").text("List");
			
			//$('#listOfBurns').css("display", "none");
			//flagForListMapBtn = 1;
		}		
	}

});


/* This function toggles the menu button  - mobile/tablets */
function toggleCP(){
	var cp = document.getElementById("cp");
	var cpBtn = document.getElementById("cpBtn");
	var bar1 = document.getElementById("bar1");
	var bar2 = document.getElementById("bar2");
	var bar3 = document.getElementById("bar3");
	
	if(cp.style.opacity == 0.8){
		cp.style.opacity = 0;
		cp.style.display = "none"; // remove it from active screen space
		//change the style of 3 bars
		cpBtn.style.border=" #AAA 1px solid";
		//cpBtn.style.z-index=-"1";
		bar1.style.background= "#4D4D4D";
		bar2.style.background= "#4D4D4D";
		bar3.style.background= "#4D4D4D";
	} else {
		cp.style.right = "0px"; // return it to active screen space
		cp.style.opacity = 0.8;
		cp.style.borderRadius= "5px";
		cp.style.display = "inline"; // remove it from active screen space


		cpBtn.style.border="#06F 1px solid";
		//cpBtn.style.z-index="1000";
		bar1.style.background= "#06F";
		bar2.style.background= "#06F";
		bar3.style.background= "#06F";

	}
}

/* Switches between "List" and "map+sidebar" Sections */
$( "#listBtn" ).click(function() {
	if($(this).text() == "List"){
		$(this).text("Map");
		$('#listOfBurns').css("display", "inline");
		$('#mapSection').css("display", "none");
		$('#sideBar').css("display", "none");
		flagForListMapBtn = 0;
	} else if ($(this).text() == "Map"){
		$(this).text("List");
		$('#listOfBurns').css("display", "none");
		$('#mapSection').css("display", "inline");
		$('#sideBar').css("display", "inline");
		flagForListMapBtn = 1;
	}
});

/* List/Map button - toggles the List and Map sections */
$( "#listBtn-m" ).click(function() {
	if (flagForListMapBtn == 0){  // if listBtn.text = "Map"
		$(this).text("Map");
		$('#listOfBurns').css("display", "inline");
		$('#mapSection').css("display", "none");
		flagForListMapBtn = 1;
		console.log(flagForListMapBtn);
	}else if(flagForListMapBtn == 1){          // if listBtn.text = "List"
		$(this).text("List");
		$('#listOfBurns').css("display", "none");
		$('#mapSection').css("display", "inline");
		flagForListMapBtn = 0;
		console.log(flagForListMapBtn);
	}

});
	

/* Print the map - Pops up the print preview page - laptop/desktop */
/* Reference link: http://jsfiddle.net/glenn/6mx21ted/ */
  $('#print-md-lg').on('click', function printMaps() {
      var body               = $('body');
      var mapContainer       = $('#mapDiv');
      var mapContainerParent = mapContainer.parent();
      var printContainer     = $('<div>');

      printContainer
        .addClass('print-container')
        .css('position', 'relative')
        .height(mapContainer.height())
        .append(mapContainer)
        .prependTo(body);

      var content = body
        .children()
        .not('script')
        .not(printContainer)
        .detach();
        
      // Patch for some Bootstrap 3.3.x `@media print` styles. :|
      var patchedStyle = $('<style>')
        .attr('media', 'print')
        .text('img { max-width: none !important; }' +
              'a[href]:after { content: ""; }')
        .appendTo('head');
		
	  
      window.print();

      body.prepend(content);
      mapContainerParent.prepend(mapContainer);

      printContainer.remove();
      patchedStyle.remove();
    });
	
	
/* Print the map - Pops up the print preview page - mobile/tablets */	
	$('#print-sm-xs').on('click', function printMaps() {
	  var body               = $('body');
	  var mapContainer       = $('#mapDiv');
	  var mapContainerParent = mapContainer.parent();
	  var printContainer     = $('<div>');

	  printContainer
		.addClass('print-container')
		.css('position', 'relative')
		.height(mapContainer.height())
		.append(mapContainer)
		.prependTo(body);

	  var content = body
		.children()
		.not('script')
		.not(printContainer)
		.detach();
		
	  // Patch for some Bootstrap 3.3.x `@media print` styles. :|
	  var patchedStyle = $('<style>')
		.attr('media', 'print')
		.text('img { max-width: none !important; }' +
			  'a[href]:after { content: ""; }')
		.appendTo('head');
		
	  
	  window.print();

	  body.prepend(content);
	  mapContainerParent.prepend(mapContainer);

	  printContainer.remove();
	  patchedStyle.remove();
	});

// When the user clicks on <span> (x), close the modal
$('#closePopup-m').click(function(){
	$('.popup-m').css("display", "none");
});

/* basemap button  */
$('#basemapBtn').click(function(){
	$('#BasemapToggle').toggle(); //css("display", "block");
});














