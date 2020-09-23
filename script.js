// let ambeeAPI = "RjbEzFhLiK6G13X0NrxD94kbFuy94zx21vvV3JSe"
// let queryURL2 = https://docs.ambeedata.com/#/By%20Postal%20Code/findDataByPostalCode

let newsAPI = "e51ca59b75a04ae495dc5ab37f9b5ce0"
// need to establish what criteria to search for //
let queryURL3 = "https://newsapi.org/v2/everything?q=" + search-criteria + "&apiKey="  + newsAPI



$("button").on("click", function (event) {
    event.preventDefault();
    let cityWeather = $("input").val().trim()

    let weatherAPI = "fe4a853726c79035bac73e26c523869e";
    let queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityWeather + "&appid=" + weatherAPI

    $.ajax({
        url: queryURL1,
        method: "GET"
    })

        .then(function (response) {
            console.log(response);
            $("#cityName").text(response.name)

            let tempF = (response.main.temp - 273.15) * 1.80 + 32
            $("#temp").text("Temperature: " + Math.floor(tempF) + " °F")

            $("#humidity").text("Humidity: " + response.main.humidity + "%")

            $("#wind").text("Wind speed: " + response.wind.speed + " MPH")
        });