import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Input from './Input';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signin, signup, microsoftSignup } from '../../actions/auth';
import { useIsAuthenticated } from "@azure/msal-react";
import './Auth.scss';

const initialState = { firstName: '', lastName: '', email: '', password: null, confirmPassword: '' };

const Auth = () => {
    const dispatch = useDispatch();
    const { instance } = useMsal();
    const history = useHistory();
    const [isSignup, setIsSignup] = useState(false);
    const [form, setForm] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const isAuthenticated = useIsAuthenticated();

    const handleLogin = async (instance) => {
        dispatch({ type: 'LOGOUT' });
        instance.loginPopup(loginRequest)
        .then(async (data) => {
            const token = data.accessToken;
            try {
                dispatch({ type: 'AUTH' , data: { result: data.account, token } });
                try {
                    dispatch(microsoftSignup({ email: data.account.username, name: data.account.name }, { result: data.account, token }, history))
                } catch (e) {
                    history.push('/calendar');
                }
            } catch (error) {
                console.log(error);
            }
        })
        .catch(e => {
            console.error(e);
        });
    }
    
    const handleLogout = (instance) => {
        instance.logoutPopup()
        .then(() => {
            dispatch({ type: 'LOGOUT' });
            history.push('/');
        })
        .catch(e => {
            console.error(e);
        });
    }

    const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(signup(form, history));
        } else {
            dispatch(signin(form, history));
        }
    }

    return (
        <div className="auth">
            <div className="auth__form">
                { isSignup ? <h3> Register </h3> : <h3>Login</h3> }
                <form onSubmit={handleSubmit}>
                    { isSignup && (
                    <div className="auth__name">
                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                    </div>
                    )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    <Button type="submit" fullWidth variant="contained" color="primary" className="submit">
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                </form>
                <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                </Button>
            </div>
        </div>
    );
}

export default Auth
