import { Pressable, View,StyleSheet } from "react-native"

import { Ionicons } from '@expo/vector-icons';
const IconButton=({icon,color,onPress})=>{
    return(
        <Pressable onPress={onPress} style={({pressed})=> pressed && styles.pressed}>
            <View style={styles.buttonContainer}>
                <Ionicons name={icon} size={24} color={color}/>
            </View>
        </Pressable>
    )
}
export default IconButton
const styles=StyleSheet.create({
    buttonContainer:{
        marginHorizontal:12
    },
    pressed:{
        opacity:0.75
    }

})