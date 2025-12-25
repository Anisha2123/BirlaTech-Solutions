import { useState } from "react";
import { FaDownload, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ResumeA from "../assets/Anisha_Birla_Resume1.pdf";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Projects" },
    // { id: "resume", label: "Resume" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between">

        {/* BRAND */}
        <div
          onClick={() => scrollToSection("home")}
          className="cursor-pointer"
        >
          <p className="text-shadow-2xs uppercase tracking-widest text-blue-600 font-semibold">
            BirlaTech Solutions
          </p>
        </div>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.id} className="relative group">
              <button
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 font-medium transition-colors group-hover:text-blue-600"
              >
                {item.label}
              </button>

              {/* Hover underline */}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full"></span>
            </li>
          ))}

          {/* Resume Button */}
          <li>
            <a
              href={ResumeA}
              download
              className="ml-2 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
            >
              <FaDownload className="text-sm" />
              Resume
            </a>
          </li>
        </ul>

        {/* MOBILE ICON */}
        <button
          className="md:hidden text-2xl text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-md"
          >
            <ul className="flex flex-col items-center py-8 space-y-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-800 text-lg font-medium hover:text-blue-600 transition"
                  >
                    {item.label}
                  </button>
                </li>
              ))}

              <li>
                <a
                  href={ResumeA}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  <FaDownload />
                  Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
