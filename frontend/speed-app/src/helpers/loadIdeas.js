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

    return ideas;
}