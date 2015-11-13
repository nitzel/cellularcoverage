function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
	        this.coords = position.coords;
        });
    } else {
        console.log("Error: Geolocation is not supported by this browser.");
        return false;
    }
}