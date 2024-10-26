require('dotenv').config();
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const apiKey = process.env.API_KEY;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/html/index.html");
});

app.post("/weather", (req, res) => {
    var cityName = req.body.cityName.trim();

    if (!cityName) {
        return res.render("weather", { error: 'Please enter a city name', weatherData: null, city: null });
    }

    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    
    https.get(url, (response) => {
        var content = "";

        response.on("data", (data) => {
            content += data;
        }).on("end", () => {
            var apiResponse = JSON.parse(content);

            if (apiResponse.cod !== 200) {
                let errorMessage;
                switch (apiResponse.cod) {
                    case '404':
                        errorMessage = 'City not found. Please check the name and try again.';
                        break;
                    case '401':
                        errorMessage = 'Invalid API key. Please check your API key.';
                        break;
                    default:
                        errorMessage = 'An unexpected error occurred. Please try again later.';
                }
                return res.render("weather", { error: errorMessage, weatherData: null, city: null });
            }

            var temp = apiResponse.main.temp;
            var city = apiResponse.name;
            var icon = apiResponse.weather[0].icon;
            var iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            res.render("weather", {
                error: null,
                temp,
                city,
                weatherData: apiResponse,
                iconURL
            });
        }).on("error", (e) => {
            res.render("weather", { error: 'Unable to connect to the weather service. Please try again later.', temp: null, city: null, weatherData: null, iconURL: null });
        });
    });
});

app.listen(3000, () => {
    console.log("Application is listening on port 3000");
});
