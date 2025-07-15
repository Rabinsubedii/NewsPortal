import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import SearchResults from "./pages/SearchResults";
import Navbar from "./components/Navbar"; // import Navbar
import Footer from "./components/footer"; // import Footer


function App() {
  // console.log("API Key from env:", import.meta.env.VITE_NEWS_API_KEY);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar /> {/* Add Navbar here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
