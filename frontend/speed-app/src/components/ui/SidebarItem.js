import React from 'react'
import { NavLink } from 'react-router-dom'

import '../../style/components/sidebar.css'

export const SidebarItem = ( { icon, label, to } ) => {
    return (
        <div className="sidebar__item">
            <NavLink
                className="w-100 text-decoration-none sidebar__link"
                activeClassName="sidebar_active"
                to={ to }
                exact
            >   
                <span className={ "sidebar__icon" }>
                    { icon }
                </span>
                <span className={"sidebar__label d-none d-sm-inline"}>{ label }</span> 
            </NavLink>
        </div>
    )
}
