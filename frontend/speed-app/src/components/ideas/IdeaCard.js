import React from 'react'

export const IdeaCard = ({ idea }) => {

    const removeUnderline = { textDecoration: "none" }
    return (
        <div className="card my-3">
            <div className="card-body">
                <h5 className="card-title">{idea.title}</h5>
                <p className="card-text">{idea.content}</p>
                <a href="#" className="card-link" style={removeUnderline}><i class="fas fa-thumbs-up"></i> 0</a>
                <a href="#" className="card-link" style={removeUnderline}><i class="far fa-comments"></i> 0</a>
            </div>
        </div>
    )
}
