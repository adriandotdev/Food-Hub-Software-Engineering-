import React from 'react'
import Textfield  from './Textfield'
import Label from './Label'

function InputContainer({name, type, labelContent, value, onChange, onBlur}) {
    return (
        <div className="flex flex-col">
            <section className="input-container flex flex-col-reverse relative">
                
                <Textfield props={{name, type}} value={value} onChange={onChange} onBlur={onBlur}/>
                <Label props={{labelContent, name}} />
            </section>
        </div>
    )
}

export default InputContainer
