import { View,StyleSheet } from "react-native"
import ExpensesOutput from "../components/ExpensesOutput"
import { useContext } from "react"
import { ExpensesContext } from "../store/expenses-context"
import { getDateMinusDays } from "../util/date"
const RecentExpenses=()=>{
    const expensesCtx=useContext(ExpensesContext)
    const recentExpenses=expensesCtx.expenses.filter((expense)=>{
        const today=new Date()
        const date7DaysAgo=getDateMinusDays(today,7)
        return expense.date> date7DaysAgo
    })
    return <ExpensesOutput expenses={recentExpenses}expensesPeriod='Last 7 days' fallBackText={'No registered expensens found in the last 7 days'}/>
}
export default RecentExpenses
const styles=StyleSheet.create({
    
})