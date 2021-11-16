import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { IdeasScreen } from "../components/ideas/IdeasScreen";

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>

                    {/* TODO: Route for authentication screen */}

                    {/* Route to main screen */}
                    <Route
                        path="/"
                        component={ IdeasScreen }
                    />

                    {/* Redirect for unexpected urls */}
                    <Redirect to="/"/>

                </Switch>
            </div>
        </Router>
    )
}
