
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

  var eqCoord = [];

  for (var i = 0; i < responseData.features.length; i++) {
    eqCoord.push(`{position: new google.maps.LatLng(${responseData.features[i].geometry.coordinates[1]}, ${responseData.features[i].geometry.coordinates[0]}), type: 'info'}`);
  };

  console.log(`These are all the coordinates as an array:`);
  console.log(eqCoord);
  console.log(`=== Right before map append 2222222 ===`);



  $('#map').append(`

    <script>

      function initMap() {

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 2,
          center: { lat: 37.78, lng: -122.44 }
        });

        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        var markers = locations.map(function(location, i) {
          return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
          });
        });

        var markerCluster = new MarkerClusterer(map, markers,
          {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
        }
        var locations = [
          {lat: -21.3883, lng: -66.8118},
          {lat: -9.0927, lng: -74.266},
          {lat: 3.02, lng: 126.8839},
          {lat: -24.6267, lng: -178.7492},
          {lat: 17.1956, lng: 121.0653},
          {lat: 37.8034, lng: 141.1117},
          {lat: -61.2963, lng: 154.3342},
          {lat: -6.7459, lng: 147.799},
          {lat: -33.7388, lng: -72.2918},
          {lat: -10.4911, lng: -78.3384},
          {lat: 53.3682, lng: 160.4259},
          {lat: -24.3833, lng: -179.8329},
          {lat: -10.4558, lng: 161.4035},
          {lat: 11.252, lng: 125.0527},
          {lat: -12.3581, lng: 166.7618},
          {lat: 11.1142, lng: 124.6334},
          {lat: 46.8973333, lng: -112.5295},
          {lat: 38.3269, lng: 143.3715},
          {lat: 46.8542, lng: -112.6676},
          {lat: 46.8713, lng: -112.603},
          {lat: 31.5479, lng: 141.9066},
          {lat: -20.8546, lng: -174.053},
          {lat: -7.8605, lng: 128.581},
          {lat: 13.6601, lng: -90.8074},
          {lat: 0.5373, lng: 126.2706},
          {lat: -30.2242, lng: -177.7286},
          {lat: -3.8563, lng: 129.9707},
          {lat: -4.008, lng: 130.0101},
          {lat: -11.124, lng: 163.0469},
          {lat: -3.9601, lng: 130.0244},
          {lat: -35.4944, lng: -73.3432},
          {lat: -22.5695, lng: 25.0865},
          {lat: -8.4477, lng: 122.4998},
          {lat: -6.0625, lng: 101.9067},
          {lat: -14.7575, lng: 167.4307},
          {lat: -49.6926, lng: 117.6677},
          {lat: 44.4344, lng: 101.4714},
          {lat: -19.4358, lng: -69.6514},
          {lat: -34.8648, lng: -108.554},
          {lat: -11.3262, lng: 163.1356},
          {lat: -3.9961, lng: 130.0855},
          {lat: 35.1629, lng: 26.5959},
          {lat: 41.1518, lng: 20.925},
          {lat: 11.956, lng: 125.2279},
          {lat: -17.8844, lng: -178.5503},
          {lat: 3.5698, lng: -73.9723},
          {lat: -21.851, lng: -68.593},
          {lat: 16.023, lng: -92.8297},
          {lat: -27.4303, lng: -176.0837},
          {lat: -27.3639, lng: -176.5047},
          {lat: 29.4788, lng: 142.6748},
          {lat: 24.39, lng: 94.6893},
          {lat: 0.9281, lng: -26.9628},
          {lat: 27.2357, lng: 86.1117},
          {lat: -3.8361, lng: 128.6091},
          {lat: -10.8122, lng: -74.6709},
          {lat: 42.8207, lng: 141.9875},
          {lat: 23.8444, lng: 94.7018}
        ]
      </script>
      <script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js">
    </script>
    <script async defer
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg&callback=initMap">
    </script>


  `) //closes #map.append




















} // closes onSuccess

}); //closes documentReady
