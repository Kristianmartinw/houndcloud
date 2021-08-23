import React, { useState, useEffect } from "react";
import AudioPlayer from 'react-h5-audio-player';
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { getBreeds } from './store/breeds';
import { getSongs } from './store/songs';
import { getUsers } from './store/users';
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import BreedList from "./components/BreedsPage";
import UserList from "./components/UsersList";
import HomePage from "./components/HomePage";
import { Link } from 'react-router-dom';
import './index.css';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getBreeds());
    dispatch(getSongs());
    dispatch(getUsers());

  }, [dispatch]);

  const [currentlyPlaying, setCurrentlyPlaying] = useState('')

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <HomePage setCurrentlyPlaying={setCurrentlyPlaying} />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/breeds'>
            <BreedList setCurrentlyPlaying={setCurrentlyPlaying} />
          </Route>
          <Route path='/users'>
            <UserList setCurrentlyPlaying={setCurrentlyPlaying} />
          </Route>
          <Route>
            <div className='routeDiv'>
              <div className='containContainer'>
                <div className='routeContainer'>
                  <h1 className='foohfo'>404</h1>
                  <h3 className='top404message'>You expected a page to load but you got DJ Pug instead.</h3>
                  <img className='foohfoimg' alt="404 pug" src={'https://i.imgur.com/N5UDGn5.gif'}></img>
                  <h3 className='bottom404message'>Click <Link to='/'>here</Link> so we can get you back to listening to music.</h3>
                </div>
              </div>
            </div>
          </Route>
        </Switch>
      )}
      <footer><div className='musicPlayer'><AudioPlayer layout='horizontal' volume={.2} src={currentlyPlaying} /></div></footer>
    </>
  );
}

export default App;
