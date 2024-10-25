import React, { useState } from 'react';
import LoginForm from '../../components/Login/LoginForm';
import { mockLogin } from '../../utils/auth';
import { useHistory } from 'react-router-dom';
import './Login.css';
import HeroImg from '../../assets/pokomon-bg.jpg';

const Login: React.FC = () => {
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = (email: string, password: string) => {
    const authenticated = mockLogin(email, password);

    if (authenticated) {
      setError('');
      history.push('/home');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-layout"
    >
      <div className="login-image-section" style={{
        backgroundImage: `url(${HeroImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(255, 205, 42, 0.5)',
        backgroundBlendMode: 'multiply',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-md)',
        color: 'var(--color-text-light)',
      }}>
        {/*         <h1>Find your favorites!</h1>
 */}      </div>
      <div className="login-form-section">
        <LoginForm onLogin={handleLogin} errorMessage={error} />
      </div>
    </div >

  );
};

export default Login;
