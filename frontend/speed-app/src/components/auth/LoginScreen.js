import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'

import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import '../../style/auth.css'
import logo from "../../assets/SpeedApp-Icon.png";

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const [loading, setLoading]  = useState( false );

    const [ formValues, handleInputChange ] = useForm({
        email: 'xpartaco@dotmail.com',
        password: '123456'
    })

    const { email, password } = formValues;

    const handleLogin = ( e ) => {

        e.preventDefault();
        dispatch( startLoginEmailPassword( email, password ) )

    } 

    const handleGoogleLogin = () => {

        dispatch( startGoogleLogin() );

    }

    return (
        <>
            <img src={ logo } className="auth__logo rounded mx-auto d-block" alt="SpeedApp"></img>
            <h3 className="auth__title"> Sign in</h3>
            
            <div className={"auth__form"}>
            <form 
                onSubmit={ handleLogin }
                >
                <div className={"auth__input mb-3"}>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                        type="text"
                        placeholder="Email"
                        name="email"
                        className="form-control"
                        value= { email }
                        onChange= { handleInputChange }
                    />
                </div>

                <div className={"auth__input"}>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="form-control"
                        value= { password }
                        onChange= { handleInputChange }
                    />
                </div>


                <button
                    className="btn btn-primary btn-block w-100 my-4"
                    type="submit"
                    disabled={ loading }
                >
                    Login
                </button>

                <div className="auth__social-networks">
                    <div 
                        className="google-btn w-100"
                        onClick={ handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper d-flex justify-content-center p-2">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text text-start m-auto">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link 
                    to="/auth/register"
                    className="link"
                    >
                    Create new account
                </Link>
            </form>
            </div>
            
        </>
    )
}