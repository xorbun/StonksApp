import { FlatList,Text,StyleSheet } from "react-native"
import { GlobalStyles } from "../costants/styles"
import ExpenseItem from "./ExpenseItem"

const ExpensesList=({expenses})=>{
    const renderExpenseItem=(itemData)=>{
        return <ExpenseItem {...itemData.item} />
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