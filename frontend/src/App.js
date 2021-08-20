import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { getBreeds } from './store/breeds';
import { getSongs } from './store/songs';
import { uploadSongs } from './store/songs';
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import BreedList from "./components/BreedsPage";
import UserList from "./components/UsersList";
import HomePage from "./components/HomePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getBreeds());
    dispatch(getSongs());

  }, [dispatch]);

  // testing moiz code
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
            404 You know what it is
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
