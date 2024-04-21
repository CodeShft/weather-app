import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Background from "./Background";
import Card from "./Card";

function HomePage() {
	const [locationName, setLocationName] = useState(null);
	const [currentWeather, setCurrentWeather] = useState();
	const [location, setLocation] = useState("");
	const [weatherId, setWeatherId] = useState(null);
  
	const API_KEY = "78d8ff879664f60bbc5fe7d5392e503c";
  
	useEffect(() => {
	  getLocation(); 
	}, []);
  
	const getLocation = () => {
	  if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
		  const lat = position.coords.latitude;
		  const long = position.coords.longitude;
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
      await axios.get(API_URL).then((response) => {
        const dataTemp = [];
        //Günü ayarlama
        for (let i = 0; i < 6; i++) {
          dataTemp.push(response.data.list[i * 1]);
        }

        setWeatherId(response.data.list[0].weather[0].id);

        setLocationName(response.data.city.name);
        setLocation(response.data.city.name);
        setCurrentWeather(dataTemp);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-screen" data-theme="light">
      <Background weatherId={weatherId} />
      <div className="navbar z-10">
        <div className="none gap-1">
          <Link to="/images">
            <button type="button" className="btn btn-ghost btn-circle avatar">
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
              className="input input-bordered w-auto "
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
      <div className="container-lg mx-auto p-2 flex justify-center items-center flex-col flex-grow w-full z-10">
        <div className="bg-white/30 text-black p-4 rounded-lg shadow-md backdrop-blur-xl w-full sm:w-auto">
          <h1 className="text-center text-5xl leading-relaxed text-black">
            {locationName}
          </h1>
          {currentWeather ? (
            <Card currentWeather={currentWeather} />
          ) : (
            <div className="card max-w-md lg:card-side bg-base-100 shadow-xl">
              <figure>
                <img src="/wait.jpg" alt="kum saati" />
              </figure>
              <div className="card-body">
                <h1 className="text-3xl">Veri bekleniyor!</h1>
                <p>
                  Hava durumunu görüntülemek için konum izninin açık olması ya
                  da arama kutucuğundan istediğiniz şehri yazmanız
                  gerekmektedir.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content bottom-0 z-10">
        <aside>
          <p>-Made by Nil Ece Altuğ © 2024 -</p>
        </aside>
        <img
          className="gif"
          alt=""
          src="https://cdn.dribbble.com/users/2120934/screenshots/6193512/11_rain.gif"
        />
      </footer>
    </div>
  );
}

export default HomePage;
