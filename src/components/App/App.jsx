import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main'
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login'
import NotFound from '../NotFound/NotFound'
import { cards, savedCards } from '../../utils/content';

function App() {
  return (
    <div className="app">
      <CurrentUserContext.Provider
        value={{
          name: 'Василий',
          email: 'vas.matyushkin@yandex.ru',
        }}
      >
        <Routes>
          <Route path="/" element={
            <>
              <Header isLoggedIn={false} />
              <Main />
              <Footer />
            </>
          }
          />
          <Route path="/movies" element={
            <>
              <Header isLoggedIn={true} />
              <Movies cards={cards} />
              <Footer />
            </>
          }
          />
          <Route path="/saved-movies" element={
            <>
              <Header isLoggedIn={true} />
              <SavedMovies cards={savedCards} />
              <Footer />
            </>
          }
          />
          <Route path="/profile" element={
            <>
              <Header isLoggedIn={true} />
              <Profile />
            </>
          }
          />
          <Route path="/signup" element={
            <>
              <Register />
            </>
          }
          />
          <Route path="/signin" element={
            <>
              <Login />
            </>
          }
          />
          <Route path="*" element={
            <NotFound />
          }
          />
        </Routes >
      </CurrentUserContext.Provider >
    </div >
  );
}

export default App;