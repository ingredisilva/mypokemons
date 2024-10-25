import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="layout-footer">
      <p>&copy; 2024 Pokémon App. All rights reserved.</p>
      <nav>
        <Link to="/home">Home</Link> | <Link to="/favorites">Favorites</Link>
      </nav>
    </footer>
  );
};

export default Footer;
