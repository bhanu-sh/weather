import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

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
        console.log(res.data);
      })
      .catch((err) => {
        console.error("An error occurred:", err);
        if (err.response && err.response.status === 404) {
          setError("City not found");
          toast.error(error);
        } else {
          setError("An error occurred");
          toast.error(error);
        }
      });
  };

  return (
    <div
      className="main-body"
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
            <div className="blur shadow input-group mb-5">
              <input
                type="text"
                name="location"
                className="form-control mx-auto form-control-lg"
                placeholder="Enter City Name"
                value={location} // Bind input value to the location state
                onChange={(e) => setLocation(e.target.value)} // Update the location state when input changes
              />
              <button
                className="btn btn-primary btn-lg"
                type="submit"
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
              <div className="p-5 transparent weather col-md-6">
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
                <div className="border-top border-3 wind">
                  <h3>Wind:</h3>
                  <p>Speed: {Math.round(data.wind.speed)} m/sec</p>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
      <div className="footer text-center py-3">
        <p>
          Made by <a href="">Bhanu</a>
        </p>
      </div>
    </div>
  );
};

export default Home;
