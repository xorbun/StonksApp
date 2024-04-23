import { View,Text,StyleSheet } from "react-native"
import { GlobalStyles } from "../../costants/styles"
import Button from "./Button"

const ErrorOverlay=({message,onConfirm})=>{
    return(
        <View style={styles.container}>
            <Text style={[styles.Text,styles.title]}>An error accured!</Text>
            <Text style={styles.Text}>{message}</Text>
            <Button onPress={onConfirm}>Ok</Button>
        </View>
    )
}
export default ErrorOverlay
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:24,
        backgroundColor:GlobalStyles.colors.primary700
    },
    Text:{
        textAlign:'center',
        color:'white',
        marginBottom:8
    },
    title:{
        color:'white',
        fontSize:20,
        fontWeight:'bold'
    },
    message:{
        fontSize:14,

    }
})