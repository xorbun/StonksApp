import { View,StyleSheet } from "react-native"
import ExpensesOutput from "../components/ExpensesOutput"
import { useContext } from "react"
import { ExpensesContext } from "../store/expenses-context"
const AllExpenses=()=>{
    const expensesCtx=useContext(ExpensesContext)
    return <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod='Total'fallBackText={'No registered expensens found'}/>
}
export default AllExpenses

const styles=StyleSheet.create({

})