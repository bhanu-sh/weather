import axios from "axios";
import React, { useState } from "react";

const Home = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((res) => {
          setData(res.data);
          setError("");
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
    }
  };

  return (
    <div className="container">
      <div className="my-5">
        <h1 className="text-center">Weather App</h1>
        <div className="mx-5 text-center">
          <input
            className="form-control form-control-lg shadow"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={searchLocation}
            type="text"
            placeholder="Enter City Name"
          />
          {error && <p className="error">{error}</p>}
          <form>
            <button
              type="submit"
              className=" shadow btn btn-primary m-3 btn-lg"
            >
              Search
            </button>
          </form>
          
        </div>

        {data.main ? (
          <>
            <div
              className="card weather text-white shadow p-3 row"
              style={{
                backgroundImage: `url("/weathers/${data.weather[0].main}.jpg"`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
               
              <div className="main my-2 col-md-4">
                <div className="p-5 transparent">
                  <h1>{data.name}</h1>
                  <h2>Temp: {Math.round(data.main.temp)}° C</h2>
                  <img
                    src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                    width={50}
                    alt=""
                  />
                  <h4>{data.weather[0].main}</h4>
                </div>
              </div>
              {/* <div className="main my-2 col-md-4">
                <div className="p-5 transparent">
                  <h1>{data.name}</h1>
                  <h2>Temp: {Math.round(data.main.temp)}° C</h2>
                  <img
                    src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                    width={50}
                    alt=""
                  />
                  <h4>{data.weather[0].main}</h4>
                </div>
              </div> */}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
