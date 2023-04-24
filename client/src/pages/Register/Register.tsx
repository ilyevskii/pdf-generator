import "./Register.css";
import React, {useRef, FormEvent, useState} from "react";
import {AuthRepository} from "../../repositories/authRepository";
import {AuthContextInterface, useAuth} from "../../contexts/Auth/AuthContext";
import {useNavigate, NavigateFunction} from "react-router-dom";

export function Register(): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const email: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const password: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const password_confirmation: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const {dispatch}: AuthContextInterface = useAuth();

    const [error, setError] = useState("");

    function handleLoginButtonClick(): void {
        navigate('/login');
    }

    const handleClick = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (email.current && password.current && password_confirmation.current) {

            if (password.current.value === password_confirmation.current.value) {

                const authRepo: AuthRepository = new AuthRepository();
                authRepo.register(
                    {
                        email: email.current.value,
                        password: password.current.value,
                    },
                    dispatch
                ).catch(err => setError(err.response.data));
            }
            else {
                setError("Passwords don`t match!");
            }
        }
    };

    return (
        <div className="container">
            <h1 className="title">Register page</h1>
            <form onSubmit={handleClick} className="form">
                {error ? <div className="error">{error}</div> : <></>}
                <input
                    className="input"
                    style={{ display: "block", border: "1px solid" }}
                    placeholder="Email"
                    type="email"
                    required
                    ref={email}
                />
                <input
                    className="input"
                    style={{ display: "block", border: "1px solid" }}
                    placeholder="Password"
                    type="password"
                    required
                    minLength={6}
                    ref={password}
                />
                <input
                    className="input"
                    style={{ display: "block", border: "1px solid" }}
                    placeholder="Confirm password"
                    type="password"
                    required
                    ref={password_confirmation}
                />
                <button
                    style={{ display: "block", border: "1px solid" }}
                    className="button"
                    type="submit"
                >
                    Register
                </button>

                <div className="register-footer"> Already have an account? <span
                        style={{ color: "blue" }}
                        onClick={handleLoginButtonClick}
                    > Login</span>
                </div>
            </form>
        </div>
    );
}
