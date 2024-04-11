import { View,Text,StyleSheet } from "react-native"
import { GlobalStyles } from "../costants/styles";
import { useLayoutEffect } from "react";
const ManageExpense=({route,navigation})=>{
    const editedExpenseId=route.params?.expenseId;
    const editedExpenseDesc=route.params?.description
    const editedExpenseAmount=route.params?.amount
    const editedExpenseDate=route.params?.date.toString()
    const isEdited=!!editedExpenseId
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:isEdited ? 'Edit Expense': 'Add expense'
        })
    },[navigation, isEdited])
    return(
        <View style={styles.container}>
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
        backgroundColor:GlobalStyles.colors.primary700
    },
    title:{
        textAlign:'center',
        fontSize:24,
        color:GlobalStyles.colors.accent500
    },
    info:{
        color:'white'
    }
})