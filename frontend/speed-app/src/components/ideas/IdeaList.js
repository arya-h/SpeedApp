import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { IdeaCard } from './IdeaCard'

export const IdeaList = () => {   

    const { ideas } = useSelector((state) => state.ideas);

    // Rerender when list changes (Delete idea)
    useEffect(() => {}, [ideas])

    return (
        <div >
            { ideas.length === 0 ?
                <h1>There are no ideas yet</h1> : 
                ideas.map(i => <IdeaCard key={i.id} idea={i} />)
            }
        </div>
    )
}
