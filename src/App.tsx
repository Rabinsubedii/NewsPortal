import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import ProjectSummary from "./pages/ProjectSummary";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Navbar displayed at the top of every page */}
      <Navbar />

      {/* Define application routes */}
      <Routes>
        {/* Home page showing general news */}
        <Route path="/" element={<Home />} />

        {/* Category page showing news filtered by category */}
        <Route path="/category/:category" element={<Category />} />

        {/* Project summary page with details about the project */}
        <Route path="/summary" element={<ProjectSummary />} />
      </Routes>

      {/* Footer displayed at the bottom of every page */}
      <Footer />
    </div>
  );
}

export default App;
