import React from 'react'

function Textfield({props, value, onChange, onBlur}) {
    return (
        <>
            <input value={value} onChange={onChange} onBlur={onBlur}
            className="input border border-foodHubColor2 focus:ring-1 focus:ring-foodHubColor2" 
            type={props.type} name={props.name} 
            id={props.name} 
            placeholder=" " 
            required/>
        </>
    )
}

export default Textfield
