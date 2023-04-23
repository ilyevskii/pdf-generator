import React, {useContext, useRef, FormEvent, Dispatch} from "react";
import {AuthRepository} from "../../repositories/authRepository";
import {AuthContext, AuthContextInterface} from "../../contexts/Auth/AuthContext";
import {NavigateFunction, useNavigate} from "react-router-dom";

export function Login(): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const email: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const password: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const { dispatch }: AuthContextInterface = useContext<AuthContextInterface>(AuthContext)!;

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
            ).catch();
        }
    };

    return (
        <div>
            <p>Login page</p>
            <form onSubmit={handleClick}>
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
                <button
                    style={{ display: "block", border: "1px solid" }}
                    className="login-button"
                    type="submit"
                >
                    Log In
                </button>

                <p className="mt-10">
                    Don't have an account?
                    <button
                        style={{ color: "blue" }}
                        onClick={handleRegisterButtonClick}
                    >
                        Register
                    </button>
                </p>
            </form>
        </div>
    );
}
