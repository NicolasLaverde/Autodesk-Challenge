import React from 'react';
import './HamburgerMenu.css';
import { HamburgerMenuProps } from '../types/hamburgerMenu';

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, toggleMenu }) => {
  return (
    <button className={`hamburger-menu ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
      {isOpen ? (
        <svg
          className="block w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          className="block w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
    </button>
  );
}

export default HamburgerMenu;