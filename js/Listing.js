window.onload = function(){

    //fetch Travel Package api
    fetch("https://createtheweb.biz/wmp/get_travel_package.php")
    .then(function(response) {
	return response.json();
    })
    .then(function(data){
        console.log(data);
        packages = data.packages;
        
        mapArray = [];
		document.querySelector("#tour-packages").innerHTML = "";
        for (i = packages.length-1; i >= 0 ; i--){
            id = packages[i].id;
            name = packages[i].name;
            description = packages[i].description;
            latitude = packages[i].latitude;
            longitude = packages[i].longitude;
            travel_period = packages[i].travel_period;
            promotion = packages[i].promotion;
            price = packages[i].price;
            image = packages[i].image;

            
            document.querySelector("#tour-packages").innerHTML += 
                tourPackageHTML(id, name, description,latitude,longitude, travel_period,promotion,price,image)+"\n";

            map(id,latitude,longitude);
        }
    })
    .catch(function(error) {
        console.log(error)
    });


}

function tourPackageHTML(id, name, description,latitude,longitude, travel_period,promotion,price,image) {
    htmlString = 
        "<div class='card'>" +
        "<img src='" + image + "' class='card-img-top'></img>" + 
        "<div class='card-body d-flex flex-column text-center'>" +
        "<h3 class='card-title tour-title'>" + name + "</h3>" + 
        "<p class='card-text text-center'>" + description + "</p>"+
        "<a class='btn btn-green mt-auto' data-toggle='modal' href='#package-" + id + "-modal'>Go</a>" +
        "</div>" + 
        "</div>" + 
        tourPackageDetailsHTML(id, name, description,latitude,longitude, travel_period,promotion,price,image);
    return htmlString;
  }

  function tourPackageDetailsHTML(id, name, description,latitude,longitude, travel_period,promotion,price,image) {
    
    htmlString=
      "<div class='modal fade' id='package-" + id + "-modal'>" +
      "<div class='modal-dialog'>" +
      "<div class='modal-content'>" +
        
      "<div class='modal-header'>" +
      "<h4 class='modal-title tour-title'>" + name + "</h4>" +
      "<button type='button' class='close' data-dismiss='modal'>×</button>" +
      "</div>" +
            
      "<div class='modal-body'>" +
      "<div id='package-" + id + "-map' style='height: 33vh'></div>" + 
      "<hr>" +
      "<p class='font-weight-bold'>" + description + "</p>" + 
      "<hr>" +
      "<p>Available Period: " + travel_period + "</p>" + 
      "<hr>" +
      "<p>From: $" + price + "</p>" +
      "<hr>" +
      "<p>Promotion: " + promotion+ "</p>"+
      "<hr>" +
      "<p>Notes:</p>" +
      "<textarea class='form-control' rows='5' id='package-" + id + "-notes'>" + getNotes(id) + "</textarea>" +
      "</div>" +
            
      "<div class='modal-footer'>" +
      "<button type='button' class='btn btn-outline-danger' data-dismiss='modal'>Close</button>" +
      "<button type='button' class='btn btn-outline-success' data-dismiss='modal' onClick='saveNotes(" + id + ")'>Save Notes</button>" +
      "</div>" +
            
      "</div>" +
      "</div>" +
      "</div>";
    return htmlString;
  }

  function map(id, latitude, longitude){
      
    var map;
    var myLatLng = {lat: latitude, lng: longitude};

    function initMap() {
        map = new google.maps.Map(document.getElementById('package-' + id + '-map'), {
            center: myLatLng,
            zoom: 8
        });
    }
    
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        myLatLng.lat = latitude;
        myLatLng.lng = longitude;
        
        initMap();
        
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
        });
    }); 

  }

  function getNotes(id) {
    if (window.localStorage){
        var note = localStorage.getItem("notes-"+id);
        if (note !== null) {
            return note;
        }
    }
    return "";
  }

  function saveNotes(id) {
    var notes = document.getElementById('package-' + id + '-notes').value;
    if (window.localStorage){
        localStorage.setItem("notes-"+id, notes);
    }
   
  }