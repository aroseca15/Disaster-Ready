$(document).ready(function () {
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
            let queryURL3 = "https://api.currentsapi.services/v1/search?keywords=earthquakes&apiKey=" + currentsApikey;

            let queryURL4 = "https://api.breezometer.com/air-quality/v2/current-conditions?lat=" + latitude + "&lon=" + longitude + "&key=" + airqualityApikey;


            // let cityWeather = $("input").val().trim()

            let weatherAPI = "fe4a853726c79035bac73e26c523869e";
            let queryURL1 = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + ",us&appid=" + weatherAPI
            let queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode + ",us&appid=" + weatherAPI

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
                    $("h4").css({"color": "black", "font-weight": "545", "font-size": "1.8rem"});
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


            $("#resourcePdf").on("click", function () {
                let url = "https://cdn.shopify.com/s/files/1/0338/9626/7916/files/Fire_Escape.pdf";
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
