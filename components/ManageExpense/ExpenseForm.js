import InputComp from "./Input"
import { View } from "react-native"


const ExpenseForm=()=>{
    const amountChangeHandler=()=>{

    }
    return(
        <View>
           <InputComp label='Amount' textInputConfig={{
            keyboardType:'decimal-pad',
            onChangeText:amountChangeHandler,
           }}/>
           <InputComp label='Date' textInputConfig={{
            placeholder:'YYYY-MM-DD',
            maxLength:10,
            onChangeText:()=>{}
           }}/>
           <InputComp label='Description' textInputConfig={{
            multiline:true,
            //autoCorrect:false, imposta tutte le parole con la lettera maiuscola. di default è settata su true
            //autoCapitalize:'characters' è possibile dichiarare quale tipologia di parola si vuole settare la lettera maiuscola
           }}/>
        </View>
    )
}
export default ExpenseForm