import React, { useState } from 'react';
import './LoginForm.css';
import Button from '../Globals/Button';
import Logo from '../../assets/pokemon-logo.png';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  errorMessage: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, errorMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className='login-container'>
      <div className="login-image-section">
        <img src={Logo} alt="Logo" className="login-logo" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {/*       {errorMessage && <p className="error">{errorMessage}</p>}
 */}
      <div className='button-container'>
        <Button type="submit" label="Login" />
      </div>
    </form>
  );
};

export default LoginForm;
