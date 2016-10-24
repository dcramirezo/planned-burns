var package_path = "//esri.github.com/bootstrap-map-js/src/js";
var dojoConfig = {
	packages: [{
		name: "application",
		location: package_path
	}]
};

/* Responsive map */
window.addEventListener("resize", ChnMapHeight);
function ChnMapHeight() {
	var height = window.innerHeight ;
	/* If it's a tablet/mobile then deduct the logo and utility bar height from the total height to resize the map's height based on that*/
	if (height <=818) height = height-80 + "px"; 
	else  height = height-50 + "px";
	document.getElementById('mapDiv').style.height = height; /* Change the height of the map then reload it*/
}

	/* Resize the map-canvas div based on the device's height when the page loads */
window.onload = function(){
	var height = window.innerHeight ;
	/* If it's a tablet/mobile then deduct the logo and utility bar height from the total height to resize the map's height based on that*/
	if (height <=818) height = height-80 + "px"; 
	else  height = height-50	+ "px";
	document.getElementById('mapDiv').style.height = height; /* Change the height of the map then reload it*/
}				

