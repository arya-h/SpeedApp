import { doc, updateDoc } from "firebase/firestore"; 
import { db } from "../firebase/firebase-config"

export const updateIdea = async (idea) => {
    const ideaRef = doc(db, "ideas", idea.id);

    // update idea document
    let response = await updateDoc(ideaRef, idea);

    console.log(response);
}