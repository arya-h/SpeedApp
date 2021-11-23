import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import { BsThreeDots } from 'react-icons/bs';
import { useHistory } from 'react-router';

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

  const history = useHistory();

    return (
        <div className="dots__container">
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id={ props.id }>
                <BsThreeDots/>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {
                  props.items?.map( item => (
                      <Dropdown.Item key={props?.id?.commentId} onClick={ () => {
                        item.handler(props?.id?.ideaId, props?.id?.commentId);
                        history.push("/");
                      } }>{ item.action }</Dropdown.Item>
                  ))
                }
            </Dropdown.Menu>
        </Dropdown>
        </div>
    )
}
