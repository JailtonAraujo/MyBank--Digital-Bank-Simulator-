import { createReducer, createAction, on, props} from "@ngrx/store";
import { Auth } from "../model/Auth";


enum actionsTypes {
    setAuth="setAuth",
    delAuth="delAuth"
}

export const authInitialState: Auth = JSON.parse(String(localStorage.getItem('authMyBank'))) as Auth || new Auth

export const setAuth = createAction(
    actionsTypes.setAuth,
    props<{payload:Auth}>()
);

export const delAuth = createAction(
    actionsTypes.delAuth
);


export const authReducer = createReducer(
    authInitialState,
    on(setAuth,(state,{payload})=>{
        state = {...state, ...payload }
        localStorage.setItem('authMyBank',JSON.stringify(payload));
        return state;
    }),
    on(delAuth,(state)=>{
        state = {...state, ...new Auth}
        localStorage.clear();
        return state;
    })
)