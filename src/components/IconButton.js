import React from 'react';

function IconButton(props){
    const {icon, handleClick, className} = props

    return (
        <button className={'IconButton' + (className || '')} onClick={handleClick}>
            <i className="material-icons">{icon}</i>
        </button>
    )
}

export default IconButton;
