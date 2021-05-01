
    var createAllErrors = function() {
        var form = $( this ),
            errorList = $( "ul.error-messages", form );
            successList = $( "ul.success-messages", form );

        var showAllErrorMessages = function() {
            errorList.empty();
			var errors = [];
			
			// Validate number of traveler 
			var travellerInput = form.find('input[name=grp-size-A],input[name=grp-size-C],input[name=grp-size-I]');
			// initialise all travellers input to required
			travellerInput.each(function () {
				$(this).prop('required', true);
			});
			var validTravellerInput = form.find('input[name=grp-size-A]:valid,input[name=grp-size-C]:valid,input[name=grp-size-I]:valid');

			if(!$( "div.number-of-travellers", form ).is(":visible")) {
				// if number of travellers is not shown, do not validate number of traveler 
				travellerInput.each(function () {
					// remove the required property of all travellers.
					$(this).prop('required', false);
				});
			} else if (validTravellerInput.length > 0) {
				// at least 1 traveller input is valid
				// remove the required property of travellers input that are empty.
				travellerInput.each(function () {
					if (this.value.length == 0) {
						$(this).prop('required', false);
					}
				});
			}
            // Find all invalid fields within the form.
            var invalidFields = form.find( ":invalid" ).each( function( index, node ) {
				
                // Find the field's corresponding label
                var label = $( "label[for=" + node.id + "] "),
                    // Opera incorrectly does not fill the validationMessage property.
                    message = (node.validationMessage + node.title) || 'Invalid value.';

				var errMessage = "<li><span>" + label.html() + "</span>: " + message + "</li>";
				
				//remove duplicate errors like for example number of travellers
				if (!errors.includes(errMessage)){
					errorList.append(errMessage);
					errors.push(errMessage)
				}
            });
			
			//console.log(errorList)
			
			if (invalidFields.length == 0){
				console.log('no error');
                event.preventDefault();
				errorList.hide();
				successList.show();
			} else {
				errorList.show();
				successList.hide();
			}
        };

        // Support Safari
        form.on( "submit", function( event ) {
            if ( this.checkValidity && !this.checkValidity() ) {
                $( this ).find( ":invalid" ).first().focus();
                event.preventDefault();
            }
        });

        $( "input[type=submit], button:not([type=button])", form )
            .on( "click", showAllErrorMessages);

        $( "input", form ).on( "keypress", function( event ) {
            var type = $( this ).attr( "type" );
            if ( /date|email|month|number|search|tel|text|time|url|week/.test ( type )
              && event.keyCode == 13 ) {
                showAllErrorMessages();
            }
        });
    };

	function showTravellers(val) {
        var travellersDiv = $( "div.number-of-travellers" );
		if (val != "" && val != "general-enquiry") {
			travellersDiv.show();
		} else {
			travellersDiv.hide();
			//clear all traveller input value when hide
			var travellerInput = travellersDiv.find('input[name=grp-size-A],input[name=grp-size-C],input[name=grp-size-I]');
			travellerInput.each(function () {
				this.value = '';
			});
		} // else if general-enquiry , skip
	}
    
