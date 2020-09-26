const callComplete = (userLocation) => {
    console.log(userLocation);
    console.log(userLocation.coords.latitude);
    console.log(userLocation.coords.longitude);
    let latitude = userLocation.coords.latitude;
    let longitude = userLocation.coords.longitude;
    
    let queryGeoURL = "https://nominatim.openstreetmap.org/reverse?format=geojson&lat=" + latitude + "&lon=" + longitude;
    $.ajax({
        url: queryGeoURL,
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

let date = moment().format("MMM Do")
// let ambeeAPI = "RjbEzFhLiK6G13X0NrxD94kbFuy94zx21vvV3JSe"
// let queryURL2 = "https://api.ambeedata.com/latest/by-city?city=tucson"

let currentsApikey = "kUI1_WlEJf3YcmmImtsriX4FAmXPWzdByvElQow457N4ZW9e"
// need to establish what criteria to search for //
let airqualityApikey = "0a6dc53979bc4b6b93731240445160fe"
let queryURL3 = "https://api.currentsapi.services/v1/search?keywords=wildfires&apiKey=" + currentsApikey;

let queryURL4 = "https://api.breezometer.com/air-quality/v2/current-conditions?lat=" + latitude + "&lon=" + longitude + "&key=" + airqualityApikey;




// let cityWeather = $("input").val().trim()

let weatherAPI = "fe4a853726c79035bac73e26c523869e";
let queryURL1 = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + "," + countryCode + "&appid=" + weatherAPI
let queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode + "," + countryCode + "&appid=" + weatherAPI

$.ajax({
	url: queryURL1,
	method: "GET"
})

	.then(function (response) {
		//console.log(response);

		let newCol = $("<div>").attr("class", "one-fifth");
		$(".forecast").prepend(newCol);

		let newCard = $("<div>");
		newCol.append(newCard);

		let cardDate = $("<div>").text(date);
		newCard.append(cardDate);

		let cardImg = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
		newCard.append(cardImg);

		let bodyDiv = $("<div>").attr("class", "card-content");
		newCard.append(bodyDiv);

		let tempF = Math.floor((response.main.temp - 273.15) * 1.80 + 32)
		bodyDiv.append($("<p>").text("Temp: " + tempF + " °F"));
		bodyDiv.append($("<p>").text("Humidity: " + response.main.humidity + "%"));
		bodyDiv.append($("<p>").text("wind: " + response.wind.speed + " MPH"));
	})

$.ajax({
	url: queryURL2,
	method: "GET"
})

	.then(function (response) {
		//console.log(response);
		let newrow = $(".forecast")

		for (let i = 0; i < response.list.length; i++) {
			if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
				let newCol = $("<div>").attr("class", "one-fifth");
				newrow.append(newCol);

				let newCard = $("<div>");
				newCol.append(newCard);

				let cardDate = $("<div>").text(moment(response.list[i].dt, "X").format("MMM Do"));
				newCard.append(cardDate);

				let cardImg = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png");
				newCard.append(cardImg);

				let bodyDiv = $("<div>").attr("class", "card-content");
				newCard.append(bodyDiv);

				let tempF = Math.floor((response.list[i].main.temp - 273.15) * 1.80 + 32)
				bodyDiv.append($("<p>").text("Temp: " + tempF + " °F"));
				bodyDiv.append($("<p>").text("Humidity: " + response.list[i].main.humidity + "%"));
				bodyDiv.append($("<p>").text("wind: " + response.list[i].wind.speed + " MPH"));
			}
		}
	});


$.ajax({
	url: queryURL3,
	method: "GET"
}).then(function (response) {
	console.log(response)

	for (let i = 0; i < 5; i++) {
		let titleValue = $("<h4>").text(response.news[i].title).addClass("title is-5");
		let firesDesc = $("<p>").text(response.news[i].description);
		//$("#description").empty();
		// let urlValue = response.news[i].url;

		// let urlDiv = $("<a>").attr("href", "urlValue");
		$("#description").append(titleValue, firesDesc);
	}
})


$.ajax({
	url: queryURL4,
	method: "GET"
}).then(function (response) {
	console.log(response)

	let aqiValue = $("<p>").text("AQI: ");
	let aqi = $("<p>").text(response.data.indexes.baqi.aqi).addClass("is-inline");
	aqiValue.append(aqi);
	let aqiCategory = $("<p>").text(response.data.indexes.baqi.category).addClass("is-inline");
	let colorValue = response.data.indexes.baqi.color;
	aqi.css("background-color", colorValue);
	let dominantPollutant = $("<p>").text("Dominant Pollutant: " + response.data.indexes.baqi.dominant_pollutant);
	$("#air").append(aqiValue, aqiCategory, dominantPollutant);


})
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
