import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MedCabinet from "./screens/MedCabinet";
import Report from "./screens/Report";
import { FirstScreenNavigator } from "./screens/Pill Reminder/NavigationReminder";
const homeName = "MedicineHome";
const detailsName = "Med Cabinet";
const settingsName = "Geolocation";
const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === detailsName) {
              iconName = focused ? "list" : "list-outline";
            } else if (rn === settingsName) {
              iconName = focused ? "settings" : "settings-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          options={{
            headerShown: false,
          }}
          name={homeName}
          component={FirstScreenNavigator}
        />
        <Tab.Screen  name={detailsName} component={MedCabinet} />
        <Tab.Screen name={settingsName} component={Report} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
