let queryURL= 'https://api.currentsapi.services/v1/search?keywords=wildfires&apiKey=2PB-3mCOU8n1yPyn1EWWMhz3_rfe-58k-wH_Wei5hGE27LV2'
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response)
})

