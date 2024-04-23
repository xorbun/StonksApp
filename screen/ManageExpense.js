import { View,Text,StyleSheet } from "react-native"
import { GlobalStyles } from "../costants/styles";
import { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";



const ManageExpense=({route,navigation})=>{
   const [isSubmitting,setIsSubmitting]=useState(false)
   const [error,setError]=useState()
    const expenseCtx=useContext(ExpensesContext)
    const editedExpenseId=route.params?.expenseId;
    const editedExpenseDesc=route.params?.description
    const editedExpenseAmount=route.params?.amount
    const editedExpenseDate=route.params?.date.toString()
    const isEdited=!!editedExpenseId

    const selectedExpenses=expenseCtx.expenses.find(expense => expense.id===editedExpenseId)
    const deleteHandler=async()=>{
        setIsSubmitting(true)
        try{
            await deleteExpense(editedExpenseId)
            expenseCtx.deleteExpense(editedExpenseId)
            navigation.goBack();
        }catch(error){
            setError('Could not delete expense. Try later')
            setIsSubmitting(false)
        }
        
        
        
        
    }
    const cancelHandler=()=>{
        navigation.goBack();
    }
    const confirmHandler=async(expenseData)=>{
        setIsSubmitting(true)
        try{
            if(isEdited){
                expenseCtx.updateExpense(editedExpenseId,expenseData)
                updateExpense(editedExpenseId,expenseData)
            }
            else{
                const id= await storeExpense(expenseData)
                
                expenseCtx.addExpense({...expenseData,id:id})
            }
            navigation.goBack();
        }catch(error){
            setError('Could not add or update expense. Try later')
            setIsSubmitting(false)
        }
        
    }
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:isEdited ? 'Edit Expense': 'Add expense'
        })
    },[navigation, isEdited])
    const errorHandler=()=>{
        setError(null)
    }
    if(error && !isSubmitting){
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }
    if(isSubmitting){
        return <LoadingOverlay/>
    }
    return(
        <View style={styles.container}>
            <ExpenseForm submitButtonLabel={isEdited ? 'UPDATE':'ADD'} onCancel={cancelHandler}onSubmit={confirmHandler} defaultValue={selectedExpenses}/>
            <View style={styles.deleteButton}>
                {isEdited && <IconButton icon='trash' color={GlobalStyles.colors.error500} onPress={deleteHandler}/>}
            </View>
        </View>
    )
}
export default ManageExpense
const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:24,
        backgroundColor:GlobalStyles.colors.primary800
    },
  
   deleteButton:{
    alignItems:'center',
    paddingTop:8,
    marginTop:16,
    borderTopWidth:2,
    borderTopColor:GlobalStyles.colors.primary200
    
   },
    info:{
        color:'white'
    }
})