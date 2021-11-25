import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config"

export const addIdea = async (idea) => {
    const docRef = await addDoc(collection(db, "ideas"), idea);
    idea.id = docRef.id;
    return idea;
}