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
import { IdeaEditScreen } from "../components/ideas/IdeaEditScreen";
import { AddIdeaScreen } from "../components/ideas/AddIdeaScreen";
import NavBar from "../components/ui/NavBar";


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
            <NavBar />
                <Switch>

                    {/* TODO: Route for authentication screen */}

                    {/* Route to edit idea screen */}
                    <Route
                        path="/edit/:ideaId"
                        component={ IdeaEditScreen }
                    />
                    {/* Route to add idea*/}
                    <Route
                        path="/add"
                        component={ AddIdeaScreen }
                    />
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
