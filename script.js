let date = moment().format("MMM Do")
// let ambeeAPI = "RjbEzFhLiK6G13X0NrxD94kbFuy94zx21vvV3JSe"
// let queryURL2 = "https://api.ambeedata.com/latest/by-city?city=tucson"

let currentsAPI = "2PB-3mCOU8n1yPyn1EWWMhz3_rfe-58k-wH_Wei5hGE27LV2"
// need to establish what criteria to search for //
let queryURL3 = "https://api.currentsapi.services/v1/search?keywords=" + "wildfires" + "&language=en&apiKey=" + currentsAPI




// let cityWeather = $("input").val().trim()

let weatherAPI = "fe4a853726c79035bac73e26c523869e";
let queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=Tucson&appid=" + weatherAPI
let queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=Tucson&appid=" + weatherAPI

$.ajax({
    url: queryURL1,
    method: "GET"
})

.then(function (response) {
    console.log(response);

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
    console.log(response);
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


// $.ajax({
//     url: queryURL2,
//     method: "GET",
//     headers: { "APIkey": ambeeAPI }
// })

//         .then(function (response) {
//             console.log(response)
//         })

$.ajax({
    url: queryURL3,
    method: "GET"
})

    .then(function (response) {
        console.log(response)
    })
