import { createAction, createReducer, on, props } from "@ngrx/store"

export interface Isaldo {
    value:number
}

enum actionsTypes{
    setSaldo="setSaldo",
    subtrairSaldo="subtrairSaldo"
}

export const saldoInitialState: Isaldo ={
    value:0
}

export const setSaldo = createAction(
    actionsTypes.setSaldo,
    props<{payload:number}>()
    );

    export const subtrairSaldo = createAction(
        actionsTypes.subtrairSaldo,
        props<{payload:number}>()
        );

export const saldoReducer = createReducer(
    saldoInitialState,
    on(setSaldo,(state,{payload})=>{
        state = {...state, value:payload}
        return state;
    }),
    
    on(subtrairSaldo,(state,{payload})=>{
        state = {...state, value:state.value-payload}
        return state;
    })
)