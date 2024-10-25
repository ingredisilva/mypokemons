import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login/Login';
import PokemonList from './pages/Home/PokemonList';
import Favorites from './pages/Favorites/Favorites';
import { FavoritesProvider } from './context/FavoritesContext'; // Import the provider

export const App = () => {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route>
            <Layout>
              <Switch>
                <Route exact path="/home" component={PokemonList} />
                <Route exact path="/favorites" component={Favorites} />
              </Switch>
            </Layout>
          </Route>
        </Switch>
      </BrowserRouter>
    </FavoritesProvider>
  );
};

export default App;
