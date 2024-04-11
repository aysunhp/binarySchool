import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { evaluate } from 'mathjs';

interface History {
    operation:string,
    result:number
}
export interface CalcState {
    mode: boolean,
    open:boolean,
    history: History[]
    operation:string,
  result: number
}

const storedHistory = localStorage.getItem("history");
const parsedHistory = storedHistory ? JSON.parse(storedHistory) : [];

const storedMode = localStorage.getItem("mode");
const parsedMode = storedMode ? JSON.parse(storedMode) : true;

const initialState: CalcState = {
    mode: parsedMode,
    open:false,
    history: parsedHistory,
    operation: "",
    result: 0,
}

export const calcSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    changeMode: (state, action: PayloadAction<boolean>) => {
        state.mode= action.payload;
        localStorage.setItem("mode",JSON.stringify(state.mode))
      },
      toggleDrawer:(state, action: PayloadAction<boolean>) => {
        state.open= action.payload
      },
    addText: (state, action: PayloadAction<string>) => {
      state.operation += action.payload
    },
    toCalculate: (state)=>{
        try {
            state.result = evaluate(state.operation);
          
            const newElem={
                    operation:state.operation,
                    result:state.result
                }
            state.history=[...state.history,newElem]
        
            if (state.history.length > 5) {
              state.history.shift();
            }
            state.operation = "";
            localStorage.setItem("history", JSON.stringify(state.history))
          } catch (error) {
            console.error("Error occurred during calculation:", error);
            
          }

    },
    resetCalculate:(state)=>{
        state.operation="";
        state.result=0;
    },
    clearHistory:(state)=>{
        state.history=[];
       localStorage.setItem("history", JSON.stringify([]))
    }
 

  },
})


export const { addText , toCalculate, resetCalculate, changeMode, toggleDrawer, clearHistory} = calcSlice.actions

export default calcSlice.reducer