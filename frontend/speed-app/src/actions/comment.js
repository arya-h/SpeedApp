import { addComment } from '../helpers/addComment';


export const addNewComment = (idea, comment) => {
    return async () => { await addComment(idea, comment); }
}