import { View,Text,StyleSheet } from "react-native"
import { GlobalStyles } from "../costants/styles";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

const ManageExpense=({route,navigation})=>{
   
    const expenseCtx=useContext(ExpensesContext)
    const editedExpenseId=route.params?.expenseId;
    const editedExpenseDesc=route.params?.description
    const editedExpenseAmount=route.params?.amount
    const editedExpenseDate=route.params?.date.toString()
    const isEdited=!!editedExpenseId
    const deleteHandler=()=>{
        navigation.goBack();
        expenseCtx.deleteExpense(editedExpenseId)
    }
    const cancelHandler=()=>{
        navigation.goBack();
    }
    const confirmHandler=(expenseData)=>{
        if(isEdited){
            expenseCtx.updateExpense(editedExpenseId,expenseData)
        }
        else{
            expenseCtx.addExpense(expenseData)
        }
        navigation.goBack();
    }
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:isEdited ? 'Edit Expense': 'Add expense'
        })
    },[navigation, isEdited])
    return(
        <View style={styles.container}>
            <ExpenseForm submitButtonLabel={isEdited ? 'UPDATE':'ADD'} onCancel={cancelHandler}onSubmit={confirmHandler}/>
            
            <View style={styles.deleteButton}>
                {isEdited && <IconButton icon='trash' color={GlobalStyles.colors.error500} onPress={deleteHandler}/>}
            </View>
            <Text style={styles.info}>{editedExpenseDesc}</Text>
            <Text style={styles.info}>{editedExpenseAmount}</Text>
            <Text style={styles.info}>{editedExpenseDate}</Text>
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