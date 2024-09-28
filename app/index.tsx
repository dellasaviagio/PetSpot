import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import PetsScreen from './screens/PetsScreen';
import EventsScreen from './screens/EventsScreen';
import SettingsScreen from './screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons'; // Adicione esta linha para os ícones

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen 
          name="PetSpot"
          component={HomeScreen} 
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
            headerShown: true,
          }} 
        />
        <Tab.Screen 
          name="Meus Pets" 
          component={PetsScreen} 
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="paw-outline" size={24} color={color} />,
            headerShown: false,
          }} 
        />
        <Tab.Screen 
          name="Comunidade" 
          component={EventsScreen} 
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="calendar-outline" size={24} color={color} />,
            headerShown: false,
          }} 
        />
        <Tab.Screen 
          name="Ajustes" 
          component={SettingsScreen} 
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="settings-outline" size={24} color={color} />,
            headerShown: false,
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
