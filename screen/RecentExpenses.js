
import ExpensesOutput from "../components/ExpensesOutput"
import { useContext, useEffect, useState } from "react"
import { ExpensesContext } from "../store/expenses-context"
import { getDateMinusDays } from "../util/date"
import { fetchExpense } from "../util/http"
import LoadingOverlay from "../components/UI/LoadingOverlay"
import ErrorOverlay from "../components/UI/ErrorOverlay"
const RecentExpenses=()=>{
    const [isFetching,setIsFetching]=useState(true)
    const [error,setError]=useState()
    const expensesCtx=useContext(ExpensesContext)
    async function getExpenses(){
        setIsFetching(true)
        try{
            const expenses= await fetchExpense()
            expensesCtx.setExpenses(expenses)
        }catch(error){
            setError('Could not fetch expenses')
        }
      setIsFetching(false)
    }
    useEffect(()=>{
       getExpenses()
    },[])
    const errorHandler=()=>{
        setError(null)
        getExpenses()
    }
    if(error && !isFetching){
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }
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
