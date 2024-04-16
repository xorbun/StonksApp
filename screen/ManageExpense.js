import { View,Text,StyleSheet } from "react-native"
import { GlobalStyles } from "../costants/styles";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Button";
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
    const confirmHandler=()=>{
        if(isEdited){
            expenseCtx.updateExpense(editedExpenseId,{description:'Test',amount:12.99,date:new Date('2024-04-11')})
        }
        else{
            expenseCtx.addExpense({description:'Test',amount:12.99,date:new Date()})
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
            <ExpenseForm/>
            <View style={styles.buttonContainer}>
                <Button style={styles.button} mode='flat' onPress={cancelHandler}>CANCEL</Button>
                <Button style={styles.button}  onPress={confirmHandler}>{isEdited ? 'UPDATE':'ADD'}</Button>
            </View>
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
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'center'
    },
    button:{
        minWidth:120,
        marginHorizontal:8
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