import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import UserProfileInfo from './UserProfileInfo';
import { types } from '../../types/types';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import { startLoadingIdeas } from '../../actions/idea';
import '../../style/components/sidebar.css';

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

    const selectOption = (option) => {
        let options = document.getElementsByClassName("option-selected");
        let optionDiv = option.parentNode;
        options[0].className = "option";
        optionDiv.setAttribute("class", "option-selected");
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

                    <div class="option-selected">
                        <i class="fas fa-home icon"></i>
                        <a onClick={(event) => {selectOption(event.target);reLoadIdeas();}} style={optionLabel}>Home</a>
                    </div>
                    <div class="option">
                        <i class="fas fa-bookmark icon"></i>
                        <a onClick={(event) => {selectOption(event.target); filterUserIdeas(user.uid);}} style={{fontSize: "1rem", marginLeft: "1.85rem", fontWeight: "600"}}>My Ideas</a>
                    </div>
                    <div class="option">
                        <i class="fas fa-paper-plane icon"></i>
                        <a onClick={(event) => {selectOption(event.target); alert('Liked Ideas')}} style={optionLabel}>Liked Ideas</a>
                    </div>
                    <div class="option">
                        <Link to="/ideas/add">
                            <button className="btn btn-primary">Add idea</button>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>   
    )
}

const sideBarStyle = {
    position: "absolute",
    height: "100%",
    width: "18rem",
    backgroundColor: "#fff",
    fontFamily: "var(--main-font)"
}

const userMenu = {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    padding: "1rem"
}

const optionLabel = {
    fontSize: "1rem",
    marginLeft: "1.5rem",
    fontWeight: "600"
}

export default Sidebar;
