import moment from 'moment'
import React from 'react'
import { BsFillPersonFill } from 'react-icons/bs';
import '../../style/components/userdatedisplay.css';

export const UserDateDisplay = ( { userName, date }) => {
    return (
        <div className={"post__container"}>
            <BsFillPersonFill className={"post__icon"} size='3rem'/>
            <div className={"post__body"}>
                <span className={"post__username"}>{ userName }</span> 
                <span className={"post__date"}>{ moment( date ).format('MMMM Do YYYY, h:mm:ss') }</span>
            </div>
        </div>
    )
}
