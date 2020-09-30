// importing express and initializing app
const express = require("express");
const app = express();

const path = require("path");

app.set("port", process.env.PORT || 3000);

// importing handlebars and setting the defualt layout
const handlebars = require("express3-handlebars").create({
	defaultLayout: "main",
	// partialsDir: path.join(__dirname + "/views/partials/"),
});

// Serving the static resources
app.use(express.static(__dirname + "/public"));

// setting handlebars as the template engine
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

// Routes

// app.get('/') is disabled because express is serving static resources for the homepage
// app.get('/', (req, res) => {
//   res.render('home');
// })

const block = {
	currency: {
		name: "United States dollars",
		abbrev: "USD",
	},
	tours: [
		{ name: "Hood River", price: "$99.95" },
		{ name: "Oregon Coast", price: "$159.95" },
	],
	specialsUrl: "/january-specials",
	currencies: ["USD", "GBP", "BTC"],
};

function getWeatherData() {
	return {
		locations: [
			{
				name: "Portland",
				forecastUrl: "http://www.wunderground.com/US/OR/Portland.html",
				iconUrl: "http://icons-ak.wxug.com/i/c/k/cloudy.gif",
				weather: "Overcast",
				temp: "54.1 F (12.3 C)",
			},
			{
				name: "Bend",
				forecastUrl: "http://www.wunderground.com/US/OR/Bend.html",
				iconUrl: "http://icons-ak.wxug.com/i/c/k/partlycloudy.gif",
				weather: "Partly Cloudy",
				temp: "55.0 F (12.8 C)",
			},
			{
				name: "Manzanita",
				forecastUrl: "http://www.wunderground.com/US/OR/Manzanita.html",
				iconUrl: "http://icons-ak.wxug.com/i/c/k/rain.gif",
				weather: "Light Rain",
				temp: "55.0 F (12.8 C)",
			},
		],
	};
}

app.use((req, res, next) => {
	if (!res.locals.partials) res.locals.partials = {};
	res.locals.partials.weather = getWeatherData();
	next();
});

// rendering content
app.get("/about", (req, res) => {
	res.render("about", { block: block });
	console.log(res);
});

app.get("*", (req, res) => {
	res.status(404).render("404");
});

app.use((req, res) => {
	res.status(500).render("505");
});

// Listening to the app on port process.env.PORT (Production) || 3000 (Development)
app.listen(app.get("port"), () =>
	console.log(`The server is up and running on PORT ${app.get("port")}`)
);
