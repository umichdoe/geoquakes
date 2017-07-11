
$(document).ready(function() {
  console.log("Let's get coding!");

  $.ajax({
      method:'GET',
      url: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson",
      dataType: 'json',
      success: onSuccess,
  }); //closes ajax
  
function onSuccess(responseData){
  console.log('is working');
  console.log(responseData);
  console.log( (Date.now()-responseData.features[0].properties.time)/60/60/24 );
  console.log(`${responseData.features.length} response data length`);
  console.log("This includes responseData" + responseData.features[0].properties.title);
  console.log(`lng: ${responseData.features[1].geometry.coordinates[0]}`);
  console.log(responseData.features[1].geometry.coordinates[0]);
  console.log(`lat: ${responseData.features[1].geometry.coordinates[1]}`);
  console.log(`=================`);

  // Appends individual earthquake data to DOM
  for (i=0; i< responseData.features.length; i++){
    $('h1').append(`<p class="places">${responseData.features[i].properties.title}</p>`);
  }

  var earthquakeCoordinates = [];

  for (var i = 0; i < responseData.features.length; i++) {
    earthquakeCoordinates.push(`{lat: ${responseData.features[i].geometry.coordinates[1]}, lng: ${responseData.features[i].geometry.coordinates[0]}}`);
  };

  console.log(`These are all the coordinates as an array:`);
  console.log(earthquakeCoordinates);
  console.log(`=== Right before map append ===`);


  // code for Google maps and makers to be appended to the DOM
  $('#map').append(`

    <script>
          var map;
          function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
              zoom: 2,
              center: new google.maps.LatLng( 37.78, -122.44),
              mapTypeId: 'roadmap'
            });


            map.data.loadGeoJson(
            "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson");
          }

          window.eqfeed_callback = function(responseData) {
            for (var i = 0; i < responseData.features.length; i++) {
              var coords = responseData.features[i].geometry.coordinates;
              var latLng = new google.maps.LatLng(coords[1],coords[0]);
              var marker = new google.maps.Marker({
                position: latLng,
                map: map
              });
            }
          }
        </script>
        <script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg&callback=initMap">
        </script>

  `) //closes #map.append

} // closes onSuccess

}); //closes documentReady
