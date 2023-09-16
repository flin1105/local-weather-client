import { useState } from "react";
import Search from "./Components/Search";
import "./index.css";

function App() {
	const [location, setLocation] = useState({});
	const [currentWeather, setCurrentWeather] = useState({});

	console.log("current", currentWeather);

	const handleForecastClick = () => {
		console.log("Checking forecast");
		async function getWeather() {
			const response = await fetch(
				"http://api.weatherapi.com/v1/current.json?key=6101e38555c64c81bc8202123230808&q=11361"
			)
				.then((response) => response.json())
				.then((data) => {
					setLocation(data.location);
					setCurrentWeather(data.current);
				});

			return response;
		}

		getWeather();
	};

	return (
		<>
			<h1 className="text-sky-400">Weather App</h1>
			<Search />
			<div>
				Results for {location.name}, {location.region}
			</div>
			<div>Temperature {currentWeather.temp_f} &deg;F</div>
			<div>Humidity {currentWeather.humidity} &#37;</div>
			<div>Precipitation {currentWeather.precip_in} (in inches) </div>
			<div>Local Time: {location.localtime}</div>
			<div>
				Currently
				{currentWeather.condition ? currentWeather.condition.text : "unknown"}
			</div>
			<div>Wind {currentWeather.wind_mph} mph</div>
			{currentWeather.condition ? (
				<img src={currentWeather.condition.icon}></img>
			) : (
				<></>
			)}
			<button onClick={handleForecastClick}>Click to find forecast</button>
		</>
	);
}

export default App;
