import { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import { WeatherCardData } from "./interface/interface";
import { useDarkMode } from "./utils";
import Skeleton from "./components/Skeleton";

export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherCardData[] | null>();
  const [weatherURL, setWeatherURL] = useState("");
  const [city, setCity] = useState("");
  const WEATHERMAP_API = "https://api.openweathermap.org/data/2.5/forecast";
  const WEATHERMAP_API_KEY = import.meta.env.VITE_REACT_WEATHER_API_KEY;
  const GEOAPIFY_API = "https://api.geoapify.com/v1/ipinfo?&apiKey=";
  const GEOAPIFY_API_KEY = import.meta.env.VITE_REACT_LOCATION_API_KEY;
  const LOCATION_URL = GEOAPIFY_API + GEOAPIFY_API_KEY;

  useEffect(() => {
    fetch(LOCATION_URL)
      .then((res) => res.json())
      .then((data) => {
        setWeatherURL(
          `${WEATHERMAP_API}?lat=${data.location.latitude}&lon=${data.location.longitude}&appid=${WEATHERMAP_API_KEY}`
        );
      });
  }, []);

  useEffect(() => {
    fetch(weatherURL)
      .then((res) => res.json())
      .then((data) => {
        setCity(data.city.name);
        setWeatherData([
          {
            id: 1,
            temp: kelvinToCelcius(data.list[0].main.temp),
            date: format(data.list[0].dt),
            img: data.list[0].weather[0].icon,
            description: data.list[0].weather[0].description,
          },
          {
            id: 2,
            temp: kelvinToCelcius(data.list[8].main.temp),
            date: format(data.list[8].dt),
            img: data.list[8].weather[0].icon,
            description: data.list[8].weather[0].description,
          },
          {
            id: 3,
            temp: kelvinToCelcius(data.list[16].main.temp),
            date: format(data.list[16].dt),
            img: data.list[16].weather[0].icon,
            description: data.list[16].weather[0].description,
          },
          {
            id: 4,
            temp: kelvinToCelcius(data.list[24].main.temp),
            date: format(data.list[24].dt),
            img: data.list[24].weather[0].icon,
            description: data.list[24].weather[0].description,
          },
          {
            id: 5,
            temp: kelvinToCelcius(data.list[32].main.temp),
            date: format(data.list[32].dt),
            img: data.list[32].weather[0].icon,
            description: data.list[32].weather[0].description,
          },
        ]);
      })
      .catch((error) => console.log(error));
  }, [weatherURL]);

  function kelvinToCelcius(num: number) {
    return num - 273.15;
  }
  function format(date: number): string {
    const newDate = new Date(date * 1000);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (newDate.toDateString() === today.toDateString()) {
      return "Now";
    } else if (newDate.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        timeZone: "Europe/Paris",
      };
      let formattedDate: string = new Intl.DateTimeFormat("en-US", options)
        .format(newDate)
        .toString();
      formattedDate = formattedDate.replace(/,/g, "");
      return formattedDate;
    }
  }

  return (
    <div className={useDarkMode("weather-section")}>
      <h2 className="section-header">5 day forecast for {city.slice(0, 16)}</h2>
      <section className="weather-container">
        {weatherData ? (
          weatherData.map((item) => (
            <WeatherCard
              key={item.id}
              date={item.date}
              temperature={`${Math.round(item.temp)}°`}
              img={item.img}
              description={item.description}
            />
          ))
        ) : (
          <Skeleton type="weather" />
        )}
      </section>
    </div>
  );
}
