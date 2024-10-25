import React from 'react';
import './PokemonCard.css';
import Button from '../Globals/Button';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface PokemonCardProps {
  name: string;
  url: string;
  id?: string;
  isFavorite?: boolean;
  onAddFavorite?: () => void;
  onShowDetails?: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, url, isFavorite, onAddFavorite, onShowDetails }) => {
  const getPokemonImageUrl = () => {
    const id = url.split('/').filter(Boolean).pop();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  };

  return (
    <div className="pokemon-card">
      {onAddFavorite && (
        <button
          onClick={onAddFavorite}
          className="favorite-button"
          title='add to favorite'
          aria-label='Add to favorites'
          style={{
            background: 'none',
            border: 'none',
            padding: '0',
            cursor: 'pointer',
          }}
        >
          {isFavorite ? (
            <FaStar color="#1679ab" size={30} />
          ) : (
            <FaRegStar color="#1679ab" size={30} />
          )}
        </button>
      )}
      <div className="pokemon-image">
        <img src={getPokemonImageUrl()} alt={name} />
      </div>
      <div className="">
        <h3 className='pokemon-name'>{name}</h3>
        <Button onClick={onShowDetails} label='Details' />
      </div>
    </div>
  );
};

export default PokemonCard;
