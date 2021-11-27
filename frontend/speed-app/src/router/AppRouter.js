import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { AuthRouter } from "./AuthRouter";
import { IdeasRouter } from "./IdeasRouter";
import { PublicRoute } from "./PublicRoute";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";


export const AppRouter = () => {

    const dispatch = useDispatch()
    const [isLoggedIn, setIsLoggedIn] = useState( false );

    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user?.uid) {
                dispatch( login( user.uid, user.displayName ))
                setIsLoggedIn( true );
                localStorage.setItem('user', user.displayName);
            } else {
                setIsLoggedIn( false );
                localStorage.removeItem('user');
            }
          });
    }, [ dispatch ])

    return (
        <Router>
            <div>
                <Switch>

                    {/* Routes for authentication screen */}
                    <PublicRoute 
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated={ isLoggedIn }
                    />

                    <Route 
                        path="/ideas"
                        component={ IdeasRouter }
                    />

                    {/* Redirect for unexpected urls */}
                    <Redirect to="/ideas"/>

                </Switch>
            </div>
        </Router>
    )
}
