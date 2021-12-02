import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import UserProfileInfo from './UserProfileInfo';
import { types } from '../../types/types';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import { startLoadingIdeas } from '../../actions/idea';

const Sidebar = () => {

    const { ideas } = useSelector(state => state.ideas);
    const user = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const filterUserIdeas = (userId) => {
        dispatch({
            type: types.filterUserIdeas,
            payload: userId,
        })
    }

    const reLoadIdeas = () => {
        Swal.fire({
            title: 'Loading ideas',
            html: 'Please, wait!',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
                dispatch( startLoadingIdeas() );
            },
            timer: 2000,
            timerProgressBar: true
        })
    }

    return (
        <div class="wrapper" style={sideBarStyle}>
            <nav id="sidebar">
                <UserProfileInfo user={user}/>
                <div style={userMenu}>
                    <Link to="/ideas/feed">
                        <a onClick={() => reLoadIdeas()}>Home</a>
                    </Link>
                    <a onClick={() => filterUserIdeas(user.uid)}>My Ideas</a>
                    <a onClick={() => alert('Liked Ideas')}>Liked Ideas</a>
                </div>
                <div>
                    <Link to="/ideas/add">
                        <button className="btn btn-primary">Add idea</button>
                    </Link>
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
