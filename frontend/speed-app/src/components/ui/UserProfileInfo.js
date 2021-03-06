import React from 'react'
import { useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';
import '../../style/components/userprofile.css';
import { getAuth } from "firebase/auth";

const UserProfileInfo = ( { user }) => {

    const dispatch = useDispatch();
    const userEmail = getAuth().currentUser?.email;
    
    const handleLogout = () => {
        dispatch( startLogout() );
      }

    return (
        <div className={"profile-container"}>
            <i className={"fas fa-user-circle"} style={{fontSize: "5rem", paddingTop: "2rem"}}/>
            <div className={"info-container"}>
                <span className={"username"}>{ user?.name }</span> 
                <span className={"email"}>{userEmail}</span>
            </div>
            <button 
                className="btn btn-danger ms-2 mb-3"
                onClick={ handleLogout }
            >
                
                Logout
        </button>
        </div>
    )
}

export default UserProfileInfo;