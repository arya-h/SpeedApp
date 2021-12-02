import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../../style/components/sidebar.css'
import {FaHome, FaLightbulb, FaThumbsUp, FaRegSun, FaPlus} from 'react-icons/fa';
import { SidebarItem } from './SidebarItem';

export const Sidebar = () => {

    const { pathname } = useLocation();

    return (
        <div className={"sidebar__container"}>

            <SidebarItem icon={ FaHome() } label={"Ideas"} to="/ideas/feed"/>

            <SidebarItem icon={ FaLightbulb() } label={"My ideas"} to={"/"}/>

            <SidebarItem icon={ FaThumbsUp() } label={"Liked ideas"} to={"/"}/>

            <SidebarItem icon={ FaRegSun() } label={"Settings"} to={"/"}/>

            { pathname !== '/ideas/add' &&
            
            <Link to="/ideas/add" className="btn btn-primary w-100 sidebar__add-link">
                <div className={"d-flex align-items-center p-2"}>
                    <FaPlus/>
                    <span className={" ps-3 "}> Create new idea </span>
                </div>
            </Link>
            }
          

        </div>
    )
}
