import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import WeatherPage from "./components/WeatherPage";
function App() {
  return (
    <div>
      <Routes>
        <Route index element={<HomePage />} />
        <Route exact path="/images" element={<WeatherPage />} />
      </Routes>
    </div>
  );
}

export default App;
