function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function onSuccess(position) {
	$("#geolocation").html('lat: ' + position.coords.latitude + '<br/>long: ' + position.coords.longitude);
}