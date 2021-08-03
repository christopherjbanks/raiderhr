import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import GlobalStyles from "./GlobalStyles";
import LandingPage from "./LandingPage";
import { useAuth0 } from "@auth0/auth0-react";
import UserHomePage from "./UserHomePage";
import ErrorPage from "./404Page";
import People from "./People";
import Profile from "./Profile";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isShown, setIsShown] = useState(false);
  const [bgWord, setBgWord] = useState("");

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Switch>
        <Route exact path="/">
          {isAuthenticated && (
            <UserHomePage
              setIsShown={setIsShown}
              setBgWord={setBgWord}
              bgWord={bgWord}
              isShown={isShown}
            />
          )}
          {!isAuthenticated && <LandingPage />}
        </Route>

        {isAuthenticated && (
          <Route exact path="/home">
            <UserHomePage
              setIsShown={setIsShown}
              setBgWord={setBgWord}
              bgWord={bgWord}
              isShown={isShown}
            />
          </Route>
        )}
        {isAuthenticated && (
          <Route exact path="/people">
            <People
              setIsShown={setIsShown}
              setBgWord={setBgWord}
              bgWord={bgWord}
              isShown={isShown}
            />
          </Route>
        )}
        {isAuthenticated && (
          <Route exact path="/profile">
            <Profile
              setIsShown={setIsShown}
              setBgWord={setBgWord}
              bgWord={bgWord}
              isShown={isShown}
            />
          </Route>
        )}
        <Route path="">
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
