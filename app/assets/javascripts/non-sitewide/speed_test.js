function test_speed() {
	//Size of target
	var size = 10; //Megabyte
	
	$( window ).load( function() {	
		// Download test
		$.ajax({
		    beforeSend: function(){
			    // set the start time
		        window.startTime = new Date();
		    },
		    url: '/assets/10M.dat',
		    cache:false,
		    success: function( file ){
				// set the end time
				window.endTime = new Date();
				
				// calculate and print the download speed
				$("#speed").append("Down speed: " + (size*8)/((window.endTime - window.startTime)/1000) + " Mb/s<br/>");
				
				// Upload test
			    
			    // Send back the same piece of data to the server
				$.ajax({
				    method:'POST',
				    beforeSend: function() {
					    // set an new start time
					    window.startTime = new Date();
				    },
				    url: '/pages/test',
				    cache:false,
				    data: {
					    data: file
				    },
				    success: function() {
					    // set the end time
						window.endTime = new Date();
						
						// calculate and print the upload speed
						$("#speed").append("Up speed: " + (size*8)/((window.endTime - window.startTime)/1000) + " Mb/s");
				    } 
				});
		    }
		});
	});
}