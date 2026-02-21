import { useState, useEffect, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  const { user, handleSignOut } = useContext(AuthContext);

  useEffect(() => {
    setActiveLink(location.pathname || "/");
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
    setIsOpen(false);
  };

  return (
    <nav className="bg-green-800 text-white py-4 md:py-8 fixed top-0 z-10 border-b-2 border-green-600 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <h3 className="text-xl font-bold">React Practice</h3>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <IoMdClose /> : <FaBars />}
          </button>
        </div>

        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" onClick={() => handleLinkClick("/")}
              className={activeLink === "/" ? "text-green-300" : "hover:text-green-300"}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => handleLinkClick("/about")}
              className={activeLink === "/about" ? "text-green-300" : "hover:text-green-300"}>
              About
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={() => handleLinkClick("/products")}
              className={activeLink === "/products" ? "text-green-300" : "hover:text-green-300"}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => handleLinkClick("/contact")}
              className={activeLink === "/contact" ? "text-green-300" : "hover:text-green-300"}>
              Contact
            </Link>
          </li>
        </ul>

        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <span>{user?.displayName}</span>
              <button
                onClick={handleSignOut}
                className="bg-white text-black px-4 py-1 rounded hover:bg-slate-400">
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button className=" bg-white text-black px-4 py-1 rounded hover:bg-slate-400">
                Login
              </button>
            </Link>
          )}
        </div>

        {isOpen && (
          <ul className="absolute top-16 left-0 w-full bg-green-800 flex flex-col items-center space-y-4 py-4 md:hidden">
            <li><Link to="/" onClick={() => handleLinkClick("/")}>Home</Link></li>
            <li><Link to="/about" onClick={() => handleLinkClick("/about")}>About</Link></li>
            <li><Link to="/products" onClick={() => handleLinkClick("/products")}>Products</Link></li>
            <li><Link to="/contact" onClick={() => handleLinkClick("/contact")}>Contact</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
