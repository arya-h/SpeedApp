import React from 'react'
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
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogin = () => {
        history.push('/auth/login')
      }

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

                { user?.name ?
                    <UserProfileInfo user={user}/>
                :
                <div className={"sidebar__login-container"}> 
                    <i className={"fas fa-user-circle"} style={{fontSize: "4rem", color:"var(--bs-primary)"}}/>
                    <button 
                        className="btn btn-primary sidebar__login"
                        onClick={ handleLogin }
                    >
                        <span className={""}>Login</span> 
                            
                    </button>
                </div>
               
                }

                <div style={userMenu}>

                    <div class="option">
                        <i class="fas fa-home" style={icon}></i>
                        <a onClick={() => reLoadIdeas()} style={optionLabel}>Home</a>
                    </div>
                    <div class="option">
                        <i class="fas fa-bookmark" style={icon}></i>
                        <a onClick={() => filterUserIdeas(user.uid)} style={{fontSize: "1rem", marginLeft: "1.85rem", fontWeight: "600"}}>My Ideas</a>
                    </div>
                    <div class="option">
                        <i class="fas fa-paper-plane" style={icon}></i>
                        <a onClick={() => alert('Liked Ideas')} style={optionLabel}>Liked Ideas</a>
                    </div>
                    <div class="option">
                    <Link to="/ideas/add" className="btn btn-primary w-100 sidebar__add-link">
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
    width: "20rem",
    backgroundColor: "#fff",
    fontFamily: "var(--main-font)"
}

const userMenu = {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    padding: "1rem"
}

const icon = {
    fontSize: "1.25rem",
    color: "#D2D1D4"
}

const optionLabel = {
    fontSize: "1rem",
    marginLeft: "1.5rem",
    fontWeight: "600"
}

export default Sidebar;
