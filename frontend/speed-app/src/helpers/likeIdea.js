import { doc, updateDoc } from "firebase/firestore"; 
import { db } from "../firebase/firebase-config"

export const likeIdea = async (idea) => {

    const ideaRef = doc(db, "ideas", idea.id);

    // update idea document
    await updateDoc(ideaRef, idea);
}