import moment from 'moment'
import React from 'react'
//import { BsFillPersonFill } from 'react-icons/bs';
import '../../style/components/userdatedisplay.css';

export const UserDateDisplay = ( { user, date }) => {
    return (
        <div className={"post__container"}>
            <i className={"fas fa-user-circle"} style={{fontSize: "2.25rem", paddingTop: "1rem"}}/>
            <div className={"post__body"}>
                <span className={"post__username"}>{ user?.name }</span> 
                <span className={"post__date"}>{ moment( date ).format('MMMM Do YYYY, h:mm:ss') }</span>
            </div>
        </div>
    )
}
