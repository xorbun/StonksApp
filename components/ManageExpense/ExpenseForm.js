import { useState } from "react"
import InputComp from "./Input"
import { View,StyleSheet,Text } from "react-native"
import Button from "../UI/Button"

const ExpenseForm=({submitButtonLabel,onCancel,onSubmit})=>{
    const [inputValue,setInputValue]=useState({
        amount:'',
        date:'',
        description:''
    })
    const inputChangeHandler=(inputIdentifier,enteredValue)=>{
        setInputValue((currentInputValues)=>{
            return {
                ...currentInputValues,
                [inputIdentifier]:enteredValue
            }
        })
    }
    const submitHandler=()=>{
        const expenseData={
            amount:+inputValue.amount,
            date:new Date(inputValue.date),
            description:inputValue.description
        };
        onSubmit(expenseData)
    }
    return(
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.amountDateContainer}>
                <InputComp style={styles.rowInputStyle} label='Amount' textInputConfig={{
                    keyboardType:'decimal-pad',
                    onChangeText:inputChangeHandler.bind(this, 'amount'),
                    value:inputValue.amount
                }}/>
                <InputComp style={styles.rowInputStyle} label='Date' textInputConfig={{
                    placeholder:'YYYY-MM-DD',
                    maxLength:10,
                    onChangeText:inputChangeHandler.bind(this, 'date'),
                    value:inputValue.date
                }}/>
           </View>
           <InputComp label='Description' textInputConfig={{
            multiline:true,
            //autoCorrect:false, imposta tutte le parole con la lettera maiuscola. di default è settata su true
            //autoCapitalize:'characters' è possibile dichiarare quale tipologia di parola si vuole settare la lettera maiuscola
            onChangeText:inputChangeHandler.bind(this, 'description'),
                    value:inputValue.description
           }}/>
           <View style={styles.buttonContainer}>
                <Button style={styles.button} mode='flat' onPress={onCancel}>CANCEL</Button>
                <Button style={styles.button}  onPress={submitHandler}>{submitButtonLabel}</Button>
            </View>
        </View>
    )
}
export default ExpenseForm
const styles=StyleSheet.create({
    form:{
        marginTop:40
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:'white',
        textAlign:'center',
        marginVertical:24
    },
    amountDateContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    rowInputStyle:{
        flex:1,
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'center'
    },
    button:{
        minWidth:120,
        marginHorizontal:8
    },
})