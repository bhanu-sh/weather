import axios from "axios";
import React, { useState } from "react";

const Home = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(`Clear`);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

  const searchLocation = (event) => {
    event.preventDefault();
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        setError("");
        setWeather(res.data.weather[0].main);
        console.log(res, data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setError("City not found");
        } else {
          setError("An error occurred");
        }
        console.log(err);
      });
  };

  return (
    <div
      className="vh-100"
      style={{
        backgroundImage: `url("/weathers/${weather}.jpg"`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="container py-4">
        <h1 className="text-center">Weather App</h1>
        <div className="mx-5 text-center my-3">
          <form onSubmit={searchLocation}>
            <div class="blur shadow input-group mb-5">
              <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="form-control mx-auto form-control-lg"
                placeholder="Enter City Name"
              />
              <button
                class="btn btn-primary btn-lg"
                type="button"
                id="button-addon1"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {data.main ? (
          <>
            <div className="main mx-5 my-2 row">
              <div className="p-5 transparent col-md-6">
                <h1>{data.name}</h1>
                <h2>Temp: {Math.round(data.main.temp)}° C</h2>
                <img
                  src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                  width={50}
                  alt=""
                />
                <h4>{data.weather[0].main}</h4>
              </div>
              <div className="p-5 transparent col-md-6">
                <h2>Humidity: {data.main.humidity}%</h2>
                <h2>Visibility: {Math.round(data.visibility / 1000)} KM</h2>
                <div className="card wind">
                  <h3>Wind:</h3>
                  <p>Speed: {Math.round(data.wind.speed)} m/sec</p>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
