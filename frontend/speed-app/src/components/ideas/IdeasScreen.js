import React from 'react'
import NavBar from '../ui/NavBar'
import { IdeaList } from './IdeaList'

export const IdeasScreen = () => {

    return (
        <div>
            <NavBar />
            <div className="container-fluid px-5">
                {/* TODO: Sidebar */}
                <h1 className="my-3">Ideas</h1>
                <IdeaList/>
            </div>
        </div>
    )
}
