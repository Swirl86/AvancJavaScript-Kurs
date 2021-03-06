import { AUTH, LOGOUT } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        router.push("/addmovie");
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        router.push("/auth");
    } catch (error) {
        console.log(error);
    }
};

export const isAuthenticated = async () => {
    try {
        const res = await fetch("/user/authenticated");
        if (res.status !== 401) {
            const data = await res.json();
            return data;
        } else {
            return {
                isAuthenticated: false,
                result: { _id: null, username: "" },
                message: { msgBody: "Unauthorized", msgError: true },
            };
        }
    } catch (error) {
        return { error: error };
    }
};

export const signout = () => async (dispatch) => {
    try {
        const { data } = await api.signOut();

        dispatch({ type: LOGOUT, payload: data });
    } catch (error) {
        console.log(error);
    }
};
