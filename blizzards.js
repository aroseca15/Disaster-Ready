$(document).ready(function () {
	const callComplete = (userLocation) => {

		let latitude = userLocation.coords.latitude;
		let longitude = userLocation.coords.longitude;
		let queryGeoURL = "https://nominatim.openstreetmap.org/reverse?format=geojson&lat=" + latitude + "&lon=" + longitude;
		$.ajax({
			url: queryGeoURL,
			method: "GET",
		}).then(function (userLocation) {
			console.log(userLocation);

			let zipCode = userLocation.features[0].properties.address.postcode;
			let userState = userLocation.features[0].properties.address.state;
			let date = moment().format("MMM Do")
			console.log(zipCode);
			console.log(userState);

			weatherForecast(userState);
			airQuality(latitude, longitude);
			news();


			$("#cityairquality").on("click", function (event) {
				event.preventDefault();

				let cityName = $("#searchBy-city").val().trim();

				weatherForecast(cityName);
				//openmapquest API is used to get the latitude and longitude for the city we search for
				let queryGeocodeURL = "http://open.mapquestapi.com/geocoding/v1/address?key=nMseeiPX0p0AJ260D64oU69As8QirbGq&location=" + cityName;
				$.ajax({
					url: queryGeocodeURL,
					method: "GET",

				}).then(function (response) {
					console.log(response);
					let lat = response.results[0].locations[0].displayLatLng.lat;
					//console.log(lat);
					let lng = response.results[0].locations[0].displayLatLng.lng
					//console.log(lng);
					airQuality(lat, lng);
				})
			})

			function weatherForecast(city) {
				let weatherAPI = "fe4a853726c79035bac73e26c523869e";
				
				let queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + weatherAPI;
			
				$.ajax({
					url: queryURL1,
					method: "GET"
				})
					.then(function (response) {
						console.log(response);
						console.log(queryURL1);
						$(".forecast").empty();
						let cityID = response.id;						
						let weatherIcon = response.weather[0].icon;
						let iconURL = "https://openweathermap.org/img/w/" + weatherIcon + ".png";
						let icon = $("<img>").attr("src", iconURL);
						let cardDate = $("<div>").text(date);
						let temp = $("<p>").text("Temp: " + ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2) + " °F");
						let humid = $("<p>").text("Humidity: " + response.main.humidity + "%");
						let card = $("<div>").addClass("card");
						let cardBody = $("<div>").addClass("card-content");
						cardBody.append(cardDate,icon, temp, humid);
						card.append(cardBody);
						$(".forecast").prepend(card);

						let queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + weatherAPI;
						$.ajax({
							url: queryURL2,
							method: "GET"
						})

							.then(function (response) {
								//console.log(response);
								
								for (let i = 0; i < response.list.length; i++) {
									if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
										
										let cardDate = $("<div>").text(moment(response.list[i].dt, "X").format("MMM Do"));
										let tempK = response.list[i].main.temp;
										let tempF = (tempK - 273.15) * 1.80 + 32;
										let weatherIcon1 = response.list[i].weather[0].icon;
										let iconURL = "https://openweathermap.org/img/w/" + weatherIcon1 + ".png";
										let icon = $("<img>").attr("src", iconURL);
										let temp = $("<p>").html("Temp: " + tempF.toFixed(2) + " °F");
										let humid = $("<p>").text("Humidity: " + response.list[i].main.humidity + "%");
										let card = $("<div>").addClass("card");
										let cardBody = $("<div>").addClass("card-content");
										cardBody.append(cardDate, icon, temp, humid);
										card.append(cardBody);
										//card.css("background-color", "blue");
										//card.css("color", "white");

										$(".forecast").append(card);

									}
								}
							})
					});

			}




			function news() {

				let currentsApikey = "0CaluzsMUIwTbWXVvlnQ3u_2SS7vRmdcOLJ2vgVecCLy_TON";
				let keyWords = $("#News").attr("value")
				let queryURL3 = "https://api.currentsapi.services/v1/search?keywords=" + keyWords + "&apiKey=" + currentsApikey;

				$.ajax({
					url: queryURL3,
					method: "GET"
				}).then(function (response) {
					console.log(response);
					//console.log(queryURL3);

					for (let i = 1; i <= 5; i++) {
						let titleValue = $("<h4>").text(response.news[i].title).addClass("title is-5");
						let firesDesc = $("<p>").text(response.news[i].description);
						let urlValue = response.news[i].url;
						let urlDiv = $("<a>").attr("href", urlValue).addClass("newtab");
						$(".newtab").attr("target", '_blank');
						urlDiv.text("For more Information, Click Here ");
						$("#description").append(titleValue, firesDesc, urlDiv);
						$("h4").css({"color": "whitesmoke", "font-weight": "750", "font-size": "1.8rem"});
						$(urlDiv).css({"color":"yellow", "font-weight":"700", "font-size":"1.2rem"});
					}
				})

			}


			function airQuality(lati, long) {
				let airqualityApikey = "0a6dc53979bc4b6b93731240445160fe";
				let queryURL4 = "https://api.breezometer.com/air-quality/v2/current-conditions?lat=" + lati + "&lon=" + long + "&key=" + airqualityApikey;
				console.log(queryURL4);
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
					$("#air").empty();
					$("#air").append(aqiValue, aqiCategory, dominantPollutant);


				})
			}


			$("#resourcePdf").on("click", function () {
				let url = $("#the-canvas").attr("src")
				// If absolute URL from the remote server is provided, configure the CORS
				// header on that server.
				writePdftocanvas(url);

			});

			function writePdftocanvas(url) {

				// Loaded via <script> tag, create shortcut to access PDF.js exports.
				var pdfjsLib = window['pdfjs-dist/build/pdf'];

				// The workerSrc property shall be specified.
				pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

				// Asynchronous download of PDF
				var loadingTask = pdfjsLib.getDocument(url);
				loadingTask.promise.then(function (pdf) {
					console.log('PDF loaded');

					// Fetch the first page
					var pageNumber = 1;
					pdf.getPage(pageNumber).then(function (page) {
						console.log('Page loaded');

						var scale = 1.5;
						var viewport = page.getViewport({ scale: scale });

						// Prepare canvas using PDF page dimensions
						var canvas = document.getElementById('the-canvas');
						var context = canvas.getContext('2d');
						canvas.height = viewport.height;
						canvas.width = viewport.width;

						// Render PDF page into canvas context
						var renderContext = {
							canvasContext: context,
							viewport: viewport
						};
						var renderTask = page.render(renderContext);
						renderTask.promise.then(function () {
							console.log('Page rendered');
						});
					});
				}, function (reason) {
					// PDF loading error
					console.error(reason);
				});

			}
		});
	}
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


});
