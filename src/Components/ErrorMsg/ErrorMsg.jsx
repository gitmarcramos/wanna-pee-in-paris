import React from 'react'
import './ErrorMsg.css'

export default function ErrorMsg(props) {


    return (
        <div>
            <span className="error-message">{props.msg}</span>
        </div>
    )
}
