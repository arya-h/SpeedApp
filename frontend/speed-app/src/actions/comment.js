import { addComment } from '../helpers/addComment';


export const addNewComment = (idea, comment) => {
    return async () => {
        const response = await addComment(idea, comment);
    }
}