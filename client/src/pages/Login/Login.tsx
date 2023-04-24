import "./Login.css";
import React, {useContext, useRef, FormEvent, useState} from "react";
import {AuthRepository} from "../../repositories/authRepository";
import {AuthContext, AuthContextInterface} from "../../contexts/Auth/AuthContext";
import {NavigateFunction, useNavigate} from "react-router-dom";

export function Login(): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const email: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const password: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const {dispatch}: AuthContextInterface = useContext<AuthContextInterface>(AuthContext)!;

    const [error, setError] = useState('');

    function handleRegisterButtonClick(): void {
        navigate('/register');
    }

    const handleClick = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email.current && password.current) {
            const authRepo: AuthRepository = new AuthRepository();
            authRepo.login(
                { email: email.current.value, password: password.current.value },
                dispatch
            ).catch(err => {
                setError(err.response.data);
            });
        }
    };

    return (
        <div className="container">
            <h1 className="title">Login page</h1>
            <form onSubmit={handleClick} className="form">
                {error ? <div className="error">{error}</div> : <></>}
                <input
                    style={{ display: "block", border: "1px solid" }}
                    placeholder="Email"
                    type="email"
                    required
                    className="input"
                    ref={email}
                />
                <input
                    style={{ display: "block", border: "1px solid" }}
                    placeholder="Password"
                    type="password"
                    required
                    minLength={6}
                    className="input"
                    ref={password}
                />
                <button
                    style={{ display: "block", border: "1px solid" }}
                    className="button"
                    type="submit"
                >
                    Log In
                </button>

                <div className="login-footer">
                    Don't have an account? <span
                        style={{ color: "blue" }}
                        onClick={handleRegisterButtonClick}
                    >
                         Register
                    </span>
                </div>
            </form>
        </div>
    );
}
