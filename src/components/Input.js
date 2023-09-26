import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Input = ({
    inputName, autoFocus, handleChange, placeholder, 
    inputId, pswdIcon, htmlFor, label, type, useRef
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        if(showPassword) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }
    return (
        <div className="form-group">
            <label htmlFor={htmlFor}>
                {label}
            </label>
            <input 
                type={showPassword ? 'text' : type}
                name={inputName}
                id={inputId}
                autoFocus={autoFocus}
                onChange={handleChange}
                placeholder={placeholder}
                required
                className='form-control'
                ref={useRef}
            />
            <p
                onClick={handleShowPassword}
                className={pswdIcon ? 'display-pswd-icon' : 'hide-pswd-icon'}
            >
                {showPassword ? 
                    <AiFillEyeInvisible size={20} /> : 
                    <AiFillEye size={20} /> 
                }
            </p>
        </div>
    );
}

export default Input