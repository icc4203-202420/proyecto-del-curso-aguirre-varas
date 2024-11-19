import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import EventCard from "./Events/EventCard";
import EventDetail from "./Events/EventDetail";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Events" component={EventList} /> 
        <Stack.Screen name="EventDetail" component={EventDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
