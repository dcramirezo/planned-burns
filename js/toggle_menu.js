/* Controls the arrow glyphicons of the accardon panels to up and down*/
$(document). ready(function (){
	$('.collapse').on	('shown.bs.collapse', function(){	
		$(this).parent().find('.glyphicon-menu-down').removeClass('glyphicon-menu-down').addClass('glyphicon-menu-up');	
	}).on('hidden.bs.collapse', function() {
		$(this).parent().find('.glyphicon-menu-up').removeClass('glyphicon-menu-up').addClass('glyphicon-menu-down');	
	});
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

/* Switches between "List" view and "map+sidebar" Sections */
$( "#listBtn" ).click(function() {
	if($(this).text() == "List"){
		$(this).text("Map");
		$('#listOfBurns').removeClass("hidden");
		$('#mapSection').addClass("hidden");
		$('#sideBar').addClass("hidden");

	} else if ($(this).text() == "Map"){
		$(this).text("List");
		$('#listOfBurns').addClass("hidden");
		$('#mapSection').removeClass("hidden");
		$('#sideBar').removeClass("hidden");
	
	}
});

/* Print the map - Pops up the print preview page*/
/*Reference link: http://jsfiddle.net/glenn/6mx21ted/ */
  $('#print-md-lg').on('click',
 
    function printMaps() {
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
	
/* Make the table's row in side bar click able*/	
$(document).ready(function() {
    $(".clickable-row").click(function() {
        window.document.location = $(this).data("href");
    });
});

/* List/Map button - toggles the List and Map sections*/
$( "#listBtn-m" ).click(function() {
	if($(this).text() == "List"){
		$(this).text("Map");
		$('#listOfBurns').removeClass("hidden");
		$('#mapSection').addClass("hidden");
	} else if ($(this).text() == "Map"){
		$(this).text("List");
		$('#listOfBurns').addClass("hidden");
		$('#mapSection').removeClass("hidden");
	}
});

/* filter button - mobile/tablets */
$('#filterBtn-m').click(function(){
	$('.popup-m').css("display", "block");
});

// When the user clicks on <span> (x), close the modal
$('#closePopup-m').click(function(){
	$('.popup-m').css("display", "none");
});

/* basemap button  */
$('#basemapBtn').click(function(){
	$('#BasemapToggle').toggle(); //css("display", "block");
});



















