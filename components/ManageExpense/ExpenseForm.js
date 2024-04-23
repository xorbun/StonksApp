import { useState } from "react"
import InputComp from "./Input"
import { View,StyleSheet,Text } from "react-native"
import Button from "../UI/Button"
import { getFormattedDate } from "../../util/date"
import { GlobalStyles } from "../../costants/styles"
const ExpenseForm=({submitButtonLabel,onCancel,onSubmit,defaultValue})=>{
    const [inputs, setInputs] = useState({
      amount:{value: defaultValue ? defaultValue.amount.toString() : "",isValid:true},
      date:{value: defaultValue ? getFormattedDate(defaultValue.date) : "",isValid:true},
      description:{value:  defaultValue ? defaultValue.description : "",isValid:true}
     });
    const inputChangeHandler=(inputIdentifier,enteredValue)=>{
        setInputs((currentInput)=>{
            return {
                ...currentInput,
                [inputIdentifier]:{value:enteredValue,isValid:true}
            }
        })
    }
    const submitHandler=()=>{
        const expenseData={
            amount:+inputs.amount.value,
            date:new Date(inputs.date.value),
            description:inputs.description.value
        };
        const amountIsValid= !isNaN(expenseData.amount) && expenseData.amount > 0
        const dateIsValid= expenseData.date.toString() !=='Invalid Date'
        const descriptionIsValid= expenseData.description.trim().length>0
        if(!amountIsValid || !dateIsValid || !descriptionIsValid){
            //Alert.alert('Invalid input','check your input values')
           setInputs((currentInputs)=>{
            return{
                amount:{value:currentInputs.amount.value, isValid:amountIsValid},
                date:{value:currentInputs.date.value,isValid:dateIsValid},
                description:{value:currentInputs.description,isValid:descriptionIsValid}
            }
           })
            return; 
        }
        onSubmit(expenseData)
    }
    const formIsInvalid= !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid
    return(
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.amountDateContainer}>
                <InputComp style={styles.rowInputStyle} label='Amount' isInvalid={!inputs.amount.isValid} textInputConfig={{
                    keyboardType:'decimal-pad',
                    onChangeText:inputChangeHandler.bind(this, 'amount'),
                    value:inputs.amount.value
                }}/>
                <InputComp style={styles.rowInputStyle} label='Date'isInvalid={!inputs.date.isValid}  textInputConfig={{
                    placeholder:'YYYY-MM-DD',
                    maxLength:10,
                    onChangeText:inputChangeHandler.bind(this, 'date'),
                    value:inputs.date.value
                }}/>
           </View>
           <InputComp label='Description'isInvalid={!inputs.description.isValid}  textInputConfig={{
            multiline:true,
            //autoCorrect:false, imposta tutte le parole con la lettera maiuscola. di default è settata su true
            //autoCapitalize:'characters' è possibile dichiarare quale tipologia di parola si vuole settare la lettera maiuscola
            onChangeText:inputChangeHandler.bind(this, 'description'),
            value:inputs.description.value
           }}/>
           {formIsInvalid && <Text style={styles.errorMessage}>Invalid inputs value - Please check your entered data</Text>}
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
    errorMessage:{
        color:GlobalStyles.colors.error500,
        textAlign:'center',
        fontSize:18,
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