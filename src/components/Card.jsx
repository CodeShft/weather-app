import PropTypes from "prop-types";

function convertEpoch(value) {
  if (!value) {
    return "";
  }
  const time = new Date(Number(value * 1000));
  if (Number.isNaN(time.valueOf())) {
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

export default function Card({ currentWeather }) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead className="thead">
          <tr>
            <th>Tarih</th>
            <th>Hava Durumu</th>
            <th>Sıcaklık</th>
            <th>Nem</th>
            <th>Rüzgar</th>
          </tr>
        </thead>
        <tbody>
          {currentWeather.map((item) => (
            <tr key={item.dt}>
              <td className="text-bold">{convertEpoch(item.dt, "date")}</td>
              <td className="flex items-center">
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].description}
                  className="w-8 h-8 mr-2"
                />
                <span className="text-bold">{item.weather[0].description}</span>
              </td>
              <td className="text-bold">
                {item.main.temp.toFixed(1)} C° (hissedilen:{" "}
                {item.main.feels_like.toFixed(1)} C°)
              </td>
              <td className="text-bold">{item.main.humidity}</td>
              <td className="text-bold">{item.wind.speed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
Card.propTypes = {
  currentWeather: PropTypes.arrayOf(PropTypes.object).isRequired,
};
