import { doc, updateDoc } from "firebase/firestore"; 
import { db } from "../firebase/firebase-config"

export const addComment = async (idea, comment) => {
    console.log(idea);
    const ideaRef = doc(db, "ideas", idea.id);

    // update comments object of idea
    if('comments' in idea){
        idea?.comments.push(comment);
    }else{
        let commentsArray = []
        commentsArray.push(comment);
        idea = {
            id: idea.id,
            title: idea.title,
            comments: commentsArray
        }
    }

    // update idea document
    await updateDoc(ideaRef, idea);
}