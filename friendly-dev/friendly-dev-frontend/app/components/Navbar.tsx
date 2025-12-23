import { NavLink } from 'react-router';
import { FaLaptopCode, FaTimes, FaBars } from 'react-icons/fa';
import { useState } from 'react';

const NavbarComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const base = 'transition hover:text-blue-400';
  const active = 'text-blue-400 font-semibold';

  return (
    <>
      <nav className='bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50'>
        <div className='max-w-6xl mx-auto px-6 py-4 flex justify-between items-center'>
          <NavLink
            to='/'
            className='flex items-center gap-2 text-blue-300 text-lg font-bold'
          >
            <FaLaptopCode className='text-blue-400 text-xl' />
            <span>Portfolio UI</span>
          </NavLink>

          <div className='hidden md:flex items-center gap-6 '>
            <div className='space-x-4 text-sm text-gray-300'>
              <NavLink
                to='/'
                className={({ isActive }) => (isActive ? active : base)}
              >
                Home
              </NavLink>
              <NavLink
                to='/projects'
                className={({ isActive }) => (isActive ? active : base)}
              >
                Projects
              </NavLink>
              <NavLink
                to='/blog'
                className={({ isActive }) => (isActive ? active : base)}
              >
                Blog
              </NavLink>
              <NavLink
                to='/about'
                className={({ isActive }) => (isActive ? active : base)}
              >
                About
              </NavLink>
              <NavLink
                to='/contact'
                className={({ isActive }) => (isActive ? active : base)}
              >
                Contact
              </NavLink>
            </div>
          </div>

          <div className='md:hidden flex items-center gap-4 '>
            <button
              className='text-blue-400 text-xl cursor-pointer'
              title='Menu'
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className='md:hidden bg-gray-800 border-t border-gray-700 px-6 py-4 space-y-2 space-x-4 text-center'>
            <NavLink
              to='/'
              className={({ isActive }) => (isActive ? active : base)}
            >
              Home
            </NavLink>
            <NavLink
              to='/projects'
              onClick={() => setMenuOpen(!menuOpen)}
              className={({ isActive }) => (isActive ? active : base)}
            >
              Projects
            </NavLink>
            <NavLink
              to='/blog'
              onClick={() => setMenuOpen(!menuOpen)}
              className={({ isActive }) => (isActive ? active : base)}
            >
              Blog
            </NavLink>
            <NavLink
              to='/about'
              onClick={() => setMenuOpen(!menuOpen)}
              className={({ isActive }) => (isActive ? active : base)}
            >
              About
            </NavLink>
            <NavLink
              to='/contact'
              onClick={() => setMenuOpen(!menuOpen)}
              className={({ isActive }) => (isActive ? active : base)}
            >
              Contact
            </NavLink>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavbarComponent;
