//source: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

const callComplete = (userLocation) => {
    console.log(userLocation);
    console.log(userLocation.coords.latitude);
    console.log(userLocation.coords.longitude);
    let latitude = userLocation.coords.latitude;
    let longitude = userLocation.coords.longitude;
    
   
    let queryURL = "https://nominatim.openstreetmap.org/reverse?format=geojson&lat=" + latitude + "&lon=" + longitude;
    $.ajax({
        url: queryURL,
        method: "GET",
      //  lat: userLocation.coords.latitude,
      //  lng: userLocation.coords.longitude,
    }).then(function (userLocation) {
        console.log(userLocation);

        let zipCode = userLocation.features[0].properties.address.postcode;
        let userState = userLocation.features[0].properties.address.state;
        let countryCode = userLocation.features[0].properties.address.country_code;

        console.log(zipCode);
        console.log(userState);
        console.log(countryCode);
    });
};
//log geolocation call error
const callProblem = (problem) => {
    console.error(problem)
};
navigator.geolocation.getCurrentPosition(callComplete, callProblem); {
//more accurate, larger power consumption
enableHighAccuracy: true
//time out geolocation call after 15 seconds
timeout: 15000
}
