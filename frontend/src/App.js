import React, { useState, useEffect } from "react";
import AudioPlayer from 'react-h5-audio-player';
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { getBreeds } from './store/breeds';
import { getSongs } from './store/songs';
import { getUsers } from './store/users';
import { uploadSongs } from './store/songs';
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

  // testing aws
  const [file, setFile] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    console.log("FILE ------------->", file);
    dispatch(uploadSongs(file))
  }

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/breeds'>
            <BreedList />
          </Route>
          <Route path='/users'>
            <UserList />
          </Route>
          <Route path='/upload'>
            <h1>Upload file</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor='song'></label>
              <input id='song' type='file' onChange={e => setFile(e.target.files[0])}></input>
              <button>Submit</button>
            </form>
          </Route>
          <Route>
            <div className='routeDiv'>
              <div className='containContainer'>
                <div className='routeContainer'>
                  <h1 className='foohfo'>404</h1>
                  <h3 className='top404message'>You expected a page to load but you got DJ Pug instead.</h3>
                  <img className='foohfoimg' src={'https://i.imgur.com/N5UDGn5.gif'}></img>
                  <h3 className='bottom404message'>Click <Link to='/'>here</Link> so we can get you back to listening to music.</h3>
                </div>
              </div>
            </div>
          </Route>
        </Switch>
      )}
      <footer><AudioPlayer layout='horizontal' src={'https://hound-cloud.s3.us-west-1.amazonaws.com/1629446013018.mp3'} /></footer>
    </>
  );
}

export default App;
