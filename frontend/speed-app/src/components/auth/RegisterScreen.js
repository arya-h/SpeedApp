import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import '../../style/auth.css'


export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        name: 'xPartaco',
        email: 'xpartaco@dotmail.com',
        password: '123456',
        password2: '123456'
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = ( e ) => {
        e.preventDefault();
        if ( isFormValid() ){
            dispatch( startRegisterWithEmailPasswordName ( email, password, name ))
        }
    }

    const isFormValid = () => {
        
        if ( name.trim().length === 0 ){
            
            // dispatch( setError('Name is required') );
            return false;

        } else if ( !validator.isEmail( email )){

            // dispatch( setError('Not a valid email'));
            return false;

        } else if ( password !== password2 || password2.length < 5 ){

            // dispatch( setError('Password not the same or length less than 5 characters') );
            return false;

        }

        // dispatch( removeError() );
        return true;
    }
        
    return (
        <>
            <h3 className="auth__title"> Register screen</h3>
            <hr/>

            <form onSubmit={ handleRegister }>
                {/* {
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            <p> {msgError}</p>
                        </div>
                    )
                } */}
                <label htmlFor="name">User name</label>
                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    value={ name }
                    onChange={ handleInputChange }
                    autoComplete="off"
                />

                <label htmlFor="email">Email</label>
                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    value={ email }
                    onChange={ handleInputChange }
                    autoComplete="off"
                />

                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    name="password"
                    placeholder="password"
                    value={ password }
                    onChange={handleInputChange}
                    className="auth__input"
                />

                <label htmlFor="password2">Confirm password</label>
                <input 
                    type="password"
                    name="password2"
                    placeholder="Confirm password"
                    value={ password2 }
                    onChange={handleInputChange}
                    className="auth__input"
                />

                <button
                    className="btn btn-primary btn-block"
                    type="submit"
                >
                    Register
                </button>


                <Link 
                    to="/auth/register"
                    className="link"
                    >
                    Already registered?
                </Link>
            </form>
        </>
    )
}
