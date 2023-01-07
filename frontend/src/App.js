import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotPage from "./components/SpotPage"
import CreateSpotForm from "./components/CreateSpotForm";
import EditSpotForm from "./components/EditSpotFormPage";
import SpotInfo from "./components/SpotInfo"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
           <Route exact path="/">
            <SpotPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/new">
            <CreateSpotForm />
          </Route>
          <Route path="/user/edit/:spotId">
            <EditSpotForm />
          </Route>
          <Route path="/spots/:spotId">
            <SpotInfo />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;