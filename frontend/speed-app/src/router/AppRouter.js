import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { AuthRouter } from "./AuthRouter";
import { IdeasRouter } from "./IdeasRouter";
import { PublicRoute } from "./PublicRoute";


export const AppRouter = () => {

    const user = localStorage.getItem('user');
    const isLoggedIn = user !== '';

    return (
        <Router>
            <div>
                <Switch>

                    {/* Routes for authentication screen */}
                    <PublicRoute 
                        path="/auth"
                        component={ AuthRouter }
                        // isAuthenticated={ isLoggedIn }
                    />

                    <Route 
                        path="/"
                        component={ IdeasRouter }
                    />

                    {/* Redirect for unexpected urls */}
                    <Redirect to="/"/>

                </Switch>
            </div>
        </Router>
    )
}
