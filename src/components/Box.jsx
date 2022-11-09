import React from 'react'

const Box = ({ icon }) => {
    return (
        <div className="box">
            {icon &&
                <img src={icon} alt="icon" />
            }
        </div>
    )
}

export default Box