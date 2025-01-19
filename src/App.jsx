import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import WeatherPage from "./components/WeatherPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<HomePage />} />
          <Route exact path="/images" element={<WeatherPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
