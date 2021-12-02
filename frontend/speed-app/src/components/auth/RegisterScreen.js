import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import '../../style/auth.css';
import logo from "../../assets/SpeedApp-Icon.png";


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
            <img src={ logo } className="auth__logo rounded mx-auto d-block" alt="SpeedApp"></img>
            <h3 className="auth__title">Sign up</h3>

            <div className={"auth__form"}>
            <form onSubmit={ handleRegister }>
                {/* {
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            <p> {msgError}</p>
                        </div>
                    )
                } */}
                <div className={"auth__input mb-3"}>
                    <label htmlFor="name" className="form-label">User name</label>
                    <input 
                        type="text"
                        placeholder="Name"
                        name="name"
                        className="form-control"
                        value={ name }
                        onChange={ handleInputChange }
                        autoComplete="off"
                    />
                </div>
                
                <div className={"auth__input mb-3"}>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                        type="text"
                        placeholder="Email"
                        name="email"
                        className="form-control"
                        value={ email }
                        onChange={ handleInputChange }
                        autoComplete="off"
                    />
                </div>
                <div className={"auth__input mb-3"}>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password"
                        name="password"
                        placeholder="password"
                        value={ password }
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>

                <div className={"auth__input mb-3"}>
                    <label htmlFor="password2" className="form-label">Confirm password</label>
                    <input 
                        type="password"
                        name="password2"
                        placeholder="Confirm password"
                        value={ password2 }
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>

                <button
                    className="btn btn-primary btn-block w-100 mb-2"
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
            </div>
            
        </>
    )
}
