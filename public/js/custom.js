
	$('#wifiAccess').on('click', function(){

		var error = false;
		var errorText = "";

		if ($('input[name="wifi_mobile"]').val() == null || $('input[name="wifi_mobile"]').val() == "" ){
			$('#wifiMobileCodeMessage').html("o man.. mobile number important to get wifi");
			$('#wifiMobileCodeMessage').addClass("errorMessage");
			$('#wifiMobileCodeMessage').show();
			error = true;
		}

		if (($('input[name="wifi_mobile"]').val()).length != 10){
			$('#wifiMobileCodeMessage').html("interesting number there.. it should be 10 digits");
			$('#wifiMobileCodeMessage').addClass("errorMessage");
			$('#wifiMobileCodeMessage').show();
			error = true;
		}

		if(!error){
			//send OTP and show OTP div and hide loginContainer 

			var formData = {
		    	'phone'    		: $('input[name="wifi_mobile"]').val()
		    }
		    // process the form
		    $('#ajaxloader').show();
		    $.ajax({
		        type        : 'post', // define the type of HTTP verb we want to use (POST for our form)
		        url         : '/auth-sendOTP/', // the url where we want to POST
		        data        : formData, // our data object
		        dataType    : 'json', // what type of data do we expect back from the server
		        encode      : true
		    })
	        // using the done promise callback
	        .done(function(data) {
	        	$('.loginContainer').css('display','none');
				$('.OTPContainer').css('display','block');
	        });
	        $('#ajaxloader').hide();
		}		
	});


	$('#enterOTP').on('click', function(){

		var error = false;
		var errorText = "";

		if ($('input[name="wifi_access_code"]').val() == null || $('input[name="wifi_access_code"]').val() == "" ){
			$('#wifiAccessCodeMessage').html("aree yaar.. you forgot to enter OTP");
			$('#wifiAccessCodeMessage').addClass("errorMessage");
			$('#wifiAccessCodeMessage').show();
			error = true;
		}

		if (($('input[name="wifi_access_code"]').val()).length != 4){
			$('#wifiAccessCodeMessage').html("interesting number there.. it should be 4 digits");
			$('#wifiAccessCodeMessage').addClass("errorMessage");
			$('#wifiAccessCodeMessage').show();
			error = true;
		}

		if(!error){

			//send OTP and show OTP div and hide loginContainer 
			var formData = {
		    	
		    	'phone'    		: $('input[name="wifi_mobile"]').val(),
		    	'code'    		: $('input[name="wifi_access_code"]').val()

		    }
		    // process the form
		    $('#ajaxloader').show();
		    $.ajax({

		        type        : 'post', // define the type of HTTP verb we want to use (POST for our form)
		       // url         : '/auth-checkOTP/', // the url where we want to POST
		        url         : '/auth-check/OTP/', 
		        data        : formData, // our data object
		        dataType    : 'json', // what type of data do we expect back from the server
		        encode      : true
		    
		    })
	 	    // using the done promise callback
	        .done(function(data) {
	        		
        		if(data.authCodeObj == 'success'){
        			
        			$('.successContainer').css('display','block');
					$('.OTPContainer').css('display','none');
        		
        		}else{
        		
        			$('.noOTPText').css('display','none');
        			$('#wifiAccessCodeMessage').html("naaa.. incorrect OTP. Please try again or <a href=''>resend</a> OTP.");
					$('#wifiAccessCodeMessage').addClass("errorMessage");
					$('#wifiAccessCodeMessage').show();
        		}
	        
	        });
	        $('#ajaxloader').hide();

			
		}


		
	});
