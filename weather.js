const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})
app.post("/", function(req, res) {

    const query = req.body.cityName;
    const appid = "a69934363d0c6434a0b94f5f7b876c26";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + unit;
    https.get(url, function(response) {
        console.log(response);

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            var temperature = weatherData.main.temp;
            var weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageurl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            console.log(weatherDescription);

            res.write(`<p>The weather here is ${weatherDescription}</p>`);
            res.write("<h1>The temperature in " + query + " is " + temperature + " degree celcius</h1>");
            res.write(`<img src = ${imageurl}></img>`);
            res.send();
        })
    })
})
app.listen(5000, () => {
    console.log("The server is running on port 5000");
});