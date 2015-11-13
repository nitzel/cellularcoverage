function test_speed() {
	//Size of target
	var size = 10; //Megabyte
	
	$.ajax({
	    beforeSend: function(){
		    // set the start time
	        window.startTime = new Date();
	    },
	    url: '/assets/10M.dat',
	    success: function( data ){
		    // set the end time
	        window.endTime = new Date();
			
			// calculate and print the download speed
	        $("#speed").append("Down speed: " + (size*8)/((window.endTime - window.startTime)/1000) + " Mb/s<br/>");
	        
	        // set an new start time
	        window.startTime = new Date();
	        
	        // Send back the same piece of data to the server
	        $.post(
	        	'/pages/test',
	        	data,
	        	function() {
			        // set the end time
					window.endTime = new Date();
					
					// calculate and print the upload speed
					$("#speed").append("Up speed: " + (size*8)/((window.endTime - window.startTime)/1000) + " Mb/s");
	        })
	    }
	});
}