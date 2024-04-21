import PropTypes from "prop-types";
import broken_clouds from "../assets/videos/broken_clouds.mp4";
import clear_sky from "../assets/videos/clear_sky.mp4";
import few_clouds from "../assets/videos/few_clouds.mp4";
import mist from "../assets/videos/mist.mp4";
import rain from "../assets/videos/rain.mp4";
import scattered_clouds from "../assets/videos/scattered_clouds.mp4";
import shower_rain from "../assets/videos/shower_rain.mp4";
import snow from "../assets/videos/snow.mp4";
import thunderstorm from "../assets/videos/thunderstorm.mp4";

export default function Background({ weatherId }) {
  let background = "";
  switch (weatherId) {
    // Clear
    case 800:
      background = clear_sky;
      break;
    // Clouds
    case 801:
      background = few_clouds;
      break;
    case 802:
      background = scattered_clouds;
      break;
    case 803:
    case 804:
      background = broken_clouds;
      break;
    // Drizzle
    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321:
      background = shower_rain;
      break;
    // Rain
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
      background = rain;
      break;
    case 511:
      background = snow;
      break;
    case 520:
    case 521:
    case 522:
    case 531:
      background = shower_rain;
      break;
    // Snow
    case 600:
    case 601:
    case 602:
    case 611:
    case 612:
    case 613:
    case 615:
    case 616:
    case 620:
    case 621:
    case 622:
      background = snow;
      break;
    // Atmosphere
    case 701:
    case 711:
    case 721:
    case 731:
    case 741:
    case 751:
    case 761:
    case 762:
    case 771:
    case 781:
      background = mist;
      break;
    // Thunderstorm
    case 200:
    case 201:
    case 202:
    case 210:
    case 211:
    case 212:
    case 221:
    case 230:
    case 231:
    case 232:
      background = thunderstorm;
      break;
    default:
      background = scattered_clouds;
      break;
  }

  return (
    <video
      id="background-video"
      style={{
        width: "100vw",
        height: "100vh",
        objectFit: "cover",
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
      key={background}
      autoPlay
      loop
      muted
    >
      <source src={background} type="video/mp4" />
    </video>
  );
}

Background.propTypes = {
  weatherId: PropTypes.number,
};
