import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  

  const menuItems = [
    { title: "Sport" },
    { title: "Economy" },
    { title: "Technology" },
    { title: "Education" },
  ];

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-300">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="block md:hidden p-2"
            aria-label="Toggle menu"
          >
            {/* Hamburger icon */}
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-black"></span>
              <span className="block w-6 h-0.5 bg-black"></span>
              <span className="block w-6 h-0.5 bg-black"></span>
            </div>
          </button>

          <Link to="/" className="font-bold text-2xl tracking-widest">
            NEWS
          </Link>
        </div>

        {/* Center/right: Menu items (hidden on small, flex on md+) */}
        <ul className="hidden md:flex space-x-8">
          {menuItems.map(({ title }) => (
            <li key={title} className="cursor-pointer">
              {title}
            </li>
          ))}
        </ul>

        <SearchBar/>
      
      </nav>

    </>
  );
};

export default Navbar;
