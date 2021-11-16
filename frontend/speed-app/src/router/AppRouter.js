import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useDispatch } from 'react-redux'

import { IdeasScreen } from "../components/ideas/IdeasScreen";
import { startLoadingIdeas } from "../actions/idea";

export const AppRouter = () => {

    const dispatch = useDispatch();
    
    useEffect(() => {
        
        // User authentication
        
        // Load ideas
        console.log('Loading ideas...')
        dispatch( startLoadingIdeas() );

    }, [ dispatch ])

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
