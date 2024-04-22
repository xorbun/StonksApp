import { TextInput,View,Text,StyleSheet } from "react-native"
import { GlobalStyles } from "../../costants/styles"

const InputComp=({label,style,isInvalid,textInputConfig})=>{
    const inputStyle=[styles.input]
    if( textInputConfig && textInputConfig.multiline){
        inputStyle.push(styles.inputMultiline)
    }
    if(isInvalid){
        inputStyle.push(styles.invalidInput)
    }
    return(
        <View style={[styles.inputContainer,style]}>
            <Text style={[styles.label,isInvalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={inputStyle} {...textInputConfig}/>
        </View>
    )
}
export default InputComp
const styles=StyleSheet.create({
    
    inputContainer:{
        marginHorizontal:4,
        marginVertical:8,
        
    },
    label:{
        fontSize:12,
        color:GlobalStyles.colors.primary100,
        marginBottom:4,
    },
    input:{
        backgroundColor:GlobalStyles.colors.primary100,
        color:GlobalStyles.colors.primary700,
        padding:6,
        borderRadius:6,
        fontSize:18,
        
    },
    inputMultiline:{
        minHeight:100,
        textAlignVertical:'top',
        
    },
invalidLabel:{
    color:GlobalStyles.colors.error500
},
invalidInput:{
    backgroundColor:GlobalStyles.colors.error50
}
})