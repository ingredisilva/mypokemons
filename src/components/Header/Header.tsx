import React from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../../assets/pokemon-logo.png';
import './Header.css';
import heroImage from '../../assets/hero-img.png';
import Button from '../Globals/Button';
import { getUserCredentials, logout } from '../../utils/auth';

const Header: React.FC = () => {
  const history = useHistory();
  const { email } = getUserCredentials();

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <header
      className="layout-header"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(255, 205, 42, 0.5)',
        backgroundBlendMode: 'multiply',
        height: '200px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'var(--spacing-md)',
        color: 'var(--color-text-light)',
      }}
    >
      <img src={Logo} alt="Pokémon App Logo" />
      <div className="header-right">
        {email ? (
          <>
            <span>Welcome, {email}</span>
            <Button onClick={handleLogout} label="Logout" />
          </>
        ) : (
          <Button onClick={() => history.push('/login')} label="Login" />
        )}
      </div>
    </header>
  );
};

export default Header;
