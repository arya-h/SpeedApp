import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { FaPlus} from 'react-icons/fa';
import UserProfileInfo from './UserProfileInfo';
import { types } from '../../types/types';
import { Link, useHistory } from 'react-router-dom';
import Swal from "sweetalert2";
import { startLoadingIdeas } from '../../actions/idea';
import '../../style/components/sidebar.css';

const Sidebar = () => {
    const { ideas } = useSelector(state => state.ideas);
    const user = useSelector(state => state.auth);
    const showProfile = user.name !== undefined ? "block" : "none";
    const showLogin = user.name !== undefined ? "none" : "flex";
    const dispatch = useDispatch();
    const history = useHistory();

    const handleHome = ( event ) => {

        selectOption(event.target);
        reLoadIdeas();
        history.push('/ideas/feed')
    }

    const handleMyIdeas = ( event ) => {

        if ( user?.name ){
            selectOption(event.target); 
            filterUserIdeas(user.uid);
        } else {
            history.push('/auth/login');
        }
    }

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
                <div style={{display: showProfile}}>
                    <UserProfileInfo user={user}/>
                </div>
                <div style={{display: showLogin, flexDirection: "column", alignItems: 'center', justifyContent:'center', padding:"2rem 0 2rem 0", borderBottom: "4px dotted #E8E8EA"}}>
                    <Link to="/auth/login">
                        <button className="btn btn-primary">Login</button>
                    </Link>
                </div>
                <div style={userMenu}>

                    <div class="option-selected">
                        <i class="fas fa-home icon"></i>
                        <a onClick={ handleHome } style={optionLabel}>Home</a>
                    </div>
                    <div class="option">
                        <i class="fas fa-bookmark icon"></i>
                        <a onClick={ handleMyIdeas } style={{fontSize: "1rem", marginLeft: "1.85rem", fontWeight: "600"}}>My Ideas</a>
                    </div>
                    <div class="option">
                        <i class="fas fa-paper-plane icon"></i>
                        <a onClick={(event) => {selectOption(event.target); alert('Liked Ideas')}} style={optionLabel}>Liked Ideas</a>
                    </div>
                    <div class="option">
                        {/* <Link to="/ideas/add">
                            <button className="btn btn-primary">Add idea</button>
                        </Link> */}
                        <Link to="/ideas/add" className="btn btn-primary sidebar__add-link w-75">
                        <div className={"d-flex align-items-center p-2"}>
                            <FaPlus/>
                            <span className={" ps-3 "}> Create new idea </span>
                        </div>
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
