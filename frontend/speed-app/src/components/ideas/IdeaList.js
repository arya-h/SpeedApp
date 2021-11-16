import React from 'react'
import { useSelector } from 'react-redux';
import { IdeaCard } from './IdeaCard'

export const IdeaList = () => {   
    const ideas = useSelector((state) => state.ideas);

    return (
        <div >
            {ideas.map(i => <IdeaCard idea={i} />)}
        </div>
    )
}
