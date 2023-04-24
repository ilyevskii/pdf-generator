import {createContext, useEffect, useReducer, useContext, ReactNode} from "react";
import {Dispatch, Context} from "react";
import AuthReducer from "./AuthReducer";
import {Action, User} from "./AuthReducer";
import {UserRepository} from "../../repositories/userRepository";

interface AuthContextProviderProps {
    children: ReactNode;
}

export interface AuthContextInterface {
    user: User | null;
    error: boolean;
    logout: () => void;
    refresh: () => void;
    dispatch: Dispatch<Action>;
}

const INITIAL_STATE : AuthContextInterface = {
    user: JSON.parse(localStorage.getItem("user") || "null") as User | null,
    error: false,
    logout: () => {},
    refresh: () => {},
    dispatch: () => {},
};

export const AuthContext : Context<AuthContextInterface> = createContext<AuthContextInterface>(INITIAL_STATE);

export function useAuth(): AuthContextInterface {
    const context : AuthContextInterface | undefined = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) : JSX.Element => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    function logout() {
        dispatch({type: 'LOGOUT'});
    }

    function refresh() {
        const userRepo = new UserRepository();
        userRepo.get_user_info(state.user!).then(res => {
            dispatch({type: 'LOGIN_SUCCESS', payload: res })
        })
            .catch(err => console.log(err.toString()));

    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                error: state.error,
                logout,
                dispatch,
                refresh
            }}
        >
            {children}
        </AuthContext.Provider>
);

}
