import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../firebase/firebase-config"

export const loadIdeas = async () => {
    const ideasSnap = await getDocs(collection(db, "ideas"));
    const ideas = [];

    ideasSnap.forEach( ( idea ) => {
        ideas.push({
            id: idea.id,
            ...idea.data()
        })
    })

    return await loadComments( ideas );
}

// Too many acceses...
const loadComments = async ( ideas ) => {

    const ideasWithComments = [];

    for( const idea of ideas ){
        const commentsSnap = await getDocs(collection(db, `ideas/${ idea.id }/comments`));
        const comments = [];
    
        commentsSnap.forEach( ( comment ) => {
            comments.push({
                id: comment.id,
                ...comment.data()
            })
        })

        ideasWithComments.push({
            ...idea,
            comments:comments
        })
    }

    return ideasWithComments
}