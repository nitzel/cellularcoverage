function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
	        this.coords = position.coords;
        });
        return true;
    } else {
        console.error("Error: Geolocation is not supported by this browser.");
        return false;
    }
}