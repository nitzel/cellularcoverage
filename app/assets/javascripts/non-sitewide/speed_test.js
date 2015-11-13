function test_speed() {
	//Size of target
	var size = 10; //Megabyte
	
	$.ajax({
	    beforeSend: function(){
	        // right before firing off the request, create a global object that includes the request send time
	        window.startTime = new Date();
	    },
	
	    // send the request to the root URI of this host
	    url: '/assets/10M.dat',
	
	    success: function( data ){
	        // once the request comes back, record the end time
	        window.endTime = new Date();
	
	        // take the difference, which will yield a number in milliseconds, and print it out
	        $("#speed").append("Downspeed: " + (size*8)/((window.endTime - window.startTime)/1000) + " Mb/s");
	    }
	});
}