import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import SearchResults from "./pages/SearchResults";
import Navbar from "./components/Navbar"; // import Navbar

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar /> {/* Add Navbar here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:type" element={<Category />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </div>
  );
}

export default App;
