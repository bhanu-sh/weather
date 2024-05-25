import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "./Loader";

const Weather = () => {
  const params = useParams();
  const city = params.location;

  const navigate = useNavigate();

  const [location, setLocation] = useState(city || "");
  const [data, setData] = useState({});
  const [weather, setWeather] = useState("Clear");
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

  const searchLocation = (event) => {
    event.preventDefault();
    navigate(`/${location}`);
  };

  const getWeather = useCallback(async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setWeather(response.data.weather[0].main);
    } catch (error) {
      toast.error("City Not Found");
    } finally {
      setLoading(false);
    }
  }, [url]);

  const fetchData = useCallback(() => {
    setLoading(true);
    getWeather();
  }, [getWeather]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <div
      className="main-body"
      style={{
        backgroundImage: `url("/weathers/${weather}.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        transitionDuration: "1s",
      }}
    >
      <div className="container py-4">
        <Link className="text-decoration-none text-white" to="/">
          <h1 className="text-center">WeatherWaves</h1>
        </Link>
        <div className="mx-5 text-center my-3">
          <form onSubmit={searchLocation}>
            <div className="blur shadow input-group mb-5">
              <input
                type="text"
                name="location"
                className="form-control mx-auto form-control-lg"
                placeholder="Enter City Name"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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

        {loading ? (
          <Loader />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
