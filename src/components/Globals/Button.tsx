import React from 'react';
import './Button.css';

interface ButtonProps {
  label: string;
  color?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, color, onClick }) => {
  return (
    <button className="custom-button" style={{ backgroundColor: color }} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
