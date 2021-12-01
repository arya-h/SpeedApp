import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import UserProfileInfo from './UserProfileInfo';

const Sidebar = () => {

    const user = useSelector(state => state.auth)

    return (
        <div class="wrapper" style={sideBarStyle}>
            <nav id="sidebar">
                <UserProfileInfo user={user}/>
                <div style={userMenu}>
                    <a onClick={() => alert('Home')}>Home</a>
                    <a onClick={() => alert('My Ideas')}>My Ideas</a>
                    <a onClick={() => alert('Liked Ideas')}>Liked Ideas</a>
                </div>
                <div>
                    <button className="btn btn-primary">Add idea</button>
                </div>
            </nav>
        </div>   
    )
}

const sideBarStyle = {
    position: "absolute",
    height: "100%",
    width: "20rem",
    backgroundColor: "#fff",
    fontFamily: "var(--main-font)"
}

const userMenu = {
    display: "flex",
    flexDirection: "column",
    padding: "1rem"
}

export default Sidebar;
