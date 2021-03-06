import React from 'react'

import { AddIdeaScreen } from '../components/ideas/AddIdeaScreen'
import { IdeaEditScreen } from '../components/ideas/IdeaEditScreen'
import { IdeasScreen } from '../components/ideas/IdeasScreen'
import NavBar from '../components/ui/NavBar'
import Sidebar from '../components/ui/Sidebar'
import { PrivateRoute } from './PrivateRoute'
import { Redirect, Route, Switch } from 'react-router';
import { useSelector } from 'react-redux'

export const IdeasRouter = () => {

    const { uid } = useSelector(state => state.auth)
    const isLoggedIn = uid !== undefined;

    return (
        <div id="ideaRouter">
            {/* NAVBAR */}
            <NavBar />

            <Sidebar />

            <Switch>
                {/* Route to main screen */}
                <Route 
                    path="/ideas/feed"
                    component={ IdeasScreen }
                />

                {/* Route to edit idea screen */}
                <PrivateRoute
                    path="/ideas/edit/:ideaId"
                    component={ IdeaEditScreen } 
                    isAuthenticated={ isLoggedIn }
                />

                {/* Route to add idea*/}
                <PrivateRoute
                    path="/ideas/add"
                    component={ AddIdeaScreen } 
                    isAuthenticated={ isLoggedIn }
                />   

                <Redirect to ='/ideas/feed'/>

            </Switch>
                    
        </div>
    )
}
