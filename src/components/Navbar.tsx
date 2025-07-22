import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const Navbar = () => {
  // State to manage the mobile menu open/close
  const [menuOpen, setMenuOpen] = useState(false);

  // Navigation menu items (both for desktop and mobile)
  const menuItems = [
    { title: "Top Stories", path: "/" },
    { title: "World", path: "/category/world" },
    { title: "Business", path: "/category/business" },
    { title: "Technology", path: "/category/technology" },
    { title: "Health", path: "/category/health" },
    { title: "Sports", path: "/category/sports" },
    { title: "Project Summary", path: "/summary" },
  ];

  return (
    <>
      {/* Main navigation bar */}
      <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-300">
        {/* Left section: Hamburger button (mobile) + Logo */}
        <div className="flex items-center space-x-4">
          {/* Hamburger Menu Button - Visible only on mobile (md:hidden) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="block md:hidden p-2"
            aria-label="Toggle menu"
          >
            {/* Hamburger icon (3 horizontal lines) */}
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-black"></span>
              <span className="block w-6 h-0.5 bg-black"></span>
              <span className="block w-6 h-0.5 bg-black"></span>
            </div>
          </button>

          {/* Logo */}
          <Link to="/" className="font-bold text-2xl tracking-widest">
            NEWS
          </Link>
        </div>

        {/* Desktop Menu - Visible from medium screens (md+) */}
        <ul className="hidden md:flex space-x-8">
          {menuItems.map(({ title, path }) => (
            <li key={title}>
              <Link
                to={path}
                className="text-gray-800 hover:text-blue-600 transition font-medium"
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>

        {/* SearchBar component (always visible) */}
        <SearchBar />
      </nav>

      {/* Mobile Menu Dropdown (Visible only when menuOpen is true) */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-300 shadow-md transition-all duration-300 ease-in-out">
          <ul className="flex flex-col space-y-2 px-6 py-4">
            {menuItems.map(({ title, path }) => (
              <li key={title}>
                <Link
                  to={path}
                  onClick={() => setMenuOpen(false)} // Close menu when a link is clicked
                  className="block py-2 text-gray-800 hover:text-blue-600 transition font-medium"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
