
import ExpensesOutput from "../components/ExpensesOutput"
import { useContext, useEffect, useState } from "react"
import { ExpensesContext } from "../store/expenses-context"
import { getDateMinusDays } from "../util/date"
import { fetchExpense } from "../util/http"
import LoadingOverlay from "../components/UI/LoadingOverlay"
const RecentExpenses=()=>{
    const [isFetching,setIsFetching]=useState(true)
    const expensesCtx=useContext(ExpensesContext)
    
    useEffect(()=>{
        async function getExpenses(){
            setIsFetching(true)
          const expenses= await fetchExpense()
          setIsFetching(false)
          expensesCtx.setExpenses(expenses)
        }
       getExpenses()
    },[])
    if(isFetching){
        return <LoadingOverlay/>
    }
    const recentExpenses= expensesCtx.expenses.filter((expense)=>{
        const today=new Date()
        const date7DaysAgo=getDateMinusDays(today,7)
        return expense.date> date7DaysAgo
    })
    return <ExpensesOutput expenses={recentExpenses}expensesPeriod='Last 7 days' fallBackText={'No registered expensens found in the last 7 days'}/>
}
export default RecentExpenses
