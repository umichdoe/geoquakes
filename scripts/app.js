// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).ready(function() {
  console.log("Let's get coding!");
  $.ajax({
      method:'GET',
      url: weekly_quakes_endpoint,
      dataType: 'json',
      //data:responseData,
      success: onSuccess,
  }); //closes ajax
function onSuccess(responseData){
  console.log('is working');
  console.log(responseData);
  console.log(`${responseData.features.length} response data length`);
  console.log("This includes responseData" + responseData.features[0].properties.title);
  for (i=0; i< responseData.features.length; i++){
    $('h1').append(`${responseData.features[i].properties.title}`);
  }

}

}); //closes documentReady
