import React from 'react'
import InputContainer from './InputContainer';

function InputMainContainer({name, type, labelContent, value, setValue, error, setError, HideErrorMessages, ShowErrorMessage, onChange}) {

  return (
    <div>
        <InputContainer name={name} type={type} labelContent={labelContent} value={value} onChange={!onChange ? 
            (e) => { 
                setValue(e.target.value);
                HideErrorMessages(setError, error, e);
            }
        : onChange} onBlur={(e) => {
            if (!value) {
                ShowErrorMessage(setError, error, e);
            }
        }} />

        { error.toShow && <small className="text-red-500 font-semibold m-0">*{error.errorMessage}</small> }
    </div>
  )
}

export default InputMainContainer