import axios from "axios";
import {Dispatch} from "react";
import {Action} from "../contexts/Auth/AuthReducer";

interface userRequest {
    email: string,
    password: string,
}

export class AuthRepository {

    private readonly url: string = "http://localhost:3001";
    constructor(url?: string) {
        if (url) this.url = url;
    }
    async login(userInfo: userRequest, dispatch: Dispatch<Action>) {

        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(`${this.url}/api/auth/login`, userInfo);
            dispatch({ type: "LOGIN_SUCCESS", payload:
                    {
                        id: res.data.id,
                        email: res.data.email,
                        firstName: res.data.firstName,
                        lastName: res.data.lastName
                    }
            });
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE"});
        }
    };

    async register (userInfo: userRequest, dispatch: Dispatch<Action>) {

        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(`${this.url}/api/auth/register`, userInfo);
            dispatch({ type: "LOGIN_SUCCESS", payload:
                    {
                        id: res.data.id,
                        email: res.data.email,
                        firstName: res.data.firstName,
                        lastName: res.data.lastName
                    }
            });
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE"});
        }
    };
}