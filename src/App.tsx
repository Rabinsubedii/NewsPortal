import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Navbar from "./components/Navbar"; 
import Footer from "./components/footer"; 
import ProjectSummary from "./pages/ProjectSummary";


function App() {
  // console.log("API Key from env:", import.meta.env.VITE_NEWS_API_KEY);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar /> {/* Add Navbar here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<Category />} />
        {/* <Route path="/search" element={<SearchResults />} /> */}
        <Route path="/summary" element={<ProjectSummary />} />
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
