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
                ).catch(err => console.log(err.toString()));

            }
        }
    };

    return (
        <div>
            <p>Register page</p>
            <form onSubmit={handleClick}>
                <p>{error}</p>
                <input
                    style={{ display: "block", border: "1px solid" }}
                    placeholder="Email"
                    type="email"
                    required
                    className="email-input"
                    ref={email}
                />
                <input
                    style={{ display: "block", border: "1px solid" }}
                    placeholder="Password"
                    type="password"
                    required
                    minLength={6}
                    className="password-input"
                    ref={password}
                />
                <input
                    style={{ display: "block", border: "1px solid" }}
                    placeholder="Confirm password"
                    type="password"
                    required
                    className="password-input"
                    ref={password_confirmation}
                />
                <button
                    style={{ display: "block", border: "1px solid" }}
                    className="register-button"
                    type="submit"
                >
                    Register
                </button>

                <p> Already have an account?
                    <button
                        style={{ color: "blue" }}
                        onClick={handleLoginButtonClick}
                    > Login</button>
                </p>
            </form>
        </div>
    );
}
