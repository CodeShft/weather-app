import React from "react";

function convertEpoch(value) {
  if (!value) {
    return "";
  }
  const time = new Date(Number(value * 1000));
  if (isNaN(time.valueOf())) {
    return "";
  }
  // 2. Türkçe dil seçenekleri
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: "Europe/Istanbul", // Ankara için zaman dilimini ayarlama
  };

  // 3. Date objesini formatlama
  const formattedDate = time.toLocaleDateString("tr-TR", options);
  return formattedDate;
}

const Card = ({ currentWeather }) => {
  return (
    
    <div className="flex justify-center items-center">
      <div className=" card-compact bg-base-100  shadow-md shadow-gray-500 my-30 mx-auto">
        <div className="card-body overflow-x-auto">
          <table className="table table-sm rounded-sm">
            <thead className="thead">
              <tr>
                <th >Tarih</th>
                <th >Hava Durumu</th>
                <th >Sıcaklık</th>
                <th >Nem</th>
                <th >Rüzgar</th>
              </tr>
            </thead>
            <tbody>
              {currentWeather.map((item, index) => (
                <tr key={index}>
                  <td className="text-bold">{convertEpoch(item.dt, "date")}</td>
                  <td className="flex items-center">
                    <img
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                      alt={item.weather[0].description}
                      className="w-8 h-8 mr-2"
                    />
                    <span className="text-bold">
                      {item.weather[0].description}
                    </span>
                  </td>
                  <td className="text-bold">
                    {item.main.temp} derece (hissedilen: {item.main.feels_like})
                  </td>
                  <td className="text-bold">{item.main.humidity}</td>
                  <td className="text-bold">{item.wind.speed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Card;
