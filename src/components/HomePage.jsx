import { useState, useEffect } from "react";
import axios from "axios";
import videoBg from "../video/videoBg.mp4";
import Card from "./Card";
import { Link } from "react-router-dom";
import "../App.css";

function HomePage() {
  const [coords, setCoords] = useState([]);
  const [locationName, setLocationName] = useState(null);
  const [currentWeather, setCurrentWeather] = useState();
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const API_KEY = "78d8ff879664f60bbc5fe7d5392e503c";

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (!navigator.geolocation) {
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        setCoords([lat, long]);
        const obj = {
          lat: lat,
          long: long,
        };
        searchLocation(obj, "latlong");
      });
    }
  };

  const searchLocation = async (query, type = "search") => {
    let API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${API_KEY}&units=metric&lang=tr`;
    if (type === "latlong") {
      API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${query.lat}&lon=${query.long}&appid=${API_KEY}&units=metric&lang=tr`;
    }
    try {
      const response = await axios.get(API_URL).then((response) => {
        let dataTemp = [];
        //Günü ayarlama
        for (let i = 0; i < 6; i++) {
          dataTemp.push(response.data.list[i * 1]);
        }

        setData(response.data);
        setLocationName(response.data.city.name);
        setLocation(response.data.city.name);
        setCurrentWeather(dataTemp);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main">
      <div className="overlay"></div>
      <video autoPlay loop muted>
        <source src={videoBg} type="video/mp4" />
      </video>
      <div className="content">
        <div className="navbar">
          <div className="none gap-1">
            <Link to="/images">
              <button className="btn btn-ghost btn-circle avatar">
                <div className="w-12 rounded-full">
                  <img
                    alt=""
                    src="https://i.pinimg.com/736x/02/32/ce/0232cec1a50de0b489b0591b64451204.jpg"
                  />
                </div>
              </button>
            </Link>
            <h1 className="weather1">Weather App</h1>

            <div className="form-control">
              <input
                onClick={getLocation}
                type="text"
                placeholder="Enter location"
                className="input input-bordered w-24 md:w-auto "
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                onKeyDownCapture={(event) => {
                  if (event.key === "Enter") {
                    searchLocation(location);
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="h3 rounded-xl shadow-md shadow-gray-500 ">
          <h1 className="h1">{locationName}</h1>
          {currentWeather && <Card currentWeather={currentWeather} />}
        </div>
        <footer className="footer">
          <p className="p1">-Made by Nil Ece Altuğ © 2024 -</p>
          <img
            className="gif"
            alt=""
            src="https://cdn.dribbble.com/users/2120934/screenshots/6193512/11_rain.gif"
          />
          <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end"></nav>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
