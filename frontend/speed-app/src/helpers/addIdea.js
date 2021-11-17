import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config"

export const addIdea = async (idea) => {
    const docRef = await addDoc(collection(db, "ideas"), idea);
    console.log(docRef)
    return idea;
}