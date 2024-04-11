import { createContext, useReducer } from "react";
const DUMMY_EXPENSES=[
    { id:'e1',
     description:'A pair of shoes',
     amount:59.99,
     date:new Date('2024-04-09')
 },
 { id:'e2',
 description:'iphone',
 amount:959.99,
 date:new Date('2024-03-12')
 },
 { id:'e3',
 description:'foods',
 amount:70.99,
 date:new Date('2024-04-10')
 },
 ]
export const ExpensesContext=createContext({
    expenses:[],
    addExpense:({description,amount,date})=>{},
    deleteExpense:(id)=>{},
    updateExpense:(id,{description,amount,date})=>{}
});
const expensesReducer=(state,action)=>{
    switch(action.type){
        case 'ADD':
            const id=new Date().toString() + Math.random().toString()
            return [{...action.payload,id: id},...state]
        case 'UPDATE':
            const updatableExpenseIndex=state.findIndex((expense)=>{
                expense.id===action.payload.id
            });
            const updatableExpense=state[updatableExpenseIndex]
            const updateItem={...updatableExpense,...action.payload.data}
            const updatedExpense=[...state]
            updatedExpense[updatableExpenseIndex] = updateItem
            return updatedExpense
        case 'DELETE':
            return state.filter((expense)=>{expense.id !== action.payload})
        default: state;

    }
}
const ExpensesContextProvider=({children})=>{
    const [expensesState,dispatch]= useReducer(expensesReducer,DUMMY_EXPENSES);

    const addExpense=({expenseData})=>{
        dispatch({type:'ADD',payload:expenseData});
    }
    const deleteExpense=(id)=>{
        dispatch({type:'DELETE',payload:id})
    }
    const updateExpense=(id,expenseData)=>{
        dispatch({type:'UPDATE',payload:{id:id,data:expenseData}})
    }
    const value={
        expenses:expensesState,
        addExpense:addExpense,
        deleteExpense:deleteExpense,
        updateExpense:updateExpense
    }
    return(<ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>)
}
export default ExpensesContextProvider