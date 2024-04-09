import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import ManageExpense from './screen/ManageExpense';
import RecentExpenses from './screen/RecentExpenses';
import AllExpenses from './screen/AllExpenses';
import { GlobalStyles } from './costants/styles';
import { AntDesign } from '@expo/vector-icons';
const Stack=createNativeStackNavigator();
const BottomTab=createBottomTabNavigator();

const ExpensesOverView=()=>{
  return(
    <BottomTab.Navigator screenOptions={{
      headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
      headerTintColor:'white',
      tabBarStyle:{backgroundColor:GlobalStyles.colors.primary500},
      tabBarActiveTintColor:GlobalStyles.colors.accent500,

    }}>
      <BottomTab.Screen name='RecentExpenses' component={RecentExpenses} options={{title:'Recent expenses',tabBarIcon:()=><AntDesign name="hourglass" size={24} color={GlobalStyles.colors.accent500} />}}/>
      <BottomTab.Screen name='AllExpenses' component={AllExpenses} options={{title:'All Expenses',tabBarIcon:()=><AntDesign name="calendar" size={24} color={GlobalStyles.colors.accent500} />}}/>
    </BottomTab.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
   
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='ExpensesOverview' component={ExpensesOverView} options={{headerShown:false}}/>
          <Stack.Screen name='ManageExpenses' component={ManageExpense}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


