import React, {useRef, FormEvent} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";

export function Register(): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const email: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const password: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const password_confirmation: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

    function handleLoginButtonClick() {
        navigate('/login');
    }

    const handleClick = (e: FormEvent<HTMLFormElement>) => {
        console.log('')
    };

    return (
        <div>
            <p>Register page</p>
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
