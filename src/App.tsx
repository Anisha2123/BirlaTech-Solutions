import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ThemeProvider } from "./context/ThemeContext";

import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages1/Home";

import "./App.css";


const App = () => {
  return (
    // <ThemeProvider>
      <Router>
        {/* Persistent Navbar */}
        <Navbar />
    {/* <CustomCursor /> */}
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

        {/* Persistent Footer */}
        <Footer />
      </Router>
    // </ThemeProvider>
  );
};

export default App;
