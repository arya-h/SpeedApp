import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth,  onAuthStateChanged} from "firebase/auth";

import { AddIdeaScreen } from '../components/ideas/AddIdeaScreen'
import { IdeaEditScreen } from '../components/ideas/IdeaEditScreen'
import { IdeasScreen } from '../components/ideas/IdeasScreen'
import NavBar from '../components/ui/NavBar'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { login } from '../actions/auth';

export const IdeasRouter = () => {

    const state = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const user = localStorage.getItem('user');
    const isLoggedIn = user !== '';

    return (
        <div>
            <NavBar />
            <div>
                {/* Route to main screen */}
                <PublicRoute 
                    path="/"
                    component={ IdeasScreen }
                    isAuthenticated={ isLoggedIn }
                />

                {/* Route to edit idea screen */}
                <PrivateRoute
                    exact path="/edit/:ideaId"
                    component={ IdeaEditScreen } 
                    isAuthenticated={ isLoggedIn }
                />

                {/* Route to add idea*/}
                <PrivateRoute
                    exact path="/add"
                    component={ AddIdeaScreen } 
                    isAuthenticated={ isLoggedIn }
                />    


            </div>        
        </div>
    )
}
