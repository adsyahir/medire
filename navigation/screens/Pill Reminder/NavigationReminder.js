import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddReminder from "./AddReminder";
import PillReminder from "./PillReminder";
import Reminder from "./Reminder";
import { StyleSheet, TouchableOpacity, Text} from 'react-native';
import Dependent from "./Dependent";
import DepProfile from "./DepProfile";
import { useRoute } from "@react-navigation/native";

const Stack = createStackNavigator();

const FirstScreenNavigator = ({route}) => {

 
  return (
    <Stack.Navigator>
    <Stack.Screen name="Dependent" component={Dependent} />
    <Stack.Screen name="Dep Profile" component={DepProfile} />
      <Stack.Screen name="List Medicine" component={PillReminder} options={({route}) =>({
        title: route.params.dep_name,
      })}/>
      <Stack.Screen name="Add Reminder" component={AddReminder} /> 
      <Stack.Screen name="Reminder" component={Reminder} />
    </Stack.Navigator>
    
  );
};
/*options={{
  headerRight: () => (
    <TouchableOpacity
onPress={register}
style={{marginRight: 10}}>
<Text style={{color:'black'}}>Next</Text>
</TouchableOpacity>
  ),
}}   */


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color:'black'
  },
});

export { FirstScreenNavigator };
