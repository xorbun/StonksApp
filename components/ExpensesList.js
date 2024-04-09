import { FlatList,Text,StyleSheet } from "react-native"
import { GlobalStyles } from "../costants/styles"
import ExpenseItem from "./ExpenseItem"

const ExpensesList=({expenses})=>{
    const renderExpenseItem=(itemData)=>{
        return <ExpenseItem description={itemData.item.description} amount={itemData.item.amount} date={itemData.item.date}/>
    }
    return(
        <FlatList  data={expenses} renderItem={renderExpenseItem} keyExtractor={(item)=>(item.id)}/>
    )
}
export default ExpensesList;
const styles=StyleSheet.create({

    text:{
        color:'white'
    },
})