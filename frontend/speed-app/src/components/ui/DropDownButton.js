import React from 'react';
import '../../style/components/dropdownbtn.css';

export const DropDownButton = ( { icon,  title } ) => {
    return (
        <span className={"dropdown__item"}>
            { icon }  
            <span className={"drop__title"}>{ title } </span>
        </span>
    )
}
