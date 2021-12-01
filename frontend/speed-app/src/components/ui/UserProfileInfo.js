import React from 'react'
import '../../style/components/userprofile.css';

const UserProfileInfo = ( { user }) => {
    return (
        <div className={"profile-container"}>
            <i className={"fas fa-user-circle"} style={{fontSize: "5rem", paddingTop: "2rem"}}/>
            <div className={"info-container"}>
                <span className={"username"}>{ user?.name }</span> 
                <span className={"email"}>pedro@fakeemail.com</span>
            </div>
        </div>
    )
}

export default UserProfileInfo;