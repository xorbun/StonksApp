import { View,Text,StyleSheet } from "react-native"
import { GlobalStyles } from "../costants/styles";
const ExpensesSummary=({expenses,periodName})=>{
    const expensesSum=expenses.reduce((sum,expense)=>{
        return sum+ expense.amount
    },0);
    return (
      <View style={styles.container}>
        <Text style={styles.period}>{periodName}</Text>
        <Text style={styles.text}>${expensesSum.toFixed(2)}</Text>
      </View>
    );
}
export default ExpensesSummary

const styles=StyleSheet.create({
    container:{
        
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:8,
        backgroundColor:GlobalStyles.colors.primary50,
        borderRadius:6,
    },
    period:{
        fontSize:12,
        color:GlobalStyles.colors.primary400,
    },
    text:{
        fontSize:18,
        fontWeight:'bold',
        color:GlobalStyles.colors.primary400,
    }
})