import Swal from 'sweetalert2';
import { getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    updateProfile, 
    signInWithPopup, 
    GoogleAuthProvider   } from "firebase/auth";

import { types } from "../types/types"

export const startLoginEmailPassword = ( email, password ) => {
    return ( dispatch ) => {

        const auth = getAuth();
        signInWithEmailAndPassword( auth, email, password )
            .then( ({ user }) => {
                
                console.log( user )
                dispatch( login( user.uid, user.displayName) );

            }).catch( error => {

                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error'
                })

            })
    }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return ( dispatch ) => {

        const auth = getAuth();
        createUserWithEmailAndPassword ( auth, email, password )
            .then( async ( { user } ) => {

                await updateProfile( auth.currentUser, {
                    displayName: name
                    // Photo url
                })

                dispatch(
                    login( user.uid , user.displayName)
                )
                
            }).catch( ( error ) => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error'
                })
            } )
    }
}

export const startGoogleLogin = () => {
    return ( dispatch ) => {

        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup( auth, provider )
            .then( ({ user }) => {

                dispatch(
                    login( user.uid , user.displayName)
                )
                
            })
    }
}

export const login = ( uid, displayName ) => {

    localStorage.setItem('user', uid);

    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const startLogout = () => {
    return async ( dispatch ) => {
        const auth = getAuth();
        await signOut( auth );
        dispatch( logout() );
    }
}
export const logout = () => ( { type: types.logout } )
