function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess);
    } else {
        console.log("Error: Geolocation is not supported by this browser.");
        return false;
    }
}
function onSuccess(position) {
	this.coords = position.coords;
}