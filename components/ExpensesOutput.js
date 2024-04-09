import { View,StyleSheet} from "react-native"
import ExpensesSummary from "./ExpensesSummary"
import ExpensesList from "./ExpensesList"
import { GlobalStyles } from "../costants/styles"

const DUMMY_EXPENSES=[
   { id:'e1',
    description:'A pair of shoes',
    amount:59.99,
    date:new Date('2024-04-09')
},
{ id:'e2',
description:'iphone',
amount:959.99,
date:new Date('2024-04-12')
},
{ id:'e3',
description:'foods',
amount:70.99,
date:new Date('2024-04-10')
},
]
const ExpensesOutput=({expenses, expensesPeriod})=>{
return(
    <View style={styles.container}>
        <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod}/>
        <ExpensesList expenses={DUMMY_EXPENSES} />
        
    </View>
)
}
export default ExpensesOutput
const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:24,
        paddingTop:24,
        paddingBottom:0,
        backgroundColor:GlobalStyles.colors.primary700
    },
})