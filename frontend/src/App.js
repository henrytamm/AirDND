import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/Spots/SpotList/SpotList";
import SpotCard from "./components/Spots/SpotCard/SpotCard";
import CreateSpotForm from "./components/Spots/CreateSpotForm/CreateSpotForm";
import EditSpotForm from "./components/Spots/EditSpotFormPage/EditSpotForm";
import EditReviewForm from "./components/Reviews/EditReviewFormPage/EditReviewForm";

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
            <SpotList />
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
          <Route exact path="/spots/:spotId">
            <SpotCard />
          </Route>
          <Route exact path="/spots/edit/:spotId">
            <EditSpotForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;