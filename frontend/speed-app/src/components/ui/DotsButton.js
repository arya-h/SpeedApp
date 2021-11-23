import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import { BsThreeDots } from 'react-icons/bs';

import '../../style/components/dots.css';

// Custom toggle to remove bootstrap style
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));

export const DotsButton = ( props ) => {
    
    const [open, setOpen] = useState(false);

    console.log(props)

    return (
        <div className="dots__container">
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id={ props.id }>
                <BsThreeDots/>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {
                    props.items?.map( item => (
                        <Dropdown.Item href={ item.handler() }>{ item.action }</Dropdown.Item>
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
        </div>
    )
}